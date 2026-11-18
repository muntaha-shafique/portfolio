import React, { useEffect, useRef, useState } from 'react';

const readBest = () => {
  try { return Number(window.localStorage.getItem('muntaha-night-run-best')) || 0; }
  catch { return 0; }
};

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
  const stride = Math.sin(time * 13) * 7;
  ctx.save();
  ctx.translate(x, groundY - jumpY);
  ctx.fillStyle = '#030506';
  ctx.strokeStyle = '#030506';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 9;
  // legs
  ctx.beginPath();
  ctx.moveTo(-2, -14); ctx.lineTo(-8 + stride, 0); ctx.lineTo(-17 + stride, 4);
  ctx.moveTo(2, -14); ctx.lineTo(9 - stride, -2); ctx.lineTo(17 - stride, 0);
  ctx.stroke();
  // body and arms
  ctx.beginPath();
  ctx.moveTo(-2, -23); ctx.lineTo(3, -41);
  ctx.moveTo(0, -34); ctx.lineTo(-13, -25 - stride * .25);
  ctx.moveTo(2, -35); ctx.lineTo(15, -45 + stride * .25);
  ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -26, 10, 17, -.14, 0, Math.PI * 2); ctx.fill();
  // head and small eye glint
  ctx.beginPath(); ctx.arc(7, -52, 11, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e8edf2'; ctx.fillRect(11, -55, 3, 3);
  // scarf tail
  ctx.fillStyle = '#0b0f12';
  ctx.beginPath(); ctx.moveTo(-3, -45); ctx.quadraticCurveTo(-23, -52, -21 - stride, -42); ctx.lineTo(-5, -38); ctx.fill();
  ctx.restore();
}

