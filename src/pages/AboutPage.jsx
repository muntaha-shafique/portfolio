import React, { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import AboutRunnerGame from '../components/AboutRunnerGame.jsx';

const JOURNEY_MILESTONES = [
  { year: 'JAN 2022', label: 'Started Creative Journey', phase: 'JAN 2022 · STARTED CREATIVE JOURNEY', title: 'Graphic Design & Branding', description: 'Creative visuals, brand identity, and social content made to help businesses show up with confidence.' },
  { year: 'MAY 2023', label: 'Expanded Into Web Design', phase: 'MAY 2023 · EXPANDED INTO WEB DESIGN', title: 'WordPress & Shopify', description: 'Modern websites and online stores shaped around clear layouts and easy customer journeys.' },
  { year: 'FEB 2024', label: 'Advanced Creative Solutions', phase: 'FEB 2024 · ADVANCED CREATIVE SOLUTIONS', title: 'AI & Digital Experiences', description: 'Bringing agentic AI, automation, and full-stack development together for useful digital products.' },
  { year: '2025', label: 'Intelligent Workflows', phase: '2025 · INTELLIGENT WORKFLOWS', title: 'Agentic AI & Automation', description: 'Building practical agents and automated workflows that help simplify everyday work.' },
  { year: '2026', label: 'Working Worldwide', phase: '2026 · WORKING WORLDWIDE', title: 'Global Digital Partnerships', description: 'Combining AI and full-stack development to help local and international clients build what’s next.' },
];

function AnimatedMetric({ value, suffix, label }) {
  const [count, setCount] = useState(0);
  const metricRef = useRef(null);
  useEffect(() => {
    const node = metricRef.current;
    if (!node) return undefined;
    let frame = 0;
    let observer;
    let started = false;
    const startCount = () => {
      if (started) return;
      started = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCount(value);
        return;
      }
      const startAt = performance.now();
      const duration = 1500;
      const update = (now) => {
        const progress = Math.min(1, (now - startAt) / duration);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = window.requestAnimationFrame(update);
      };
      frame = window.requestAnimationFrame(update);
    };
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          startCount();
          observer.disconnect();
        }
      }, { threshold: 0.35 });
      observer.observe(node);
    } else startCount();
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);
  return <div ref={metricRef}><strong>{count}{suffix}</strong><span>{label}</span></div>;
}

