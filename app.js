(() => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  // Mobile nav toggle
  const toggleBtn = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggleBtn && nav) {
    const setExpanded = (expanded) => {
      toggleBtn.setAttribute('aria-expanded', String(expanded));
      toggleBtn.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', expanded);
    };
    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') setExpanded(false);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setExpanded(false);
    });
  }
  // Header elevation on scroll
  const header = document.querySelector('[data-elevate]');
  const updateHeader = () => {
    header?.classList.toggle('is-elevated', window.scrollY > 10);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  // ========================================
  // CINEMATIC SCROLL - Section fade-in
  // ========================================
  
  // Target all cinematic stages
  const stages = document.querySelectorAll('.cinematic-stage');
  
  // Add fade-in class to all stages
  stages.forEach(stage => {
    stage.classList.add('fade-in');
  });
  // Intersection Observer for fade-in
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);
  stages.forEach(stage => fadeObserver.observe(stage));
  // ========================================
  // PARALLAX DEPTH (subtle)
  // ========================================
  
  let ticking = false;
  
  const updateParallax = () => {
    const vh = window.innerHeight;
    
    stages.forEach(stage => {
      const rect = stage.getBoundingClientRect();
      const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
      
      // Subtle parallax - just a small Y shift based on scroll position
      const translateY = centerOffset * -20;
      const scale = 1 - Math.abs(centerOffset) * 0.02;
      
      stage.style.transform = `translateY(${translateY}px) scale(${Math.max(scale, 0.98)})`;
    });
    
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  // Initial call
  updateParallax();
})();