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

function drawRunner(ctx, x, groundY, time) {
  const cycle = time * 12;
  const stride = Math.sin(cycle) * 3;
  const lift = Math.max(0, Math.cos(cycle * 2)) * 2;
  ctx.save();
  ctx.translate(x, groundY - lift);
  ctx.scale(1.2, 1.2);
  ctx.fillStyle = 'rgba(37,44,40,.28)';
  ctx.beginPath(); ctx.ellipse(0, 2 + lift, 21, 5, 0, 0, Math.PI * 2); ctx.fill();
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';

  // Keep the runner upright and front-facing, with a small even jogging step.
  const leg = ctx.createLinearGradient(0,-28,0,1);
  leg.addColorStop(0,'#34495a'); leg.addColorStop(1,'#1e303f');
  ctx.strokeStyle = leg; ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-4,-20); ctx.lineTo(-5 - stride*.35,-9); ctx.lineTo(-6 - stride,-1);
  ctx.moveTo(4,-20); ctx.lineTo(5 + stride*.35,-9); ctx.lineTo(6 + stride,-1);
  ctx.stroke();
  ctx.fillStyle = '#eee8dc';
  ctx.beginPath();
  ctx.ellipse(-9 - stride,-1,7,3.5,0,0,Math.PI*2);
  ctx.ellipse(9 + stride,-1,7,3.5,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = '#cf7f52';
  ctx.beginPath();
  ctx.ellipse(-9 - stride,-2,5,2.5,0,0,Math.PI*2);
  ctx.ellipse(9 + stride,-2,5,2.5,0,0,Math.PI*2); ctx.fill();

  // Long modest tunic with soft fabric shading and a moving hem.
  const tunic = ctx.createLinearGradient(-13,-51,14,-17);
  tunic.addColorStop(0,'#557c88'); tunic.addColorStop(.48,'#365d69'); tunic.addColorStop(1,'#254853');
  ctx.fillStyle = tunic;
  ctx.beginPath(); ctx.moveTo(-8,-52); ctx.quadraticCurveTo(0,-57,9,-51); ctx.lineTo(13,-24);
  ctx.quadraticCurveTo(1,-17,-13,-23); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(216,233,224,.35)';ctx.lineWidth=1.2;
  ctx.beginPath();ctx.moveTo(1,-48);ctx.lineTo(2,-23);ctx.stroke();
  ctx.strokeStyle='#294b56';ctx.lineWidth=6;
  ctx.beginPath();ctx.moveTo(-7,-46);ctx.lineTo(-12,-37);ctx.lineTo(-11-stride*.35,-30);ctx.moveTo(7,-46);ctx.lineTo(12,-37);ctx.lineTo(11+stride*.35,-30);ctx.stroke();
  ctx.fillStyle='#e6b18a';ctx.beginPath();ctx.arc(-11-stride*.35,-29,2.8,0,Math.PI*2);ctx.arc(11+stride*.35,-29,2.8,0,Math.PI*2);ctx.fill();

  // Symmetrical hijab framing a forward gaze; the scarf tail moves gently with the run.
  ctx.fillStyle='#1a2730';
  ctx.beginPath();ctx.moveTo(-10,-56);ctx.quadraticCurveTo(-17,-72,0,-80);ctx.quadraticCurveTo(18,-79,20,-62);ctx.quadraticCurveTo(24,-47,12,-40);ctx.lineTo(9,-47);ctx.quadraticCurveTo(17,-58,11,-68);ctx.quadraticCurveTo(0,-74,-7,-63);ctx.lineTo(-6,-46);ctx.quadraticCurveTo(-16,-49,-10,-56);ctx.fill();
  ctx.fillStyle='#e8bb98';ctx.beginPath();ctx.ellipse(2,-59,9,10,.02,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#172630';ctx.beginPath();ctx.moveTo(-7,-66);ctx.quadraticCurveTo(1,-76,11,-67);ctx.lineTo(10,-62);ctx.quadraticCurveTo(2,-69,-5,-61);ctx.closePath();ctx.fill();
  ctx.fillStyle='#151c20';ctx.beginPath();ctx.ellipse(-2,-59,1.45,1,0,0,Math.PI*2);ctx.ellipse(5,-59,1.45,1,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#172630';ctx.beginPath();ctx.moveTo(-6,-55);ctx.quadraticCurveTo(2,-52,10,-55);ctx.lineTo(10,-47);ctx.quadraticCurveTo(3,-43,-5,-47);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.14)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(-10,-57);ctx.quadraticCurveTo(-13,-70,-2,-76);ctx.stroke();
  ctx.fillStyle='#243d49';ctx.beginPath();ctx.moveTo(-8,-51);ctx.quadraticCurveTo(-20,-57,-25-stride*.25,-51);ctx.lineTo(-15,-43);ctx.quadraticCurveTo(-8,-45,-1,-50);ctx.fill();
  ctx.restore();
}

function projectLaneX(width, lane, depth) {
  const center = width / 2;
  const trackHalf = width * (.045 + depth * .39);
  return center + (lane - 1) * trackHalf * .62;
}

function drawCoin(ctx, x, y, radius, time) {
  const wobble = .64 + Math.abs(Math.sin(time * 5 + y * .03)) * .36;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(wobble, 1);
  ctx.shadowColor = 'rgba(255,197,69,.62)'; ctx.shadowBlur = radius * 1.8;
  ctx.fillStyle = '#d89227'; ctx.beginPath(); ctx.arc(0, 1, radius, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
  const face = ctx.createLinearGradient(-radius, -radius, radius, radius);
  face.addColorStop(0, '#fff0a8'); face.addColorStop(.55, '#f7c950'); face.addColorStop(1, '#db982c');
  ctx.fillStyle = face; ctx.beginPath(); ctx.arc(0, 0, radius * .79, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(160,99,24,.65)'; ctx.lineWidth = Math.max(1, radius * .08); ctx.beginPath(); ctx.arc(0, 0, radius * .58, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#aa6b20'; ctx.font = `700 ${Math.max(8, radius)}px Georgia,serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('M', 0, 1);
  ctx.restore();
}

function drawFactBubble(ctx, game, x, groundY) {
  if (!game.fact) return;
  const maxWidth = Math.min(340, game.width * .52), pad = 15, lineHeight = 19;
  ctx.save();
  ctx.font = `650 ${Math.max(12,Math.min(15,game.width*.016))}px system-ui,sans-serif`;
  const lines = [];
  let line = '';
  game.fact.split(' ').forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth - pad * 2) { lines.push(line); line = word; }
    else line = next;
  });
  if (line) lines.push(line);
  const bubbleWidth = Math.min(maxWidth, Math.max(...lines.map((part) => ctx.measureText(part).width)) + pad * 2);
  const bubbleHeight = lines.length * lineHeight + 20;
  const bx = Math.max(12, Math.min(game.width - bubbleWidth - 12, x - bubbleWidth / 2));
  const by = Math.max(12, groundY - 158);
  ctx.shadowColor = 'rgba(13,18,20,.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 7;
  ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.roundRect(bx, by, bubbleWidth, bubbleHeight, 14); ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.moveTo(x-7,by+bubbleHeight-1); ctx.lineTo(x+7,by+bubbleHeight-1); ctx.lineTo(x,by+bubbleHeight+11); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#27353b'; ctx.textAlign = 'left';
  lines.forEach((part,index) => ctx.fillText(part,bx+pad,by+22+index*lineHeight));
  ctx.restore();
}

function drawScene(ctx, game) {
  const { width: w, height: h } = game;
  if (!w || !h) return;
  const horizon = h * .24;
  const groundY = h - 34;
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, '#36b8ef'); sky.addColorStop(1, '#b5ecf0');
  ctx.fillStyle = sky; ctx.fillRect(0,0,w,h);
  const water = ctx.createLinearGradient(0,horizon,0,h);
  water.addColorStop(0,'#28b9ef'); water.addColorStop(.48,'#159fe4'); water.addColorStop(1,'#087bc7');
  ctx.fillStyle=water;ctx.fillRect(0,horizon,w,h-horizon);
  const sunGlow=ctx.createRadialGradient(w*.78,horizon*.62,3,w*.78,horizon*.62,h*.28);
  sunGlow.addColorStop(0,'rgba(255,248,218,.8)');sunGlow.addColorStop(.18,'rgba(255,240,186,.36)');sunGlow.addColorStop(1,'rgba(255,240,186,0)');
  ctx.fillStyle=sunGlow;ctx.fillRect(w*.5,0,w*.5,horizon+h*.12);
  ctx.fillStyle='rgba(255,250,224,.84)';ctx.beginPath();ctx.arc(w*.78,horizon*.6,Math.max(15,h*.075),0,Math.PI*2);ctx.fill();
  // Small moving sea glints keep the horizon lively without distracting from play.
  ctx.save();
  for(let i=0;i<38;i+=1){
    const row=i%10, col=Math.floor(i/10), y=horizon+18+row*13+col*7;
    const x=((i*83-game.time*28)%(w+50)+w+50)%(w+50)-25;
    ctx.strokeStyle=`rgba(225,249,255,${.12+(i%4)*.035})`;ctx.lineWidth=1+(i%3)*.35;
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+8+(i%5)*3,y);ctx.stroke();
  }
  ctx.restore();

  // Perspective track.
  ctx.beginPath();
  ctx.moveTo(w*.445,horizon); ctx.lineTo(w*.555,horizon); ctx.lineTo(w*.94,h); ctx.lineTo(w*.06,h); ctx.closePath();
  const road = ctx.createLinearGradient(0,horizon,0,h);
  road.addColorStop(0,'#f3c57b'); road.addColorStop(.48,'#e9a657'); road.addColorStop(1,'#c7773e');
  ctx.fillStyle=road; ctx.fill();
  ctx.lineCap='round';ctx.strokeStyle='#a85c35'; ctx.lineWidth=Math.max(5,w*.016);
  ctx.beginPath(); ctx.moveTo(w*.445,horizon); ctx.lineTo(w*.06,h); ctx.moveTo(w*.555,horizon); ctx.lineTo(w*.94,h); ctx.stroke();
  ctx.lineCap='butt';ctx.strokeStyle='rgba(255,238,195,.72)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(w*.445,horizon);ctx.lineTo(w*.06,h);ctx.moveTo(w*.555,horizon);ctx.lineTo(w*.94,h);ctx.stroke();
  for (let lane=1;lane<=2;lane+=1) {
    const topX=w*(.445+lane*.0367), bottomX=w*(.06+lane*.2933);
    ctx.strokeStyle='rgba(145,82,47,.42)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(topX,horizon); ctx.lineTo(bottomX,h); ctx.stroke();
  }
  for(let n=0;n<9;n+=1) {
    const depth=(n/9+game.time*.22)%1;
    const y=horizon+Math.pow(depth,1.7)*(h-horizon);
    const half=w*(.055+depth*.39);
    ctx.strokeStyle=`rgba(126,72,42,${.2+depth*.28})`; ctx.lineWidth=1+depth*2;
    ctx.beginPath();ctx.moveTo(w/2-half*.93,y);ctx.lineTo(w/2+half*.93,y);ctx.stroke();
  }
  // Repeating timber supports make the bridge read as a raised game track.
  for(let n=0;n<7;n+=1){
    const depth=(n/7+game.time*.2)%1;
    const y=horizon+Math.pow(depth,1.7)*(h-horizon);
    const half=w*(.055+depth*.39), postW=3+depth*8, postH=5+depth*14;
    [-1,1].forEach((side)=>{
      const px=w/2+side*half*.93;
      ctx.fillStyle='rgba(56,62,55,.2)';ctx.beginPath();ctx.ellipse(px,y+postH*.68,postW*1.05,postH*.25,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#9f5b36';ctx.beginPath();ctx.roundRect(px-postW/2,y-postH,postW,postH+2,postW/2);ctx.fill();
      ctx.fillStyle='#d08a55';ctx.beginPath();ctx.ellipse(px,y-postH,postW*.68,postW*.31,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(255,220,174,.48)';ctx.lineWidth=Math.max(1,depth*1.2);ctx.beginPath();ctx.moveTo(px-postW*.16,y-postH*.7);ctx.lineTo(px-postW*.16,y-postH*.2);ctx.stroke();
    });
  }

  // Coins flow from the horizon down the three lanes.
  game.coins.forEach((coin) => {
    const depth=coin.depth;
    const x=projectLaneX(w,coin.lane,depth);
    const y=horizon+Math.pow(depth,1.55)*(groundY-horizon);
    const radius=4+depth*16;
    drawCoin(ctx,x,y,radius,game.time);
  });

  const playerX=projectLaneX(w,game.playerLane,.94);
  drawRunner(ctx,playerX,groundY,game.time);
  if(game.fact) drawFactBubble(ctx,game,playerX,groundY);
  if(game.phase==='ready'||game.phase==='complete') {
    ctx.fillStyle='rgba(13,20,24,.3)';ctx.fillRect(0,0,w,h);
    ctx.textAlign='center';ctx.fillStyle='#fff8e9';ctx.font=`750 ${Math.max(18,Math.min(27,w*.03))}px system-ui,sans-serif`;
    ctx.fillText(game.phase==='ready'?'Collect coins · discover my story':'Run complete · you found my story',w/2,h*.43);
    ctx.fillStyle='rgba(255,248,233,.78)';ctx.font=`550 ${Math.max(11,Math.min(15,w*.016))}px system-ui,sans-serif`;
    ctx.fillText(game.phase==='ready'?'Choose a lane and collect a coin to reveal a line':'Tap Play Again to run it back',w/2,h*.43+28);
  }
}

export default function AboutRunnerGame() {
  const canvasRef=useRef(null);
  const gameRef=useRef({width:0,height:0,phase:'ready',time:0,lastFrame:0,playerLane:1,coins:[],spawnIn:.65,collected:0,factIndex:-1,fact:'',speed:.44});
  const frameRef=useRef(0);
  const [hud,setHud]=useState({phase:'ready',collected:0,factIndex:-1,lane:1});

  useEffect(()=>{
    const canvas=canvasRef.current;
    const ctx=canvas?.getContext('2d');
    if(!canvas||!ctx)return undefined;
    const game=gameRef.current;
    const resize=()=>{
      const rect=canvas.getBoundingClientRect();
      const dpr=Math.min(window.devicePixelRatio||1,2);
      game.width=rect.width;game.height=rect.height;
      canvas.width=Math.max(1,Math.round(rect.width*dpr));canvas.height=Math.max(1,Math.round(rect.height*dpr));
      ctx.setTransform(dpr,0,0,dpr,0,0);drawScene(ctx,game);
    };
    const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
    const loop=(now)=>{
      const dt=Math.min(.04,Math.max(0,(now-(game.lastFrame||now))/1000));game.lastFrame=now;game.time+=dt;
      if(game.phase==='running'){
        game.spawnIn-=dt;
        if(game.spawnIn<=0){
          game.coins.push({lane:Math.floor(Math.random()*3),depth:0});
          game.spawnIn=1.05+Math.random()*.42;
        }
        game.coins.forEach((coin)=>{coin.depth+=game.speed*dt;});
        const collectedCoin=game.coins.find((coin)=>coin.depth>=.91&&coin.lane===game.playerLane);
        if(collectedCoin){
          game.coins=game.coins.filter((coin)=>coin!==collectedCoin);
          game.factIndex=game.collected%ABOUT_FACTS.length;game.fact=ABOUT_FACTS[game.factIndex];game.collected+=1;
          game.speed=Math.min(.58,game.speed+.004);
          if(game.collected>=ABOUT_FACTS.length)game.phase='complete';
          setHud({phase:game.phase,collected:game.collected,factIndex:game.factIndex,lane:game.playerLane});
        }
        game.coins=game.coins.filter((coin)=>coin.depth<1.08);
      }
      drawScene(ctx,game);frameRef.current=requestAnimationFrame(loop);
    };
    frameRef.current=requestAnimationFrame(loop);
    return()=>{observer.disconnect();cancelAnimationFrame(frameRef.current);};
  },[]);

  const startRun=()=>{
    const game=gameRef.current;
    if(game.phase==='complete'){
      game.collected=0;game.factIndex=-1;game.fact='';game.playerLane=1;game.coins=[];game.spawnIn=.65;game.speed=.44;
    }
    game.phase='running';
    setHud({phase:game.phase,collected:game.collected,factIndex:game.factIndex,lane:game.playerLane});
    canvasRef.current?.focus({preventScroll:true});
  };
  const shiftLane=(direction)=>{
    const game=gameRef.current;
    if(game.phase==='ready'){startRun();return;}
    if(game.phase!=='running')return;
    game.playerLane=Math.max(0,Math.min(2,game.playerLane+direction));
    setHud((current)=>({...current,lane:game.playerLane}));
  };
  const handleKeyDown=(event)=>{
    if(event.code==='ArrowLeft'||event.code==='KeyA'){event.preventDefault();shiftLane(-1);}
    else if(event.code==='ArrowRight'||event.code==='KeyD'){event.preventDefault();shiftLane(1);}
    else if(event.code==='Space'||event.code==='Enter'){event.preventDefault();if(gameRef.current.phase!=='running')startRun();}
  };
  const handlePointerDown=(event)=>{
    event.preventDefault();
    const rect=canvasRef.current?.getBoundingClientRect();
    if(!rect)return;
    if(gameRef.current.phase!=='running'){startRun();return;}
    shiftLane(event.clientX<rect.left+rect.width/2?-1:1);
  };
  const handleGamePointerMove=(event)=>{
    const robot=document.getElementById('portfolioHoverRobot');
    if(!robot)return;
    const width=robot.offsetWidth||72, height=robot.offsetHeight||72, gap=16;
    const left=event.clientX+gap+width>window.innerWidth?event.clientX-width-gap:event.clientX+gap;
    const top=event.clientY+gap+height>window.innerHeight?event.clientY-height-gap:event.clientY+gap;
    robot.style.left=`${Math.max(8,left)}px`;
    robot.style.top=`${Math.max(8,top)}px`;
    robot.classList.add('is-visible');
  };
  const handleGamePointerLeave=()=>document.getElementById('portfolioHoverRobot')?.classList.remove('is-visible');
  const buttonLabel=hud.phase==='ready'?'Start Coin Run':hud.phase==='complete'?'Play Again':'Run in progress';
  return <section className="about-runner-section about-coinrun-section" aria-labelledby="aboutRunnerTitle">
    <div className="about-runner-heading">
      <div><p>ABOUT ME · COIN RUN</p><h2 id="aboutRunnerTitle">Collect my <em>story.</em></h2></div>
      <p className="about-runner-description">Move between three lanes, collect the gold coins, and uncover a new line about my work with every coin.</p>
    </div>
    <div className="about-runner-panel about-coinrun-panel" onPointerMove={handleGamePointerMove} onPointerLeave={handleGamePointerLeave}>
      <div className="about-runner-hud"><span><i className={hud.phase==='running'?'is-live':''}/>{hud.phase==='ready'?'READY TO RUN':hud.phase==='complete'?'RUN COMPLETE':'COIN RUN'}</span><span>COINS <b>{hud.collected}/{ABOUT_FACTS.length}</b><span className="about-runner-best">LANE <b>{hud.lane+1}/3</b></span></span></div>
      <canvas ref={canvasRef} className="about-runner-canvas about-coinrun-canvas" tabIndex="0" aria-label="Coin Run. Use left and right arrows or tap either side to change lanes and collect coins. Every coin reveals a fact about Muntaha." onPointerDown={handlePointerDown} onKeyDown={handleKeyDown}/>
      <div className="about-runner-controls"><span>← → OR A / D TO CHANGE LANES · TAP LEFT / RIGHT</span><button type="button" onClick={startRun}>{buttonLabel}<span aria-hidden="true">↗</span></button></div>
    </div>
  </section>;
}
