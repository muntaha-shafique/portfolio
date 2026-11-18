import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage.jsx';
import Footer from './components/Footer.jsx';
import Icon from './components/Icon.jsx';

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const links = [['About Me', '#/about'], ['Services', '#/services'], ['Projects', '#/projects'], ['Contact', '#/contact']];
  return <div className="nav-wrap" id="navWrap"><nav className={`navbar${open ? ' is-open' : ''}`} id="navbar" aria-label="Main navigation">
    <div className="nav-bar-row"><a href="#home" className="nav-logo" aria-label="Muntaha Shafique home"><img src="assets/images/ms-monogram-logo.png" alt="" /></a>
      <div className="nav-brand-copy"><strong>Muntaha Shafique</strong><small>PERSONAL PORTFOLIO</small></div>
      <button className="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="navDropdown" onClick={() => setOpen(!open)}>
        <svg className="icon-dots" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14" /></svg>
        <svg className="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
    <div className="nav-desktop-links" aria-label="Main navigation links"><span className="nav-scroll-role" aria-hidden="true"><img src="assets/images/ms-monogram-logo.png" alt="" /></span>{links.map(([label, href]) => <a key={label} href={href} className="nav-link" aria-label={label}>{label}</a>)}</div>
    <div className="nav-dropdown" id="navDropdown" hidden={!open}>{links.map(([label, href]) => <a key={label} href={href} className="nav-link" onClick={() => setOpen(false)}>{label}</a>)}</div>
  </nav></div>;
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', portfolio_middle_name: '' });
  const [status, setStatus] = useState({ busy: false, error: '', notice: '', success: false });
  const [cardPosition, setCardPosition] = useState(null);
  const [cardDragging, setCardDragging] = useState(false);
  const [cardReturning, setCardReturning] = useState(false);
  const [cardRotation, setCardRotation] = useState(-3);
  const [headerBounds, setHeaderBounds] = useState({ width: 0, height: 0 });
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  const [ribbonEnd, setRibbonEnd] = useState({ x: 0, y: 0 });
  const cardStageRef = useRef(null);
  const cardRef = useRef(null);
  const cardDragRef = useRef(null);
  const homePositionRef = useRef(null);
  const cardPositionRef = useRef(null);
  const returnFrameRef = useRef(0);
  useEffect(() => {
    const header = cardStageRef.current;
    const card = cardRef.current;
    if (!header || !card) return;
    const measure = () => {
      const headerRect = header.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      setHeaderBounds({ width: headerRect.width, height: headerRect.height });
      setCardSize({ width: cardRect.width, height: cardRect.height });
      if (!cardDragRef.current) {
        const position = cardPositionRef.current || { x: card.offsetLeft, y: card.offsetTop };
        if (!homePositionRef.current) homePositionRef.current = { x: card.offsetLeft, y: card.offsetTop };
        setRibbonEnd({ x: position.x + cardRect.width / 2, y: position.y });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    observer.observe(card);
    window.addEventListener('resize', measure);
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); cancelAnimationFrame(returnFrameRef.current); };
  }, []);
  const placeCard = (x, y) => {
    const maxX = Math.max(0, headerBounds.width - cardSize.width);
    const maxY = Math.max(0, headerBounds.height - cardSize.height);
    const next = { x: Math.max(0, Math.min(maxX, x)), y: Math.max(0, Math.min(maxY, y)) };
    cardPositionRef.current = next;
    setCardPosition(next);
    setRibbonEnd({ x: next.x + cardSize.width / 2, y: next.y });
  };
  const returnCardHome = (from, velocity = { x: 0, y: 0 }) => {
    const home = homePositionRef.current;
    if (!home) return;
    cancelAnimationFrame(returnFrameRef.current);
    setCardReturning(true);
    const dx = from.x - home.x;
    const dy = from.y - home.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 2 && Math.hypot(velocity.x, velocity.y) < 20) {
      placeCard(home.x, home.y);
      setCardRotation(-3);
      setCardReturning(false);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      placeCard(home.x, home.y);
      setCardRotation(-3);
      setCardReturning(false);
      return;
    }
    const direction = Math.sign(dx || -dy || 1);
    const spin = Math.min(1080, Math.max(0, distance * .92)) * direction;
    const startedAt = performance.now();
    const damping = 5.4;
    const frequency = 12.5;
    const frame = (now) => {
      const t = Math.min((now - startedAt) / 1000, 1.35);
      const decay = Math.exp(-damping * t);
      const c = Math.cos(frequency * t);
      const s = Math.sin(frequency * t);
      const bx = (velocity.x + damping * dx) / frequency;
      const by = (velocity.y + damping * dy) / frequency;
      const x = home.x + decay * (dx * c + bx * s);
      const y = home.y + decay * (dy * c + by * s);
      placeCard(x, y);
      setCardRotation(spin * decay * Math.sin(frequency * t));
      if (t < 1.35) returnFrameRef.current = requestAnimationFrame(frame);
      else {
        placeCard(home.x, home.y);
        setCardRotation(-3);
        setCardReturning(false);
        returnFrameRef.current = 0;
      }
    };
    returnFrameRef.current = requestAnimationFrame(frame);
  };
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  useEffect(() => {
    const section = document.querySelector('.contact-page-benefits');
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const shapes = [...section.querySelectorAll('.contact-orbit-shape')];
    const moveShapes = (event) => {
      const sectionRect = section.getBoundingClientRect();
      if (!sectionRect.width || !sectionRect.height) return;
      shapes.forEach((shape) => {
        const shapeRect = shape.getBoundingClientRect();
        const dx = (event.clientX - (shapeRect.left + shapeRect.width / 2)) / sectionRect.width;
        const dy = (event.clientY - (shapeRect.top + shapeRect.height / 2)) / sectionRect.height;
        shape.style.setProperty('--parallax-x', Math.max(-24, Math.min(24, dx * 42)) + 'px');
        shape.style.setProperty('--parallax-y', Math.max(-18, Math.min(18, dy * 32)) + 'px');
      });
    };
    const resetShapes = () => shapes.forEach((shape) => {
      shape.style.setProperty('--parallax-x', '0px');
      shape.style.setProperty('--parallax-y', '0px');
    });
    section.addEventListener('pointermove', moveShapes, { passive: true });
    section.addEventListener('pointerleave', resetShapes, { passive: true });
    return () => {
      section.removeEventListener('pointermove', moveShapes);
      section.removeEventListener('pointerleave', resetShapes);
    };
  }, []);
  async function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === 'your_web3forms_access_key') {
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:muntahashafique6@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ busy: false, error: '', notice: 'Email app opened. Add your Web3Forms access key to send directly from this form.', success: false });
      return;
    }

    setStatus({ busy: true, error: '', notice: '', success: false });
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: 'Client Alert',
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          botcheck: form.portfolio_middle_name,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Your message could not be sent. Please try again.');
      setForm({ name: '', email: '', subject: '', message: '', portfolio_middle_name: '' });
      setStatus({ busy: false, error: '', notice: '', success: true });
    } catch (error) {
      setStatus({ busy: false, error: error.message || 'Could not connect. Please try again.', notice: '', success: false });
    }
  }
  const closeSuccess = () => setStatus((current) => ({ ...current, success: false }));
  const ribbonAnchorX = headerBounds.width * 0.82;
  const ribbonPath = `M ${ribbonAnchorX} 0 C ${ribbonAnchorX} ${Math.max(36, ribbonEnd.y * .38)} ${ribbonEnd.x} ${Math.max(56, ribbonEnd.y * .76)} ${ribbonEnd.x} ${ribbonEnd.y}`;
  return <>
    <div className="hero-top-bar contact-top-bar">
      <a href="#/home" className="contact-reference-logo" aria-label="Muntaha Shafique home"><img src="assets/images/ms-monogram-logo.png" alt="" /></a>
      <nav className="contact-reference-nav" aria-label="Main navigation">
        <a href="#/about" className="hero-nav-item">ABOUT</a>
        <a href="#/services" className="hero-nav-item">SERVICES</a>
        <a href="#/projects" className="hero-nav-item">PROJECTS</a>
        <a href="#/contact" className="hero-nav-item is-active" aria-current="page">CONTACT</a>
      </nav>
    </div>
    <main className="contact-page">
      <section className="contact-page-hero contact-signal-hero" aria-labelledby="contactPageTitle" ref={cardStageRef}>
        <canvas className="hero-cursor-trail" aria-hidden="true" /><div className="hero-cursor-glow" aria-hidden="true" />
        <div className="contact-page-hero-inner contact-signal-inner">
          <div className="contact-signal-copy"><h1 id="contactPageTitle">Let’s Connect</h1><p className="contact-signal-description">Building something meaningful? Share your idea, and let’s turn it into a thoughtful digital experience.</p></div>
        </div>
        <div className="contact-card-stage" aria-label="Interactive portfolio card">
          {headerBounds.width > 0 && <svg className="contact-card-ribbon" viewBox={`0 0 ${headerBounds.width} ${headerBounds.height}`} preserveAspectRatio="none" aria-hidden="true"><path className="contact-card-ribbon-shadow" d={ribbonPath} pathLength="1" /><path className="contact-card-ribbon-main" d={ribbonPath} pathLength="1" /><path className="contact-card-ribbon-shine" d={ribbonPath} pathLength="1" /></svg>}
            <article
              ref={cardRef}
              className={`contact-id-card${cardDragging ? ' is-dragging' : ''}${cardReturning ? ' is-returning' : ''}${cardPosition ? ' is-positioned' : ''}`}
              style={cardPosition ? { left: `${cardPosition.x}px`, top: `${cardPosition.y}px`, transform: `rotate(${cardRotation}deg) scale(${cardDragging ? 1.025 : 1})` } : undefined}
              tabIndex="0"
              aria-label="Draggable Muntaha Shafique portfolio card. Drag it anywhere in this header, or use arrow keys."
              onPointerDown={(event) => {
                if (event.button !== 0) return;
                cancelAnimationFrame(returnFrameRef.current);
                returnFrameRef.current = 0;
                const card = cardRef.current;
                const x = card.offsetLeft;
                const y = card.offsetTop;
                const now = performance.now();
                homePositionRef.current ||= { x, y };
                event.currentTarget.setPointerCapture(event.pointerId);
                cardDragRef.current = { x: event.clientX, y: event.clientY, startX: x, startY: y, lastX: event.clientX, lastY: event.clientY, lastTime: now, velocityX: 0, velocityY: 0 };
                placeCard(x, y);
                setCardRotation(-3);
                setCardReturning(false);
                setCardDragging(true);
              }}
              onPointerMove={(event) => {
                const drag = cardDragRef.current;
                if (!drag) return;
                const now = performance.now();
                const elapsed = Math.max(1, now - drag.lastTime);
                drag.velocityX = Math.max(-1800, Math.min(1800, ((event.clientX - drag.lastX) / elapsed) * 1000));
                drag.velocityY = Math.max(-1800, Math.min(1800, ((event.clientY - drag.lastY) / elapsed) * 1000));
                drag.lastX = event.clientX;
                drag.lastY = event.clientY;
                drag.lastTime = now;
                const deltaX = event.clientX - drag.x;
                const deltaY = event.clientY - drag.y;
                placeCard(drag.startX + deltaX, drag.startY + deltaY);
                setCardRotation(Math.max(-18, Math.min(18, deltaX * .045)));
              }}
              onPointerUp={(event) => {
                const drag = cardDragRef.current;
                cardDragRef.current = null;
                setCardDragging(false);
                if (drag) returnCardHome(cardPositionRef.current || { x: drag.startX, y: drag.startY }, { x: drag.velocityX, y: drag.velocityY });
                if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onPointerCancel={() => {
                const drag = cardDragRef.current;
                cardDragRef.current = null;
                setCardDragging(false);
                if (drag) returnCardHome(cardPositionRef.current || { x: drag.startX, y: drag.startY }, { x: drag.velocityX, y: drag.velocityY });
              }}
              onAnimationEnd={() => {
                const card = cardRef.current;
                if (card && !cardPositionRef.current) setRibbonEnd({ x: card.offsetLeft + card.offsetWidth / 2, y: card.offsetTop });
              }}
              onKeyDown={(event) => {
                const steps = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] };
                if (!steps[event.key]) return;
                event.preventDefault();
                const [dx, dy] = steps[event.key];
                const card = cardRef.current;
                const x = cardPositionRef.current?.x ?? card.offsetLeft;
                const y = cardPositionRef.current?.y ?? card.offsetTop;
                placeCard(x + dx, y + dy);
              }}
            >
              <span className="contact-id-card-clip" aria-hidden="true" />
              <span className="contact-id-card-label">MUNTAHA SHAFIQUE <span>PORTFOLIO · 2026</span></span>
              <span className="contact-id-card-mark" aria-hidden="true">MS</span>
              <span className="contact-id-card-name">Muntaha<br />Shafique</span>
              <span className="contact-id-card-role">FULL-STACK DEVELOPER<br />&amp; AGENTIC AI ENGINEER</span>
              <span className="contact-id-card-footer"><span>DESIGN · DEVELOPMENT · AI</span><span>DRAG TO EXPLORE ↗</span></span>
            </article>
        </div>
      </section>
      <section className="contact-page-main" id="contact-form" aria-labelledby="contactHelpTitle"><div className="contact-page-grid">
        <div className="contact-page-form-column"><p className="contact-page-eyebrow">HAVE A PROJECT IN MIND?</p><h2 id="contactHelpTitle">Do you need <span>help?</span></h2><p className="contact-page-intro">Share a little about what you’re building. I’ll get back to you to discuss the details and next steps.</p>
          <div className="contact-page-form-card"><form onSubmit={submit} noValidate>
            <div className="contact-page-honeypot" aria-hidden="true"><label>Leave this field empty<input type="text" name="portfolio_middle_name" tabIndex="-1" autoComplete="new-password" value={form.portfolio_middle_name} onChange={update} /></label></div>
            {status.notice && <p className="contact-page-intro" role="status">{status.notice}</p>}
            {status.error && <p className="contact-page-error" role="alert">{status.error}</p>}
            <Field label="Name" name="name" placeholder="Your name" minLength={2} value={form.name} update={update} />
            <Field label="Email" name="email" type="email" placeholder="you@example.com" value={form.email} update={update} />
            <Field label="Subject" name="subject" placeholder="What would you like to build?" minLength={3} value={form.subject} update={update} />
            <div className="contact-page-field"><label htmlFor="contactMessage">Message</label><textarea id="contactMessage" name="message" required minLength="10" maxLength="5000" placeholder="Tell me about your project..." value={form.message} onChange={update} /></div>
            <button className="contact-page-submit" type="submit" disabled={status.busy}>{status.busy ? 'Sending…' : 'Send message'} <Icon name="arrowUpRight" size={17} /></button>
          </form></div>
        </div>
        <aside className="contact-page-info-card" aria-label="Contact information"><p className="contact-page-eyebrow">CONTACT INFORMATION</p><h3>Let’s talk about your idea.</h3><p>Reach out directly if you’d prefer. I’m happy to discuss new projects and how I can help.</p><a href="https://wa.me/923141163432" target="_blank" rel="noopener noreferrer" aria-label="Message Muntaha on WhatsApp at +92 314 1163432"><Icon name="phone" size={19} />+92 314 1163432</a><a href="mailto:muntahashafique6@gmail.com"><Icon name="mail" size={19} />muntahashafique6@gmail.com</a><div className="contact-page-socials"><a href="https://www.linkedin.com/in/muntahashafiq/" target="_blank" rel="noopener noreferrer">LinkedIn <Icon name="arrowUpRight" size={15} /></a><a href="https://github.com/muntaha-shafique" target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrowUpRight" size={15} /></a><a href="https://wa.me/923141163432" target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp chat with Muntaha"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>WhatsApp <Icon name="arrowUpRight" size={15} /></a></div></aside>
      </div></section>
      <section className="contact-page-benefits" aria-label="What to expect">
        <span className="contact-orbit-shape contact-orbit-amber" aria-hidden="true"><Icon name="sparkles" size={21} /></span>
        <span className="contact-orbit-shape contact-orbit-waves" aria-hidden="true"><Icon name="code" size={21} /></span>
        <span className="contact-orbit-shape contact-orbit-triangle" aria-hidden="true"><Icon name="layers" size={21} /></span>
        <span className="contact-orbit-shape contact-orbit-coral" aria-hidden="true"><Icon name="rocket" size={21} /></span>
        <div className="contact-page-benefit"><span className="benefit-icon"><Icon name="message" size={23} /></span><h3>Clear communication</h3><p>I’ll keep goals, decisions, and progress easy to follow.</p></div>
        <div className="contact-page-benefit"><span className="benefit-icon"><Icon name="plan" size={23} /></span><h3>Thoughtful planning</h3><p>I’ll define the right scope before development begins.</p></div>
        <div className="contact-page-benefit"><span className="benefit-icon"><Icon name="checkCircle" size={23} /></span><h3>Reliable delivery</h3><p>Focused development with attention to quality and detail.</p></div>
      </section>
      <section className="contact-friendly-cta" aria-labelledby="contactFriendlyTitle"><div className="contact-friendly-inner"><div className="contact-friendly-photo-space"><img src="assets/images/contact-friendly-portrait.png" alt="Muntaha in a black veil portrait emblem" loading="lazy" /></div><div className="contact-friendly-copy"><p className="contact-page-eyebrow">GOOD THINGS START WITH A HELLO</p><h2 id="contactFriendlyTitle">Let’s make something <span>great.</span></h2><p>Have a clear plan or just the start of an idea? Tell me what’s on your mind, and I’ll help you find the next step.</p><a className="contact-friendly-button" href="#contact-form">Let’s talk <Icon name="arrowUpRight" size={17} /></a></div></div></section>
    </main>
    {status.success && <div className="site-popup is-open" role="dialog" aria-modal="true" aria-labelledby="contactSuccessTitle">
      <button className="site-popup-backdrop" type="button" aria-label="Close confirmation" onClick={closeSuccess} />
      <div className="site-popup-card">
        <button type="button" className="site-popup-close" aria-label="Close" onClick={closeSuccess}>&times;</button>
        <div className="site-popup-icon"><Icon name="checkCircle" size={28} /></div>
        <h3 id="contactSuccessTitle">Message sent!</h3>
        <p>Thank you for reaching out. Your message has been delivered, and I’ll get back to you soon.</p>
        <button type="button" className="site-popup-btn" onClick={closeSuccess}>Done</button>
      </div>
    </div>}
  </>;
}
function Field({ label, name, type = 'text', placeholder, minLength, value, update, error }) { return <div className="contact-page-field"><label htmlFor={`contact${name}`}>{label}</label><input type={type} id={`contact${name}`} name={name} required minLength={minLength} value={value} onChange={update} placeholder={placeholder} />{error && <p className="contact-page-error">{error}</p>}</div>; }

