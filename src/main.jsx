import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomePage.jsx';
import Footer from './components/Footer.jsx';
import Icon from './components/Icon.jsx';

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const links = [['About Me', '#about'], ['Services', '#services'], ['Projects', '#projects'], ['Contact', '#/contact']];
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
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [cardDragging, setCardDragging] = useState(false);
  const cardStageRef = useRef(null);
  const cardDragRef = useRef(null);
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
      <section className="contact-page-hero contact-signal-hero" aria-labelledby="contactPageTitle">
        <canvas className="hero-cursor-trail" aria-hidden="true" /><div className="hero-cursor-glow" aria-hidden="true" />
        <div className="contact-page-hero-inner contact-signal-inner">
          <div className="contact-signal-copy"><h1 id="contactPageTitle">Send a Signal</h1><p className="contact-signal-description">This page is the bridge between an idea and a plan. Drop your message — I’ll help turn it into a direction.</p></div>
          <div className="contact-card-stage" ref={cardStageRef}>
            <article className={`contact-id-card${cardDragging ? ' is-dragging' : ''}`} style={{ '--card-x': `${cardPosition.x}px`, '--card-y': `${cardPosition.y}px` }} tabIndex="0" aria-label="Draggable Muntaha Shafique portfolio card. Use arrow keys to move it." onPointerDown={(event) => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); cardDragRef.current = { x: event.clientX, y: event.clientY, startX: cardPosition.x, startY: cardPosition.y }; setCardDragging(true); }} onPointerMove={(event) => { if (!cardDragRef.current || !cardStageRef.current) return; const stage = cardStageRef.current.getBoundingClientRect(); const card = event.currentTarget.getBoundingClientRect(); const maxX = Math.max(0, (stage.width - card.width) / 2); const maxY = Math.max(0, (stage.height - card.height) / 2); const dx = event.clientX - cardDragRef.current.x; const dy = event.clientY - cardDragRef.current.y; setCardPosition({ x: Math.max(-maxX, Math.min(maxX, cardDragRef.current.startX + dx)), y: Math.max(-maxY, Math.min(maxY, cardDragRef.current.startY + dy)) }); }} onPointerUp={(event) => { cardDragRef.current = null; setCardDragging(false); if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { cardDragRef.current = null; setCardDragging(false); }} onKeyDown={(event) => { const steps = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }; if (!steps[event.key]) return; event.preventDefault(); const [dx, dy] = steps[event.key]; const stage = cardStageRef.current?.getBoundingClientRect(); const card = event.currentTarget.getBoundingClientRect(); const maxX = stage ? Math.max(0, (stage.width - card.width) / 2) : 120; const maxY = stage ? Math.max(0, (stage.height - card.height) / 2) : 80; setCardPosition((current) => ({ x: Math.max(-maxX, Math.min(maxX, current.x + dx)), y: Math.max(-maxY, Math.min(maxY, current.y + dy)) })); }}>
              <span className="contact-id-card-clip" aria-hidden="true" />
              <span className="contact-id-card-label">MUNTAHA SHAFIQUE <span>PORTFOLIO · 2026</span></span>
              <span className="contact-id-card-mark" aria-hidden="true">MS</span>
              <span className="contact-id-card-name">Muntaha<br />Shafique</span>
              <span className="contact-id-card-role">FULL-STACK DEVELOPER<br />&amp; AGENTIC AI ENGINEER</span>
              <span className="contact-id-card-footer"><span>DESIGN · DEVELOPMENT · AI</span><span>DRAG TO EXPLORE ↗</span></span>
            </article>
          </div>
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
        <aside className="contact-page-info-card" aria-label="Contact information"><p className="contact-page-eyebrow">CONTACT INFORMATION</p><h3>Let’s talk about your idea.</h3><p>Reach out directly if you’d prefer. I’m happy to discuss new projects and how I can help.</p><a href="tel:+923141163432"><Icon name="phone" size={19} />+92 314 1163432</a><a href="mailto:muntahashafique6@gmail.com"><Icon name="mail" size={19} />muntahashafique6@gmail.com</a><div className="contact-page-socials"><a href="https://www.linkedin.com/in/muntahashafiq/" target="_blank" rel="noopener noreferrer">LinkedIn <Icon name="arrowUpRight" size={15} /></a><a href="https://github.com/muntaha-shafique" target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrowUpRight" size={15} /></a></div></aside>
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
