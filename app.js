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
  // CINEMATIC SCROLL - Full section fade-in
  // ========================================
  
  const stages = document.querySelectorAll('.cinematic-stage');
  
  // Add fade-in class
  stages.forEach(stage => {
    stage.classList.add('fade-in');
  });
  // Observer triggers when section enters viewport
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
  });
  stages.forEach(stage => fadeObserver.observe(stage));
  // ========================================
  // SUBTLE PARALLAX
  // ========================================
  
  let ticking = false;
  
  const updateParallax = () => {
    const vh = window.innerHeight;
    
    stages.forEach(stage => {
      const rect = stage.getBoundingClientRect();
      const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
      
      // Very subtle movement
      const translateY = centerOffset * -15;
      
      stage.style.transform = `translateY(${translateY}px)`;
    });
    
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();
})();