function App() {
  const [routeHash, setRouteHash] = useState(window.location.hash);
  const [isContact, setIsContact] = useState(window.location.hash.startsWith('#/contact'));
  useEffect(() => {
    const activeTitle = isContact
      ? 'Contact Muntaha Shafique | Portfolio'
      : 'Muntaha Shafique | Agentic AI Engineer & Full-Stack Developer';
    const activeDescription = isContact
      ? 'Contact Muntaha Shafique to discuss an AI workflow, full-stack website, or digital product. Based in Pakistan and available worldwide.'
      : 'Explore Muntaha Shafique’s portfolio of agentic AI workflows, full-stack web applications, and thoughtful digital products. Based in Pakistan and available worldwide.';
    const awayTitles = [
      'Your next idea is waiting…',
      'Ready when you are, Muntaha',
      'Let’s make your next idea real'
    ];
    let awayIndex = 0;
    let awayTitleTimer;
    const syncTitle = () => {
      document.title = activeTitle;
      document.querySelector('meta[name="description"]')?.setAttribute('content', activeDescription);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', activeTitle);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', activeDescription);
      document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', activeTitle);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', activeDescription);
    };
    const syncAwayTitle = () => {
      if (!document.hidden) {
        window.clearInterval(awayTitleTimer);
        awayTitleTimer = undefined;
        syncTitle();
        return;
      }
      if (awayTitleTimer) return;
      const showNextAwayTitle = () => {
        document.title = awayTitles[awayIndex];
        awayIndex = (awayIndex + 1) % awayTitles.length;
      };
      showNextAwayTitle();
      awayTitleTimer = window.setInterval(showNextAwayTitle, 4000);
    };
    syncTitle();
    document.addEventListener('visibilitychange', syncAwayTitle);
    return () => {
      document.removeEventListener('visibilitychange', syncAwayTitle);
      window.clearInterval(awayTitleTimer);
    };
  }, [isContact]);
  useEffect(() => {
    const route = () => {
      const hash = window.location.hash;
      setRouteHash(hash);
      setIsContact(hash.startsWith('#/contact'));
    };
    window.addEventListener('hashchange', route);
    return () => window.removeEventListener('hashchange', route);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('contact-page-body', isContact);
    const pageBeingHidden = document.getElementById(isContact ? 'homeRoute' : 'contactRoute');
    if (pageBeingHidden?.contains(document.activeElement)) document.activeElement.blur();
    const frame = window.requestAnimationFrame(() => {
      const sectionId = routeHash.match(/^#\/(home|about|services|projects)$/)?.[1];
      if (isContact) {
        window.scrollTo(0, 0);
      } else if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 82, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
      window.dispatchEvent(new Event('scroll'));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isContact, routeHash]);
  useEffect(() => {
    const script = document.createElement('script'); script.src = 'assets/js/script.js'; script.async = true; document.body.appendChild(script);
    return () => script.remove();
  }, []);
  return <>
    <FloatingNav />
    <div id="homeRoute" hidden={isContact}>
      <HomePage />
    </div>
    <div id="contactRoute" hidden={!isContact}>
      <ContactPage />
    </div>
    <Footer />
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
