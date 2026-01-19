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

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('projectModalLabel').textContent = card.dataset.title || '';
      document.getElementById('projectModalImg').src = card.dataset.img || '';
      document.getElementById('projectModalDesc').textContent = card.dataset.desc || '';
      document.getElementById('projectModalTech').textContent = card.dataset.tech || '';
      document.getElementById('projectModalDemoBtn').href = card.dataset.demo || '#';

      modal.show();
    });
  });
});
