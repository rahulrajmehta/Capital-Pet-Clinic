/**
 * CAPITAL PET CLINIC, RANCHI - JAVASCRIPT ENGINE
 * Handles: Branded intro, Light/Dark Mode, Sticky Header, Mobile Drawer,
 * Notice dismissal, FAQ Accordion, WhatsApp Appointment Form, GSAP Animations, and Count-ups.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNoticeBar();
  initBrandedPageIntro();
  initThemeToggle();
  initScrollProgressBar();
  initStickyHeader();
  initBackToTop();
  initMobileDrawer();
  initFaqAccordion();
  initAppointmentWhatsAppForm();
  initCounterAnimations();
  initCarousels();
  initCardTiltEffect();
  initGsapScrollEffects();
  initImageModal();
});

/* ===================================================================
   0. TOP NOTICE BAR (Sleek & Dismissible)
   =================================================================== */
function initNoticeBar() {
  const bar = document.getElementById('top-notice-bar');
  if (!bar) return;
  if (sessionStorage.getItem('cpc_notice_closed')) {
    bar.style.display = 'none';
  }
}

window.dismissNoticeBar = function() {
  const bar = document.getElementById('top-notice-bar');
  if (bar) {
    bar.style.display = 'none';
    sessionStorage.setItem('cpc_notice_closed', 'true');
  }
};

/* ===================================================================
   1. BRANDED PAGE-LOAD INTRO (Paw Icon, <1s, Once Per Session)
   =================================================================== */
function initBrandedPageIntro() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const hasSeenIntro = sessionStorage.getItem('cpc_intro_viewed');
  
  if (hasSeenIntro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.classList.add('hidden');
    loader.remove();
    return;
  }

  setTimeout(() => {
    loader.classList.add('hidden');
    sessionStorage.setItem('cpc_intro_viewed', 'true');
    setTimeout(() => {
      loader.remove();
    }, 400);
  }, 700);
}

/* ===================================================================
   2. THEME TOGGLE (Default to Light Mode for Warm Boutique Aesthetics)
   =================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('cpc_theme');
  
  // Default to light mode unless the user explicitly saved 'dark' previously
  const activeTheme = savedTheme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', activeTheme);
  updateThemeIcons(activeTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('cpc_theme', targetTheme);
      updateThemeIcons(targetTheme);
    });
  });

  function updateThemeIcons(theme) {
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('aria-label', 'Switch to light mode');
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('aria-label', 'Switch to dark mode');
        }
      }
    });
  }
}

/* ===================================================================
   3. SCROLL PROGRESS BAR (Silky Gradient Tracker)
   =================================================================== */
function initScrollProgressBar() {
  let bar = document.getElementById('scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    bar.className = 'scroll-progress-bar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.prepend(bar);
  }

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
}

/* ===================================================================
   3B. STICKY HEADER (Glassmorphism & Shrink on Scroll)
   =================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ===================================================================
   3C. BACK-TO-TOP BUTTON (Smooth Elevation & Return)
   =================================================================== */
function initBackToTop() {
  let btn = document.getElementById('back-to-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top-btn';
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.setAttribute('title', 'Back to top');
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 340) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   4. MOBILE DRAWER NAVIGATION
   =================================================================== */
function initMobileDrawer() {
  const hamburger = document.querySelector('.mobile-hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!hamburger || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ===================================================================
   5. FAQ ACCORDION (Smooth Animated Expand)
   =================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPane = item.querySelector('.faq-answer-pane');

    if (!questionBtn || !answerPane) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherPane = otherItem.querySelector('.faq-answer-pane');
          if (otherPane) otherPane.style.maxHeight = '0px';
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        answerPane.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        answerPane.style.maxHeight = answerPane.scrollHeight + 'px';
      }
    });
  });
}

/* ===================================================================
   6. APPOINTMENT FORM -> WHATSAPP WITH DETAILS PREFILLED
   =================================================================== */
