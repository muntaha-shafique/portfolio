import React, { useEffect, useRef, useState } from 'react';

const ABOUT_FACTS = [
  'I’m Muntaha Shafique, an Agentic AI engineer and full-stack developer.',
  'I’m based in Pakistan and work with clients around the world.',
  'I build digital products from the first screen through to the backend.',
  'I create AI agents and automations for practical, everyday work.',
  'I turn complex ideas into clear and useful digital experiences.',
  'I enjoy working directly with clients to shape their ideas.',
  'I bring thoughtful design and careful engineering together.',
  'I focus on making websites easy to use on every screen.',
  'I like solving the problem before choosing the technology.',
  'I build with room for a product to grow over time.',
  'I work across AI systems, workflows, and full-stack web.',
  'I value clear communication throughout a project.',
  'I collaborate with local and international businesses.',
  'I care about the small details that make a product feel right.',
  'I help turn a promising idea into something people can use.',
];

function drawTree(ctx, x, baseY, scale, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x - 5 * scale, baseY - 118 * scale, 10 * scale, 118 * scale);
  ctx.beginPath();
  ctx.moveTo(x, baseY - 105 * scale);
  ctx.lineTo(x - 32 * scale, baseY - 52 * scale);
  ctx.lineTo(x - 9 * scale, baseY - 56 * scale);
  ctx.lineTo(x - 38 * scale, baseY - 18 * scale);
  ctx.lineTo(x + 10 * scale, baseY - 40 * scale);
  ctx.lineTo(x + 34 * scale, baseY - 8 * scale);
  ctx.lineTo(x + 19 * scale, baseY - 62 * scale);
  ctx.lineTo(x + 38 * scale, baseY - 57 * scale);
  ctx.closePath();
  ctx.fill();
}

function drawRunner(ctx, x, groundY, jumpY, time) {
  const stride = Math.sin(time * 14) * 6;
  ctx.save();
  ctx.translate(x, groundY - jumpY);
  ctx.fillStyle = `rgba(22,30,30,${Math.max(.08,.2 - jumpY / 800)})`;
  ctx.beginPath(); ctx.ellipse(0, 2, Math.max(10,18 - jumpY * .025), 4, 0, 0, Math.PI * 2); ctx.fill();

  // running legs, warm sneakers, and a modest long tunic
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.strokeStyle = '#263b4b'; ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-2,-16); ctx.lineTo(-8 + stride,-2); ctx.lineTo(-17 + stride,1);
  ctx.moveTo(3,-16); ctx.lineTo(9 - stride,-4); ctx.lineTo(17 - stride,-1);
  ctx.stroke();
  ctx.strokeStyle = '#d7c5aa'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-16 + stride,1); ctx.lineTo(-21 + stride,1); ctx.moveTo(16 - stride,-1); ctx.lineTo(21 - stride,-1); ctx.stroke();
  ctx.fillStyle = '#b86e59';
  ctx.beginPath(); ctx.moveTo(-10,-39); ctx.quadraticCurveTo(1,-47,11,-38); ctx.lineTo(12,-19); ctx.quadraticCurveTo(0,-13,-12,-19); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#dfac83'; ctx.lineCap = 'round'; ctx.lineWidth = 5;
  ctx.strokeStyle = '#dfac83';
  ctx.beginPath(); ctx.moveTo(-7,-36); ctx.lineTo(-15,-28 + stride * .2); ctx.moveTo(7,-37); ctx.lineTo(16,-45 + stride * .2); ctx.stroke();
  ctx.beginPath(); ctx.arc(-15,-28 + stride * .2,2.5,0,Math.PI*2); ctx.arc(16,-45 + stride * .2,2.5,0,Math.PI*2); ctx.fill();

  // face framed by a deep teal hijab, with a flowing tail behind her
  ctx.fillStyle = '#244c5a';
  ctx.beginPath(); ctx.moveTo(-8,-56); ctx.quadraticCurveTo(-8,-73,8,-72); ctx.quadraticCurveTo(23,-69,20,-50); ctx.quadraticCurveTo(18,-42,10,-39); ctx.lineTo(3,-43); ctx.quadraticCurveTo(14,-51,9,-62); ctx.quadraticCurveTo(0,-64,-3,-54); ctx.lineTo(-4,-43); ctx.quadraticCurveTo(-16,-49,-8,-56); ctx.fill();
  ctx.fillStyle = '#e6b491';
  ctx.beginPath(); ctx.ellipse(8,-54,8,10,.08,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#253b4b';
  ctx.beginPath(); ctx.moveTo(-2,-59); ctx.quadraticCurveTo(8,-71,18,-60); ctx.lineTo(14,-55); ctx.quadraticCurveTo(6,-61,0,-53); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#24323a'; ctx.fillRect(10,-55,2,2); ctx.fillRect(5,-55,2,2);
  ctx.fillStyle = '#244c5a';
  ctx.beginPath(); ctx.moveTo(-5,-47); ctx.quadraticCurveTo(-20,-52,-25 - stride*.4,-42); ctx.lineTo(-11,-36); ctx.quadraticCurveTo(-2,-39,2,-45); ctx.fill();
  ctx.restore();
}

