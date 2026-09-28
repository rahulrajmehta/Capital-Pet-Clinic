/**
 * CAPITAL PET CLINIC, RANCHI - JAVASCRIPT ENGINE
 * Handles: Branded intro, Light/Dark Mode, Sticky Header, Mobile Drawer,
 * Notice dismissal, FAQ Accordion, WhatsApp Appointment Form, GSAP Animations, and Count-ups.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNoticeBar();
  initBrandedPageIntro();
  initThemeToggle();
  initStickyHeader();
  initMobileDrawer();
  initFaqAccordion();
  initAppointmentWhatsAppForm();
  initCounterAnimations();
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
   3. STICKY HEADER (Shrinks on Scroll)
   =================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
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
   8. GSAP SCROLL REVEALS & MICRO-ANIMATIONS
   =================================================================== */
function initGsapScrollEffects() {
  if (typeof gsap === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.services-grid, .pet-showcase-grid, .steps-grid').forEach(grid => {
      gsap.from(grid.children, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.doctor-card').forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        y: 28,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
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

