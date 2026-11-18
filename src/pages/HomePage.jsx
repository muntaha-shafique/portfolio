import Icon from '../components/Icon.jsx';

export default function HomePage() {
  return (
    <>
{/* ========== HERO ========== */}
<header className="hero hero-showcase" id="home">
  {/* Top Bar: Role & Nav Links */}
  <div className="hero-top-bar">
    <div className="hero-role-tag">
      <span>FULL-STACK DEVELOPER</span>
      <span>&amp;Agentic AI ENGINEER</span>
    </div>
    <nav className="hero-top-nav" aria-label="Main Navigation">
      <a href="#/about" className="hero-nav-item">ABOUT</a>
      <a href="#services" className="hero-nav-item">SERVICES</a>
      <a href="#projects" className="hero-nav-item">PROJECTS</a>
      <a href="#/contact" className="hero-nav-item">CONTACT</a>
    </nav>
  </div>

  {/* Background Curves Layer (Code-generated 3D Ribbons) */}
  <div className="hero-curves-layer" aria-hidden="true">
    <svg className="hero-curves-svg" viewBox="0 0 1440 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="45%" r="48%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ribbonGradLeft1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#161616" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#050505" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="ribbonEdgeLeft1" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="65%" stopColor="#cccccc" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ribbonGradLeft2" x1="10%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#202020" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#101010" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#040404" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="ribbonEdgeLeft2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="85%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ribbonGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#222222" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#121212" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#040404" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="ribbonEdgeRight" x1="100%" y1="20%" x2="0%" y2="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#cccccc" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#centerGlow)" />
      <path d="M-50,220 C180,340 380,560 480,850 C380,880 200,900 -50,900 Z" fill="url(#ribbonGradLeft1)" />
      <path d="M-50,220 C180,340 380,560 480,850" stroke="url(#ribbonEdgeLeft1)" strokeWidth="1.8" fill="none" />
      <path d="M-80,520 C120,530 320,680 430,920 C280,920 60,920 -80,920 Z" fill="url(#ribbonGradLeft2)" />
      <path d="M-80,520 C120,530 320,680 430,920" stroke="url(#ribbonEdgeLeft2)" strokeWidth="1.5" fill="none" />
      <path d="M-20,700 C150,680 340,750 540,920 C360,920 100,920 -20,920 Z" fill="#080808" />
      <path d="M-20,700 C150,680 340,750 540,920" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none" />
      <path d="M1500,420 C1280,520 1060,700 950,920 C1120,920 1350,920 1500,920 Z" fill="url(#ribbonGradRight)" />
      <path d="M1500,420 C1280,520 1060,700 950,920" stroke="url(#ribbonEdgeRight)" strokeWidth="1.6" fill="none" />
    </svg>
  </div>

  <canvas className="hero-cursor-trail" aria-hidden="true"></canvas>
  <div className="hero-cursor-glow" aria-hidden="true"></div>

  {/* Main role title stays centered, as before. */}
  <h1 className="hero-portfolio-wrap">
    <span className="hero-portfolio-text">
      <span className="hero-title-line">FULL STACK</span>
      <span className="hero-title-line">DEVELOPER</span>
    </span>
  </h1>

  <div className="hero-left-card">
    <p className="hero-left-kicker">CREATIVE · DIGITAL · AI</p>
    <h2 className="hero-left-title">Creative Design Solutions for</h2>
    <p className="hero-changing-line"><span className="hero-changing-phrase">Modern Businesses</span></p>
  </div>

  {/* Center Girl Image (from user's 2nd uploaded image) */}
  <div className="hero-girl-container">
    <img src="assets/images/hero-girl-v4.png" alt="Muntaha Shafique" className="hero-girl-cutout" decoding="async" />
  </div>

  <div className="hero-bottom-waves" aria-hidden="true">
    <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
      <path className="hero-wave-sage" d="M0 112 C180 40 280 142 470 106 C670 70 760 8 940 54 C1120 98 1260 24 1440 72 L1440 180 L0 180 Z">
        <animate className="hero-wave-motion" attributeName="d" dur="7s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" values="M0 112 C180 40 280 142 470 106 C670 70 760 8 940 54 C1120 98 1260 24 1440 72 L1440 180 L0 180 Z;M0 122 C180 20 280 158 470 92 C670 52 760 28 940 68 C1120 106 1260 12 1440 84 L1440 180 L0 180 Z;M0 112 C180 40 280 142 470 106 C670 70 760 8 940 54 C1120 98 1260 24 1440 72 L1440 180 L0 180 Z" />
      </path>
      <path className="hero-wave-cream" d="M0 142 C185 94 332 160 520 136 C700 112 830 74 1025 116 C1200 153 1290 94 1440 118 L1440 180 L0 180 Z">
        <animate className="hero-wave-motion" attributeName="d" dur="8s" begin="-2s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" values="M0 142 C185 94 332 160 520 136 C700 112 830 74 1025 116 C1200 153 1290 94 1440 118 L1440 180 L0 180 Z;M0 152 C185 76 332 176 520 124 C700 92 830 94 1025 132 C1200 143 1290 78 1440 130 L1440 180 L0 180 Z;M0 142 C185 94 332 160 520 136 C700 112 830 74 1025 116 C1200 153 1290 94 1440 118 L1440 180 L0 180 Z" />
      </path>
    </svg>
  </div>

  {/* Bottom-Right Bio Card */}
  <div className="hero-bottom-area">
    <div className="hero-bio-card">
      <div className="hero-name-row">
        <h2 className="hero-name">MUNTAHA SHAFIQUE</h2>
        <svg className="hero-star-sparkle" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
        </svg>
      </div>

      <p className="hero-bio-text">
        I build thoughtful digital experiences, intelligent systems and modern web products.
      </p>
      <p className="hero-creation-note">/ CREATING SINCE 2021</p>

    </div>
  </div>
</header>

{/* ========== ABOUT ========== */}
<section className="section about" id="about">
  <div className="container about-editorial">
    <div className="about-kicker"><span>ABOUT ME</span><span>01 / MUNTAHA SHAFIQUE</span></div>
    <h2 className="about-title reveal">Hi, I’m <em>Muntaha.</em></h2>
    <div className="about-main-grid">
      <figure className="about-photo-slot has-image reveal" id="aboutPhotoSlot">
        <img className="about-portrait-cutout" src="assets/images/about-hijabi-headphones.png" alt="Muntaha Shafique's portrait on a portfolio ID badge with lanyard" width="1111" height="1416" decoding="async" />
      </figure>
      <div className="about-copy reveal">
        <p className="about-lead">I build thoughtful digital experiences, intelligent systems and modern web products.</p>
        <p>I’m an Agentic AI engineer and full-stack developer focused on turning complex ideas into reliable software. My work spans autonomous agents, intelligent workflows, and polished web platforms.</p>
        <p>I care about clarity, performance, and building products around the way people and businesses actually work.</p>
        <a href="#/contact" className="about-cta">Let’s talk about your project <Icon name="arrowUpRight" size={17} /></a>
      </div>
    </div>
    <div className="about-stats reveal" aria-label="Professional highlights">
      <div className="about-stat"><strong className="about-counter" data-count-to="100" data-count-suffix="%">100%</strong><span>Client Satisfaction</span></div>
      <div className="about-stat"><strong className="about-counter" data-count-to="500" data-count-suffix="+">500+</strong><span>Projects Completed</span></div>
      <div className="about-stat"><strong className="about-counter" data-count-to="3" data-count-suffix="+">3+</strong><span>Years Freelance Experience</span></div>
    </div>
    <div className="about-marquee" aria-label="Independent developer, building for clients, AI engineer, full-stack developer, agentic AI, intelligent workflows">
      <div className="about-marquee-track" aria-hidden="true">
        <div className="about-marquee-group"><span>INDEPENDENT DEVELOPER</span><i>✳</i><span>BUILDING FOR CLIENTS</span><i>✳</i><span>AI ENGINEER</span><i>✳</i><span>FULL-STACK DEVELOPER</span><i>✳</i><span>AGENTIC AI</span><i>✳</i><span>INTELLIGENT WORKFLOWS</span><i>✳</i></div>
        <div className="about-marquee-group"><span>INDEPENDENT DEVELOPER</span><i>✳</i><span>BUILDING FOR CLIENTS</span><i>✳</i><span>AI ENGINEER</span><i>✳</i><span>FULL-STACK DEVELOPER</span><i>✳</i><span>AGENTIC AI</span><i>✳</i><span>INTELLIGENT WORKFLOWS</span><i>✳</i></div>
      </div>
    </div>
  </div>
</section>

{/* ========== STATEMENT ========== */}
<section className="statement">
  <div className="container statement-card reveal">
    <div className="statement-heading">
      <h2>Complex ideas.<br /><em>Reliable software.</em></h2>
    </div>
    <div className="statement-copy">
      <p>I build AI-powered workflows and full-stack applications that turn complex ideas into dependable products. Designed to help teams work efficiently, scale confidently, and deliver measurable results.</p>
    </div>
  </div>
</section>

{/* ========== SERVICES (3D Coverflow Cards) ========== */}
<section className="services-stack" id="services">
  <div className="services-stack-inner">
    <div className="services-stack-left">
      <p className="services-label">WHAT I BUILD</p>
      <h2 className="services-title">Built for the way your<br />business <em>actually works.</em></h2>
      <p className="services-desc">From autonomous AI agents to production-ready web platforms, I build fast, reliable systems tailored to real business needs.</p>
    </div>

    <div className="services-stack-right">
      <div className="coverflow" id="servicesCoverflow" aria-label="Services carousel">
        <div className="coverflow-track" id="coverflowTrack">
          <article className="cover-card" data-index="0">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 01</span>
                <span className="stack-tag">AGENTIC AI</span>
              </div>
              <h3>Agentic AI Development</h3>
              <p>Autonomous multi-agent systems and intelligent workflows that automate complex operations and deliver measurable ROI.</p>
              <span className="stack-num" aria-hidden="true">01</span>
            </div>
          </article>

          <article className="cover-card" data-index="1">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 02</span>
                <span className="stack-tag">PHP / LARAVEL</span>
              </div>
              <h3>PHP &amp; Laravel Development</h3>
              <p>Robust backend systems, APIs and full-stack applications built with PHP and Laravel for scale and maintainability.</p>
              <span className="stack-num" aria-hidden="true">02</span>
            </div>
          </article>

          <article className="cover-card" data-index="2">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 03</span>
                <span className="stack-tag">WORDPRESS</span>
              </div>
              <h3>WordPress Websites</h3>
              <p>Custom WordPress themes, plugins and high-performance sites that are easy to manage and built to convert.</p>
              <span className="stack-num" aria-hidden="true">03</span>
            </div>
          </article>

          <article className="cover-card" data-index="3">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 04</span>
                <span className="stack-tag">ECOMMERCE</span>
              </div>
              <h3>Ecommerce Websites</h3>
              <p>Storefronts and checkout flows designed to sell — product structure, payments, and performance tuned for conversion.</p>
              <span className="stack-num" aria-hidden="true">04</span>
            </div>
          </article>

          <article className="cover-card" data-index="4">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 05</span>
                <span className="stack-tag">WEB APPS</span>
              </div>
              <h3>Web Applications</h3>
              <p>Custom web applications with authentication, dashboards, APIs and real-time features for modern businesses.</p>
              <span className="stack-num" aria-hidden="true">05</span>
            </div>
          </article>

          <article className="cover-card" data-index="5">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 06</span>
                <span className="stack-tag">MOBILE</span>
              </div>
              <h3>Mobile Applications</h3>
              <p>Mobile-ready experiences and app backends — responsive UIs and APIs that power iOS and Android products.</p>
              <span className="stack-num" aria-hidden="true">06</span>
            </div>
          </article>

          <article className="cover-card" data-index="6">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 07</span>
                <span className="stack-tag">FIGMA</span>
              </div>
              <h3>Figma UI/UX Design</h3>
              <p>Clean interface design and design systems in Figma — from wireframes to high-fidelity screens ready for development.</p>
              <span className="stack-num" aria-hidden="true">07</span>
            </div>
          </article>

          <article className="cover-card" data-index="7">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 08</span>
                <span className="stack-tag">DATABASE</span>
              </div>
              <h3>Database Design</h3>
              <p>Structured database architecture, optimization and migrations for MySQL, PostgreSQL and modern data layers.</p>
              <span className="stack-num" aria-hidden="true">08</span>
            </div>
          </article>

          <article className="cover-card" data-index="8">
            <div className="cover-card-inner">
              <div className="stack-card-top">
                <span className="stack-label">SERVICE 09</span>
                <span className="stack-tag">SEO</span>
              </div>
              <h3>SEO &amp; Technical SEO</h3>
              <p>On-page SEO, site structure and technical cleanup baked in from day one — built to be found, not just look good.</p>
              <span className="stack-num" aria-hidden="true">09</span>
            </div>
          </article>
        </div>

        <div className="coverflow-dots" id="coverflowDots" aria-hidden="true"></div>
      </div>
      <button className="services-mobile-more" id="servicesMobileMore" type="button" aria-expanded="false" aria-controls="coverflowTrack">
        <span>View more services</span><Icon name="chevronDown" size={17} />
      </button>
    </div>
  </div>
</section>

{/* ========== PROJECT PROCESS ========== */}
<section className="project-process" id="process">
  <div className="container">
    <div className="process-panel">
      <div className="process-image reveal">
        <img src="assets/images/project-process-woman.png" alt="Muntaha working at a laptop" loading="lazy" />
      </div>
      <div className="process-content reveal">
        <p className="process-eyebrow">A clear, hands-on process</p>
        <h2>See how my process <span>works for you</span></h2>
        <ol className="process-steps">
          <li><span className="process-step-marker">01</span><div><h3>Understand your goals</h3><p>I’ll learn about your challenge, your audience, and what success should look like.</p></div></li>
          <li><span className="process-step-marker">02</span><div><h3>Shape the solution</h3><p>I map the experience, technical plan, and milestones around your needs.</p></div></li>
          <li><span className="process-step-marker">03</span><div><h3>Build and refine</h3><p>I’ll build, test, and refine your product with your feedback at each step.</p></div></li>
          <li><span className="process-step-marker">04</span><div><h3>Launch with confidence</h3><p>Your polished product is ready to ship, grow, and support real work.</p></div></li>
        </ol>
      </div>
    </div>
  </div>
</section>

{/* ========== PROJECTS ========== */}
<section className="projects" id="projects">
  <div className="container">
    <div className="projects-header reveal">
      <div className="projects-header-text">
        <p className="projects-eyebrow">Selected work</p>
        <h2>Featured Projects</h2>
        <p className="projects-desc">A few builds I’m proud of — from healthcare systems and showroom experiences to creative web apps and AI writing tools. Each one focused on clarity, performance, and real-world use.</p>
      </div>
    </div>

    <div className="projects-coverflow" id="projectsCoverflow">
      <div className="projects-coverflow-track" id="projectsCoverflowTrack">
        <article className="project-cover-card" data-index="0" tabIndex="0" aria-label="View details for VacciCare">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="VC">
              <img src="assets/images/vaccicare-project-app.png" alt="VacciCare healthcare project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="project-cover-body">
              <span className="project-cat">Healthcare</span>
              <h3>VacciCare</h3>
              <p>Vaccination management system for tracking schedules, records and healthcare workflows.</p>
              <div className="project-cover-actions">
                <a href="https://github.com/sheikhsiddique722-sketch/vaccicare" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>

        <article className="project-cover-card" data-index="1" tabIndex="0" aria-label="View details for DriveX Motors Showroom">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="DX">
              <img src="assets/images/drivex-project.png" alt="DriveX Motors project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="project-cover-body">
              <span className="project-cat">Automotive</span>
              <h3>DriveX Motors Showroom</h3>
              <p>Modern car showroom web experience with vehicle listings, details and inquiry flows.</p>
              <div className="project-cover-actions">
                <a href="https://drivax-showroom.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>

        <article className="project-cover-card" data-index="2" tabIndex="0" aria-label="View details for Prismatic">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="P">
              <img src="assets/images/prismatic-project.png" alt="Prismatic project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="project-cover-body">
              <span className="project-cat">Web App</span>
              <h3>Prismatic</h3>
              <p>Creative web application with a polished UI and interactive user experience.</p>
              <div className="project-cover-actions">
                <a href="https://prismatic-jade.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>

        <article className="project-cover-card" data-index="3" tabIndex="0" aria-label="View details for GhostWriter">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="GW">
              <img src="assets/images/ghostwriter-project.png" alt="GhostWriter project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="project-cover-body">
              <span className="project-cat">AI / Writing</span>
              <h3>GhostWriter</h3>
              <p>AI-assisted writing tool for generating and refining content with a clean, focused interface.</p>
              <div className="project-cover-actions">
                <a href="https://ghostwriter-swart-eight.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>
        <article className="project-cover-card" data-index="4" tabIndex="0" aria-label="View details for Glow &amp; Go">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="G&amp;G"><img src="assets/images/glow-and-go-screenshot.png" alt="Glow &amp; Go project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} /></div>
            <div className="project-cover-body">
              <span className="project-cat">Beauty &amp; Wellness</span><h3>Glow &amp; Go</h3>
              <p>A polished beauty and wellness web experience, designed to make discovering services feel effortless.</p>
              <div className="project-cover-actions">
                <a href="https://glow-and-go-sigma.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>
        <article className="project-cover-card" data-index="5" tabIndex="0" aria-label="View details for Lune Café">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="L"><img src="assets/images/lune-cafe-project.png" alt="Lune Café project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} /></div>
            <div className="project-cover-body">
              <span className="project-cat">Café</span><h3>Lune Café</h3>
              <p>A warm café website with an inviting visual style and a clear path to explore the menu and visit.</p>
              <div className="project-cover-actions">
                <a href="https://lune-cafe-ivory.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>
        <article className="project-cover-card" data-index="6" tabIndex="0" aria-label="View details for Biryani Restaurant">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="BR"><img src="assets/images/biryani-restaurant-project.png" alt="Biryani Restaurant project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} /></div>
            <div className="project-cover-body">
              <span className="project-cat">Restaurant</span><h3>Biryani Restaurant</h3>
              <p>A restaurant website centered on discovering the menu, flavors, and dining experience.</p>
              <div className="project-cover-actions">
                <a href="https://biryani-restaurant-two.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>
        <article className="project-cover-card" data-index="7" tabIndex="0" aria-label="View details for Bloom">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="B"><img src="assets/images/bloom-project.png" alt="Bloom project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} /></div>
            <div className="project-cover-body">
              <span className="project-cat">Floral &amp; Lifestyle</span><h3>Bloom</h3>
              <p>A fresh, elegant web experience for browsing a floral collection and finding the right arrangement.</p>
              <div className="project-cover-actions">
                <a href="https://bloom-delta-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>
        <article className="project-cover-card" data-index="8" tabIndex="0" aria-label="View details for Birthday Bay">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="BB"><img src="assets/images/birthday-bay-project.png" alt="Birthday Bay project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} /></div>
            <div className="project-cover-body">
              <span className="project-cat">Celebrations</span><h3>Birthday Bay</h3>
              <p>A cheerful celebration website for exploring birthday ideas and making special moments memorable.</p>
              <div className="project-cover-actions">
                <a href="https://birthday-bay-psi.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>
        <article className="project-cover-card" data-index="9" tabIndex="0" aria-label="View details for DataPulse">
          <div className="project-cover-inner">
            <div className="project-cover-img" data-mark="DP"><img src="assets/images/datapulse-project.png" alt="DataPulse project preview" width="800" height="500" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} /></div>
            <div className="project-cover-body">
              <span className="project-cat">Data &amp; Analytics</span><h3>DataPulse</h3>
              <p>A data-focused dashboard experience designed to make key metrics and insights easier to explore.</p>
              <div className="project-cover-actions">
                <a href="https://datapulse-umber.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">View Project</a>
              </div>
            </div>
          </div>
        </article>
      </div>
      <button className="projects-mobile-more" id="projectsMobileMore" type="button" aria-expanded="false" aria-controls="projectsCoverflowTrack">
        <span>View more projects</span><Icon name="chevronDown" size={17} />
      </button>
    </div>
  </div>
</section>

<div className="project-modal" id="projectModal" hidden>
  <button className="project-modal-backdrop" type="button" data-close-project aria-label="Close project details"></button>
  <article className="project-modal-card" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">
    <button className="project-modal-close" type="button" data-close-project aria-label="Close project details">×</button>
    <div className="project-modal-image"><img id="projectModalImage" alt="" /></div>
    <div className="project-modal-content">
      <p className="project-modal-category" id="projectModalCategory"></p>
      <h2 id="projectModalTitle"></h2>
      <p className="project-modal-description" id="projectModalDescription"></p>
      <a className="project-btn" id="projectModalLink" href="" target="_blank" rel="noopener noreferrer">View Project</a>
    </div>
  </article>
</div>

{/* ========== SKILLS ========== */}
<section className="skills" id="skills">
  <div className="container">
    <div className="skills-header reveal">
      <p className="skills-eyebrow">What I work with</p>
      <h2>Skills &amp; Expertise</h2>
      <p className="skills-desc">A focused stack for agentic systems, full-stack products, and polished interfaces — from idea to production.</p>
    </div>

    <div className="skills-groups" aria-label="Skills and technologies">
      <div className="skills-group reveal">
        <h3 className="skills-group-title"><span className="skills-dot"></span> AI &amp; Agents</h3>
        <div className="skills-cloud">
          <span className="skill-tile" data-icon="A"><span className="skill-mark"><img src="https://cdn.simpleicons.org/anthropic" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Anthropic</span></span>
          <span className="skill-tile" data-icon="HF"><span className="skill-mark"><img src="https://cdn.simpleicons.org/huggingface" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Hugging Face</span></span>
          <span className="skill-tile" data-icon="GK"><span className="skill-mark">GK</span><span>Genkit</span></span>
          <span className="skill-tile" data-icon="AI"><span className="skill-mark"><img src="https://cdn.simpleicons.org/googlegemini" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Google AI Studio</span></span>
          <span className="skill-tile" data-icon="Q"><span className="skill-mark"><img src="https://cdn.simpleicons.org/qdrant" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Qdrant</span></span>
          <span className="skill-tile" data-icon="RAG"><span className="skill-mark">RAG</span><span>RAG</span></span>
          <span className="skill-tile" data-icon="n8n"><span className="skill-mark"><img src="https://cdn.simpleicons.org/n8n" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>n8n</span></span>
          <span className="skill-tile" data-icon="AI"><span className="skill-mark">AI</span><span>Agentic AI</span></span>
          <span className="skill-tile" data-icon="AG"><span className="skill-mark">AG</span><span>AI Agents</span></span>
          <span className="skill-tile" data-icon="✳"><span className="skill-mark"><Icon name="sparkles" size={23} /></span><span>Generative AI</span></span>
          <span className="skill-tile" data-icon="LLM"><span className="skill-mark">LLM</span><span>LLM Applications</span></span>
          <span className="skill-tile" data-icon="/›"><span className="skill-mark">/›</span><span>Prompt Engineering</span></span>
          <span className="skill-tile" data-icon="⚙"><span className="skill-mark"><Icon name="settings" size={23} /></span><span>AI Automation</span></span>
        </div>
      </div>

      <div className="skills-group reveal">
        <h3 className="skills-group-title"><span className="skills-dot"></span> Development</h3>
        <div className="skills-cloud">
          <span className="skill-tile" data-icon="TS"><span className="skill-mark"><img src="https://cdn.simpleicons.org/typescript" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>TypeScript</span></span>
          <span className="skill-tile" data-icon="JS"><span className="skill-mark"><img src="https://cdn.simpleicons.org/javascript" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>JavaScript</span></span>
          <span className="skill-tile" data-icon="Py"><span className="skill-mark"><img src="https://cdn.simpleicons.org/python" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Python</span></span>
          <span className="skill-tile" data-icon="N"><span className="skill-mark"><img src="https://cdn.simpleicons.org/nextdotjs" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Next.js</span></span>
          <span className="skill-tile" data-icon="⚛"><span className="skill-mark"><img src="https://cdn.simpleicons.org/react" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>React</span></span>
          <span className="skill-tile" data-icon="JS"><span className="skill-mark"><img src="https://cdn.simpleicons.org/nodedotjs" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Node.js</span></span>
          <span className="skill-tile" data-icon="F"><span className="skill-mark"><img src="https://cdn.simpleicons.org/fastapi" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>FastAPI</span></span>
          <span className="skill-tile" data-icon="TW"><span className="skill-mark"><img src="https://cdn.simpleicons.org/tailwindcss" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Tailwind CSS</span></span>
          <span className="skill-tile" data-icon="F"><span className="skill-mark"><img src="https://cdn.simpleicons.org/framer" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Framer Motion</span></span>
          <span className="skill-tile" data-icon="3"><span className="skill-mark"><img src="https://cdn.simpleicons.org/threedotjs" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Three.js</span></span>
          <span className="skill-tile" data-icon="GSAP"><span className="skill-mark"><img src="https://cdn.simpleicons.org/greensock" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>GSAP</span></span>
          <span className="skill-tile" data-icon="sh"><span className="skill-mark"><img src="https://cdn.simpleicons.org/shadcnui" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>shadcn/ui</span></span>
          <span className="skill-tile" data-icon="PHP"><span className="skill-mark"><img src="https://cdn.simpleicons.org/php" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>PHP</span></span>
          <span className="skill-tile" data-icon="L"><span className="skill-mark"><img src="https://cdn.simpleicons.org/laravel" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Laravel</span></span>
          <span className="skill-tile" data-icon="↔"><span className="skill-mark">↔</span><span>REST APIs</span></span>
        </div>
      </div>

      <div className="skills-group reveal">
        <h3 className="skills-group-title"><span className="skills-dot"></span> Platforms &amp; Design</h3>
        <div className="skills-cloud">
          <span className="skill-tile" data-icon="DB"><span className="skill-mark"><img src="https://cdn.simpleicons.org/postgresql" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>PostgreSQL</span></span>
          <span className="skill-tile" data-icon="N"><span className="skill-mark"><img src="https://cdn.simpleicons.org/neon" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Neon</span></span>
          <span className="skill-tile" data-icon="M"><span className="skill-mark"><img src="https://cdn.simpleicons.org/mongodb" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>MongoDB</span></span>
          <span className="skill-tile" data-icon="S"><span className="skill-mark"><img src="https://cdn.simpleicons.org/supabase" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Supabase</span></span>
          <span className="skill-tile" data-icon="F"><span className="skill-mark"><img src="https://cdn.simpleicons.org/firebase" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Firebase</span></span>
          <span className="skill-tile" data-icon="GC"><span className="skill-mark"><img src="https://cdn.simpleicons.org/googlecloud" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Google Cloud</span></span>
          <span className="skill-tile" data-icon="D"><span className="skill-mark"><img src="https://cdn.simpleicons.org/docker" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Docker</span></span>
          <span className="skill-tile" data-icon="▲"><span className="skill-mark"><img src="https://cdn.simpleicons.org/vercel" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Vercel</span></span>
          <span className="skill-tile" data-icon="G"><span className="skill-mark"><img src="https://cdn.simpleicons.org/git" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Git</span></span>
          <span className="skill-tile" data-icon="GH"><span className="skill-mark"><img src="https://cdn.simpleicons.org/github" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>GitHub</span></span>
          <span className="skill-tile" data-icon="Copilot"><span className="skill-mark"><img src="https://cdn.simpleicons.org/githubcopilot" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>GitHub Copilot</span></span>
          <span className="skill-tile" data-icon="W"><span className="skill-mark"><img src="https://cdn.simpleicons.org/wordpress" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>WordPress</span></span>
          <span className="skill-tile" data-icon="S"><span className="skill-mark"><img src="https://cdn.simpleicons.org/shopify" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Shopify</span></span>
          <span className="skill-tile" data-icon="F"><span className="skill-mark"><img src="https://cdn.simpleicons.org/figma" alt="" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></span><span>Figma</span></span>
          <span className="skill-tile" data-icon="SEO"><span className="skill-mark">SEO</span><span>SEO</span></span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ========== CLIENT EXPERIENCE ========== */}