export default function AboutPage() {
  const [activeCell, setActiveCell] = useState(null);
  const [activeJourney, setActiveJourney] = useState(0);
  const goToJourney = (nextIndex) => {
    const next = (nextIndex + JOURNEY_MILESTONES.length) % JOURNEY_MILESTONES.length;
    setActiveJourney(next);
    window.requestAnimationFrame(() => document.getElementById(`aboutJourneyCard${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }));
  };
  const highlightGridCell = (event) => {
    if (event.pointerType !== 'mouse') return;
    const pageRect = event.currentTarget.getBoundingClientRect();
    const cellSize = 48;
    const x = Math.floor((event.clientX - pageRect.left) / cellSize) * cellSize;
    const y = Math.floor((event.clientY - pageRect.top) / cellSize) * cellSize;
    const colors = ['#101112', '#191a1b', '#22211f', '#2a2420'];
    const column = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const color = colors[(column + row) % colors.length];
    setActiveCell((current) => current?.x === x && current?.y === y ? current : { x, y, color });
  };
  return <main className="standalone-about-page">
    <section className="standalone-about-hero" aria-labelledby="standaloneAboutTitle" onPointerMove={highlightGridCell} onPointerLeave={() => setActiveCell(null)}>
      {activeCell && <span className="standalone-about-grid-active" style={{ left: `${activeCell.x}px`, top: `${activeCell.y}px`, '--active-tile': activeCell.color }} aria-hidden="true" />}
      <div className="hero-top-bar about-reference-top-bar">
        <a href="#/home" className="contact-reference-logo" aria-label="Muntaha Shafique home"><img src="assets/images/ms-monogram-logo.png" alt="" /></a>
        <nav className="contact-reference-nav" aria-label="Main navigation">
          <a href="#/about" className="hero-nav-item is-active" aria-current="page">ABOUT ME</a>
          <a href="#/services" className="hero-nav-item">SERVICES</a>
          <a href="#/projects" className="hero-nav-item">PROJECTS</a>
          <a href="#/contact" className="hero-nav-item">CONTACT</a>
        </nav>
      </div>
      <div className="standalone-about-hero-inner">
        <div className="standalone-about-copy">
          <h1 id="standaloneAboutTitle">I’m Muntaha.<br /><em>I build what’s next.</em></h1>
          <p className="standalone-about-intro">I’m an Agentic AI engineer and full-stack developer working with clients in Pakistan and internationally to turn complex ideas into clear, useful digital experiences.</p>
          <div className="about-hero-facts" aria-label="Experience and results">
            <AnimatedMetric value={100} suffix="%" label="Client Satisfaction" />
            <AnimatedMetric value={500} suffix="+" label="Projects Completed" />
            <AnimatedMetric value={3} suffix="+" label="Years Freelance Experience" />
          </div>
          <a className="standalone-about-cta" href="#/contact">Let’s talk about your project <Icon name="arrowUpRight" size={18} /></a>
        </div>
        <figure className="standalone-about-portrait">
          <img src="assets/images/contact-workspace-portrait.png" alt="Muntaha working at her laptop" width="1280" height="1280" />
          <figcaption><span>MUNTAHA SHAFIQUE</span><span>FULL-STACK · AGENTIC AI</span></figcaption>
        </figure>
      </div>
      <div className="standalone-about-scroll" aria-hidden="true"><span />SCROLL TO EXPLORE</div>
    </section>

    <section className="about-journey-section" aria-labelledby="aboutJourneyTitle">
      <div className="about-journey-heading">
        <div><p className="about-section-kicker">ROADMAP</p><h2 id="aboutJourneyTitle">Our Creative <em>Journey</em></h2></div>
        <p>From creative ideas to thoughtful digital products, my work spans graphic design, web development, and intelligent solutions that help businesses grow online.</p>
      </div>
      <div className="about-journey-navigation" aria-label="Journey timeline">
        <button type="button" aria-label="Previous journey milestone" onClick={() => goToJourney(activeJourney - 1)}>‹</button>
        <div className="about-journey-progress" style={{ '--journey-progress': `${activeJourney * 25}%` }}>
          {JOURNEY_MILESTONES.map(({ year, label }, index) => <button type="button" key={year} className={activeJourney === index ? 'is-active' : ''} aria-current={activeJourney === index ? 'step' : undefined} onClick={() => goToJourney(index)}><strong>{year}</strong><span>{label}</span></button>)}
        </div>
        <button type="button" aria-label="Next journey milestone" onClick={() => goToJourney(activeJourney + 1)}>›</button>
      </div>
      <div className="about-journey-viewport">
      <div className="about-journey-steps">
        {JOURNEY_MILESTONES.map(({ phase, title, description }, index) => <article id={`aboutJourneyCard${index}`} key={phase} className={activeJourney === index ? 'is-active' : ''}>
          <div className="about-journey-image-placeholder"><span>YOUR IMAGE</span></div>
          <span className="about-journey-index">{String(index + 1).padStart(2, '0')} <i /></span><p>{phase}</p><h3>{title}</h3><div>{description}</div>
        </article>)}
      </div>
      </div>
    </section>

    <section className="about-why-section" aria-labelledby="aboutWhyTitle">
      <div className="about-why-copy">
        <p className="about-section-kicker">ABOUT MUNTAHA · PAKISTAN &amp; WORLDWIDE</p>
        <h2 id="aboutWhyTitle">Why teams choose <em>to work with me.</em></h2>
        <p>I bring AI engineering and full-stack development together to turn an idea into a useful, polished digital product. I work directly with clients in Pakistan and internationally, keeping the process clear from first conversation to delivery.</p>
        <div className="about-why-tags" aria-label="Areas of work"><span>Agentic AI</span><span>Full-stack development</span><span>International clients</span></div>
      </div>
      <div className="about-why-highlights">
        <article><span className="about-why-number">01</span><div><strong>AI + FULL STACK</strong><p>One connected approach, from intelligent workflows to the product interface.</p></div><span className="about-why-arrow" aria-hidden="true">↗</span></article>
        <article><span className="about-why-number">02</span><div><strong>IDEA TO DELIVERY</strong><p>Thoughtful planning, careful engineering, and a dependable launch.</p></div><span className="about-why-arrow" aria-hidden="true">↗</span></article>
        <article><span className="about-why-number">03</span><div><strong>WORKING WORLDWIDE</strong><p>Pakistan based, collaborating with clients across borders and time zones.</p></div><span className="about-why-arrow" aria-hidden="true">↗</span></article>
      </div>
    </section>

    <section className="about-values-section" aria-labelledby="aboutValuesTitle">
      <figure className="about-values-visual">
        <img src="assets/images/about-girl-v2.png" alt="Muntaha Shafique, Agentic AI engineer and full-stack developer" loading="lazy" />
        <figcaption><span>BUILT WITH CARE</span><span>PAKISTAN · WORLDWIDE</span></figcaption>
      </figure>
      <div className="about-values-content">
      <div className="about-values-heading">
        <p className="about-section-kicker">GOALS &amp; VALUES</p>
        <h2 id="aboutValuesTitle">Good work starts with <em>understanding.</em></h2>
        <p>Technology matters most when it fits the people using it. These principles guide how I approach every project.</p>
      </div>
      <div className="about-values-list">
        <article><span>✓</span><div><h3>Start with the real problem</h3><p>Understand the goal before choosing tools or shaping a solution.</p></div></article>
        <article><span>✓</span><div><h3>Keep the experience clear</h3><p>Make every screen, workflow, and interaction easier to follow.</p></div></article>
        <article><span>✓</span><div><h3>Build for the long run</h3><p>Create dependable systems that can grow with the people and teams they serve.</p></div></article>
        <article><span>✓</span><div><h3>Collaborate across borders</h3><p>Work directly with local and international clients with clear communication at every step.</p></div></article>
      </div>
      </div>
    </section>

    <AboutRunnerGame />
  </main>;
}
