/**
 * QUILL LABS — INTERACTIVE ENGINE
 * Includes:
 * 1. 60fps Canvas Spotlight Cursor
 * 2. Day / Night Theme Controller (Synced across pages and local storage)
 * 3. Top Navigation Dock Active State & GSAP hover micro-animations
 * 4. Scroll Reveal & SVG Stroke drawing animations
 * 5. Spec Work Filter & Contact Form Mailto generator
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. SPRING PHYSICS MOUSE FOLLOWER (Spring: mass: 0.1, damping: 10, stiffness: 131)
  // =========================================================================
  function initSpringMouseFollow() {
    // Only disable on touch-only mobile devices with no mouse pointer
    const isTouchOnly = window.matchMedia && window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    if (isTouchOnly) return;

    // Follower element (Orange/Gold spring follower)
    const follower = document.createElement('div');
    follower.className = 'spring-cursor-follower';
    follower.style.display = 'none';
    follower.style.opacity = '0';
    document.body.appendChild(follower);

    // Inner dot (Immediate lead pointer)
    const dot = document.createElement('div');
    dot.className = 'spring-cursor-dot';
    dot.style.display = 'none';
    dot.style.opacity = '0';
    document.body.appendChild(dot);

    // Target positions
    let targetX = 0;
    let targetY = 0;
    let targetOpacity = 0;
    let targetScale = 1;

    // Spring physics state for follower
    let currentX = 0;
    let currentY = 0;
    let vx = 0;
    let vy = 0;

    let currentOpacity = 0;
    let vOpacity = 0;

    let currentScale = 1;
    let vScale = 0;

    // Framer Motion spring parameters: mass = 0.1, damping = 10, stiffness = 131
    const mass = 0.1;
    const damping = 10;
    const stiffness = 131;

    let lastTime = performance.now();
    let isInitialized = false;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      targetOpacity = 1;

      // Position direct dot immediately
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (!isInitialized) {
        currentX = targetX;
        currentY = targetY;
        isInitialized = true;
        follower.style.display = 'block';
        dot.style.display = 'block';
      }

      dot.style.opacity = '1';
    });

    document.addEventListener('mouseenter', (e) => {
      if (isInitialized && e.clientX > 0 && e.clientY > 0) {
        targetX = e.clientX;
        targetY = e.clientY;
        targetOpacity = 1;
        dot.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', () => {
      targetOpacity = 0;
      dot.style.opacity = '0';
    });

    // Reset when tab loses focus to prevent any flash when switching tabs
    window.addEventListener('blur', () => {
      targetOpacity = 0;
      currentOpacity = 0;
      follower.style.opacity = '0';
      dot.style.opacity = '0';
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        targetOpacity = 0;
        currentOpacity = 0;
        follower.style.opacity = '0';
        dot.style.opacity = '0';
      }
    });

    // Expand on hovering interactive elements
    const interactiveElements = 'a, button, input, select, textarea, .tag, .sys-node, .theme-switch, .color-chip, .admin-tab';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveElements)) {
        targetScale = 1.65;
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveElements)) {
        targetScale = 1;
      }
    });

    function updateSpring(pos, target, vel, dt) {
      const springForce = -stiffness * (pos - target);
      const dampingForce = -damping * vel;
      const acceleration = (springForce + dampingForce) / mass;
      vel += acceleration * dt;
      pos += vel * dt;
      return [pos, vel];
    }

    // ---------------------------------------------------------------
    // GSAP‑based smooth follower animation (replaces custom spring loop)
    // ---------------------------------------------------------------
    // Immediate dot follows the mouse directly (existing behavior)
    // Follower now uses GSAP easing for a fluid glide.
    // GSAP will handle the animation; we no longer need the manual render loop.
    // ---------------------------------------------------------------
    // On mouse move, animate the follower to the new target position.
    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      targetOpacity = 1;

      // Direct dot positioning (unchanged)
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = '1';

      // GSAP tween for the follower
      if (isInitialized) {
        gsap.to(follower, {
          x: targetX,
          y: targetY,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          overwrite: true
        });
      }
    });

    // Ensure follower hides when mouse leaves or window loses focus.
    document.addEventListener('mouseleave', () => {
      targetOpacity = 0;
      dot.style.opacity = '0';
      gsap.to(follower, { opacity: 0, duration: 0.15, ease: "power2.out" });
    });

    window.addEventListener('blur', () => {
      targetOpacity = 0;
      gsap.to(follower, { opacity: 0, duration: 0.15, ease: "power2.out" });
      dot.style.opacity = '0';
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { 
        targetOpacity = 0;
        gsap.to(follower, { opacity: 0, duration: 0.15, ease: "power2.out" });
        dot.style.opacity = '0';
      }
    });

    // No manual requestAnimationFrame loop needed – GSAP drives updates.

  }

  // =========================================================================
  // 2. DAY / NIGHT THEME CONTROLLER
  // =========================================================================
  function initThemeController() {
    const savedTheme = localStorage.getItem('quill_theme') || 'dark';
    const checkboxes = document.querySelectorAll('.theme-switch__checkbox');

    function applyTheme(theme) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        checkboxes.forEach(cb => cb.checked = true);
      } else {
        document.documentElement.removeAttribute('data-theme');
        checkboxes.forEach(cb => cb.checked = false);
      }
      localStorage.setItem('quill_theme', theme);
    }

    // Initialize state
    applyTheme(savedTheme);

    // Listen for toggle changes
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const nextTheme = e.target.checked ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    });
  }

  // =========================================================================
  // 3. TOP NAV DOCK MICRO-ANIMATIONS
  // =========================================================================
  function initTopNavDock() {
    const dockItems = document.querySelectorAll('.top-nav-dock .dock-item');
    const currentPath = window.location.pathname.split('/').pop() || 'v1home.html';

    dockItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && (currentPath.includes(href) || (currentPath === '' && href === 'v1home.html') || (currentPath === 'index.html' && href === 'v1home.html'))) {
        item.classList.add('is-active');
      }

      // Micro hover animation
      item.addEventListener('mouseenter', () => {
        if (window.gsap) {
          gsap.to(item.querySelector('svg'), {
            scale: 1.2,
            y: -2,
            duration: 0.25,
            ease: 'back.out(2)'
          });
        }
      });

      item.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(item.querySelector('svg'), {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // =========================================================================
  // 4. SCROLL REVEAL & DRAW-LINE OBSERVER
  // =========================================================================
  function initScrollObserver() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const drawLines = document.querySelectorAll('.draw-line');

    drawLines.forEach((line) => {
      if (line.getTotalLength) {
        const len = line.getTotalLength();
        line.style.strokeDasharray = String(len);
        line.style.strokeDashoffset = String(len);
      }
    });

    const targets = document.querySelectorAll('.reveal, .draw-line');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-inview'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));
  }

  // =========================================================================
  // 5. SPEC WORK FILTER (Our Process page)
  // =========================================================================
  function initWorkFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const grid = document.querySelector('[data-work-grid]');
    if (!filterBtns.length || !grid) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;
        grid.querySelectorAll('[data-track]').forEach((card) => {
          const track = card.dataset.track;
          const match = filter === 'all' || track === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  // =========================================================================
  // 6. CONTACT FORM HANDLER (Contact page)
  // =========================================================================
  function initContactForm() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    // If Quill CMS Client is loaded, it manages database capture and UI confirmations
    if (window.quillCMS) return;

    const note = document.querySelector('[data-form-note]');
    const submitBtn = form.querySelector('[type="submit"]');

    if (submitBtn) submitBtn.disabled = false;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const track = (data.get('track') || '').toString().trim();
      const budget = (data.get('budget') || 'Not stated').toString().trim();
      const gap = (data.get('gap') || '').toString().trim();
      const target = form.dataset.target || 'buildbyquill@gmail.com';

      if (!name || !email || !gap) {
        alert('Please fill out your Name, Email, and Gap description.');
        return;
      }

      const subject = `Project enquiry from ${name} — Quill Labs`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Track: ${track}`,
        `Budget range: ${budget}`,
        '',
        `What's the gap:`,
        gap
      ].join('\n');

      window.location.href = `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      if (note) {
        note.hidden = false;
        note.style.color = 'var(--cta-gold)';
      }
    });
  }

  // =========================================================================
  // INITIALIZE ALL
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    // initSpringMouseFollow(); // Disabled custom spring cursor
    initThemeController();
    initTopNavDock();
    initScrollObserver();
    initWorkFilter();
    initContactForm();
  });

})();