function drawFactBubble(ctx, game, x, groundY) {
  if (!game.fact) return;
  const w = game.width, maxBubble = Math.min(310, w * .58), padX = 15, lineH = 19;
  ctx.save();
  ctx.font = `650 ${Math.max(12,Math.min(15,w*.016))}px system-ui,sans-serif`;
  const words = game.fact.split(' '), lines = [];
  let line = '';
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(candidate).width > maxBubble - padX * 2) { lines.push(line); line = word; }
    else line = candidate;
  });
  if (line) lines.push(line);
  const bubbleW = Math.min(maxBubble, Math.max(...lines.map((part) => ctx.measureText(part).width)) + padX * 2);
  const bubbleH = lines.length * lineH + 20;
  const runnerX = Math.max(62, w * .22);
  const bx = Math.max(12, Math.min(w - bubbleW - 12, runnerX + 32));
  const by = Math.max(14, groundY - 156 + game.player.y);
  ctx.shadowColor = 'rgba(19,29,35,.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8;
  ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.roundRect(bx, by, bubbleW, bubbleH, 14); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.fillStyle = '#263d4a'; ctx.beginPath(); ctx.moveTo(bx+25,by+bubbleH-1); ctx.lineTo(bx+38,by+bubbleH-1); ctx.lineTo(bx+20,by+bubbleH+13); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#27353b'; ctx.textAlign = 'left'; ctx.font = `650 ${Math.max(12,Math.min(15,w*.016))}px system-ui,sans-serif`;
  lines.forEach((part,index) => ctx.fillText(part,bx+padX,by+22+index*lineH));
  ctx.restore();
}

