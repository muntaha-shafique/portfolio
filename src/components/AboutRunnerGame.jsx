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
  const stride = Math.sin(time * 2) * 1.4;
  ctx.save();
  ctx.translate(x, groundY + jumpY);
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
  const by = Math.max(14, groundY - 156 + (game.player?.y ?? 0));
  ctx.shadowColor = 'rgba(19,29,35,.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8;
  ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.roundRect(bx, by, bubbleW, bubbleH, 14); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.fillStyle = '#263d4a'; ctx.beginPath(); ctx.moveTo(bx+25,by+bubbleH-1); ctx.lineTo(bx+38,by+bubbleH-1); ctx.lineTo(bx+20,by+bubbleH+13); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#27353b'; ctx.textAlign = 'left'; ctx.font = `650 ${Math.max(12,Math.min(15,w*.016))}px system-ui,sans-serif`;
  lines.forEach((part,index) => ctx.fillText(part,bx+padX,by+22+index*lineH));
  ctx.restore();
}

function drawStoryStar(ctx, x, y, radius, active, time, index) {
  const pulse = 1 + Math.sin(time * 2.8 + index * .9) * .09;
  const size = radius * pulse;
  ctx.save();
  const glow = ctx.createRadialGradient(x, y, 1, x, y, size * (active ? 3 : 2));
  glow.addColorStop(0, active ? 'rgba(255,240,190,.7)' : 'rgba(255,250,226,.32)');
  glow.addColorStop(1, 'rgba(255,240,190,0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, size * 3, 0, Math.PI * 2); ctx.fill();
  ctx.translate(x, y); ctx.rotate(time * .12 + index * .3); ctx.scale(pulse, pulse);
  ctx.beginPath();
  for (let point = 0; point < 10; point += 1) {
    const angle = -Math.PI / 2 + point * Math.PI / 5;
    const r = point % 2 ? size * .44 : size;
    const px = Math.cos(angle) * r, py = Math.sin(angle) * r;
    if (!point) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = active ? '#fff3cf' : 'rgba(255,246,218,.66)';
  ctx.shadowColor = 'rgba(255,239,188,.75)'; ctx.shadowBlur = active ? 18 : 8; ctx.fill();
  ctx.restore();
}

function drawScene(ctx, game) {
  const { width: w, height: h } = game;
  if (!w || !h) return;
  const groundY = h - 42;
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#8daab4'); sky.addColorStop(.48, '#bdc9bf'); sky.addColorStop(.82, '#e6d4b4'); sky.addColorStop(1, '#b6b99c');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);

  // A warm moon and soft distant lights set a gentler storybook scene.
  const moonX = w * .82, moonY = h * .21, moonR = Math.min(49, h * .14);
  const moonGlow = ctx.createRadialGradient(moonX, moonY, 2, moonX, moonY, moonR * 2.1);
  moonGlow.addColorStop(0, 'rgba(255,241,203,.52)'); moonGlow.addColorStop(1, 'rgba(255,241,203,0)');
  ctx.fillStyle = moonGlow; ctx.fillRect(moonX - moonR * 2.2, moonY - moonR * 2.2, moonR * 4.4, moonR * 4.4);
  ctx.fillStyle = '#fff1cf'; ctx.beginPath(); ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 8; i += 1) {
    const sx = (w * (.12 + i * .105) + Math.sin(i * 9) * 18) % w;
    const sy = h * (.18 + (i % 3) * .095) + Math.sin(game.time * 1.5 + i) * 4;
    ctx.fillStyle = `rgba(255,248,222,${.45 + .25 * Math.sin(game.time * 2 + i)})`;
    ctx.beginPath(); ctx.arc(sx, sy, i % 3 === 0 ? 2.2 : 1.4, 0, Math.PI * 2); ctx.fill();
  }

  // distant tree line
  for (let i = -1; i < Math.ceil(w / 54) + 2; i++) {
    const x = i * 54;
    drawTree(ctx, x, groundY + 6, .68 + ((i + 8) % 3) * .12, '#718379');
  }
  // soft tree silhouettes frame the path without blocking the story lights
  for (let i = -1; i < Math.ceil(w / 132) + 2; i++) {
    const x = i * 132 + 16;
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

  // A winding garden path and grass replace the obstacle track.
  ctx.fillStyle = '#7d8b6e'; ctx.fillRect(0, groundY, w, h - groundY);
  ctx.fillStyle = 'rgba(235,219,184,.8)';
  ctx.beginPath(); ctx.moveTo(w * .12, h); ctx.quadraticCurveTo(w * .29, groundY - 22, w * .46, h); ctx.lineTo(w * .72, h); ctx.quadraticCurveTo(w * .46, groundY + 12, w * .3, h); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#a7b28f'; ctx.lineWidth = 2;
  for (let x = 8; x < w; x += 25) {
    ctx.beginPath(); ctx.moveTo(x, groundY + 3); ctx.lineTo(x + 3, groundY - 5 - ((x * 7) % 8)); ctx.lineTo(x + 7, groundY + 3); ctx.stroke();
  }

  drawRunner(ctx, Math.max(62, w * .2), groundY, 2 + Math.sin(game.time * 2) * 2, game.time);
  const starPositions = [.36, .48, .60, .72, .84];
  const activeStar = game.collected % starPositions.length;
  starPositions.forEach((ratio, index) => {
    const y = h * (.43 + (index % 2) * .095) + Math.sin(game.time * 1.7 + index * .8) * 5;
    const alreadyCollected = index < activeStar;
    drawStoryStar(ctx, w * ratio, y, index === activeStar ? 13 : 10, index === activeStar, game.time, index);
    if (alreadyCollected) {
      ctx.strokeStyle = 'rgba(255,246,218,.55)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(w * ratio, y, 19, 0, Math.PI * 2); ctx.stroke();
    }
  });
  const vignette = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, w * .7);
  vignette.addColorStop(.35, 'rgba(20,30,31,0)'); vignette.addColorStop(1, 'rgba(20,30,31,.2)');
  ctx.fillStyle = vignette; ctx.fillRect(0, 0, w, h);
  if (game.fact) drawFactBubble(ctx, game, Math.max(62, w * .2), groundY);

  if (game.phase === 'ready' || game.phase === 'complete') {
    ctx.fillStyle = game.phase === 'ready' ? 'rgba(248,244,231,.08)' : 'rgba(248,244,231,.1)'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'center'; ctx.fillStyle = '#26353a';
    ctx.font = `700 ${Math.max(17, Math.min(25, w * .027))}px system-ui, sans-serif`;
    ctx.fillText(game.phase === 'ready' ? 'Collect a star · find my story' : 'You found my story', w / 2, h * .48);
    ctx.font = `500 ${Math.max(11, Math.min(14, w * .016))}px system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(38,53,58,.78)';
    ctx.fillText(game.phase === 'ready' ? 'Tap a sparkle or press Collect to reveal a line' : 'Tap to begin the story again', w / 2, h * .48 + 27);
  }
}

export default function AboutRunnerGame() {
  const canvasRef = useRef(null);
  const gameRef = useRef({ width: 0, height: 0, phase: 'ready', collected: 0, factIndex: -1, fact: '', time: 0, lastFrame: 0 });
  const frameRef = useRef(0);
  const [hud, setHud] = useState({ collected: 0, factIndex: -1, phase: 'ready' });

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
      drawScene(ctx, game);
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => { observer.disconnect(); cancelAnimationFrame(frameRef.current); };
  }, []);

  const collectStoryStar = () => {
    const game = gameRef.current;
    if (game.phase === 'complete') {
      game.collected = 0;
      game.factIndex = -1;
      game.fact = '';
    }
    game.phase = 'collecting';
    game.factIndex = game.collected % ABOUT_FACTS.length;
    game.fact = ABOUT_FACTS[game.factIndex];
    game.collected += 1;
    if (game.collected >= ABOUT_FACTS.length) game.phase = 'complete';
    setHud({ collected: game.collected, factIndex: game.factIndex, phase: game.phase });
    canvasRef.current?.focus({ preventScroll: true });
  };

  const buttonLabel = hud.phase === 'complete' ? 'Play again' : 'Collect a star';
  return <section className="about-runner-section" aria-labelledby="aboutRunnerTitle">
    <div className="about-runner-heading">
      <div><p>A LITTLE ABOUT ME, ONE STAR AT A TIME</p><h2 id="aboutRunnerTitle">Collect my <em>story stars.</em></h2></div>
      <p className="about-runner-description">Find the glowing stars to uncover a new line about my work, how I collaborate, and what I build. Tap the scene or press Space.</p>
    </div>
    <div className="about-runner-panel">
      <div className="about-runner-hud"><span><i className={hud.phase === 'collecting' ? 'is-live' : ''} />{hud.phase === 'collecting' ? 'STORY STARS FOUND' : hud.phase === 'complete' ? 'STORY COMPLETE' : 'YOUR STORY IS WAITING'}</span><span>FACT <b>{hud.factIndex < 0 ? '0' : hud.factIndex + 1}/{ABOUT_FACTS.length}</b><span className="about-runner-best">STARS <b>{hud.collected}</b></span></span></div>
      <canvas ref={canvasRef} className="about-runner-canvas" tabIndex="0" aria-label="Muntaha’s Story Stars. Tap the scene, click, or press space to collect stars and reveal facts." onPointerDown={(event) => { event.preventDefault(); collectStoryStar(); }} onKeyDown={(event) => { if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'Enter') { event.preventDefault(); collectStoryStar(); } }} />
      <div className="about-runner-controls"><span>TAP A SPARKLE · CLICK · PRESS SPACE</span><button type="button" onClick={collectStoryStar}>{buttonLabel}<span aria-hidden="true">↗</span></button></div>
    </div>
  </section>;
}
