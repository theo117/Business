const canvas = document.getElementById('dotsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 100; // navbar height or whatever fits

const dots = [];
const numDots = 50;

// create dots
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
    ctx.fillStyle = 'white';
    ctx.fill();

    dot.x += dot.dx;
    dot.y += dot.dy;

    // wrap around edges
    if (dot.x > canvas.width) dot.x = 0;
    if (dot.x < 0) dot.x = canvas.width;
    if (dot.y > canvas.height) dot.y = 0;
    if (dot.y < 0) dot.y = canvas.height;
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = 100;
});

const footer = document.getElementById('floating-footer');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      // User has scrolled down — show footer
      footer.style.display = 'block';
    } else {
      // User is at/near top — hide footer
      footer.style.display = 'none';
    }
  });

  document.querySelectorAll('.flip-card').forEach(card => {
    const inner = card.querySelector('.flip-card-inner');
    let isFlipping = false; // prevents rapid double taps

    card.addEventListener('click', () => {
      if (isFlipping) return; // ignore if animation is in progress
      isFlipping = true;

      inner.classList.add('flipped');

      // Flip back after 3 seconds
      setTimeout(() => {
        inner.classList.remove('flipped');
      }, 3000);

      // Allow another flip after 3.5s (a bit longer than animation)
      setTimeout(() => {
        isFlipping = false;
      }, 3500);
    });
  });
// Removed duplicate variable declarations and logic for dots animation.
// The dots animation is already handled above, so this block is not needed.