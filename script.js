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
      subjectField.value = 'New Once-Off Website Enquiry';
      routeField.value = 'once-off-build';
      followupField.value = '';
      qualificationField.value = '';
      projectModelNote.textContent = 'Once-off build enquiries stay on the standard project-quote path.';
      return;
    }

    subjectField.value = 'New Website Enquiry';
    routeField.value = 'general';
    followupField.value = '';
    qualificationField.value = '';
    projectModelNote.textContent = 'Choose the option that fits best. Monthly-plan enquiries can be routed to a dedicated follow-up guide automatically.';
  }

  projectModel.addEventListener('change', updateProjectRouting);
  updateProjectRouting();
});