function initAppointmentWhatsAppForm() {
  const form = document.getElementById('appointment-quick-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="client_name"]')?.value.trim() || 'Pet Parent';
    const phone = form.querySelector('[name="client_phone"]')?.value.trim() || 'Not specified';
    const petType = form.querySelector('[name="pet_type"]')?.value || 'Pet';
    const service = form.querySelector('[name="requested_service"]')?.value || 'Consultation';
    const message = form.querySelector('[name="additional_notes"]')?.value.trim() || 'No additional notes';

    const whatsappNumber = (typeof CLINIC_CONFIG !== 'undefined' && CLINIC_CONFIG.whatsappNumber) 
      ? CLINIC_CONFIG.whatsappNumber 
      : '919798172415';

    const text = `*New Appointment Request - Capital Pet Clinic Ranchi*
---------------------------------------
👤 *Pet Parent Name:* ${name}
📞 *Contact Phone:* ${phone}
🐾 *Pet Type:* ${petType}
🏥 *Requested Service:* ${service}
📝 *Notes:* ${message}
---------------------------------------
Sent via Capital Pet Clinic Website (Argora, Ranchi)`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/* ===================================================================
   7. COUNT-UP FOR RATING & STATS
   =================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const isDecimal = el.getAttribute('data-decimal') === 'true';
        let current = 0;
        const step = target / 30;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
            clearInterval(timer);
          } else {
            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
          }
        }, 30);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

/* ===================================================================
   8. INTERACTIVE TOUCH-ENABLED CAROUSEL ENGINE
   =================================================================== */
function initCarousels() {
  const containers = document.querySelectorAll('.carousel-container');
  if (!containers.length) return;

  containers.forEach(container => {
    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dots = container.querySelectorAll('.carousel-dot');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isTouching = false;
    let startX = 0;
    let diffX = 0;

    function getVisibleCount() {
      const width = window.innerWidth;
      if (width <= 640) return 1;
      if (width <= 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, slides.length - getVisibleCount());
    }

    function updateTrack(animate = true) {
      const maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) currentIndex = maxIdx;
      if (currentIndex < 0) currentIndex = 0;

      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = window.innerWidth <= 640 ? 16 : 24;
      const offset = currentIndex * (slideWidth + gap);

      track.style.transition = animate ? 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
      track.style.transform = `translate3d(-${offset}px, 0, 0)`;

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function nextSlide() {
      const maxIdx = getMaxIndex();
      currentIndex = currentIndex >= maxIdx ? 0 : currentIndex + 1;
      updateTrack(true);
    }

    function prevSlide() {
      const maxIdx = getMaxIndex();
      currentIndex = currentIndex <= 0 ? maxIdx : currentIndex - 1;
      updateTrack(true);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateTrack(true);
        resetAutoplay();
      });
    });

    // Touch & Swipe Controls
    track.addEventListener('touchstart', (e) => {
      isTouching = true;
      startX = e.touches[0].clientX;
      diffX = 0;
      stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!isTouching) return;
      diffX = e.touches[0].clientX - startX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      if (!isTouching) return;
      isTouching = false;
      if (diffX < -45) {
        nextSlide();
      } else if (diffX > 45) {
        prevSlide();
      }
      startAutoplay();
    }, { passive: true });

    // Mouse drag support for desktop
    let isMouseDown = false;
    track.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      startX = e.clientX;
      diffX = 0;
      stopAutoplay();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      diffX = e.clientX - startX;
    });

    window.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      if (diffX < -45) {
        nextSlide();
      } else if (diffX > 45) {
        prevSlide();
      }
      startAutoplay();
    });

    // Autoplay Cycle (4.5s)
    function startAutoplay() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      stopAutoplay();
      autoPlayTimer = setInterval(nextSlide, 4500);
    }

    function stopAutoplay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', () => updateTrack(false), { passive: true });

    updateTrack(false);
    startAutoplay();
  });
}

/* ===================================================================
   9. INTERACTIVE 3D CARD TILT FOR DESKTOP
   =================================================================== */
