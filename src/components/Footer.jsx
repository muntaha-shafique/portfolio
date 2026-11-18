import Icon from './Icon.jsx';

export default function Footer() {
  return (
    <>
<footer className="footer">
  <svg className="footer-ambient-lines" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
    <path d="M-80 410 C 110 290, 250 540, 430 420 S 730 270, 910 390 S 1200 530, 1520 330" />
    <path d="M-80 455 C 120 335, 250 580, 450 465 S 735 320, 930 435 S 1220 570, 1520 380" />
    <path d="M-80 500 C 105 390, 285 620, 470 505 S 770 370, 950 480 S 1240 610, 1520 425" />
    <path d="M-80 155 C 120 270, 270 45, 470 165 S 760 305, 950 180 S 1240 55, 1520 205" />
    <path d="M-80 205 C 120 320, 280 95, 480 215 S 770 355, 960 230 S 1250 105, 1520 255" />
  </svg>
  <svg className="footer-ambient-dots" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
    <path d="M-80 410 C 110 290, 250 540, 430 420 S 730 270, 910 390 S 1200 530, 1520 330" />
    <path d="M-80 455 C 120 335, 250 580, 450 465 S 735 320, 930 435 S 1220 570, 1520 380" />
    <path d="M-80 500 C 105 390, 285 620, 470 505 S 770 370, 950 480 S 1240 610, 1520 425" />
    <path d="M-80 155 C 120 270, 270 45, 470 165 S 760 305, 950 180 S 1240 55, 1520 205" />
    <path d="M-80 205 C 120 320, 280 95, 480 215 S 770 355, 960 230 S 1250 105, 1520 255" />
  </svg>
  <canvas className="hero-cursor-trail" aria-hidden="true"></canvas>
  <div className="hero-cursor-glow" aria-hidden="true"></div>
  <div className="footer-inner">
    <div className="footer-main">
      <div className="footer-brand">
        <span className="footer-logo"><img src="assets/images/ms-monogram-logo.png" alt="Muntaha Shafique monogram" /></span>
        <p className="footer-role">Agentic AI Engineer &amp; Full-Stack Developer</p>
        <p className="footer-description">I build intelligent workflows and reliable digital products that help ideas move forward.</p>
      </div>
      <div className="footer-connect">
        <p className="footer-connect-label">HAVE A PROJECT IN MIND?</p>
        <h3>Let’s make it happen.</h3>
        <a href="mailto:muntahashafique6@gmail.com">muntahashafique6@gmail.com <Icon name="arrowUpRight" size={15} /></a>
        <a className="footer-connect-button" href="#/contact">Start a conversation</a>
      </div>
    </div>

    <div className="footer-socials" aria-label="Social links">
      {/* WhatsApp */}
      <a href="https://wa.me/923141163432" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="WhatsApp" title="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a href="https://www.instagram.com/muntaha_shafique_/" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Instagram" title="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/muntahashafiq/" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="LinkedIn" title="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5H3.5V20.5H6.5V8.5ZM5 3C3.9 3 3 3.9 3 5s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM20.5 13.3c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3.1 1.7V8.5H10.5c0 1.3 0 12 0 12H13.4v-6.7c0-.4 0-.7.1-1 .3-.7.9-1.4 2-1.4 1.4 0 2 1.1 2 2.6v6.5h2.9v-6.7Z"/></svg>
      </a>
      <a href="https://medium.com/@muntaha_shafique" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Medium" title="Medium">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 7.2c0-.3-.1-.6-.4-.8L2.2 4.3v-.3h6.1l4.7 10.3 4.1-10.3h5.8v.3l-1.7 1.6c-.1.1-.2.3-.2.5v11.1c0 .2.1.4.2.5l1.7 1.6v.3h-8.2v-.3l1.8-1.7c.2-.2.2-.3.2-.5V8.6l-5 12.7h-.7L5.5 8.6v8.5c0 .4.1.8.4 1.1l2.3 2.8v.3H2v-.3l2.3-2.8c.3-.3.4-.7.4-1.1V7.2Z"/></svg>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61591833424394" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Facebook" title="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5h2.5V5H14c-2.5 0-4.5 2-4.5 4.5V12H7v3.5h2.5V22H13v-6.5h2.5L16 12h-3V9.5c0-.6.4-1 1-1Z"/></svg>
      </a>
      <a href="https://www.tiktok.com/@muntaha_shafique?lang=en" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="TikTok" title="TikTok">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 4c.5 1.6 1.7 2.9 3.3 3.4V10c-1.2-.1-2.3-.5-3.3-1.2v5.5c0 3.2-2.6 5.7-5.8 5.7S5 17.5 5 14.3 7.5 8.6 10.7 8.6c.3 0 .6 0 .9.1v2.8c-.3-.1-.6-.2-.9-.2-1.6 0-2.9 1.3-2.9 3s1.3 3 2.9 3 2.9-1.3 2.9-3V4h2.9Z"/></svg>
      </a>
      <a href="https://github.com/muntaha-shafique" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="GitHub" title="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10Z"/></svg>
      </a>
    </div>

    <div className="footer-links">
      <a href="#/about">About</a>
      <a href="#/projects">Work</a>
      <a href="#/contact">Contact</a>
    </div>

    <p className="footer-copy">© {new Date().getFullYear()} Muntaha Shafique. All rights reserved.</p>
  </div>
</footer>

{/* Replaced the right-side floating buttons with a compact contact menu. */}
<div className="quick-contact" id="quickContact">
  <a className="quick-contact-whatsapp" href="https://wa.me/923141163432" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp at +92 314 1163432" title="WhatsApp: +92 314 1163432">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  </a>
  <div className="quick-contact-links" id="quickContactLinks" hidden>
    <a href="mailto:muntahashafique6@gmail.com" aria-label="Email Muntaha Shafique">Email</a>
    <a href="https://wa.me/923141163432" target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp chat">WhatsApp</a>
    <a href="https://www.linkedin.com/in/muntahashafiq/" target="_blank" rel="noopener noreferrer" aria-label="Open Muntaha Shafique's LinkedIn profile">LinkedIn</a>
  </div>
  <button className="quick-contact-toggle" id="quickContactToggle" type="button" aria-label="Open email and WhatsApp links" aria-expanded="false" aria-controls="quickContactLinks">
    <span className="quick-contact-live-dot" aria-hidden="true"></span><span>QUICK CONTACT</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </button>
</div>

<div className="portfolio-chat" id="portfolioChat">
  <section className="portfolio-chat-panel" id="portfolioChatPanel" aria-label="Chat with Muntaha" hidden>
    <div className="portfolio-chat-heading">
      <div className="portfolio-chat-avatar" aria-hidden="true"><img src="assets/images/portfolio-chat-robot-cutout.png" alt="" /></div>
      <div className="portfolio-chat-heading-copy">
        <strong>AI Assistant</strong>
        <span>Muntaha Shafique</span>
      </div>
      <button className="portfolio-chat-delete" id="portfolioChatDelete" type="button" aria-label="Delete chat history" title="Delete chat history"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-.8 13H6.8L6 7m4 4v5m4-5v5"/></svg></button>
      <button className="portfolio-chat-close" id="portfolioChatClose" type="button" aria-label="Close chat">×</button>
    </div>
    <div className="portfolio-chat-delete-confirm" id="portfolioChatDeleteConfirm" hidden>
      <strong>Delete chat history?</strong>
      <div><button type="button" className="portfolio-chat-delete-yes" id="portfolioChatDeleteYes">Delete</button><button type="button" className="portfolio-chat-delete-no" id="portfolioChatDeleteNo">Cancel</button></div>
    </div>
    <div className="portfolio-chat-content">
      <div className="portfolio-chat-messages" id="portfolioChatMessages" role="log" aria-live="polite" aria-relevant="additions">
        <div className="portfolio-chat-message-row is-assistant">
          <div className="portfolio-chat-meta">ASSISTANT <span>Ready</span></div>
          <div className="portfolio-chat-message is-assistant">Welcome! I’m Muntaha Shafique’s personal AI assistant. Ask me about her full-stack work, agentic AI systems, featured projects, or services. I can also help you get in touch.</div>
        </div>
      </div>
      <div className="portfolio-chat-suggestions" id="portfolioChatSuggestions" aria-label="Suggested questions">
        <button type="button">Featured projects</button>
        <button type="button">Services</button>
        <button type="button">WordPress websites</button>
        <button type="button">Project pricing</button>
        <button type="button">Project timeline</button>
        <button type="button">Project process</button>
        <button type="button">Maintenance</button>
        <button type="button">Contact Muntaha</button>
      </div>
      <form className="portfolio-chat-compose" id="portfolioChatForm">
        <input id="portfolioChatInput" type="text" maxLength="500" autoComplete="off" placeholder="Ask about Muntaha’s work…" aria-label="Type your question" />
        <button type="submit" aria-label="Send message"><Icon name="send" size={17} /></button>
      </form>
    </div>
  </section>
  <button className="portfolio-chat-toggle" id="portfolioChatToggle" type="button" aria-label="Open portfolio chat" aria-expanded="false" aria-controls="portfolioChatPanel">
    <span className="portfolio-bot-spin" aria-hidden="true">
    <img className="portfolio-bot-core" src="assets/images/portfolio-chat-robot-cutout.png" alt="" aria-hidden="true" />
    <span className="portfolio-bot-neck" aria-hidden="true"></span>
    <img className="portfolio-bot-head" src="assets/images/portfolio-chat-robot-cutout.png" alt="" aria-hidden="true" />
    <img className="portfolio-bot-arm portfolio-bot-arm-left" src="assets/images/portfolio-chat-robot-cutout.png" alt="" aria-hidden="true" />
    <img className="portfolio-bot-arm portfolio-bot-arm-right" src="assets/images/portfolio-chat-robot-cutout.png" alt="" aria-hidden="true" />
    <span className="portfolio-bot-face" aria-hidden="true">
      <span className="portfolio-bot-eyelid portfolio-bot-eyelid-left"></span>
      <span className="portfolio-bot-eyelid portfolio-bot-eyelid-right"></span>
      <span className="portfolio-bot-mouth"></span>
    </span>
    <span className="portfolio-bot-typing" aria-hidden="true"><i></i><i></i><i></i></span>
    </span>
  </button>
</div>
<img className="portfolio-hover-robot" id="portfolioHoverRobot" src="assets/images/portfolio-hover-robot.png" alt="" aria-hidden="true" />
<div className="site-pointer-aura" aria-hidden="true"></div>
<canvas className="site-pointer-trail" aria-hidden="true"></canvas>
    </>
  );
}