function drawScene(ctx, game) {
  const { width: w, height: h } = game;
  if (!w || !h) return;
  const groundY = h - 42;
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#101923'); sky.addColorStop(.62, '#11171d'); sky.addColorStop(1, '#07090b');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);

  // moon glow and moon
  const moonX = w * .79, moonY = h * .24, moonR = Math.min(55, h * .16);
  const glow = ctx.createRadialGradient(moonX, moonY, 2, moonX, moonY, moonR * 2.25);
  glow.addColorStop(0, 'rgba(225,232,238,.28)'); glow.addColorStop(1, 'rgba(225,232,238,0)');
  ctx.fillStyle = glow; ctx.fillRect(moonX - moonR * 2.3, moonY - moonR * 2.3, moonR * 4.6, moonR * 4.6);
  ctx.fillStyle = '#dce2e7'; ctx.beginPath(); ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(132,145,155,.18)';
  ctx.beginPath(); ctx.arc(moonX - moonR * .27, moonY - moonR * .15, moonR * .14, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(moonX + moonR * .25, moonY + moonR * .29, moonR * .1, 0, Math.PI * 2); ctx.fill();

  // distant tree line
  const drift = game.world * .12;
  for (let i = -1; i < Math.ceil(w / 54) + 2; i++) {
    const x = i * 54 - (drift % 54);
    drawTree(ctx, x, groundY + 6, .68 + ((i + 8) % 3) * .12, '#171e23');
  }
  // foreground trunks and angular branches
  const foreground = game.world * .42;
  for (let i = -1; i < Math.ceil(w / 132) + 2; i++) {
    const x = i * 132 - (foreground % 132) + 16;
    const trunkH = 135 + ((i * 37 % 70) + 70);
    ctx.fillStyle = i % 2 ? '#22282d' : '#1d2328';
    ctx.beginPath();
    ctx.moveTo(x - 9, groundY); ctx.lineTo(x - 6, groundY - trunkH);
    ctx.quadraticCurveTo(x, groundY - trunkH - 12, x + 7, groundY - trunkH + 3);
    ctx.lineTo(x + 13, groundY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(6,8,10,.7)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x, groundY - trunkH * .56); ctx.lineTo(x - 32, groundY - trunkH * .75); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 2, groundY - trunkH * .38); ctx.lineTo(x + 30, groundY - trunkH * .59); ctx.stroke();
  }

  // ground and grass
  ctx.fillStyle = '#080a0c'; ctx.fillRect(0, groundY, w, h - groundY);
  ctx.strokeStyle = '#090b0d'; ctx.lineWidth = 2;
  for (let x = -8 - (game.world % 22); x < w + 20; x += 22) {
    ctx.beginPath(); ctx.moveTo(x, groundY + 2); ctx.lineTo(x + 4, groundY - 4 - ((x * 7) % 8)); ctx.lineTo(x + 8, groundY + 3); ctx.stroke();
  }

  // obstacles
  game.obstacles.forEach((obstacle) => {
    ctx.fillStyle = '#090b0d';
    ctx.beginPath();
    ctx.roundRect(obstacle.x, groundY - obstacle.height, obstacle.width, obstacle.height, [5, 5, 2, 2]);
    ctx.fill();
    ctx.fillStyle = 'rgba(183,193,201,.16)';
    ctx.fillRect(obstacle.x + 5, groundY - obstacle.height + 5, Math.max(3, obstacle.width - 10), 2);
  });

  drawRunner(ctx, Math.max(62, w * .22), groundY, game.player.y, game.time);
  const vignette = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, w * .7);
  vignette.addColorStop(.35, 'rgba(0,0,0,0)'); vignette.addColorStop(1, 'rgba(0,0,0,.48)');
  ctx.fillStyle = vignette; ctx.fillRect(0, 0, w, h);

  if (game.phase !== 'running') {
    ctx.fillStyle = 'rgba(4,6,8,.33)'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'center'; ctx.fillStyle = '#f2f0e9';
    ctx.font = `700 ${Math.max(17, Math.min(25, w * .027))}px system-ui, sans-serif`;
    ctx.fillText(game.phase === 'ready' ? 'A little midnight run' : 'Run over · take another try', w / 2, h * .48);
    ctx.font = `500 ${Math.max(11, Math.min(14, w * .016))}px system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(242,240,233,.68)';
    ctx.fillText(game.phase === 'ready' ? 'Tap the scene or press Start Run' : 'Tap the scene or press Run Again', w / 2, h * .48 + 27);
  }
}

export default function AboutRunnerGame() {
  const canvasRef = useRef(null);
  const gameRef = useRef({ width: 0, height: 0, phase: 'ready', score: 0, best: readBest(), world: 0, time: 0, speed: 300, player: { y: 0, vy: 0 }, obstacles: [], spawnIn: 1.25, lastFrame: 0, lastHud: 0 });
  const frameRef = useRef(0);
  const [hud, setHud] = useState({ score: 0, best: readBest(), phase: 'ready' });

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
        game.speed = 300 + game.score * 2.2;
        game.score += dt * 10;
        game.player.vy += 1780 * dt;
        game.player.y += game.player.vy * dt;
        if (game.player.y > 0) { game.player.y = 0; game.player.vy = 0; }
        game.spawnIn -= dt;
        if (game.spawnIn <= 0) {
          const height = 20 + Math.random() * 15;
          game.obstacles.push({ x: game.width + 20, width: 20 + Math.random() * 15, height });
          game.spawnIn = 1.15 + Math.random() * .95;
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
          game.best = Math.max(game.best, Math.floor(game.score));
          try { window.localStorage.setItem('muntaha-night-run-best', String(game.best)); } catch { /* Storage can be disabled. */ }
        }
        if (now - game.lastHud > 100) {
          game.lastHud = now;
          setHud({ score: Math.floor(game.score), best: game.best, phase: game.phase });
        }
      }
      drawScene(ctx, game);
      if (game.phase === 'over' && hud.phase !== 'over') setHud({ score: Math.floor(game.score), best: game.best, phase: 'over' });
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => { observer.disconnect(); cancelAnimationFrame(frameRef.current); };
  }, [hud.phase]);

  const startOrJump = () => {
    const game = gameRef.current;
    if (game.phase !== 'running') {
      game.phase = 'running'; game.score = 0; game.speed = 300; game.world = 0;
      game.player = { y: 0, vy: 0 }; game.obstacles = []; game.spawnIn = 1.2;
    } else if (game.player.y === 0) {
      game.player.vy = -660;
    }
    setHud({ score: Math.floor(game.score), best: game.best, phase: game.phase });
    canvasRef.current?.focus({ preventScroll: true });
  };

  const buttonLabel = hud.phase === 'ready' ? 'Start run' : hud.phase === 'over' ? 'Run again' : 'Jump';
  return <section className="about-runner-section" aria-labelledby="aboutRunnerTitle">
    <div className="about-runner-heading">
      <div><p>TAKE A QUICK BREAK</p><h2 id="aboutRunnerTitle">Night <em>Run</em></h2></div>
      <p className="about-runner-description">A tiny forest run. Jump over the fallen branches and see how far you can go.</p>
    </div>
    <div className="about-runner-panel">
      <div className="about-runner-hud"><span><i className={hud.phase === 'running' ? 'is-live' : ''} />{hud.phase === 'running' ? 'RUNNING' : hud.phase === 'over' ? 'RUN COMPLETE' : 'READY WHEN YOU ARE'}</span><span>SCORE <b>{hud.score}</b><span className="about-runner-best">BEST <b>{hud.best}</b></span></span></div>
      <canvas ref={canvasRef} className="about-runner-canvas" tabIndex="0" aria-label="Night Run game. Click, tap, or press space to jump over obstacles." onPointerDown={(event) => { event.preventDefault(); startOrJump(); }} onKeyDown={(event) => { if (event.code === 'Space' || event.code === 'ArrowUp') { event.preventDefault(); startOrJump(); } }} />
      <div className="about-runner-controls"><span>CLICK · TAP · SPACE TO JUMP</span><button type="button" onClick={startOrJump}>{buttonLabel}<span aria-hidden="true">↗</span></button></div>
    </div>
  </section>;
}