<section className="client-experience" id="reviews" aria-labelledby="clientExperienceTitle">
  <div className="client-experience-inner container">
    <div className="client-experience-visual reveal">
      <img src="assets/images/reviews-office-meeting.png" alt="A client and developer discussing a project together" loading="lazy" />
      <span className="client-experience-caption">PAKISTAN · WORKING WORLDWIDE</span>
    </div>
    <div className="client-experience-copy reveal">
      <p className="client-experience-eyebrow">SAMPLE REVIEWS · DETAILS TO CONFIRM</p>
      <h2 id="clientExperienceTitle">What Say <em>Clients</em></h2>
      <p className="client-experience-intro">Sample review drafts about website, AI, and web app projects.</p>
      <div className="client-experience-window" aria-label="Sample client review drafts">
        <div className="client-experience-track">
          <div className="client-experience-list">
            <article className="client-review-card"><div className="client-review-project">WEBSITE &amp; ONLINE STORE</div><blockquote>“Muntaha turned our idea into a polished online store. The layout makes it easy for customers to explore products, and the finished website gives our brand a much stronger online presence.”</blockquote><div className="client-review-author"><strong>Sample client</strong><span>Country to confirm</span></div></article>
            <article className="client-review-card"><div className="client-review-project">AI WORKFLOW</div><blockquote>“The AI workflow Muntaha built has made our repeated tasks easier to manage. It fits our process well and gives us a practical way to save time.”</blockquote><div className="client-review-author"><strong>Sample client</strong><span>Country to confirm</span></div></article>
            <article className="client-review-card"><div className="client-review-project">WEB APPLICATION</div><blockquote>“Muntaha brought our web app idea to life with a clean, easy-to-use interface and a solid experience across the product.”</blockquote><div className="client-review-author"><strong>Sample client</strong><span>Country to confirm</span></div></article>
          </div>
          <div className="client-experience-list" aria-hidden="true">
            <article className="client-review-card"><div className="client-review-project">WEBSITE &amp; ONLINE STORE</div><blockquote>“Muntaha turned our idea into a polished online store. The layout makes it easy for customers to explore products, and the finished website gives our brand a much stronger online presence.”</blockquote><div className="client-review-author"><strong>Sample client</strong><span>Country to confirm</span></div></article>
            <article className="client-review-card"><div className="client-review-project">AI WORKFLOW</div><blockquote>“The AI workflow Muntaha built has made our repeated tasks easier to manage. It fits our process well and gives us a practical way to save time.”</blockquote><div className="client-review-author"><strong>Sample client</strong><span>Country to confirm</span></div></article>
            <article className="client-review-card"><div className="client-review-project">WEB APPLICATION</div><blockquote>“Muntaha brought our web app idea to life with a clean, easy-to-use interface and a solid experience across the product.”</blockquote><div className="client-review-author"><strong>Sample client</strong><span>Country to confirm</span></div></article>
          </div>
        </div>
      </div>
      <div className="client-experience-proof"><strong>100%</strong><span>Client satisfaction</span><a href="#/contact">Let’s work together <Icon name="arrowUpRight" size={16} /></a></div>
    </div>
  </div>
