/**
 * Muntaha Shafique Portfolio
 * Navbar (reference style) + scroll portrait animation
 */

const initializePortfolio = () => {
  const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const heroTitle = document.querySelector('.hero-portfolio-text');
  if (heroTitle) {
    let letterIndex = 0;
    heroTitle.querySelectorAll('.hero-title-line').forEach((line) => {
      const words = line.textContent.trim().split(/\s+/);
      line.replaceChildren();
      words.forEach((word, wordIndex) => {
        if (wordIndex) line.appendChild(document.createTextNode('\u00a0'));
        [...word].forEach((letter) => {
          const span = document.createElement('span');
          span.className = 'hero-title-letter';
          span.style.animationDelay = `${letterIndex * 350}ms`;
          letterIndex += 1;
          span.textContent = letter;
          line.appendChild(span);
        });
      });
      heroTitle.classList.add('is-animated');
    });
  }

  const rotatingPhrase = document.querySelector('.hero-changing-phrase');
  if (rotatingPhrase && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const phrases = ['Modern Businesses', 'Growing Brands'];
    let phraseIndex = 0;
    window.setInterval(() => {
      rotatingPhrase.classList.add('is-changing');
      window.setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        rotatingPhrase.textContent = phrases[phraseIndex];
        rotatingPhrase.classList.remove('is-changing');
      }, 320);
    }, 2800);
  }

  /* ===== Navbar toggle (dropdown card) ===== */
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const dropdown = document.getElementById('navDropdown');

  document.querySelectorAll('.nav-desktop-links .nav-link').forEach((link) => {
    const label = link.textContent.trim();
    link.setAttribute('aria-label', label);
    const letters = document.createDocumentFragment();
    Array.from(label).forEach((character, letterIndex) => {
      const letter = document.createElement('span');
      letter.className = 'nav-letter';
      letter.setAttribute('aria-hidden', 'true');
      letter.style.setProperty('--hover-delay', `${letterIndex * 14}ms`);
      letter.textContent = character === ' ' ? '\u00a0' : character;
      letters.appendChild(letter);
    });
    link.replaceChildren(letters);
  });

  function openNav() {
    if (!navbar || !dropdown) return;
    navbar.classList.add('is-open');
    dropdown.hidden = false;
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    if (!navbar || !dropdown) return;
    navbar.classList.remove('is-open');
    dropdown.hidden = true;
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    if (navbar && navbar.classList.contains('is-open')) closeNav();
    else openNav();
  }

  if (toggle) toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNav();
  });

  if (dropdown) {
    dropdown.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => closeNav());
    });
  }

  document.addEventListener('click', (e) => {
    if (!navbar) return;
    if (navbar.classList.contains('is-open') && !navbar.contains(e.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ===== Navbar color: cream on dark hero, black on light sections ===== */
  const hero = document.getElementById('home') || document.querySelector('.contact-page-hero');
  const navWrap = document.getElementById('navWrap');

  // A soft cursor aura and drifting dust trail follow the pointer across both pages.
  const sitePointerCanvas = document.querySelector('.site-pointer-trail');
  const sitePointerAura = document.querySelector('.site-pointer-aura');
  const sitePointerContext = sitePointerCanvas ? sitePointerCanvas.getContext('2d') : null;
  const sitePointerParticles = [];
  const reducePointerMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let previousSitePointer = null;
  let pointerTrailFrame = 0;

  const resizeSitePointerCanvas = () => {
    if (!sitePointerCanvas || !sitePointerContext) return;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    sitePointerCanvas.width = Math.round(window.innerWidth * scale);
    sitePointerCanvas.height = Math.round(window.innerHeight * scale);
    sitePointerContext.setTransform(scale, 0, 0, scale, 0, 0);
  };

  const animateSitePointerTrail = () => {
    if (!sitePointerCanvas || !sitePointerContext) return;
    sitePointerContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let index = sitePointerParticles.length - 1; index >= 0; index -= 1) {
      const particle = sitePointerParticles[index];
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.022;
      if (particle.life <= 0) {
        sitePointerParticles.splice(index, 1);
        continue;
      }
      sitePointerContext.beginPath();
      sitePointerContext.globalAlpha = particle.life * 0.78;
      sitePointerContext.fillStyle = particle.color;
      sitePointerContext.shadowColor = 'rgba(226,232,211,.72)';
      sitePointerContext.shadowBlur = 5;
      sitePointerContext.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
      sitePointerContext.fill();
    }
    sitePointerContext.globalAlpha = 1;
    sitePointerContext.shadowBlur = 0;
    if (sitePointerParticles.length) pointerTrailFrame = window.requestAnimationFrame(animateSitePointerTrail);
    else pointerTrailFrame = 0;
  };

  if (sitePointerCanvas && sitePointerContext && hasFinePointer && !reducePointerMotion) {
    resizeSitePointerCanvas();
    window.addEventListener('resize', resizeSitePointerCanvas, { passive: true });
    document.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      if (event.target.closest('#home, .contact-page-hero, .footer')) {
        previousSitePointer = null;
        if (sitePointerAura) {
          sitePointerAura.style.setProperty('--site-pointer-x', '-400px');
          sitePointerAura.style.setProperty('--site-pointer-y', '-400px');
        }
        return;
      }
      const x = event.clientX;
      const y = event.clientY;
      if (sitePointerAura) {
        sitePointerAura.style.setProperty('--site-pointer-x', `${x}px`);
        sitePointerAura.style.setProperty('--site-pointer-y', `${y}px`);
      }
      if (previousSitePointer) {
        const distance = Math.hypot(x - previousSitePointer.x, y - previousSitePointer.y);
        if (distance > 8) {
          const count = Math.min(3, Math.floor(distance / 16));
          for (let i = 0; i < count; i += 1) {
            const progress = (i + 1) / count;
            sitePointerParticles.push({
              x: previousSitePointer.x + (x - previousSitePointer.x) * progress,
              y: previousSitePointer.y + (y - previousSitePointer.y) * progress,
              vx: (Math.random() - 0.5) * 0.36,
              vy: (Math.random() - 0.5) * 0.36,
              size: 1.4 + Math.random() * 1.2,
              life: 1,
              color: Math.random() > 0.5 ? '#30332d' : '#505448'
            });
          }
          if (sitePointerParticles.length > 90) sitePointerParticles.splice(0, sitePointerParticles.length - 90);
          if (!pointerTrailFrame) pointerTrailFrame = window.requestAnimationFrame(animateSitePointerTrail);
        }
      }
      previousSitePointer = { x, y };
    }, { passive: true });
    document.addEventListener('pointerleave', () => {
      previousSitePointer = null;
      if (sitePointerAura) {
        sitePointerAura.style.setProperty('--site-pointer-x', '-400px');
        sitePointerAura.style.setProperty('--site-pointer-y', '-400px');
      }
    });
  }

  // Keep the original sparkle spotlight in the page headers and footer.
  const attachHeaderPointerEffect = (header) => {
    if (!header || !hasFinePointer || reducePointerMotion) return;
    const portrait = header.querySelector('.hero-girl-container');
    const canvas = header.querySelector('.hero-cursor-trail');
    const context = canvas ? canvas.getContext('2d') : null;
    const particles = [];
    let previous = null;
    let frame = 0;

    const resize = () => {
      if (!canvas || !context) return;
      const rect = header.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const drawTrail = () => {
      if (!canvas || !context) return;
      const rect = header.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.025;
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        context.save();
        context.globalAlpha = particle.life * 0.86;
        context.translate(particle.x, particle.y);
        context.rotate(particle.angle += 0.018);
        context.fillStyle = '#d9e5c2';
        context.shadowColor = 'rgba(205,225,170,.8)';
        context.shadowBlur = 9;
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        context.restore();
      }
      if (particles.length) frame = window.requestAnimationFrame(drawTrail);
      else frame = 0;
    };

    if (canvas && context) {
      resize();
      window.addEventListener('resize', resize, { passive: true });
      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(resize);
        observer.observe(header);
      }
    }

    header.addEventListener('pointermove', (event) => {
      const rect = header.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      header.style.setProperty('--pointer-x', `${x}px`);
      header.style.setProperty('--pointer-y', `${y}px`);

      if (portrait) {
        portrait.style.setProperty('--girl-rotate-y', `${(x / rect.width - 0.5) * 10}deg`);
        portrait.style.setProperty('--girl-rotate-x', `${(0.5 - y / rect.height) * 7}deg`);
      }
      if (canvas && context && previous) {
        const distance = Math.hypot(x - previous.x, y - previous.y);
        if (distance > 7) {
          const count = Math.min(2, Math.floor(distance / 18) + 1);
          for (let i = 0; i < count; i += 1) {
            particles.push({
              x: previous.x + (x - previous.x) * (i + 1) / count,
              y: previous.y + (y - previous.y) * (i + 1) / count,
              vx: (Math.random() - 0.5) * 0.45,
              vy: -0.25 - Math.random() * 0.5,
              life: 1,
              size: 2 + Math.random() * 2.2,
              angle: Math.random() * Math.PI
            });
          }
          if (!frame) frame = window.requestAnimationFrame(drawTrail);
        }
      }
      previous = { x, y };
    }, { passive: true });

    header.addEventListener('pointerleave', () => {
      header.style.setProperty('--pointer-x', '50%');
      header.style.setProperty('--pointer-y', '45%');
      if (portrait) {
        portrait.style.setProperty('--girl-rotate-x', '0deg');
        portrait.style.setProperty('--girl-rotate-y', '0deg');
      }
      previous = null;
    });
  };

  attachHeaderPointerEffect(document.getElementById('home'));
  attachHeaderPointerEffect(document.querySelector('.contact-page-hero'));
  attachHeaderPointerEffect(document.querySelector('.footer'));

  // Bottom-left contact menu replaces the floating WhatsApp shortcut.
  const quickContact = document.getElementById('quickContact');
  const quickContactToggle = document.getElementById('quickContactToggle');
  const quickContactLinks = document.getElementById('quickContactLinks');
  if (quickContact && quickContactToggle && quickContactLinks) {
    quickContactToggle.addEventListener('click', () => {
      const isOpen = quickContactToggle.getAttribute('aria-expanded') === 'true';
      quickContactToggle.setAttribute('aria-expanded', String(!isOpen));
      quickContactToggle.setAttribute('aria-label', isOpen ? 'Open email and WhatsApp links' : 'Close contact links');
      quickContactLinks.hidden = isOpen;
      quickContact.classList.toggle('is-open', !isOpen);
    });
    document.addEventListener('click', (event) => {
      if (!quickContact.contains(event.target)) {
        quickContactToggle.setAttribute('aria-expanded', 'false');
        quickContactToggle.setAttribute('aria-label', 'Open email and WhatsApp links');
        quickContactLinks.hidden = true;
        quickContact.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        quickContactToggle.setAttribute('aria-expanded', 'false');
        quickContactLinks.hidden = true;
        quickContact.classList.remove('is-open');
      }
    });
  }

  // English portfolio assistant.
  const portfolioChat = document.getElementById('portfolioChat');
  const portfolioChatToggle = document.getElementById('portfolioChatToggle');
  const portfolioChatPanel = document.getElementById('portfolioChatPanel');
  const portfolioChatClose = document.getElementById('portfolioChatClose');
  const portfolioChatDelete = document.getElementById('portfolioChatDelete');
  const portfolioChatDeleteConfirm = document.getElementById('portfolioChatDeleteConfirm');
  const portfolioChatDeleteYes = document.getElementById('portfolioChatDeleteYes');
  const portfolioChatDeleteNo = document.getElementById('portfolioChatDeleteNo');
  if (portfolioChat && portfolioChatToggle && portfolioChatPanel) {
    const chatMessages = document.getElementById('portfolioChatMessages');
    const chatForm = document.getElementById('portfolioChatForm');
    const chatInput = document.getElementById('portfolioChatInput');
    const chatSuggestions = document.getElementById('portfolioChatSuggestions');
    const projects = [...document.querySelectorAll('.project-cover-card')].map((card) => ({
      title: card.querySelector('h3')?.textContent.trim() || '',
      description: card.querySelector('p')?.textContent.trim() || '',
      url: card.querySelector('.project-btn[href]')?.href || ''
    })).filter((project) => project.title);
    const skills = [...document.querySelectorAll('.skill-pill')].map((skill) => skill.textContent.trim()).filter(Boolean);

    const setPortfolioChatOpen = (open) => {
      portfolioChatPanel.hidden = !open;
      portfolioChatToggle.setAttribute('aria-expanded', String(open));
      portfolioChatToggle.setAttribute('aria-label', open ? 'Close portfolio assistant' : 'Open portfolio assistant');
      portfolioChat.classList.toggle('is-open', open);
      if (open) window.setTimeout(() => chatInput?.focus(), 80);
    };

    const appendChatMessage = (text, role = 'assistant', links = []) => {
      if (!chatMessages) return null;
      const row = document.createElement('div');
      row.className = `portfolio-chat-message-row is-${role}`;
      const meta = document.createElement('div');
      meta.className = 'portfolio-chat-meta';
      meta.textContent = role === 'user' ? `YOU  ${new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date())}` : `ASSISTANT  ${new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date())}`;
      const message = document.createElement('div');
      message.className = `portfolio-chat-message is-${role}`;
      message.textContent = text;
      links.forEach((item) => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
        if (item.external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
        message.append(document.createElement('br'), link);
      });
      row.append(meta, message);
      chatMessages.append(row);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return row;
    };

    const getAssistantReply = (question) => {
      const text = question.toLowerCase().replace(/[^a-z0-9+@.\s-]/g, ' ').replace(/\s+/g, ' ').trim();
      const project = projects.find((item) => text.includes(item.title.toLowerCase()));
      const contactLinks = [
        { label: 'Open Contact page', href: '#/contact' },
        { label: 'Email Muntaha', href: 'mailto:muntahashafique6@gmail.com' },
        { label: 'Message on WhatsApp', href: 'https://wa.me/923141163432', external: true }
      ];

      if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(text)) {
        return { text: 'Hello! I can help with Muntaha’s freelance services, projects, work process, timelines, pricing, experience, or contact details. What would you like to know?' };
      }
      if (/\b(thanks|thank you|thx)\b/.test(text)) return { text: 'You’re welcome! If you have a project in mind, I can also help you get in touch with Muntaha.' };
      if (/\b(price|pricing|cost|budget|rate|quote|estimate|charge|fee|expensive|cheap)\b/.test(text)) {
        return { text: 'There is no fixed price listed because every project has a different scope. Share what you want to build, its key features, and your target deadline; Muntaha can review the details and discuss an estimate.', links: contactLinks };
      }
      if (/\b(timeline|deadline|delivery date|duration|when can|how soon|turnaround|how long will|how long does|how long to build|how long to finish|project take)\b/.test(text)) {
        return { text: 'The timeline depends on the project scope, features, and feedback milestones. Muntaha can suggest a realistic schedule after reviewing your brief.', links: contactLinks };
      }
      if (/\b(available|availability|accepting clients|taking clients|taking freelance clients|new projects|start date|when can you start|hire|work with you|work together)\b/.test(text)) {
        return { text: 'For current availability, send Muntaha a short project brief. She can confirm whether the timing and scope are a good fit.', links: contactLinks };
      }
      if (/\b(process|workflow|how do you work|how does it work|steps|what happens|getting started|start a project)\b/.test(text)) {
        return { text: 'Muntaha’s process starts by understanding your goals and audience, then shaping the solution and milestones. She builds and refines it with your feedback, then prepares the finished product for launch. Share your idea to discuss the first step.', links: contactLinks };
      }
      if (/\b(revision|revisions|changes|feedback|maintenance|support|handover|source code|ownership|after launch|after delivery)\b/.test(text)) {
        return { text: 'Revision rounds, handover, and post-launch support depend on the project. Muntaha can agree the exact scope and support terms with you before work begins.', links: contactLinks };
      }
      if (/\b(payment|payments|pay|invoice|deposit|advance|milestone payment|payment method)\b/.test(text)) {
        return { text: 'Payment terms are agreed for each project based on its scope and milestones. Share your brief with Muntaha to discuss the details before starting.', links: contactLinks };
      }
      if (/\b(small business|small businesses|startup|startups|company|companies|agency|business owner|who do you work with|type of clients)\b/.test(text)) {
        return { text: 'Muntaha builds digital products and intelligent workflows tailored to real business needs. Share your business goals and requirements so she can confirm whether the project is a good fit.', links: contactLinks };
      }
      if (/\b(hosting|domain|website content|copywriting|nda|confidentiality|contract|content writing)\b/.test(text)) {
        return { text: 'Hosting, domain setup, content, confidentiality, and contract requirements are not listed as fixed packages. Muntaha can confirm what is included for your project when you share the brief.', links: contactLinks };
      }
      if (/\b(contact|email|whatsapp|phone|reach|linkedin|github|instagram|facebook|tiktok|medium|social links|social profiles|social accounts)\b/.test(text)) {
        const links = [...contactLinks];
        if (/\blinkedin\b/.test(text)) links.push({ label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/muntahashafiq/', external: true });
        if (/\bgithub\b/.test(text)) links.push({ label: 'GitHub profile', href: 'https://github.com/muntaha-shafique', external: true });
        if (/\binstagram\b/.test(text)) links.push({ label: 'Instagram profile', href: 'https://www.instagram.com/muntaha_shafique_/', external: true });
        if (/\bfacebook\b/.test(text)) links.push({ label: 'Facebook profile', href: 'https://www.facebook.com/profile.php?id=61591833424394', external: true });
        if (/\btiktok\b/.test(text)) links.push({ label: 'TikTok profile', href: 'https://www.tiktok.com/@muntaha_shafique?lang=en', external: true });
        if (/\bmedium\b/.test(text)) links.push({ label: 'Medium profile', href: 'https://medium.com/@muntaha_shafique', external: true });
        if (/\b(social links|social profiles|social accounts)\b/.test(text)) {
          links.push(
            { label: 'Instagram profile', href: 'https://www.instagram.com/muntaha_shafique_/', external: true },
            { label: 'Facebook profile', href: 'https://www.facebook.com/profile.php?id=61591833424394', external: true },
            { label: 'TikTok profile', href: 'https://www.tiktok.com/@muntaha_shafique?lang=en', external: true },
            { label: 'Medium profile', href: 'https://medium.com/@muntaha_shafique', external: true },
            { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/muntahashafiq/', external: true },
            { label: 'GitHub profile', href: 'https://github.com/muntaha-shafique', external: true }
          );
        } else if (!/\b(linkedin|github|instagram|facebook|tiktok|medium)\b/.test(text)) {
          links.push(
            { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/muntahashafiq/', external: true },
            { label: 'GitHub profile', href: 'https://github.com/muntaha-shafique', external: true }
          );
        }
        return { text: 'You can contact Muntaha through her Contact page, email, or WhatsApp. I’ve added the relevant links below.', links };
      }
      if (project) {
        return {
          text: `${project.title}: ${project.description || 'A featured project in Muntaha’s portfolio.'}`,
          links: project.url ? [{ label: 'Open this project', href: project.url, external: true }] : []
        };
      }
      if (/\b(projects?|portfolio|work samples|case studies)\b/.test(text)) {
        const names = [...new Set(projects.map((item) => item.title))];
        return { text: `Muntaha’s featured work includes ${names.join(', ')}. Ask me about any project by name and I’ll share its details and link.` };
      }
      if (/\b(skills?|technologies|tech stack|tools|programming languages)\b/.test(text)) {
        const uniqueSkills = [...new Set(skills)];
        return { text: uniqueSkills.length ? `Muntaha works with ${uniqueSkills.join(', ')}. Her focus includes agentic AI, full-stack development, backend systems, and polished web interfaces.` : 'Muntaha focuses on agentic AI, full-stack development, backend systems, and polished web interfaces.' };
      }
      if (/\b(services?|website|site|web app|application|app|automation|wordpress|ecommerce|e-commerce|landing page|ui ux|figma|design|seo|database|api|dashboard|agent|chatbot|workflow|mobile app|responsive|online store|software|portal|crm|redesign|bug fix|website update)\b/.test(text)) {
        return { text: 'Muntaha works on agentic AI and workflow automation, PHP/Laravel applications, WordPress and ecommerce websites, custom web apps and APIs, Figma UI/UX, database design, and technical SEO. Her portfolio also describes mobile-ready experiences and app backends. Tell her what you need and she can confirm the right scope.', links: contactLinks };
      }
      if (/\b(contact|email|whatsapp|phone|reach|linkedin|github)\b/.test(text)) {
        return {
          text: 'You can contact Muntaha by email or WhatsApp. She is also on LinkedIn and GitHub.',
          links: [
            { label: 'Email Muntaha', href: 'mailto:muntahashafique6@gmail.com' },
            { label: 'Message on WhatsApp', href: 'https://wa.me/923141163432', external: true },
            { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/muntahashafiq/', external: true },
            { label: 'GitHub profile', href: 'https://github.com/muntaha-shafique', external: true }
          ]
        };
      }
      if (/\b(years? of experience|how long has|since when|how many years)\b/.test(text)) {
        return { text: 'Muntaha’s portfolio lists 3+ years of freelance experience and says she has been creating since 2021. For details about a specific role, contact her directly.', links: [{ label: 'Request details', href: '#/contact' }] };
      }
      if (/\b(about|who is|who are you|who\'s|background|experience|years|what do you do|what does she do|tell me about|qualification|education|freelancer|freelance)\b/.test(text)) {
        return { text: 'Muntaha Shafique is an Agentic AI Engineer and Full-Stack Developer. Her portfolio highlights intelligent workflows, autonomous AI systems, and modern web products, with a focus on clear, reliable digital experiences. For a resume or specific qualifications, contact her directly.', links: [{ label: 'Request details', href: '#/contact' }] };
      }
      if (/\b(resume|cv|curriculum vitae)\b/.test(text)) {
        return { text: 'For Muntaha’s resume or more detailed experience, please contact her directly.', links: [{ label: 'Request it by email', href: 'mailto:muntahashafique6@gmail.com' }] };
      }
      if (/\b(location|country|based|timezone|remote|work remotely|international)\b/.test(text)) return { text: 'Muntaha is based in Pakistan. Remote project arrangements can be discussed based on your requirements and timeline.', links: [{ label: 'Open Contact page', href: '#/contact' }] };
      if (/\b(brief|requirements|what do you need|what should i send|start|begin|idea)\b/.test(text)) {
        return { text: 'To get started, share your goal, audience, key features, any example websites or designs, target launch date, and an approximate budget if you have one. Muntaha can then suggest the next step.', links: contactLinks };
      }
      return { text: 'I’m Muntaha’s portfolio assistant, so I can help with questions about her professional work only—her services, projects, experience, process, pricing, timelines, and contact details. Please ask me about Muntaha’s work and I’ll be glad to help.' };
    };

    const askAssistant = (question) => {
      const cleanQuestion = question.trim();
      if (!cleanQuestion) return;
      appendChatMessage(cleanQuestion, 'user');
      if (chatSuggestions) chatSuggestions.hidden = true;
      if (chatInput) chatInput.value = '';
      const typing = document.createElement('div');
      typing.className = 'portfolio-chat-message-row is-assistant';
      const typingMeta = document.createElement('div');
      typingMeta.className = 'portfolio-chat-meta';
      typingMeta.textContent = 'ASSISTANT';
      const typingBubble = document.createElement('div');
      typingBubble.className = 'portfolio-chat-message is-assistant is-typing';
      typingBubble.setAttribute('aria-label', 'Assistant is typing');
      typingBubble.innerHTML = '<i></i><i></i><i></i>';
      typing.append(typingMeta, typingBubble);
      chatMessages?.append(typing);
      if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
      window.setTimeout(() => {
        typing.remove();
        const reply = getAssistantReply(cleanQuestion);
        appendChatMessage(reply.text, 'assistant', reply.links || []);
      }, 450);
    };

    portfolioChatDelete?.addEventListener('click', () => {
      if (portfolioChatDeleteConfirm) portfolioChatDeleteConfirm.hidden = false;
    });
    portfolioChatDeleteNo?.addEventListener('click', () => {
      if (portfolioChatDeleteConfirm) portfolioChatDeleteConfirm.hidden = true;
    });
    portfolioChatDeleteYes?.addEventListener('click', () => {
      if (chatMessages) {
        chatMessages.replaceChildren();
        const welcomeRow = document.createElement('div');
        welcomeRow.className = 'portfolio-chat-message-row is-assistant';
        const welcomeMeta = document.createElement('div');
        welcomeMeta.className = 'portfolio-chat-meta';
        welcomeMeta.innerHTML = 'ASSISTANT <span>Ready</span>';
        const welcome = document.createElement('div');
        welcome.className = 'portfolio-chat-message is-assistant';
        welcome.textContent = 'Welcome! I’m Muntaha Shafique’s personal AI assistant. Ask me about her full-stack work, agentic AI systems, featured projects, or services. I can also help you get in touch.';
        welcomeRow.append(welcomeMeta, welcome);
        chatMessages.append(welcomeRow);
        chatMessages.scrollTop = 0;
      }
      if (chatSuggestions) chatSuggestions.hidden = false;
      if (portfolioChatDeleteConfirm) portfolioChatDeleteConfirm.hidden = true;
    });

    portfolioChatToggle.addEventListener('click', () => {
      setPortfolioChatOpen(portfolioChatPanel.hidden);
    });
    if (portfolioChatClose) {
      portfolioChatClose.addEventListener('click', () => {
        setPortfolioChatOpen(false);
        portfolioChatToggle.focus();
      });
    }
    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        askAssistant(chatInput.value);
      });
    }
    chatSuggestions?.addEventListener('click', (event) => {
      const suggestion = event.target.closest('button');
      if (suggestion) askAssistant(suggestion.textContent);
    });
    document.addEventListener('click', (event) => {
      if (!portfolioChat.contains(event.target)) setPortfolioChatOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !portfolioChatPanel.hidden) {
        setPortfolioChatOpen(false);
        portfolioChatToggle.focus();
      }
    });
  }

  function updateNavTheme() {
    if (navWrap) {
      if (window.scrollY > 180) {
        navWrap.classList.add('is-scrolled');
      } else {
        navWrap.classList.remove('is-scrolled');
      }
    }
    if (!navbar || !hero) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    // When hero bottom is above ~120px from top, we're on light content
    if (heroBottom < 120) {
      navbar.classList.add('on-light');
    } else {
      navbar.classList.remove('on-light');
    }
  }

  /* ===== Scroll top button ===== */
  const scrollTopBtn = document.getElementById('scrollTop');
  function updateScrollTop() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: scrollBehavior }));
  }

  /* ===== Smooth anchors ===== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#/')) return;
      const target = href.length > 1 ? document.getElementById(href.slice(1)) : null;
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: scrollBehavior });
    });
  });

  /* ===== Reveal ===== */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* One-time soft reveals for the portfolio's text-bearing cards and panels. */
  const textBoxTargets = Array.from(document.querySelectorAll(
    '.hero-left-card, .services-stack-left, .cover-card-inner, .project-cover-inner, .skill-tile, .contact-page-form-card, .contact-page-info-card, .contact-page-benefit, .contact-friendly-copy, .footer-brand, .footer-connect'
  )).filter((element) => !element.classList.contains('reveal') && !element.closest('.reveal'));

  if (textBoxTargets.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const textBoxObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const animation = element.animate([
          { opacity: 0, transform: 'translateY(36px) scale(.97)', filter: 'blur(7px)' },
          { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
        ], {
          duration: 780,
          delay: Number(element.dataset.textBoxDelay || 0),
          easing: 'cubic-bezier(.16,1,.3,1)',
          fill: 'both'
        });
        animation.onfinish = () => animation.cancel();

        const textParts = element.querySelectorAll('h2, h3, p, a, li, .stack-card-top, .project-cat, .project-cover-actions, .review-stars, .review-author, .contact-page-benefit > span');
        textParts.forEach((part, partIndex) => {
          const textAnimation = part.animate([
            { opacity: 0, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], {
            duration: 460,
            delay: 110 + partIndex * 55,
            easing: 'cubic-bezier(.2,.75,.25,1)',
            fill: 'both'
          });
          textAnimation.onfinish = () => textAnimation.cancel();
        });
        observer.unobserve(element);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -32px 0px' });

    textBoxTargets.forEach((element, index) => {
      element.dataset.textBoxDelay = String((index % 4) * 85);
      textBoxObserver.observe(element);
    });
  }

  /* ===== ONE portrait: hero → flip → about ===== */
  const portrait = document.getElementById('flyingPortrait');
  const slot = document.getElementById('aboutPhotoSlot');
  const spacer = document.querySelector('.hero-photo-spacer');
  const inner = portrait && portrait.querySelector('.flying-portrait-inner');
  const img = inner && inner.querySelector('img');

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  let portraitFrame = 0;
  let tiltX = 0;
  let tiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;

  // Unique mouse interaction on portrait
  if (portrait) {
    portrait.addEventListener('mousemove', (e) => {
      const r = portrait.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      targetTiltY = px * 18;  // rotateY
      targetTiltX = -py * 14; // rotateX
      schedulePortrait();
    });
    portrait.addEventListener('mouseleave', () => {
      targetTiltX = 0;
      targetTiltY = 0;
      schedulePortrait();
    });
  }

  function runPortrait() {
    if (!portrait || !slot || !spacer || !inner) return;

    const start = spacer.getBoundingClientRect();
    const end = slot.getBoundingClientRect();
    const vh = window.innerHeight;
    const marker = vh * 0.5;

    const startMid = start.top + start.height * 0.5;
    const endMid = end.top + end.height * 0.5;

    let progress;
    if (startMid >= marker) {
      progress = 0;
    } else if (endMid <= marker) {
      progress = 1;
    } else {
      const traveled = marker - startMid;
      const total = endMid - startMid;
      progress = total !== 0 ? traveled / total : 1;
    }
    progress = clamp(progress, 0, 1);
    const t = ease(progress);

    const w = lerp(start.width || 200, end.width || 340, t);
    const h = lerp(start.height || 240, end.height || 425, t);
    const x = lerp(start.left, end.left, t);
    const y = lerp(start.top, end.top, t);

    const rotateY = lerp(0, 180, t);
    const gray = lerp(1, 0, t);
    const bright = lerp(1.18, 1, t);
    const radius = lerp(20, 24, t);
    const faceFix = rotateY > 90 ? -1 : 1;

    tiltX = targetTiltX;
    tiltY = targetTiltY;

    portrait.style.width = w + 'px';
    portrait.style.height = h + 'px';
    portrait.style.borderRadius = radius + 'px';
    portrait.style.filter = 'grayscale(' + gray + ') brightness(' + bright + ')';
    portrait.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    inner.style.borderRadius = radius + 'px';
    // Scroll flip + mouse 3D tilt
    inner.style.transform = 'rotateY(' + (rotateY + tiltY) + 'deg) rotateX(' + tiltX + 'deg)';
    if (img) img.style.transform = 'scaleX(' + faceFix + ')';

    const slotVisible = end.bottom > 0 && end.top < vh;
    const heroVisible = start.bottom > 0;
    if (heroVisible || slotVisible || (progress > 0 && progress < 1)) {
      portrait.classList.add('is-active');
    } else {
      portrait.classList.remove('is-active');
    }

  }

  function schedulePortrait() {
    if (!portrait || portraitFrame) return;
    portraitFrame = requestAnimationFrame(() => {
      portraitFrame = 0;
      runPortrait();
    });
  }

  function onScroll() {
    updateNavTheme();
    updateScrollTop();
    schedulePortrait();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateNavTheme();
    schedulePortrait();
  });
  window.addEventListener('load', () => {
    updateNavTheme();
    schedulePortrait();
  });

  updateNavTheme();
  updateScrollTop();
  schedulePortrait();

  function isDesktopCoverflow() {
    return window.matchMedia('(min-width: 901px)').matches;
  }

  function resetCoverCardsMobile(cards) {
    cards.forEach((card) => {
      card.style.transform = '';
      card.style.opacity = '';
      card.style.zIndex = '';
      card.style.filter = '';
      card.classList.remove('is-active');
      card.classList.remove('is-transitioning');
    });
  }

  /* ===== Services 3D Coverflow — video-style continuous motion ===== */
  const coverflowSection = document.getElementById('services');
  const coverflowTrack = document.getElementById('coverflowTrack');
  const coverCards = coverflowTrack ? Array.from(coverflowTrack.querySelectorAll('.cover-card')) : [];
  const dotsContainer = document.getElementById('coverflowDots');
  const servicesMobileMore = document.getElementById('servicesMobileMore');
  const totalCards = coverCards.length;
  let coverProgress = 0;
  let coverTarget = 0;
  let lastDotIndex = -1;
  let coverAnimationFrame = 0;

  if (coverflowSection && coverCards.length) {
    if (servicesMobileMore) {
      servicesMobileMore.addEventListener('click', () => {
        const expanded = coverflowSection.classList.toggle('is-expanded');
        servicesMobileMore.setAttribute('aria-expanded', String(expanded));
        const label = servicesMobileMore.querySelector('span');
        if (label) label.textContent = expanded ? 'Show fewer services' : 'View more services';
        servicesMobileMore.classList.toggle('is-expanded', expanded);
      });
    }
    if (dotsContainer) {
      coverCards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'coverflow-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Go to service ' + (i + 1));
        dot.addEventListener('click', () => jumpToCard(i));
        dotsContainer.appendChild(dot);
      });
    }

    function jumpToCard(i) {
      const rect = coverflowSection.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollable = Math.max(coverflowSection.offsetHeight - window.innerHeight, 1);
      const target = sectionTop + (i / (totalCards - 1)) * scrollable;
      window.scrollTo({ top: target, behavior: scrollBehavior });
    }

    // Continuous 3D fan layout matching the video
    function layoutCoverflow(progress) {
      if (!isDesktopCoverflow()) {
        resetCoverCardsMobile(coverCards);
        return;
      }
      const center = progress;
      coverCards.forEach((card, i) => {
        const offset = i - center;
        const abs = Math.abs(offset);

        const rotateY = offset * -52;
        const translateX = offset * 175;
        const translateZ = -abs * 130 + (abs < 0.5 ? 110 : 0);
        const scale = Math.max(0.62, 1 - abs * 0.17);
        const opacity = abs > 3.3 ? 0 : Math.max(0.12, 1 - abs * 0.34);
        const brightness = abs < 0.35 ? 1 : Math.max(0.48, 1 - abs * 0.22);
        const zIndex = Math.round(120 - abs * 12);

        card.style.transform =
          'translateX(' + translateX + 'px) translateZ(' + translateZ + 'px) rotateY(' + rotateY + 'deg) scale(' + scale + ')';
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
        card.style.filter = 'brightness(' + brightness + ')';
        card.classList.toggle('is-active', abs < 0.4);
      });

      const nearest = Math.round(Math.max(0, Math.min(totalCards - 1, center)));
      if (nearest !== lastDotIndex && dotsContainer) {
        lastDotIndex = nearest;
        dotsContainer.querySelectorAll('.coverflow-dot').forEach((d, i) => {
          d.classList.toggle('is-active', i === nearest);
        });
      }
    }

    function animateCoverflow() {
      coverAnimationFrame = 0;
      if (!isDesktopCoverflow() || document.hidden) {
        coverProgress = coverTarget;
        resetCoverCardsMobile(coverCards);
        return;
      }
      const distance = coverTarget - coverProgress;
      if (Math.abs(distance) < 0.0015) {
        coverProgress = coverTarget;
        layoutCoverflow(coverProgress);
        coverCards.forEach((card) => card.classList.remove('is-transitioning'));
        return;
      }
      coverProgress += distance * 0.14;
      coverCards.forEach((card) => card.classList.add('is-transitioning'));
      layoutCoverflow(coverProgress);
      coverAnimationFrame = requestAnimationFrame(animateCoverflow);
    }

    function onCoverflowScroll() {
      if (document.hidden) return;
      if (!isDesktopCoverflow()) {
        if (coverAnimationFrame) window.cancelAnimationFrame(coverAnimationFrame);
        coverAnimationFrame = 0;
        coverProgress = 0;
        coverTarget = 0;
        resetCoverCardsMobile(coverCards);
        return;
      }
      const rect = coverflowSection.getBoundingClientRect();
      const sectionH = coverflowSection.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = -rect.top;
      const maxScroll = Math.max(sectionH - viewH, 1);
      let p = scrolled / maxScroll;
      p = Math.max(0, Math.min(1, p));
      coverTarget = p * (totalCards - 1);
      if (!coverAnimationFrame && Math.abs(coverTarget - coverProgress) >= 0.0015) {
        coverAnimationFrame = window.requestAnimationFrame(animateCoverflow);
      }
    }

    coverCards.forEach((card) => {
      card.addEventListener('click', () => {
        const i = parseInt(card.dataset.index, 10);
        jumpToCard(i);
      });
    });

    layoutCoverflow(0);
    window.addEventListener('scroll', onCoverflowScroll, { passive: true });
    window.addEventListener('resize', onCoverflowScroll, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (coverAnimationFrame) window.cancelAnimationFrame(coverAnimationFrame);
        coverAnimationFrame = 0;
      } else {
        onCoverflowScroll();
      }
    });
    onCoverflowScroll();
  }

  /* ===== Single-row project slider and project detail modal ===== */
  const projectSlider = document.getElementById('projectsCoverflow');
  const projectTrack = document.getElementById('projectsCoverflowTrack');
  const projectsMobileMore = document.getElementById('projectsMobileMore');
  const projectCards = projectTrack ? Array.from(projectTrack.querySelectorAll(':scope > .project-cover-card')) : [];
  const projectModal = document.getElementById('projectModal');
  const modalImage = document.getElementById('projectModalImage');
  const modalCategory = document.getElementById('projectModalCategory');
  const modalTitle = document.getElementById('projectModalTitle');
  const modalDescription = document.getElementById('projectModalDescription');
  const modalTech = document.getElementById('projectModalTech');
  const modalLink = document.getElementById('projectModalLink');
  let lastProjectTrigger = null;

  if (projectTrack && projectCards.length) {
    const originalGroup = document.createElement('div');
    originalGroup.className = 'project-slider-group';
    while (projectTrack.firstElementChild) originalGroup.appendChild(projectTrack.firstElementChild);
    projectTrack.appendChild(originalGroup);

    const duplicateGroup = originalGroup.cloneNode(true);
    duplicateGroup.classList.add('project-slider-group-copy');
    duplicateGroup.setAttribute('aria-hidden', 'true');
    duplicateGroup.querySelectorAll('.project-cover-card').forEach((card) => {
      card.removeAttribute('tabindex');
      card.querySelectorAll('a, button').forEach((link) => link.setAttribute('tabindex', '-1'));
    });
    projectTrack.appendChild(duplicateGroup);

    if (projectsMobileMore && projectSlider) {
      projectsMobileMore.addEventListener('click', () => {
        const expanded = projectSlider.classList.toggle('is-expanded');
        projectsMobileMore.setAttribute('aria-expanded', String(expanded));
        const label = projectsMobileMore.querySelector('span');
        if (label) label.textContent = expanded ? 'Show fewer projects' : 'View more projects';
        projectsMobileMore.classList.toggle('is-expanded', expanded);
      });
    }

    const sizeProjectCards = () => {
      const visibleCount = window.innerWidth >= 1200 ? 4 : window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1;
      const viewportStyle = window.getComputedStyle(projectSlider);
      const groupStyle = window.getComputedStyle(originalGroup);
      const outerPadding = (parseFloat(viewportStyle.paddingLeft) || 0) + (parseFloat(viewportStyle.paddingRight) || 0);
      const gap = parseFloat(groupStyle.columnGap || groupStyle.gap) || 20;
      const trailingSpace = parseFloat(groupStyle.paddingRight) || 0;
      const cardWidth = (projectSlider.clientWidth - outerPadding - gap * (visibleCount - 1) - trailingSpace) / visibleCount;
      projectTrack.querySelectorAll('.project-cover-card').forEach((card) => {
        card.style.flexBasis = Math.max(180, cardWidth) + 'px';
      });
    };
    sizeProjectCards();
    window.addEventListener('resize', sizeProjectCards, { passive: true });
  }

  function openProjectDetails(card) {
    if (!projectModal || !card) return;
    const isDuplicate = card.closest('.project-slider-group-copy');
    lastProjectTrigger = isDuplicate
      ? (projectCards.find((original) => original.dataset.index === card.dataset.index) || card)
      : card;
    const image = card.querySelector('.project-cover-img img');
    const category = card.querySelector('.project-cat');
    const title = card.querySelector('h3');
    const description = card.querySelector('.project-cover-body > p');
    const technologies = card.querySelectorAll('.project-tech span');
    const viewLink = card.querySelector('.project-cover-actions .project-btn:not(.project-btn-ghost)');

    if (modalImage) {
      const modalImageWrap = modalImage.parentElement;
      const coverArt = card.querySelector('.project-cover-img');
      if (modalImageWrap && coverArt) {
        modalImageWrap.style.background = window.getComputedStyle(coverArt).background;
      }
      if (image && image.style.display !== 'none') {
        modalImage.style.display = '';
        modalImage.src = image.currentSrc || image.src;
        modalImage.alt = image.alt;
        modalImage.onerror = () => { modalImage.style.display = 'none'; };
      } else {
        modalImage.removeAttribute('src');
        modalImage.style.display = 'none';
      }
    }
    if (modalCategory) modalCategory.textContent = category ? category.textContent : '';
    if (modalTitle) modalTitle.textContent = title ? title.textContent : 'Project details';
    if (modalDescription) modalDescription.textContent = description ? description.textContent : '';
    if (modalTech) {
      modalTech.replaceChildren(...Array.from(technologies, (tag) => {
        const chip = document.createElement('span');
        chip.textContent = tag.textContent;
        return chip;
      }));
    }
    if (modalLink && viewLink) modalLink.href = viewLink.href;

    projectModal.hidden = false;
    document.body.style.overflow = 'hidden';
    const closeButton = projectModal.querySelector('.project-modal-close');
    if (closeButton) closeButton.focus();
  }

  function closeProjectDetails() {
    if (!projectModal || projectModal.hidden) return;
    projectModal.hidden = true;
    document.body.style.overflow = '';
    if (lastProjectTrigger) lastProjectTrigger.focus();
  }

  if (projectTrack) {
    projectTrack.addEventListener('click', (event) => {
      const card = event.target.closest('.project-cover-card');
      if (!card || event.target.closest('a')) return;
      openProjectDetails(card);
    });
    projectTrack.addEventListener('keydown', (event) => {
      const card = event.target.closest('.project-cover-card');
      if (card && event.target === card && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        openProjectDetails(card);
      }
    });
  }

  if (projectModal) {
    projectModal.querySelectorAll('[data-close-project]').forEach((button) => button.addEventListener('click', closeProjectDetails));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeProjectDetails();
    });
  }



  /* ===== Contact form success popup ===== */
  const sitePopup = document.getElementById('sitePopup');
  function openSitePopup(title, message) {
    if (!sitePopup) return;
    const t = sitePopup.querySelector('#sitePopupTitle');
    const p = sitePopup.querySelector('.site-popup-card p');
    if (title && t) t.textContent = title;
    if (message && p) p.textContent = message;
    sitePopup.hidden = false;
    requestAnimationFrame(() => sitePopup.classList.add('is-open'));
  }
  function closeSitePopup() {
    if (!sitePopup) return;
    sitePopup.classList.remove('is-open');
    setTimeout(() => { sitePopup.hidden = true; }, 250);
  }
  if (sitePopup) {
    sitePopup.querySelectorAll('[data-close-popup]').forEach((el) => {
      el.addEventListener('click', closeSitePopup);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSitePopup();
    });
    if (sitePopup.classList.contains('is-open')) {
      sitePopup.hidden = false;
    }
  }

  // Let the portfolio robot follow the pointer while it is over a card or tile.
  const hoverRobot = document.getElementById('portfolioHoverRobot');
  const hoverRobotTargets = '.statement-card, .cover-card, .project-cover-card, .skill-tile, .skills-group, .process-panel, .process-steps li, .contact-photo-space, .contact-invite, .contact-form, .contact-direct-item, a[href], button';
  const hoverRobotBlockedAreas = 'header, nav, footer, .nav-wrap, .navbar, .hero-nav, .hero, .quick-contact, .portfolio-chat';
  if (hoverRobot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const findHoverRobotTarget = (node) => {
      if (!(node instanceof Element)) return null;
      const target = node.closest(hoverRobotTargets);
      return target && !target.closest(hoverRobotBlockedAreas) ? target : null;
    };

    const placeHoverRobot = (event) => {
      const target = findHoverRobotTarget(event.target);
      if (!target) {
        hoverRobot.classList.remove('is-visible');
        return;
      }

      const offset = 18;
      const robotWidth = hoverRobot.offsetWidth || 72;
      const robotHeight = hoverRobot.offsetHeight || 72;
      const left = event.clientX + offset + robotWidth > window.innerWidth
        ? event.clientX - robotWidth - offset
        : event.clientX + offset;
      const top = event.clientY + offset + robotHeight > window.innerHeight
        ? event.clientY - robotHeight - offset
        : event.clientY + offset;

      hoverRobot.style.left = `${Math.max(8, left)}px`;
      hoverRobot.style.top = `${Math.max(8, top)}px`;
      hoverRobot.classList.add('is-visible');
    };

    document.addEventListener('pointermove', placeHoverRobot, { passive: true });
    document.addEventListener('pointerover', placeHoverRobot, { passive: true });
    document.addEventListener('pointerout', (event) => {
      if (findHoverRobotTarget(event.relatedTarget)) return;
      hoverRobot.classList.remove('is-visible');
    }, { passive: true });
  }

};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio, { once: true });
} else {
  initializePortfolio();
}

// Count the About statistics up quickly the first time they enter view.
(() => {
  const counters = document.querySelectorAll('.about-counter[data-count-to]');
  if (!counters.length) return;

  const setFinalValue = (counter) => {
    counter.textContent = `${counter.dataset.countTo}${counter.dataset.countSuffix || ''}`;
  };

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.countTo || 0);
    const suffix = counter.dataset.countSuffix || '';
    const duration = 850;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else setFinalValue(counter);
    };

    requestAnimationFrame(tick);
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    counters.forEach(setFinalValue);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  counters.forEach((counter) => observer.observe(counter));
})();