function drawScene(ctx, game) {
  const { width: w, height: h } = game;
  if (!w || !h) return;
  const groundY = h - 42;
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#718c9b'); sky.addColorStop(.42, '#a7b8b5'); sky.addColorStop(.76, '#d5c3a4'); sky.addColorStop(1, '#9aa287');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);

  // moon glow and moon
  const moonX = w * .79, moonY = h * .24, moonR = Math.min(55, h * .16);
  const glow = ctx.createRadialGradient(moonX, moonY, 2, moonX, moonY, moonR * 2.25);
  glow.addColorStop(0, 'rgba(255,241,203,.62)'); glow.addColorStop(1, 'rgba(255,241,203,0)');
  ctx.fillStyle = glow; ctx.fillRect(moonX - moonR * 2.3, moonY - moonR * 2.3, moonR * 4.6, moonR * 4.6);
  ctx.fillStyle = '#fff1cf'; ctx.beginPath(); ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(177,145,101,.14)';
  ctx.beginPath(); ctx.arc(moonX - moonR * .27, moonY - moonR * .15, moonR * .14, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(moonX + moonR * .25, moonY + moonR * .29, moonR * .1, 0, Math.PI * 2); ctx.fill();

  // distant tree line
  const drift = game.world * .12;
  for (let i = -1; i < Math.ceil(w / 54) + 2; i++) {
    const x = i * 54 - (drift % 54);
    drawTree(ctx, x, groundY + 6, .68 + ((i + 8) % 3) * .12, '#718379');
  }
  // foreground trunks and angular branches
  const foreground = game.world * .42;
  for (let i = -1; i < Math.ceil(w / 132) + 2; i++) {
    const x = i * 132 - (foreground % 132) + 16;
    const trunkH = 135 + ((i * 37 % 70) + 70);
    ctx.fillStyle = i % 2 ? '#536b63' : '#61756b';
    ctx.beginPath();
    ctx.moveTo(x - 9, groundY); ctx.lineTo(x - 6, groundY - trunkH);
    ctx.quadraticCurveTo(x, groundY - trunkH - 12, x + 7, groundY - trunkH + 3);
    ctx.lineTo(x + 13, groundY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(37,55,52,.48)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x, groundY - trunkH * .56); ctx.lineTo(x - 32, groundY - trunkH * .75); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 2, groundY - trunkH * .38); ctx.lineTo(x + 30, groundY - trunkH * .59); ctx.stroke();
  }

  // ground and grass
  ctx.fillStyle = '#34443a'; ctx.fillRect(0, groundY, w, h - groundY);
  ctx.strokeStyle = '#71876a'; ctx.lineWidth = 2;
  for (let x = -8 - (game.world % 22); x < w + 20; x += 22) {
    ctx.beginPath(); ctx.moveTo(x, groundY + 2); ctx.lineTo(x + 4, groundY - 4 - ((x * 7) % 8)); ctx.lineTo(x + 8, groundY + 3); ctx.stroke();
  }

  // obstacles
  game.obstacles.forEach((obstacle) => {
    ctx.fillStyle = '#805744';
    ctx.beginPath();
    ctx.roundRect(obstacle.x, groundY - obstacle.height, obstacle.width, obstacle.height, [5, 5, 2, 2]);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,230,197,.38)';
    ctx.fillRect(obstacle.x + 5, groundY - obstacle.height + 5, Math.max(3, obstacle.width - 10), 2);
  });

  drawRunner(ctx, Math.max(62, w * .22), groundY, game.player.y, game.time);
  const vignette = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, w * .7);
  vignette.addColorStop(.35, 'rgba(20,30,31,0)'); vignette.addColorStop(1, 'rgba(20,30,31,.2)');
  ctx.fillStyle = vignette; ctx.fillRect(0, 0, w, h);
  if (game.phase !== 'ready') drawFactBubble(ctx, game, Math.max(62, w * .22), groundY);

  if (game.phase !== 'running') {
    ctx.fillStyle = game.phase === 'ready' ? 'rgba(21,31,35,.05)' : 'rgba(21,31,35,.22)'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'center'; ctx.fillStyle = '#26353a';
    ctx.font = `700 ${Math.max(17, Math.min(25, w * .027))}px system-ui, sans-serif`;
    ctx.fillText(game.phase === 'ready' ? 'A little run with Muntaha' : 'Nice run · ready for another?', w / 2, h * .48);
    ctx.font = `500 ${Math.max(11, Math.min(14, w * .016))}px system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(38,53,58,.72)';
    ctx.fillText(game.phase === 'ready' ? 'Each jump reveals a new line about me' : 'Tap the scene or press Run Again', w / 2, h * .48 + 27);
  }
}

export default function AboutRunnerGame() {
  const canvasRef = useRef(null);
  const gameRef = useRef({ width: 0, height: 0, phase: 'ready', jumpCount: 0, factIndex: -1, fact: '', world: 0, time: 0, speed: 260, player: { y: 0, vy: 0 }, obstacles: [], spawnIn: 4.1, lastFrame: 0 });
  const frameRef = useRef(0);
  const [hud, setHud] = useState({ jumpCount: 0, factIndex: -1, phase: 'ready' });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;
    const game = gameRef.current;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      game.width = rect.width; game.height = rect.height;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawScene(ctx, game);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    const loop = (now) => {
      const dt = Math.min(.04, Math.max(0, (now - (game.lastFrame || now)) / 1000));
      game.lastFrame = now;
      game.time += dt;
      if (game.phase === 'running') {
        game.world += game.speed * dt;
        game.speed = Math.min(390, 260 + game.jumpCount * 8);
        game.player.vy += 1780 * dt;
        game.player.y += game.player.vy * dt;
        if (game.player.y > 0) { game.player.y = 0; game.player.vy = 0; }
        game.spawnIn -= dt;
        if (game.spawnIn <= 0) {
          const height = 18 + Math.random() * 9;
          game.obstacles.push({ x: game.width + 20, width: 18 + Math.random() * 10, height });
          game.spawnIn = 3.8 + Math.random() * 2.1;
        }
        game.obstacles.forEach((obstacle) => { obstacle.x -= game.speed * dt; });
        game.obstacles = game.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -10);
        const playerX = Math.max(62, game.width * .22);
        const groundY = game.height - 42;
        const playerBox = { left: playerX - 13, right: playerX + 14, top: groundY - game.player.y - 53, bottom: groundY - game.player.y - 3 };
        const hit = game.obstacles.some((obstacle) => {
          const box = { left: obstacle.x + 2, right: obstacle.x + obstacle.width - 2, top: groundY - obstacle.height + 2, bottom: groundY };
          return playerBox.right > box.left && playerBox.left < box.right && playerBox.bottom > box.top && playerBox.top < box.bottom;
        });
        if (hit) {
          game.phase = 'over';
          setHud({ jumpCount: game.jumpCount, factIndex: game.factIndex, phase: 'over' });
        }
      }
      drawScene(ctx, game);
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => { observer.disconnect(); cancelAnimationFrame(frameRef.current); };
  }, []);

  const startOrJump = () => {
    const game = gameRef.current;
    if (game.phase !== 'running') {
      game.phase = 'running'; game.speed = 260; game.world = 0;
      game.player = { y: 0, vy: 0 }; game.obstacles = []; game.spawnIn = 4.1;
    }
    if (game.player.y === 0) {
      game.player.vy = -660;
      game.jumpCount += 1;
      game.factIndex = (game.jumpCount - 1) % ABOUT_FACTS.length;
      game.fact = ABOUT_FACTS[game.factIndex];
    }
    setHud({ jumpCount: game.jumpCount, factIndex: game.factIndex, phase: game.phase });
    canvasRef.current?.focus({ preventScroll: true });
  };

  const buttonLabel = hud.phase === 'ready' ? 'Start · reveal first line' : hud.phase === 'over' ? 'Run again' : 'Jump · next line';
  return <section className="about-runner-section" aria-labelledby="aboutRunnerTitle">
    <div className="about-runner-heading">
      <div><p>A LITTLE ABOUT ME, ONE JUMP AT A TIME</p><h2 id="aboutRunnerTitle">Meet Muntaha <em>in motion.</em></h2></div>
      <p className="about-runner-description">Jump to reveal a new line about my work, how I collaborate, and what I build. Click or tap the scene, or press Space.</p>
    </div>
    <div className="about-runner-panel">
      <div className="about-runner-hud"><span><i className={hud.phase === 'running' ? 'is-live' : ''} />{hud.phase === 'running' ? 'YOUR STORY, IN MOTION' : hud.phase === 'over' ? 'READY FOR ANOTHER LINE' : 'TAP TO GET TO KNOW ME'}</span><span>FACT <b>{hud.factIndex < 0 ? '0' : hud.factIndex + 1}/{ABOUT_FACTS.length}</b><span className="about-runner-best">JUMPS <b>{hud.jumpCount}</b></span></span></div>
      <canvas ref={canvasRef} className="about-runner-canvas" tabIndex="0" aria-label="About Muntaha interactive scene. Click, tap, or press space to jump and reveal a new fact." onPointerDown={(event) => { event.preventDefault(); startOrJump(); }} onKeyDown={(event) => { if (event.code === 'Space' || event.code === 'ArrowUp') { event.preventDefault(); startOrJump(); } }} />
      <div className="about-runner-controls"><span>CLICK · TAP · SPACE TO JUMP</span><button type="button" onClick={startOrJump}>{buttonLabel}<span aria-hidden="true">↗</span></button></div>
    </div>
  </section>;
}