</section>

{/* ========== CONTACT ========== */}
<section className="contact" id="contact">
  <div className="container">
    <div className="contact-showcase">
      <div className="contact-photo-space has-image reveal">
        <img src="assets/images/contact-workspace-portrait.png" alt="Muntaha working at her laptop" />
      </div>
      <div className="contact-copy reveal">
        <p className="contact-eyebrow">CONTACT ME</p>
        <h2>Don’t Hesitate to <span>Contact Me</span></h2>
        <p className="contact-intro">Have a project in mind? Whether you need an AI workflow, a website, or a digital product, I’m here to help. Let’s bring your idea to life.</p>

        <div className="contact-direct-list">
          <a className="contact-direct-item" href="https://wa.me/923141163432" target="_blank" rel="noopener noreferrer">
            <span className="contact-direct-icon"><Icon name="phone" size={21} /></span>
            <span>+92 314 1163432</span>
          </a>
          <a className="contact-direct-item" href="mailto:muntahashafique6@gmail.com">
            <span className="contact-direct-icon"><Icon name="mail" size={21} /></span>
            <span>muntahashafique6@gmail.com</span>
          </a>
        </div>
        <div className="contact-social-links">
          <a href="https://www.linkedin.com/in/muntahashafiq/" target="_blank" rel="noopener noreferrer">LinkedIn <Icon name="arrowUpRight" size={15} /></a>
          <a href="https://github.com/muntaha-shafique" target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrowUpRight" size={15} /></a>
        </div>
      </div>
    </div>

    <div className="contact-invite reveal">
      <div className="contact-invite-copy">
        <p className="contact-eyebrow">LET’S BUILD SOMETHING</p>
        <h3>Interested in <span>working with me?</span></h3>
        <p>Tell me what you’re planning. I’ll help shape it into a clear next step.</p>
        <a className="contact-invite-button" href="#/contact">Get in touch <Icon name="arrowUpRight" size={17} /></a>
      </div>
      <div className="contact-invite-photo-space">
        <img src="assets/images/contact-invite-portrait.png" alt="Muntaha in a black hijab portrait emblem" />
      </div>
    </div>

  </div>
</section>

    </>
  );
}
