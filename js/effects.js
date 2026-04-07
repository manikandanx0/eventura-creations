/* =============================================
   EVENTURA CREATIONS — Visual Effects Engine
   Canvas particles · Scroll reveal · Counters
   Nav glass · Star field
   ============================================= */

/* ── Respect prefers-reduced-motion ──────────── */
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

/* ════════════════════════════════════════════
   1. HERO PARTICLE CANVAS
   ════════════════════════════════════════════ */
(function initHeroCanvas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Inject canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  hero.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  let particles = [];
  let raf;

  const ACCENT = { r: 218, g: 163, b: 255 };
  const COUNT = prefersReducedMotion ? 0 : 55;

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: randomBetween(0.6, 2.2),
      alpha: randomBetween(0.05, 0.45),
      alphaDir: Math.random() < 0.5 ? 1 : -1,
      alphaSpeed: randomBetween(0.003, 0.012),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.28, -0.06),
    };
  }

  function buildParticles() {
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${p.alpha})`;
    ctx.fill();
  }

  function connectNearby() {
    const MAX_DIST = 90;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const lineAlpha = (1 - d / MAX_DIST) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += p.alphaSpeed * p.alphaDir;
      if (p.alpha >= 0.45 || p.alpha <= 0.05) p.alphaDir *= -1;

      // Wrap around
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;

      drawParticle(p);
    });

    connectNearby();
    raf = requestAnimationFrame(tick);
  }

  resize();
  buildParticles();
  if (!prefersReducedMotion) tick();

  // Resize debounced
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(raf);
      resize();
      buildParticles();
      if (!prefersReducedMotion) tick();
    }, 200);
  });
})();


/* ════════════════════════════════════════════
   2. HERO STAR FIELD
   ════════════════════════════════════════════ */
(function initStarField() {
  const hero = document.querySelector('.hero');
  if (!hero || prefersReducedMotion) return;

  const container = document.createElement('div');
  container.className = 'hero-stars';

  const STAR_COUNT = 28;
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('span');
    const dur  = (2.5 + Math.random() * 4).toFixed(1) + 's';
    const del  = (Math.random() * 5).toFixed(1) + 's';
    star.style.cssText = `
      left: ${(Math.random() * 100).toFixed(2)}%;
      top:  ${(Math.random() * 100).toFixed(2)}%;
      --dur: ${dur};
      --delay: ${del};
    `;
    container.appendChild(star);
  }

  hero.appendChild(container);
})();


/* ════════════════════════════════════════════
   3. NAVIGATION GLASSMORPHISM ON SCROLL
   ════════════════════════════════════════════ */
(function initNavGlass() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;

  const threshold = 40;

  function update() {
    if (window.scrollY > threshold) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ════════════════════════════════════════════
   4. SCROLL-REVEAL (IntersectionObserver)
   ════════════════════════════════════════════ */
(function initScrollReveal() {
  if (prefersReducedMotion) return;

  // Elements to observe
  const selectors = [
    '.service-card',
    '.project-card',
    '.metric-item',
    '.timeline-item',
    '.differentiator',
    '.case-study-header',
    '.case-study-section',
    '.contact-intro',
    '.about-story p',
    '.philosophy-statement',
    '.page-header',
    '.services-section h2',
    '.projects-section h2',
    '.metrics-section h3',
    '.cta-section h2',
    '.cta-section p',
    '.cta-section .btn',
  ];

  const targets = document.querySelectorAll(selectors.join(','));

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Give grid children a slight stagger based on their position
    const delay = (i % 5) * 80;
    el.style.transitionDelay = delay + 'ms';
  });

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => obs.observe(el));
})();


/* ════════════════════════════════════════════
   5. ANIMATED COUNTER FOR METRIC NUMBERS
   ════════════════════════════════════════════ */
(function initCounters() {
  if (prefersReducedMotion) return;

  const metricNumbers = document.querySelectorAll('.metric-number');
  if (!metricNumbers.length) return;

  function parseTarget(text) {
    // Extract numeric part and suffix (e.g. "50+", "95%", "5")
    const match = text.match(/^(\d+\.?\d*)(.*)$/);
    if (!match) return null;
    return { num: parseFloat(match[1]), suffix: match[2] };
  }

  function animateCounter(el) {
    const original = el.textContent.trim();
    const parsed = parseTarget(original);
    if (!parsed) return;

    const { num, suffix } = parsed;
    const duration = 1600;
    const start = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.floor(eased * num);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = original; // Restore exact original
      }
    }

    requestAnimationFrame(frame);
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  metricNumbers.forEach(el => obs.observe(el));
})();


/* ════════════════════════════════════════════
   6. CURSOR GLOW ON CARDS (desktop only)
   ════════════════════════════════════════════ */
(function initCardGlow() {
  if (prefersReducedMotion) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.service-card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--glow-x', x + '%');
      card.style.setProperty('--glow-y', y + '%');
      card.style.background = `
        radial-gradient(
          circle at ${x}% ${y}%,
          rgba(218, 163, 255, 0.08) 0%,
          rgba(218, 163, 255, 0.02) 40%,
          var(--color-card-bg) 70%
        )
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();
