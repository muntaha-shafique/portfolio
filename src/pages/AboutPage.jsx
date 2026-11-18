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
          <img src="assets/images/about-hijabi-headphones.png" alt="Muntaha Shafique, full-stack developer and Agentic AI engineer" width="1111" height="1416" />
          <figcaption><span>MUNTAHA SHAFIQUE</span></figcaption>
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
        <div><p className="about-section-kicker">MY CREATIVE &amp; TECHNICAL JOURNEY</p><h2 id="aboutJourneyTitle">A thoughtful route from <em>idea to impact.</em></h2></div>
        <p>Every project starts with understanding what matters. I bring design thinking, full-stack engineering, and useful AI together around that goal.</p>
      </div>
      <div className="about-journey-steps">
        <article><span className="about-journey-index">01 <i /></span><p>DISCOVER</p><h3>Understand the goal</h3><div>We get clear on the people, problem, and outcome before deciding what to build.</div></article>
        <article><span className="about-journey-index">02 <i /></span><p>DESIGN &amp; BUILD</p><h3>Make it useful</h3><div>Bring full-stack development and agentic AI together in a considered, reliable product.</div></article>
        <article><span className="about-journey-index">03 <i /></span><p>REFINE &amp; GROW</p><h3>Ready for what’s next</h3><div>Polish the details, launch with care, and leave room for the product to grow.</div></article>
      </div>
    </section>

    <section className="about-values-section" aria-labelledby="aboutValuesTitle">
      <figure className="about-values-visual">
        <img src="assets/images/about-hijabi-headphones.png" alt="Muntaha Shafique, Agentic AI engineer and full-stack developer" loading="lazy" />
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

    <section className="standalone-about-end" aria-labelledby="standaloneAboutEndTitle">
      <p>HAVE AN IDEA IN MIND?</p>
      <h2 id="standaloneAboutEndTitle">Let’s make it <em>real.</em></h2>
      <a href="#/contact">Get in touch <Icon name="arrowUpRight" size={18} /></a>
    </section>
    <AboutRunnerGame />
  </main>;
}