function initCardTiltEffect() {
  if (window.matchMedia('(hover: none) or (pointer: coarse) or (prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const cards = document.querySelectorAll('.service-card, .doctor-card, .action-card, .why-card, .pet-showcase-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (x - centerX) / centerX;
      const tiltY = (y - centerY) / centerY;

      card.style.transform = `perspective(1000px) rotateX(${-tiltY * 5}deg) rotateY(${tiltX * 5}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ===================================================================
   10. GSAP SCROLL REVEALS & CINEMATIC ENTRANCE
   =================================================================== */
function initGsapScrollEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 1. Check if GSAP is available
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Cinematic Entrance (Page Load)
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-hindi-subtitle, .hero-subline-en, .hero-buttons, .hero-pet-badge-row');
    if (heroElements.length) {
      gsap.from(heroElements, {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }

    // Quick Action Section Cards
    const actionCards = document.querySelectorAll('.quick-action-grid .action-card');
    if (actionCards.length && typeof ScrollTrigger !== 'undefined') {
      gsap.from(actionCards, {
        scrollTrigger: {
          trigger: '.quick-action-section',
          start: 'top 88%'
        },
        y: 32,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }

    // Section Titles Reveal
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%'
          },
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });

      // Grids Stagger Reveal
      gsap.utils.toArray('.services-grid, .pet-showcase-grid, .why-choose-grid, .steps-grid, .real-clinic-grid, .reviews-grid').forEach(grid => {
        gsap.from(grid.children, {
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 28,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out'
        });
      });

      // Doctors Cards Stagger
      gsap.utils.toArray('.doctors-grid .doctor-card').forEach(card => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          },
          y: 30,
          opacity: 0,
          duration: 0.65,
          ease: 'power2.out'
        });
      });
    }
  } else {
    // Fallback: IntersectionObserver for smooth scroll reveals if GSAP CDN fails
    const revealTargets = document.querySelectorAll('.section-header, .service-card, .doctor-card, .step-card, .why-card');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => {
      el.classList.add('reveal-fade-up');
      revealObserver.observe(el);
    });
  }
}

/* ===================================================================
   9. LIGHTBOX MODAL FOR REAL REVIEWS & CLINIC PHOTOS
   =================================================================== */
function initImageModal() {
  // Ensure modal DOM elements exist
  let backdrop = document.getElementById('cpc-image-modal');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'cpc-image-modal';
    backdrop.className = 'cpc-modal-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('role', 'dialog');
    backdrop.innerHTML = `
      <div class="cpc-modal-box">
        <div class="cpc-modal-header">
          <div class="cpc-modal-header-title">
            <i class="fa-solid fa-certificate" style="color:var(--amber);"></i>
            <span id="cpc-modal-title">Verified Proof</span>
          </div>
          <button type="button" class="cpc-modal-close-btn" aria-label="Close modal">&times;</button>
        </div>
        <div class="cpc-modal-body">
          <img id="cpc-modal-img" src="" alt="Proof Preview" class="cpc-modal-img">
        </div>
        <div id="cpc-modal-footer" class="cpc-modal-footer">
          Capital Pet Clinic · Argora, Ranchi
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  const modalImg = backdrop.querySelector('#cpc-modal-img');
  const modalTitle = backdrop.querySelector('#cpc-modal-title');
  const modalFooter = backdrop.querySelector('#cpc-modal-footer');
  const closeBtn = backdrop.querySelector('.cpc-modal-close-btn');

  function openModal(imgSrc, title, caption) {
    if (!modalImg || !backdrop) return;
    modalImg.src = imgSrc;
    if (modalTitle && title) modalTitle.textContent = title;
    if (modalFooter && caption) modalFooter.textContent = caption;
    backdrop.classList.add('active');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.classList.remove('active');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modalImg) modalImg.src = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach click listener to all modal triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-img]');
    if (trigger) {
      e.preventDefault();
      const src = trigger.getAttribute('data-modal-img');
      const title = trigger.getAttribute('data-modal-title') || 'Verified Clinic Proof';
      const caption = trigger.getAttribute('data-modal-caption') || 'Capital Pet Clinic · Argora, Ranchi';
      openModal(src, title, caption);
    }
  });
}

