/* ===============================
   NAVBAR DOTS (SAFE)
================================ */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('dotsCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = 100;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const dots = [];
  const numDots = 50;

  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = '#05c6fc';
      ctx.fill();

      dot.x += dot.dx;
      dot.y += dot.dy;

      if (dot.x > canvas.width) dot.x = 0;
      if (dot.x < 0) dot.x = canvas.width;
      if (dot.y > canvas.height) dot.y = 0;
      if (dot.y < 0) dot.y = canvas.height;
    });

    requestAnimationFrame(animate);
  }

  animate();
});

/* ===============================
   FLOATING FOOTER TOGGLE
================================ */
document.addEventListener('DOMContentLoaded', () => {
  const floatingFooters = document.querySelectorAll('.floating-footer');
  if (!floatingFooters.length) return;

  function toggleFloatingFooter() {
    const canScroll = document.documentElement.scrollHeight > window.innerHeight + 20;

    floatingFooters.forEach(f => {
      if (!canScroll || window.scrollY > 120) {
        f.classList.add('show');
      } else {
        f.classList.remove('show');
      }
    });
  }

  window.addEventListener('scroll', toggleFloatingFooter);
  window.addEventListener('resize', toggleFloatingFooter);
  toggleFloatingFooter();
});

/* ===============================
   PROJECT MODAL (ONE SOURCE OF TRUTH)
================================ */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('projectModal');
  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  const allowedDemoHosts = new Set([
    'covenant-blessed-site.lovable.app',
    'ferrari.teodordev.co.za',
    'site1.teodordev.co.za',
    'site2.teodordev.co.za',
    'site3.teodordev.co.za',
    'site4.teodordev.co.za',
    'wedding.teodordev.co.za',
    'wp3.theodorenelson.co.za',
    'wp4.theodorenelson.co.za',
    'wp5.theodorenelson.co.za',
    'wp6.theodorenelson.co.za',
    'wp8.theodorenelson.co.za'
  ]);

  function getSafeDemoUrl(rawUrl) {
    if (!rawUrl) return null;

    try {
      const parsedUrl = new URL(rawUrl, window.location.origin);
      if (parsedUrl.protocol !== 'https:' || !allowedDemoHosts.has(parsedUrl.hostname)) {
        return null;
      }

      return parsedUrl.toString();
    } catch {
      return null;
    }
  }

  function getSafeImagePath(rawPath) {
    if (!rawPath) return '';
    return /^[a-z0-9_-]+\.(png|jpg|jpeg|webp|gif|svg)$/i.test(rawPath) ? rawPath : '';
  }

  function openProjectModal(card) {
    const title = card.dataset.title || '';
    const modalImg = document.getElementById('projectModalImg');
    const modalDemoBtn = document.getElementById('projectModalDemoBtn');
    const safeDemoUrl = getSafeDemoUrl(card.dataset.demo);
    const safeImagePath = getSafeImagePath(card.dataset.img);

    document.getElementById('projectModalLabel').textContent = title;
    modalImg.src = safeImagePath;
    modalImg.alt = title ? `${title} preview` : 'Project preview';
    document.getElementById('projectModalDesc').textContent = card.dataset.desc || '';
    document.getElementById('projectModalTech').textContent = card.dataset.tech || '';
    modalDemoBtn.href = safeDemoUrl || '#';
    modalDemoBtn.setAttribute('aria-disabled', safeDemoUrl ? 'false' : 'true');
    modalDemoBtn.classList.toggle('disabled', !safeDemoUrl);

    modal.show();
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      openProjectModal(card);
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', event => {
      event.stopPropagation();
    });
  });
});

