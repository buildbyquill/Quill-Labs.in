// customCursor.js
// Implements a springy, delayed cursor using GSAP.
// The big cursor follows the mouse with a subtle lag, colored with the accent gold.
// The small cursor stays directly on the native mouse position for precision.

// Assuming GSAP is already loaded via CDN (see index.html).

(function() {
  const big = document.querySelector('.cursor__ball--big');
  const small = document.querySelector('.cursor__ball--small');
  if (!big || !small) return;

  // Initial positions at center
  let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let mouse = { x: pos.x, y: pos.y };

  // Set initial styles
  gsap.set([big, small], { x: pos.x, y: pos.y, opacity: 1 });

  // Update mouse position on move
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Animation loop – springy lag for the big ball
  gsap.ticker.add(() => {
    // Lerp factor creates a soft spring effect
    pos.x += (mouse.x - pos.x) * 0.15;
    pos.y += (mouse.y - pos.y) * 0.15;

    gsap.set(big, { x: pos.x, y: pos.y });
    gsap.set(small, { x: mouse.x, y: mouse.y });
  });
})();
