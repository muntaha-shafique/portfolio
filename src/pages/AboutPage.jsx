import React, { useState } from 'react';
import Icon from '../components/Icon.jsx';
import AboutRunnerGame from '../components/AboutRunnerGame.jsx';

export default function AboutPage() {
  const [activeCell, setActiveCell] = useState(null);
  const highlightGridCell = (event) => {
    if (event.pointerType !== 'mouse') return;
    const pageRect = event.currentTarget.getBoundingClientRect();
    const cellSize = 48;
    const x = Math.floor((event.clientX - pageRect.left) / cellSize) * cellSize;
    const y = Math.floor((event.clientY - pageRect.top) / cellSize) * cellSize;
    const colors = ['#345fbe', '#171715', '#a8493f', '#8a6343'];
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
          <a href="#/about" className="hero-nav-item is-active" aria-current="page">ABOUT</a>
          <a href="#/services" className="hero-nav-item">SERVICES</a>
          <a href="#/projects" className="hero-nav-item">PROJECTS</a>
          <a href="#/contact" className="hero-nav-item">CONTACT</a>
        </nav>
      </div>
      <div className="standalone-about-hero-inner">
        <div className="standalone-about-copy">
          <h1 id="standaloneAboutTitle">I’m Muntaha.<br /><em>I build what’s next.</em></h1>
          <p className="standalone-about-intro">I’m an Agentic AI engineer and full-stack developer working with clients in Pakistan and internationally to turn complex ideas into clear, useful digital experiences.</p>
          <div className="about-hero-facts" aria-label="About my work">
            <div><strong>Pakistan</strong><span>Based here, working worldwide</span></div>
            <div><strong>AI + Web</strong><span>From intelligent systems to full-stack products</span></div>
            <div><strong>End to end</strong><span>From first idea through launch</span></div>
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

    <section className="about-why-section" aria-labelledby="aboutWhyTitle">
      <div className="about-why-copy">
        <p className="about-section-kicker">ABOUT MUNTAHA · PAKISTAN &amp; WORLDWIDE</p>
        <h2 id="aboutWhyTitle">Why teams choose <em>to work with me.</em></h2>
        <p>I bring AI engineering and full-stack development together to turn an idea into a useful, polished digital product. I work directly with clients in Pakistan and internationally, keeping the process clear from first conversation to delivery.</p>
      </div>
      <div className="about-why-highlights">
        <article><span>01</span><strong>AI + FULL STACK</strong><p>One connected approach, from intelligent workflows to the product interface.</p></article>
        <article><span>02</span><strong>IDEA TO DELIVERY</strong><p>Thoughtful planning, careful engineering, and a dependable launch.</p></article>
        <article><span>03</span><strong>WORKING WORLDWIDE</strong><p>Pakistan based, collaborating with clients across borders and time zones.</p></article>
      </div>
    </section>

    <section className="about-journey-section" aria-labelledby="aboutJourneyTitle">
      <div className="about-journey-heading">
        <div><p className="about-section-kicker">ROADMAP</p><h2 id="aboutJourneyTitle">Our Creative <em>Journey</em></h2></div>
        <p>From creative ideas to thoughtful digital products, my work spans graphic design, web development, and intelligent solutions that help businesses grow online.</p>
      </div>
      <div className="about-journey-steps">
        <article><span className="about-journey-index">JAN 2022 <i /></span><p>STARTED CREATIVE JOURNEY</p><h3>Graphic Design &amp; Branding</h3><div>Creative visuals, brand identity, and social content made to help businesses show up with confidence.</div></article>
        <article><span className="about-journey-index">MAY 2023 <i /></span><p>EXPANDED INTO WEB DESIGN</p><h3>WordPress &amp; Shopify</h3><div>Modern websites and online stores shaped around clear layouts and easy customer journeys.</div></article>
        <article><span className="about-journey-index">FEB 2024 <i /></span><p>ADVANCED CREATIVE SOLUTIONS</p><h3>AI &amp; Digital Experiences</h3><div>Bringing agentic AI, automation, and full-stack development together for useful digital products.</div></article>
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