/* ===============================
   PRICING FORM ROUTING
================================ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('pricing-contact-form');
  const projectModel = document.getElementById('project-model');
  const subjectField = document.getElementById('form-subject');
  const routeField = document.getElementById('enquiry-route');
  const followupField = document.getElementById('followup-document');
  const qualificationField = document.getElementById('qualification-form');
  const projectModelNote = document.getElementById('project-model-note');

  if (!form || !projectModel || !subjectField || !routeField || !followupField || !qualificationField || !projectModelNote) {
    return;
  }

  function getMonthlyGuideUrl() {
    return new URL('monthly-plan-guide.html', window.location.href).toString();
  }

  function getQualificationFormUrl() {
    return 'https://docs.google.com/forms/d/e/1FAIpQLSeLJJBFGW5cLMWCRofuarrPMCMuj5Tm8bD7e64GitC-KL9NLw/viewform?usp=dialog';
  }

  function updateProjectRouting() {
    const value = projectModel.value;

    if (value === 'monthly-plan') {
      subjectField.value = 'New Monthly Plan Enquiry';
      routeField.value = 'monthly-plan';
      followupField.value = getMonthlyGuideUrl();
      qualificationField.value = getQualificationFormUrl();
      projectModelNote.textContent = 'Monthly-plan enquiries can be routed to an automatic follow-up email with your guide and qualification form.';
      return;
    }

    if (value === 'once-off-build') {
      subjectField.value = 'New Once-Off Digital Build Enquiry';
      routeField.value = 'once-off-build';
      followupField.value = '';
      qualificationField.value = '';
      projectModelNote.textContent = 'Once-off build enquiries stay on the standard project-quote path.';
      return;
    }

    subjectField.value = 'New Digital Build Enquiry';
    routeField.value = 'general';
    followupField.value = '';
    qualificationField.value = '';
    projectModelNote.textContent = 'Choose the option that fits best. Monthly-plan enquiries can be routed to a dedicated follow-up guide automatically.';
  }

  projectModel.addEventListener('change', updateProjectRouting);
  updateProjectRouting();
});

/* ===============================
   SITE INTRO + WEBSITE MAKER
================================ */
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('maker-intro');

  if (intro) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      intro.remove();
    } else {
      intro.classList.add('maker-intro-active');
      window.setTimeout(() => {
        intro.classList.add('maker-intro-hide');
        window.setTimeout(() => intro.remove(), 650);
      }, 3200);
    }
  }

  const form = document.getElementById('website-maker-form');
  const preview = document.getElementById('generated-site-preview');
  const promptInput = document.getElementById('maker-prompt');
  const businessInput = document.getElementById('maker-business-name');
  const industryInput = document.getElementById('maker-industry');
  const styleInput = document.getElementById('maker-style');
  const previewShell = document.getElementById('maker-preview-shell');
  const templateLabel = document.getElementById('maker-template-label');
  const briefEl = document.getElementById('maker-brief');
  const paletteEl = document.getElementById('maker-palette');
  const copyButton = document.getElementById('maker-copy-brief');
  const randomizeButton = document.getElementById('maker-randomize');

  if (!form || !preview || !promptInput || !businessInput || !industryInput || !styleInput || !previewShell || !templateLabel || !briefEl || !paletteEl) {
    return;
  }

  const industries = {
    'local-service': {
      label: 'Local service',
      className: 'industry-local-service',
      keywords: ['contractor', 'plumber', 'electrician', 'builder', 'cleaning', 'landscaping', 'repair', 'maintenance', 'service'],
      kicker: 'Reliable Local Service',
      headline: 'Professional service that feels easy to trust from the first visit.',
      subheadline: 'A practical website concept built around clear offers, fast enquiries, local credibility, and confident next steps.',
      primaryCta: 'Request A Quote',
      secondaryCta: 'View Services',
      navCta: 'Get Quote',
      visualLabel: 'Quote Flow',
      visualText: 'Service areas, trust badges, proof, and a direct enquiry path.',
      proof: [
        ['24h', 'quote target'],
        ['Local', 'service areas'],
        ['5+', 'trust signals']
      ],
      floating: [
        ['New quote request', 'Service fit checked'],
        ['Local proof', 'Recent job photos']
      ],
      sections: [
        ['Service packages', 'Organize core services so visitors can quickly match their problem to the right solution.'],
        ['Local proof', 'Use reviews, completed work, service areas, and response-time promises to build confidence.'],
        ['Quote pathway', 'Make the enquiry form simple, visible, and focused on qualified leads.']
      ],
      offerTitle: 'Show the service, proof, and quote path on one screen.',
      offerText: 'A practical lead section with service cards, service-area notes, recent work, and an enquiry form that filters serious requests.',
      offerPoints: ['Before-and-after proof', 'Service area clarity', 'Fast quote request'],
      testimonial: ['"I knew exactly what they did, where they worked, and how to ask for a quote."', 'Local homeowner reaction'],
      contactTitle: 'Turn local visitors into quote requests.',
      contactText: 'Capture the job type, area, urgency, contact details, and budget cues without making the form feel heavy.',
      contactCta: 'Send Quote Brief',
      pages: ['Home', 'Services', 'Areas', 'Quote'],
      leadPlan: ['Turn urgent service needs into quote requests.', 'Use service-area proof, recent work, response expectations, and a short job-detail form to qualify local leads.'],
      priority: ['Launch the quote path first.', 'Start with homepage, services, proof, and contact flow, then add project galleries and location pages.']
    },
    restaurant: {
      label: 'Restaurant',
      className: 'industry-restaurant',
      keywords: ['restaurant', 'cafe', 'coffee', 'bar', 'bakery', 'menu', 'chef', 'food', 'dining'],
      kicker: 'Memorable Dining Experience',
      headline: 'A warm digital front door for guests ready to book a table.',
      subheadline: 'A restaurant concept with menu highlights, atmosphere, booking actions, event prompts, and story-led brand detail.',
      primaryCta: 'Book A Table',
      secondaryCta: 'Explore Menu',
      navCta: 'Reserve',
      visualLabel: 'Featured Menu',
      visualText: 'Signature dishes, booking prompts, gallery moments, and guest reviews.',
      proof: [
        ['Tonight', 'booking focus'],
        ['4.8', 'guest rating'],
        ['Menu', 'highlights']
      ],
      floating: [
        ['Table request', 'Dinner for 4'],
        ['Guest proof', 'Loved by locals']
      ],
      sections: [
        ['Menu highlights', 'Show signature dishes, seasonal specials, and clear reasons to visit.'],
        ['Atmosphere', 'Use visual storytelling to communicate the dining experience before guests arrive.'],
        ['Reservations', 'Keep booking, hours, location, and contact details close to every decision point.']
      ],
      offerTitle: 'Make guests hungry, confident, and ready to reserve.',
      offerText: 'A restaurant section with signature dishes, opening hours, private-event prompts, and a booking flow close to the food imagery.',
      offerPoints: ['Signature dish cards', 'Hours and location', 'Private event enquiry'],
      testimonial: ['"The photos and menu made it feel like the right place before we booked."', 'First-time guest reaction'],
      contactTitle: 'Move visitors from craving to reservation.',
      contactText: 'Collect booking details, event enquiries, and menu interest while the visual experience is still fresh.',
      contactCta: 'Send Restaurant Concept',
      pages: ['Home', 'Menu', 'Bookings', 'Events'],
      leadPlan: ['Turn appetite into reservations and event enquiries.', 'Keep menu highlights, atmosphere, hours, location, and booking actions visible before visitors drift away.'],
      priority: ['Launch the booking journey first.', 'Start with menu highlights, reservation flow, location, and private-event enquiry before deeper chef or gallery content.']
    },
    health: {
      label: 'Health and wellness',
      className: 'industry-health',
      keywords: ['dentist', 'dental', 'doctor', 'clinic', 'spa', 'wellness', 'fitness', 'therapy', 'medical', 'health'],
      kicker: 'Premium Care Experience',
      headline: 'Calm, confident care built around clarity and trust.',
      subheadline: 'A polished website concept for a care provider that needs stronger bookings, clearer services, and a reassuring first impression.',
      primaryCta: 'Book A Consultation',
      secondaryCta: 'View Services',
      navCta: 'Book Now',
      visualLabel: 'Care Plan',
      visualText: 'Trust signals, service pathways, and a simple booking flow.',
      proof: [
        ['4.9', 'review score'],
        ['24h', 'reply target'],
        ['3', 'clear next steps']
      ],
      floating: [
        ['New client enquiry', 'Ready to book'],
        ['Trust signal', 'Verified reviews']
      ],
      sections: [
        ['Signature services', 'Present key treatments, sessions, or packages with calm explanations and clear outcomes.'],
        ['Proof and confidence', 'Use credentials, patient guidance, reviews, and process notes to reduce uncertainty.'],
        ['Booking journey', 'Guide visitors toward a consultation with minimal friction.']
      ],
      offerTitle: 'Everything a patient needs before booking.',
      offerText: 'A focused service block with outcomes, pricing cues, process notes, and answers to common decision questions.',
      offerPoints: ['Clear service pathways', 'Review-led trust section', 'Short booking form'],
      testimonial: ['"The website made the clinic feel calm, credible, and easy to contact."', 'Ideal patient reaction'],
      contactTitle: 'Make the first appointment feel simple.',
      contactText: 'Capture the service needed, preferred date, contact details, and any concerns before the consultation.',
      contactCta: 'Send Health Concept',
      pages: ['Home', 'Treatments', 'Reviews', 'Booking'],
      leadPlan: ['Turn service interest into consultation requests.', 'Use the hero CTA, treatment pathways, review proof, and a short booking form to qualify serious enquiries.'],
      priority: ['Launch the trust-building pages first.', 'Start with the homepage, core treatments, proof, and contact flow before adding deeper education content.']
    },
    legal: {
      label: 'Legal and finance',
      className: 'industry-legal',
      keywords: ['law', 'lawyer', 'attorney', 'legal', 'finance', 'accounting', 'tax', 'insurance', 'consulting'],
      kicker: 'Serious Professional Guidance',
      headline: 'A credible advisory website for clients making important decisions.',
      subheadline: 'A structured concept with practice areas, proof, consultation prompts, and a composed professional tone.',
      primaryCta: 'Schedule A Consultation',
      secondaryCta: 'View Expertise',
      navCta: 'Consult',
      visualLabel: 'Case Intake',
      visualText: 'Practice areas, client fit, credentials, and consultation routing.',
      proof: [
        ['15+', 'years framed'],
        ['Clear', 'case intake'],
        ['Private', 'consultation']
      ],
      floating: [
        ['Consultation request', 'Matter type selected'],
        ['Authority signal', 'Credentials visible']
      ],
      sections: [
        ['Practice areas', 'Separate services by client need so visitors understand the right path quickly.'],
        ['Authority signals', 'Highlight qualifications, experience, process, and client outcomes with restraint.'],
        ['Consultation flow', 'Invite qualified enquiries with a clear first-step form and expectation setting.']
      ],
      offerTitle: 'Help serious clients understand the right next step.',
      offerText: 'A professional intake section with practice areas, qualification cues, confidentiality reassurance, and a consultation request.',
      offerPoints: ['Practice-area routing', 'Credential highlights', 'Confidential enquiry flow'],
      testimonial: ['"It felt serious, clear, and gave me confidence to book a consultation."', 'Qualified client reaction'],
      contactTitle: 'Route the right clients into consultation.',
      contactText: 'Collect matter type, urgency, contact preference, and context without giving legal advice on the page.',
      contactCta: 'Send Advisory Concept',
      pages: ['Home', 'Expertise', 'Process', 'Consult'],
      leadPlan: ['Turn uncertainty into qualified consultation requests.', 'Use practice-area routing, authority signals, confidentiality language, and matter-type fields to filter serious leads.'],
      priority: ['Launch the credibility path first.', 'Start with practice areas, consultation expectations, credentials, and the contact route before adding detailed resources.']
    },
    creative: {
      label: 'Portfolio',
      className: 'industry-creative',
      keywords: ['portfolio', 'photographer', 'designer', 'artist', 'creative', 'studio', 'agency', 'gallery', 'fashion'],
      kicker: 'Creative Portfolio System',
      headline: 'An editorial showcase that turns attention into serious enquiries.',
      subheadline: 'A visual-first concept with selected work, services, process, packages, and a refined contact path.',
      primaryCta: 'Start A Project',
      secondaryCta: 'View Work',
      navCta: 'Enquire',
      visualLabel: 'Selected Work',
      visualText: 'Project stories, image-led sections, service detail, and enquiry prompts.',
      proof: [
        ['12', 'featured works'],
        ['3', 'package paths'],
        ['Brief', 'ready form']
      ],
      floating: [
        ['Project enquiry', 'Style direction saved'],
        ['Portfolio proof', 'Featured case study']
      ],
      sections: [
        ['Featured work', 'Lead with strongest projects and short context that explains the value behind the visuals.'],
        ['Services', 'Make offers easy to understand without flattening the creative personality.'],
        ['Project enquiry', 'Guide visitors into a brief with budget, style, timeline, and goals.']
      ],
      offerTitle: 'Let the work sell, then make the enquiry easy.',
      offerText: 'An editorial project section with image-led case studies, service options, process notes, and a brief that captures intent.',
      offerPoints: ['Case-study gallery', 'Package comparison', 'Project brief form'],
      testimonial: ['"The portfolio felt premium, but the enquiry process was still clear."', 'Creative buyer reaction'],
      contactTitle: 'Turn attention into a serious project brief.',
      contactText: 'Capture style, budget, date, project type, and references so the first conversation is productive.',
      contactCta: 'Send Portfolio Concept',
      pages: ['Home', 'Work', 'Packages', 'Brief'],
      leadPlan: ['Turn visual interest into project briefs.', 'Use selected case studies, package cues, process notes, and a short brief form to separate browsers from buyers.'],
      priority: ['Launch the strongest work first.', 'Start with a curated homepage, featured work, service packages, and enquiry brief before adding a full archive.']
    },
    saas: {
      label: 'SaaS or app',
      className: 'industry-saas',
      keywords: ['saas', 'software', 'app', 'dashboard', 'platform', 'tool', 'product', 'startup', 'automation'],
      kicker: 'Product-led Growth Page',
      headline: 'A clean product website that explains value fast and drives signups.',
      subheadline: 'A SaaS concept with benefit-led messaging, feature blocks, workflow examples, pricing, and product calls to action.',
      primaryCta: 'Start Free',
      secondaryCta: 'See Features',
      navCta: 'Start Free',
      visualLabel: 'Product Flow',
      visualText: 'Dashboard preview, feature pathways, integrations, and pricing prompts.',
      proof: [
        ['14d', 'trial path'],
        ['3', 'core workflows'],
        ['Demo', 'CTA ready']
      ],
      floating: [
        ['Signup intent', 'Trial started'],
        ['Product proof', 'Workflow preview']
      ],
      sections: [
        ['Core benefits', 'Explain the business outcome before listing features.'],
        ['Product workflow', 'Show how users move from problem to result inside the product.'],
        ['Pricing path', 'Make trial, demo, and paid plan options easy to compare.']
      ],
      offerTitle: 'Show the product before asking for the signup.',
      offerText: 'A product-led section with workflow screenshots, benefit cards, integrations, pricing cues, and a demo/trial split.',
      offerPoints: ['Dashboard preview', 'Feature-to-benefit cards', 'Trial and demo paths'],
      testimonial: ['"I understood the workflow before I even opened the product."', 'Product buyer reaction'],
      contactTitle: 'Convert interest into trials and demos.',
      contactText: 'Route visitors to a trial, demo request, or pricing conversation depending on company fit.',
      contactCta: 'Send SaaS Concept',
      pages: ['Home', 'Features', 'Pricing', 'Demo'],
      leadPlan: ['Turn product curiosity into trials and demos.', 'Use benefit-led messaging, workflow previews, pricing cues, and a demo route for higher-intent visitors.'],
      priority: ['Launch the product story first.', 'Start with homepage, feature workflow, pricing path, and demo/trial conversion before adding integrations and docs.']
    }
  };

  const styles = {
    modern: {
      label: 'Modern',
      keywords: ['modern', 'clean', 'fresh', 'professional', 'corporate'],
      colors: ['#0c4f82', '#11a0d8', '#f5f8fb', '#122033'],
      className: 'theme-modern'
    },
    luxury: {
      label: 'Luxury',
      keywords: ['luxury', 'premium', 'elegant', 'exclusive', 'high end', 'executive'],
      colors: ['#172033', '#b99157', '#f7f2ea', '#ffffff'],
      className: 'theme-luxury'
    },
    friendly: {
      label: 'Friendly',
      keywords: ['friendly', 'warm', 'playful', 'approachable', 'family'],
      colors: ['#256c5f', '#f4a261', '#fff7ed', '#18332f'],
      className: 'theme-friendly'
    },
    bold: {
      label: 'Bold',
      keywords: ['bold', 'energetic', 'sport', 'fitness', 'launch', 'bright'],
      colors: ['#111827', '#ef4444', '#facc15', '#ffffff'],
      className: 'theme-bold'
    },
    minimal: {
      label: 'Minimal',
      keywords: ['minimal', 'simple', 'quiet', 'calm', 'sleek'],
      colors: ['#1f2937', '#6b7280', '#f9fafb', '#ffffff'],
      className: 'theme-minimal'
    }
  };

  const remixes = [
    'Create a luxury website for a dental clinic that wants more bookings, a calm premium feel, strong trust signals, and clear service sections.',
    'Build a bold website for a restaurant with online booking, menu highlights, chef story, and warm premium colours.',
    'Make a trustworthy website for a law firm with practice areas, testimonials, consultation calls, and a serious professional look.',
    'Create a modern portfolio website for a photographer with project galleries, services, packages, and a creative editorial style.',
    'Generate a clean SaaS landing page for a task management app with feature blocks, pricing, integrations, and a product-led call to action.',
    'Design a friendly website for a local cleaning company with service areas, reviews, before-and-after proof, and quote requests.'
  ];

  let currentConcept = null;

  function matchByKeywords(collection, prompt, fallbackKey) {
    const normalizedPrompt = prompt.toLowerCase();
    let bestKey = fallbackKey;
    let bestScore = -1;

    Object.entries(collection).forEach(([key, item]) => {
      const score = item.keywords.reduce((total, keyword) => {
        return normalizedPrompt.includes(keyword) ? total + 1 : total;
      }, 0);

      if (score > bestScore) {
        bestScore = score;
        bestKey = key;
      }
    });

    return bestKey;
  }

  function getConcept() {
    const prompt = promptInput.value.trim();
    const businessName = businessInput.value.trim() || 'Your Business';
    const industryKey = industryInput.value === 'auto' ? matchByKeywords(industries, prompt, 'local-service') : industryInput.value;
    const styleKey = styleInput.value === 'auto' ? matchByKeywords(styles, prompt, 'modern') : styleInput.value;
    const industry = industries[industryKey] || industries['local-service'];
    const style = styles[styleKey] || styles.modern;

    return {
      businessName,
      prompt,
      industryKey,
      styleKey,
      industry,
      style,
      brief: `${businessName}: ${style.label.toLowerCase()} ${industry.label.toLowerCase()} website concept with ${industry.sections.map(section => section[0].toLowerCase()).join(', ')}, and a strong "${industry.primaryCta}" call to action.`
    };
  }

  function setMakerText(name, value) {
    const target = preview.querySelector(`[data-maker="${name}"]`) || document.querySelector(`[data-maker="${name}"]`);
    if (target) target.textContent = value;
  }

  function renderPalette(colors) {
    paletteEl.innerHTML = '';
    colors.forEach(color => {
      const swatch = document.createElement('span');
      swatch.style.background = color;
      swatch.title = color;
      paletteEl.appendChild(swatch);
    });
  }

  function renderConcept() {
    currentConcept = getConcept();
    const { businessName, industry, style } = currentConcept;
    const leadConceptInput = document.getElementById('maker-lead-concept');
    const leadPromptInput = document.getElementById('maker-lead-prompt');
    const leadStyleInput = document.getElementById('maker-lead-style');
    const leadIndustryInput = document.getElementById('maker-lead-industry');
    const leadPagesInput = document.getElementById('maker-lead-pages');
    const leadStrategyInput = document.getElementById('maker-lead-strategy');

    preview.classList.remove(
      ...Object.values(styles).map(item => item.className),
      ...Object.values(industries).map(item => item.className)
    );
    preview.classList.add(style.className, industry.className);

    setMakerText('brand', businessName);
    setMakerText('kicker', industry.kicker);
    setMakerText('headline', industry.headline);
    setMakerText('subheadline', industry.subheadline);
    setMakerText('primaryCta', industry.primaryCta);
    setMakerText('secondaryCta', industry.secondaryCta);
    setMakerText('navCta', industry.navCta);
    setMakerText('visualLabel', industry.visualLabel);
    setMakerText('visualText', industry.visualText);
    setMakerText('proofOneValue', industry.proof[0][0]);
    setMakerText('proofOneLabel', industry.proof[0][1]);
    setMakerText('proofTwoValue', industry.proof[1][0]);
    setMakerText('proofTwoLabel', industry.proof[1][1]);
    setMakerText('proofThreeValue', industry.proof[2][0]);
    setMakerText('proofThreeLabel', industry.proof[2][1]);
    setMakerText('floatingOne', industry.floating[0][0]);
    setMakerText('floatingOneValue', industry.floating[0][1]);
    setMakerText('floatingTwo', industry.floating[1][0]);
    setMakerText('floatingTwoValue', industry.floating[1][1]);
    setMakerText('sectionOneTitle', industry.sections[0][0]);
    setMakerText('sectionOneText', industry.sections[0][1]);
    setMakerText('sectionTwoTitle', industry.sections[1][0]);
    setMakerText('sectionTwoText', industry.sections[1][1]);
    setMakerText('sectionThreeTitle', industry.sections[2][0]);
    setMakerText('sectionThreeText', industry.sections[2][1]);
    setMakerText('offerTitle', industry.offerTitle);
    setMakerText('offerText', industry.offerText);
    setMakerText('offerPointOne', industry.offerPoints[0]);
    setMakerText('offerPointTwo', industry.offerPoints[1]);
    setMakerText('offerPointThree', industry.offerPoints[2]);
    setMakerText('testimonialText', industry.testimonial[0]);
    setMakerText('testimonialName', industry.testimonial[1]);
    setMakerText('contactTitle', industry.contactTitle);
    setMakerText('contactText', industry.contactText);
    setMakerText('contactCta', industry.contactCta);
    setMakerText('pageOne', industry.pages[0]);
    setMakerText('pageTwo', industry.pages[1]);
    setMakerText('pageThree', industry.pages[2]);
    setMakerText('pageFour', industry.pages[3]);
    setMakerText('leadPlanTitle', industry.leadPlan[0]);
    setMakerText('leadPlanText', industry.leadPlan[1]);
    setMakerText('priorityTitle', industry.priority[0]);
    setMakerText('priorityText', industry.priority[1]);

    templateLabel.textContent = `${style.label} ${industry.label} template`;
    briefEl.textContent = `${currentConcept.brief} Recommended pages: ${industry.pages.join(', ')}.`;
    renderPalette(style.colors);

    if (leadConceptInput) leadConceptInput.value = currentConcept.brief;
    if (leadPromptInput) leadPromptInput.value = currentConcept.prompt;
    if (leadStyleInput) leadStyleInput.value = style.label;
    if (leadIndustryInput) leadIndustryInput.value = industry.label;
    if (leadPagesInput) leadPagesInput.value = industry.pages.join(', ');
    if (leadStrategyInput) leadStrategyInput.value = `${industry.leadPlan[0]} ${industry.leadPlan[1]} ${industry.priority[0]} ${industry.priority[1]}`;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    renderConcept();
    previewShell.classList.remove('maker-preview-hidden');
    previewShell.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('[data-prompt]').forEach(button => {
    button.addEventListener('click', () => {
      promptInput.value = button.dataset.prompt || '';
      industryInput.value = 'auto';
      styleInput.value = 'auto';
      renderConcept();
      previewShell.classList.remove('maker-preview-hidden');
    });
  });

  [businessInput, promptInput, industryInput, styleInput].forEach(input => {
    input.addEventListener('input', renderConcept);
    input.addEventListener('change', renderConcept);
  });

  randomizeButton?.addEventListener('click', () => {
    const nextPrompt = remixes[Math.floor(Math.random() * remixes.length)];
    promptInput.value = nextPrompt;
    industryInput.value = 'auto';
    styleInput.value = 'auto';
    renderConcept();
    previewShell.classList.remove('maker-preview-hidden');
    promptInput.focus();
  });

  copyButton?.addEventListener('click', async () => {
    const concept = currentConcept || getConcept();
    const text = `${concept.brief}\n\nPrompt: ${concept.prompt}`;

    try {
      await navigator.clipboard.writeText(text);
      copyButton.classList.add('copied');
      setTimeout(() => copyButton.classList.remove('copied'), 1200);
    } catch {
      briefEl.textContent = text;
    }
  });

  renderConcept();
  previewShell.classList.remove('maker-preview-hidden');
});
