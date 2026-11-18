import React, { useState } from 'react';

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

const STAR_PATH = [
  [72, 222], [128, 128], [194, 258], [254, 170], [314, 88],
  [376, 250], [438, 166], [500, 268], [562, 185], [624, 96],
  [686, 250], [748, 158], [810, 262], [872, 194], [930, 108],
];
const STAR_D = STAR_PATH.map(([x, y], index) => `${index ? 'L' : 'M'} ${x} ${y}`).join(' ');
const SKY_STARS = [[45,60],[110,345],[177,55],[238,350],[348,330],[403,54],[472,88],[533,63],[590,346],[656,344],[708,53],[785,68],[842,350],[912,58],[965,330]];

export default function AboutRunnerGame() {
  const [found, setFound] = useState(0);
  const complete = found >= ABOUT_FACTS.length;
  const activeFact = found ? ABOUT_FACTS[found - 1] : '';

  const handlePointerMove = (event) => {
    const robot = document.getElementById('portfolioHoverRobot');
    if (!robot) return;
    const width = robot.offsetWidth || 72;
    const height = robot.offsetHeight || 72;
    const gap = 16;
    const left = event.clientX + gap + width > window.innerWidth ? event.clientX - width - gap : event.clientX + gap;
    const top = event.clientY + gap + height > window.innerHeight ? event.clientY - height - gap : event.clientY + gap;
    robot.style.left = `${Math.max(8, left)}px`;
    robot.style.top = `${Math.max(8, top)}px`;
    robot.classList.add('is-visible');
  };
  const handlePointerLeave = () => document.getElementById('portfolioHoverRobot')?.classList.remove('is-visible');

  const activateNextStar = () => {
    if (!complete) setFound((current) => Math.min(ABOUT_FACTS.length, current + 1));
  };
  const reset = () => setFound(0);

  return (
    <section className="about-runner-section about-story-game" aria-labelledby="aboutRunnerTitle">
      <div className="about-runner-heading about-story-game-heading">
        <div><p>ABOUT ME · ONE STAR AT A TIME</p><h2 id="aboutRunnerTitle">Trace my <em>story.</em></h2></div>
        <p className="about-runner-description">Follow the glowing trail. Every star opens a new line about my work and the way I build.</p>
      </div>
      <div className="about-runner-panel about-story-game-panel" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        <div className="about-runner-hud">
          <span><i className={found ? 'is-live' : ''} />{complete ? 'STORY TRAIL COMPLETE' : found ? 'TRAIL IN PROGRESS' : 'READY TO EXPLORE'}</span>
          <span>STARS <b>{String(found).padStart(2, '0')}/{ABOUT_FACTS.length}</b></span>
        </div>
        <div className="about-story-map" aria-label="Interactive star trail">
          <svg className="about-story-sky" viewBox="0 0 1000 450" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <radialGradient id="storyGlow"><stop offset="0" stopColor="#f4d993" stopOpacity=".22"/><stop offset="1" stopColor="#f4d993" stopOpacity="0"/></radialGradient>
              <linearGradient id="storyLine" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f1d48b"/><stop offset=".5" stopColor="#91c8c0"/><stop offset="1" stopColor="#c9a6df"/></linearGradient>
            </defs>
            <rect width="1000" height="450" fill="url(#storyGlow)" />
            <path className="about-story-trail-base" d={STAR_D} />
            <path className="about-story-trail-lit" d={STAR_D} pathLength="100" style={{ strokeDasharray: `${(found / ABOUT_FACTS.length) * 100} 100` }} />
            {SKY_STARS.map(([x, y], index) => <circle key={index} className={`about-story-sky-dot dot-${index % 3}`} cx={x} cy={y} r={index % 4 === 0 ? 2.8 : 1.8} />)}
          </svg>
          {STAR_PATH.map(([x, y], index) => {
            const isFound = index < found;
            const isNext = index === found && !complete;
            return (
              <button
                className={`about-story-star${isFound ? ' is-found' : ''}${isNext ? ' is-next' : ''}`}
                key={index}
                type="button"
                style={{ left: `${x / 10}%`, top: `${y / 4.5}%` }}
                disabled={!isNext}
                onClick={activateNextStar}
                aria-label={isFound ? `Star ${index + 1}, discovered` : isNext ? `Discover star ${index + 1}` : `Star ${index + 1}, waiting`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.5 2.7 6.1 6.6.6-5 4.4 1.5 6.4-5.8-3.4-5.8 3.4 1.5-6.4-5-4.4 6.6-.6L12 2.5Z" /></svg>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            );
          })}
          <div className={`about-story-fact${activeFact ? ' has-fact' : ''}`} aria-live="polite" aria-atomic="true">
            <span>{activeFact ? `SIGNAL ${String(found).padStart(2, '0')}` : 'YOUR STORY TRAIL'}</span>
            <p>{complete ? 'Every star is lit. Thanks for exploring my story.' : activeFact || 'Tap the glowing star to uncover the first line.'}</p>
            <small>{complete ? 'ALL STARS DISCOVERED' : `${ABOUT_FACTS.length - found} ${ABOUT_FACTS.length - found === 1 ? 'star' : 'stars'} left to find`}</small>
          </div>
        </div>
        <div className="about-runner-controls about-story-game-controls">
          <span>{complete ? 'YOU FOUND THE WHOLE TRAIL' : 'TAP THE GLOWING STAR TO CONTINUE'}</span>
          {complete && <button type="button" onClick={reset}>Explore again <span aria-hidden="true">↻</span></button>}
        </div>
      </div>
    </section>
  );
}
