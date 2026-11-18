import React from 'react';
import Icon from '../components/Icon.jsx';

export default function AboutPage() {
  return <main className="standalone-about-page">
    <section className="standalone-about-hero" aria-labelledby="standaloneAboutTitle">
      <div className="standalone-about-grid" aria-hidden="true" />
      <div className="standalone-about-hero-inner">
        <div className="standalone-about-copy">
          <p className="standalone-about-kicker"><span>ABOUT ME</span><span>01 / MUNTAHA SHAFIQUE</span></p>
          <h1 id="standaloneAboutTitle">I’m Muntaha.<br /><em>I build what’s next.</em></h1>
          <p className="standalone-about-intro">I’m an Agentic AI engineer and full-stack developer focused on turning complex ideas into clear, useful digital experiences.</p>
          <a className="standalone-about-cta" href="#/contact">Let’s talk about your project <Icon name="arrowUpRight" size={18} /></a>
        </div>
        <figure className="standalone-about-portrait">
          <span className="standalone-about-orbit" aria-hidden="true" />
          <img src="assets/images/about-hijabi-headphones.png" alt="Muntaha Shafique, full-stack developer and Agentic AI engineer" width="1111" height="1416" />
          <figcaption><span>MUNTAHA SHAFIQUE</span><span>BUILDING WITH PURPOSE · PK</span></figcaption>
        </figure>
      </div>
      <div className="standalone-about-scroll" aria-hidden="true"><span />SCROLL TO EXPLORE</div>
    </section>

    <section className="standalone-about-story" aria-labelledby="standaloneAboutStoryTitle">
      <div className="standalone-about-story-label"><span>THE PERSON BEHIND THE WORK</span><span>01 — 03</span></div>
      <div className="standalone-about-story-grid">
        <h2 id="standaloneAboutStoryTitle">Good technology should feel <em>thoughtful.</em></h2>
        <div className="standalone-about-story-copy">
          <p>I work across AI agents, intelligent workflows, and full-stack web platforms. I like taking ideas that feel complicated and shaping them into products people can understand and use.</p>
          <p>My process brings together careful engineering, clear communication, and attention to the small details that make a digital experience feel right.</p>
        </div>
      </div>
      <div className="standalone-about-focus" aria-label="Areas of focus">
        <article><span>01</span><h3>Agentic AI</h3><p>Useful agents and automations that make work simpler.</p></article>
        <article><span>02</span><h3>Full-stack development</h3><p>Reliable web products, from the first screen to the backend.</p></article>
        <article><span>03</span><h3>Digital experiences</h3><p>Clear, considered interfaces built around real people.</p></article>
      </div>
    </section>

    <section className="standalone-about-end" aria-labelledby="standaloneAboutEndTitle">
      <p>HAVE AN IDEA IN MIND?</p>
      <h2 id="standaloneAboutEndTitle">Let’s make it <em>real.</em></h2>
      <a href="#/contact">Get in touch <Icon name="arrowUpRight" size={18} /></a>
    </section>
  </main>;
}
