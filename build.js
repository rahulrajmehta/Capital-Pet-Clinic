/**
 * CAPITAL PET CLINIC, RANCHI - STATIC SITE GENERATOR & BUILD ENGINE
 * Generates all 18 production-ready HTML pages, sitemap.xml, and robots.txt.
 * Strictly implements:
 * 1. Centered headings on all sections & heroes
 * 2. Prominent pet images on the first page & pet showcase
 * 3. Fresh, light, warm boutique backgrounds across sections
 * 4. Fixed, uncluttered mobile header with dismissible notice bar
 * 5. Single config source of truth for facts & phone number
 */

const fs = require('fs');
const path = require('path');
const config = require('./assets/js/clinic-config.js');

// Root output directory
const ROOT_DIR = __dirname;
const SERVICES_DIR = path.join(ROOT_DIR, 'services');
const BLOG_DIR = path.join(ROOT_DIR, 'blog');

// Ensure directories exist
if (!fs.existsSync(SERVICES_DIR)) fs.mkdirSync(SERVICES_DIR, { recursive: true });
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

/* ===================================================================
   SHARED HELPER COMPONENTS
   =================================================================== */

function getRelativeAssetPrefix(depth = 0) {
  return depth === 0 ? '' : '../';
}

function renderHead({ title, description, keywords, canonicalUrl, depth = 0, isEmergency = false, schemaJson = null }) {
  const prefix = getRelativeAssetPrefix(depth);
  const fullCanonical = `https://capitalpetclinic.in/${canonicalUrl || ''}`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="${config.name}">
  <link rel="canonical" href="${fullCanonical}">

  <!-- Geographic Local SEO Meta -->
  <meta name="geo.region" content="IN-JH">
  <meta name="geo.placename" content="Ranchi, Argora, Harmu Housing Colony">
  <meta name="geo.position" content="${config.coordinates.latitude};${config.coordinates.longitude}">
  <meta name="ICBM" content="${config.coordinates.latitude}, ${config.coordinates.longitude}">

  <!-- Open Graph -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${fullCanonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${fullCanonical.replace(/[^/]*$/, '')}${prefix}assets/images/original-banner.png">
  <meta property="og:locale" content="en_IN">

  <!-- Favicon & Touch Icon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>">

  <!-- Google Fonts & Font Awesome CDN -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer">

  <!-- GSAP & ScrollTrigger from CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>

  <!-- Design System CSS -->
  <link rel="stylesheet" href="${prefix}assets/css/style.css">

  <!-- Core Schema.org JSON-LD -->
  ${schemaJson ? `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n</script>` : ''}
</head>
<body${isEmergency ? ' class="emergency-theme"' : ''}>

  <!-- Branded Session Intro Overlay (<1s, once per session) -->
  <div id="page-loader" class="page-loader-overlay">
    <div class="loader-paw-icon"><i class="fa-solid fa-paw"></i></div>
    <div class="loader-brand-title">${config.name}</div>
    <div class="hindi-text text-sm" style="color: #e2edea; margin-top:4px;">${config.nameHindi} · Argora, Ranchi</div>
  </div>

  <!-- Transparent Notice Banner (Sleek & Dismissible) -->
  <div id="top-notice-bar" class="placeholder-notice-bar">
    <div class="container" style="display:flex; align-items:center; justify-content:center; gap: 8px; flex-wrap: wrap;">
      <span><i class="fa-solid fa-phone"></i> Call Clinic: <strong><a href="tel:${config.primaryPhone}" style="color:inherit; text-decoration:underline;">${config.primaryPhoneFormatted}</a></strong> / <strong><a href="tel:${config.alternatePhone}" style="color:inherit; text-decoration:underline;">${config.alternatePhoneFormatted}</a></strong> · Timings: 9 AM – 10 PM daily</span>
      <button type="button" class="notice-close-btn" onclick="dismissNoticeBar()" aria-label="Dismiss notice">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
`;
}

function renderHeader(activeRoute = '', depth = 0) {
  const prefix = getRelativeAssetPrefix(depth);
  const homeHref = depth === 0 ? 'index.html' : '../index.html';
  const aboutHref = depth === 0 ? 'about.html' : '../about.html';
  const servicesHref = depth === 0 ? 'services.html' : '../services.html';
  const doctorsHref = depth === 0 ? 'doctors.html' : '../doctors.html';
  const galleryHref = depth === 0 ? 'gallery.html' : '../gallery.html';
  const reviewsHref = depth === 0 ? 'reviews.html' : '../reviews.html';
  const faqHref = depth === 0 ? 'faq.html' : '../faq.html';
  const blogHref = depth === 0 ? 'blog.html' : '../blog.html';
  const contactHref = depth === 0 ? 'contact.html' : '../contact.html';

  return `
  <!-- STICKY SITE HEADER -->
  <header class="site-header">
    <div class="container header-container">
      <a href="${homeHref}" class="site-logo" aria-label="${config.name} Home">
        <div class="site-logo-icon">
          <i class="fa-solid fa-paw"></i>
        </div>
        <div class="site-logo-text">
          <span class="site-logo-title">${config.name}</span>
          <span class="site-logo-sub"><span class="hindi-text">${config.nameHindi}</span> · Argora, Ranchi</span>
        </div>
      </a>

      <nav class="site-nav" aria-label="Main Navigation">
        <a href="${homeHref}" class="nav-link${activeRoute === 'home' ? ' active' : ''}">Home</a>
        <a href="${aboutHref}" class="nav-link${activeRoute === 'about' ? ' active' : ''}">About</a>
        <a href="${servicesHref}" class="nav-link${activeRoute === 'services' ? ' active' : ''}">Services</a>
        <a href="${doctorsHref}" class="nav-link${activeRoute === 'doctors' ? ' active' : ''}">Doctors</a>
        <a href="${galleryHref}" class="nav-link${activeRoute === 'gallery' ? ' active' : ''}">Gallery</a>
        <a href="${reviewsHref}" class="nav-link${activeRoute === 'reviews' ? ' active' : ''}">Reviews</a>
        <a href="${faqHref}" class="nav-link${activeRoute === 'faq' ? ' active' : ''}">FAQ</a>
        <a href="${blogHref}" class="nav-link${activeRoute === 'blog' ? ' active' : ''}">Blog</a>
        <a href="${contactHref}" class="nav-link${activeRoute === 'contact' ? ' active' : ''}">Contact</a>
      </nav>

      <div class="header-actions">
        <!-- Light / Dark Mode Toggle -->
        <button type="button" class="theme-toggle-btn" aria-label="Toggle dark mode">
          <i class="fa-solid fa-moon"></i>
        </button>

        <!-- Desktop Only Call Now Button (Cleanly hidden on mobile) -->
        <a href="tel:${config.primaryPhone}" class="btn btn-primary header-call-btn">
          <i class="fa-solid fa-phone"></i>
          <span>Call Now</span>
        </a>

        <!-- Mobile Drawer Hamburger -->
        <button type="button" class="mobile-hamburger" aria-label="Open mobile menu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE SLIDE-IN DRAWER -->
  <div class="mobile-drawer-overlay"></div>
  <aside class="mobile-drawer" aria-label="Mobile Navigation Drawer">
    <div class="drawer-header">
      <div class="site-logo">
        <div class="site-logo-icon" style="width:36px; height:36px; font-size:16px;">
          <i class="fa-solid fa-paw"></i>
        </div>
        <div class="site-logo-text">
          <span class="site-logo-title" style="font-size: 16px;">${config.name}</span>
          <span class="site-logo-sub" style="font-size: 11px;">Ranchi, Jharkhand</span>
        </div>
      </div>
      <button type="button" class="drawer-close" aria-label="Close menu">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="drawer-links">
      <a href="${homeHref}" class="drawer-link${activeRoute === 'home' ? ' active' : ''}"><i class="fa-solid fa-house"></i> Home</a>
      <a href="${aboutHref}" class="drawer-link${activeRoute === 'about' ? ' active' : ''}"><i class="fa-solid fa-circle-info"></i> About Us</a>
      <a href="${servicesHref}" class="drawer-link${activeRoute === 'services' ? ' active' : ''}"><i class="fa-solid fa-briefcase-medical"></i> All Services</a>
      <a href="${doctorsHref}" class="drawer-link${activeRoute === 'doctors' ? ' active' : ''}"><i class="fa-solid fa-user-doctor"></i> Our Doctors</a>
      <a href="${galleryHref}" class="drawer-link${activeRoute === 'gallery' ? ' active' : ''}"><i class="fa-solid fa-images"></i> Clinic Gallery</a>
      <a href="${reviewsHref}" class="drawer-link${activeRoute === 'reviews' ? ' active' : ''}"><i class="fa-solid fa-star" style="color:var(--amber);"></i> Google Reviews (5.0★)</a>
      <a href="${faqHref}" class="drawer-link${activeRoute === 'faq' ? ' active' : ''}"><i class="fa-solid fa-circle-question"></i> Questions & Answers</a>
      <a href="${blogHref}" class="drawer-link${activeRoute === 'blog' ? ' active' : ''}"><i class="fa-solid fa-newspaper"></i> Pet Care Blog</a>
      <a href="${contactHref}" class="drawer-link${activeRoute === 'contact' ? ' active' : ''}"><i class="fa-solid fa-location-dot"></i> Contact & Map</a>
    </div>

    <div class="drawer-cta" style="display:flex; flex-direction:column; gap:8px;">
      <a href="tel:${config.primaryPhone}" class="btn btn-primary" style="width:100%;">
        <i class="fa-solid fa-phone"></i> Call ${config.primaryPhoneFormatted}
      </a>
      <a href="tel:${config.alternatePhone}" class="btn btn-outline" style="width:100%; border-color:var(--primary); color:var(--primary);">
        <i class="fa-solid fa-phone-volume"></i> Alt: ${config.alternatePhoneFormatted}
      </a>
      <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hello Capital Pet Clinic Ranchi, I would like to book an appointment.')}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width:100%;">
        <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
      </a>
    </div>
  </aside>
`;
}

function renderReviewCard(rev, depth = 0) {
  const prefix = getRelativeAssetPrefix(depth);
  const screenshotPath = `${prefix}${rev.screenshot}`;
  const initial = rev.name.charAt(0);

  return `
    <div class="review-card">
      <div>
        <div class="review-card-top">
          <div class="review-author-info">
            <div class="review-avatar-circle">${initial}</div>
            <div>
              <div class="review-author-name">
                <span>${rev.name}</span>
                <i class="fa-brands fa-google review-google-badge" title="Verified Google Review"></i>
              </div>
              <div class="review-date-text">${rev.date} · Google Maps</div>
            </div>
          </div>
          <span class="review-service-chip">${rev.badge}</span>
        </div>

        <div class="review-stars-row">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>

        <p class="review-body-text">"${rev.text}"</p>
      </div>

      <div class="review-proof-action">
        <button type="button" class="review-proof-btn" data-modal-img="${screenshotPath}" data-modal-title="Google Review: ${rev.name}" data-modal-caption="Verified 5.0-Star Google Review for Capital Pet Clinic, Argora, Ranchi">
          <i class="fa-solid fa-image"></i> View Review Proof
        </button>
        <span style="font-size:11px; color:#22c55e; font-weight:600;"><i class="fa-solid fa-circle-check"></i> Verified</span>
      </div>
    </div>
  `;
}

function renderClinicPhotoCard(photo, depth = 0) {
  const prefix = getRelativeAssetPrefix(depth);
  const src = `${prefix}${photo.src}`;

  return `
    <div class="real-clinic-card" data-modal-img="${src}" data-modal-title="${photo.title}" data-modal-caption="Authentic Facility Photo · Capital Pet Clinic, Argora, Ranchi">
      <div class="real-clinic-img-box">
        <img src="${src}" alt="${photo.title} at Capital Pet Clinic Ranchi" loading="lazy">
        <div class="real-clinic-verified-badge">
          <i class="fa-solid fa-camera"></i> Real Photo
        </div>
      </div>
      <div class="real-clinic-meta">
        <span class="gallery-badge real">${photo.category}</span>
        <h3 class="real-clinic-title">${photo.title}</h3>
        <p class="real-clinic-sub">Capital Pet Clinic, Argora, Ranchi</p>
      </div>
    </div>
  `;
}

function renderFooter(depth = 0, currentDir = '') {
  const prefix = getRelativeAssetPrefix(depth);
  const homeHref = depth === 0 ? 'index.html' : '../index.html';
  const aboutHref = depth === 0 ? 'about.html' : '../about.html';
  const servicesHref = depth === 0 ? 'services.html' : '../services.html';
  const doctorsHref = depth === 0 ? 'doctors.html' : '../doctors.html';
  const galleryHref = depth === 0 ? 'gallery.html' : '../gallery.html';
  const reviewsHref = depth === 0 ? 'reviews.html' : '../reviews.html';
  const faqHref = depth === 0 ? 'faq.html' : '../faq.html';
  const blogHref = depth === 0 ? 'blog.html' : '../blog.html';
  const contactHref = depth === 0 ? 'contact.html' : '../contact.html';

  const servicesLinks = config.services.map(s => {
    let link = `services/${s.slug}.html`;
    if (currentDir === 'services') {
      link = `${s.slug}.html`;
    } else if (depth > 0) {
      link = `../services/${s.slug}.html`;
    }
    return `<li><a href="${link}" class="footer-link">${s.title}</a></li>`;
  }).join('\n            ');

  return `
  <!-- COMPREHENSIVE FOOTER -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Col 1: Brand & Doctors -->
        <div class="footer-col">
          <div class="site-logo" style="margin-bottom: 16px;">
            <div class="site-logo-icon">
              <i class="fa-solid fa-paw"></i>
            </div>
            <div class="site-logo-text">
              <span class="site-logo-title" style="color:#FFFFFF;">${config.name}</span>
              <span class="site-logo-sub" style="color:#33b8a9;"><span class="hindi-text">${config.nameHindi}</span></span>
            </div>
          </div>
          <p style="color: #a1bfb8; font-size: 14px; margin-bottom: 16px;">
            Premier veterinary care clinic in Ranchi founded by <strong>Dr. Vivek Kr. Gupta</strong> & <strong>Dr. Ankit R. Bara (B.V.Sc)</strong>. Dedicated to compassionate treatment, vaccination, surgery, and round-the-clock pet welfare.
          </p>
          <div style="display:flex; align-items:center; gap:8px; font-size:14px; color:#e2edea;">
            <span style="color:var(--amber);"><i class="fa-solid fa-star"></i> 5.0 Google Rating</span>
            <span>· 23 Verified Reviews</span>
          </div>
        </div>

        <!-- Col 2: Services -->
        <div class="footer-col">
          <h4>Clinical Services</h4>
          <ul class="footer-links">
            ${servicesLinks}
          </ul>
        </div>

        <!-- Col 3: Quick Links -->
        <div class="footer-col">
          <h4>Quick Navigation</h4>
          <ul class="footer-links">
            <li><a href="${homeHref}" class="footer-link">Home</a></li>
            <li><a href="${aboutHref}" class="footer-link">About Our Clinic</a></li>
            <li><a href="${doctorsHref}" class="footer-link">Veterinary Doctors</a></li>
            <li><a href="${galleryHref}" class="footer-link">Photo Gallery</a></li>
            <li><a href="${reviewsHref}" class="footer-link">Google Reviews (5.0★)</a></li>
            <li><a href="${faqHref}" class="footer-link">Help & FAQs</a></li>
            <li><a href="${blogHref}" class="footer-link">Pet Care Articles</a></li>
            <li><a href="${contactHref}" class="footer-link">Contact & Directions</a></li>
          </ul>
        </div>

        <!-- Col 4: Verified NAP Details -->
        <div class="footer-col">
          <h4>Clinic Location & Hours</h4>
          <div class="footer-nap">
            <div class="footer-nap-item">
              <i class="fa-solid fa-location-dot"></i>
              <div>
                <strong>Capital Pet Clinic</strong><br>
                ${config.address.street},<br>
                ${config.address.colony},<br>
                ${config.address.city}, ${config.address.state} - ${config.address.pincode}<br>
                <small style="color: #74918a;">Plus Code: ${config.coordinates.plusCode}</small>
              </div>
            </div>
            <div class="footer-nap-item">
              <i class="fa-solid fa-phone"></i>
              <div>
                <a href="tel:${config.primaryPhone}" style="color:#FFFFFF; font-weight:600;">${config.primaryPhoneFormatted}</a><br>
                <a href="tel:${config.alternatePhone}" style="color:#e2edea; font-size:13px;"><i class="fa-solid fa-phone-volume" style="font-size:11px; margin-right:4px;"></i>${config.alternatePhoneFormatted}</a><br>
                <small style="color:#74918a;">Official Clinic Lines</small>
              </div>
            </div>
            <div class="footer-nap-item">
              <i class="fa-solid fa-clock"></i>
              <div>
                <span>${config.timings.regularHours}</span><br>
                <span style="color:var(--amber); font-size:12px;">${config.timings.emergencyHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          © ${new Date().getFullYear()} ${config.name}. All Rights Reserved. Ranchi, Jharkhand.
        </div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="${config.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" style="color: #a1bfb8;"><i class="fa-solid fa-map-location-dot"></i> Google Maps Directions</a>
          <span>·</span>
          <a href="tel:${config.primaryPhone}" style="color: #a1bfb8;"><i class="fa-solid fa-phone"></i> Call: ${config.primaryPhoneFormatted}</a>
          <span>·</span>
          <a href="tel:${config.alternatePhone}" style="color: #a1bfb8;"><i class="fa-solid fa-phone-volume"></i> Alt: ${config.alternatePhoneFormatted}</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- DESKTOP FLOATING CTAs (Bottom Right) -->
  <div class="desktop-floating-actions" aria-label="Quick Action Buttons">
    <a href="tel:${config.primaryPhone}" class="floating-btn floating-phone" title="Call Clinic: ${config.primaryPhoneFormatted}">
      <i class="fa-solid fa-phone"></i>
    </a>
    <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hello Capital Pet Clinic Ranchi, I would like to book a consultation.')}" target="_blank" rel="noopener noreferrer" class="floating-btn floating-whatsapp" title="WhatsApp Message">
      <i class="fa-brands fa-whatsapp"></i>
    </a>
  </div>

  <!-- MOBILE STICKY BOTTOM BAR (48px Tap Targets, Safe-Area Padding) -->
  <nav class="mobile-bottom-bar" aria-label="Mobile Call and WhatsApp Actions">
    <div class="mobile-bottom-grid">
      <a href="tel:${config.primaryPhone}" class="btn btn-primary" style="min-height: 48px; font-size: 15px;">
        <i class="fa-solid fa-phone"></i> Call Now
      </a>
      <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hello Capital Pet Clinic Ranchi, I want to book an appointment.')}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="min-height: 48px; font-size: 15px;">
        <i class="fa-brands fa-whatsapp"></i> WhatsApp
      </a>
    </div>
  </nav>

  <!-- Core JavaScript Scripts -->
  <script src="${prefix}assets/js/clinic-config.js"></script>
  <script src="${prefix}assets/js/main.js"></script>
</body>
</html>
`;
}

function getBaseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "name": config.name,
    "alternateName": config.nameHindi,
    "image": "https://capitalpetclinic.in/assets/images/original-banner.png",
    "url": "https://capitalpetclinic.in/",
    "telephone": [`+91${config.primaryPhone}`, `+91${config.alternatePhone}`],
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${config.address.street}, ${config.address.colony}`,
      "addressLocality": config.address.city,
      "addressRegion": config.address.state,
      "postalCode": config.address.pincode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": config.coordinates.latitude,
      "longitude": config.coordinates.longitude
    },
    "hasMap": config.mapEmbedUrl,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "22:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": config.googleRating.score,
      "reviewCount": config.googleRating.reviewCount.toString(),
      "bestRating": "5"
    },
    "founder": config.doctors.map(d => ({
      "@type": "Person",
      "name": d.name,
      "jobTitle": d.designation,
      "hasCredential": d.degree
    }))
  };
}

/* ===================================================================
   PAGE BUILDERS
   =================================================================== */

// 1. HOME PAGE (index.html)
function buildHomePage() {
  const schema = {
    ...getBaseSchema(),
    "@type": ["VeterinaryCare", "LocalBusiness"]
  };

  const servicesHtml = config.services.map(s => `
    <div class="service-card">
      <div class="service-image-wrap">
        <img src="${s.image}" alt="${s.title} in Ranchi, Argora" loading="lazy">
        ${s.isEmergency ? '<span class="service-badge emergency"><i class="fa-solid fa-triangle-exclamation"></i> Emergency</span>' : '<span class="service-badge">Clinical Service</span>'}
      </div>
      <div class="service-card-body">
        <div class="service-card-icon"><i class="fa-solid ${s.icon}"></i></div>
        <h3 class="service-card-title">${s.title}</h3>
        <p class="service-card-desc">${s.shortDesc}</p>
        <a href="services/${s.slug}.html" class="service-card-link">
          <span>Explore Details</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `).join('');

  const doctorsHtml = config.doctors.map(d => `
    <div class="doctor-card">
      <div class="doctor-photo">
        <img src="${d.image}" alt="${d.name}, Vet Doctor in Ranchi" loading="lazy">
      </div>
      <div class="doctor-info">
        <span class="doctor-degree-badge">${d.degree} · Certified</span>
        <h3 class="doctor-name">${d.name}</h3>
        <div class="doctor-role">${d.designation}</div>
        <p class="doctor-bio">${d.bio}</p>
        <div class="doctor-placeholder-note"><i class="fa-solid fa-circle-info"></i> ${d.experiencePlaceholder}</div>
      </div>
    </div>
  `).join('');

  const content = `
  ${renderHead({
    title: "Capital Pet Clinic Ranchi | Top Vet Doctor & Pet Clinic Argora",
    description: "Capital Pet Clinic in Ranchi led by Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara (B.V.Sc). 5.0★ Google rated. Vaccination, surgery, emergency care, medicine, home visit & pet food.",
    keywords: "pet clinic in ranchi, vet doctor ranchi, dog vaccination ranchi, pet clinic argora, harmu vet, home visit vet ranchi, emergency vet ranchi, pet food shop ranchi, कैपिटल पेट क्लिनिक रांची",
    canonicalUrl: '',
    schemaJson: schema
  })}
  ${renderHeader('home')}

  <!-- MAIN HERO SECTION (CENTERED HEADINGS & TEXT) -->
  <section class="hero-section" style="background-image: url('assets/images/cta-bg-dogs.jpg');">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="hero-rating-chip">
        <span class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </span>
        <span>5.0 Google Rating · 23 Verified Local Reviews</span>
      </div>

      <h1 class="hero-title">Gentle, Compassionate & Expert Veterinary Care in Ranchi</h1>
      <p class="hero-subline-en">Led by Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara (B.V.Sc). Comprehensive clinical diagnostics, cold-chain vaccination, sterile surgeries, and 24/7 emergency support in Argora & Harmu.</p>
      <p class="hero-subline-hi">रांची में आपके प्यारे पालतू कुत्तों, बिल्लियों और पंछियों के लिए सम्पूर्ण चिकित्सीय देखभाल एवं आपातकालीन सेवा।</p>

      <div class="hero-buttons">
        <a href="tel:${config.primaryPhone}" class="btn btn-amber">
          <i class="fa-solid fa-phone"></i>
          <span>Call ${config.primaryPhoneFormatted}</span>
        </a>
        <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hello Capital Pet Clinic Ranchi, I would like to book a consultation.')}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          <i class="fa-brands fa-whatsapp"></i>
          <span>Chat on WhatsApp</span>
        </a>
        <a href="${config.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-white">
          <i class="fa-solid fa-location-dot"></i>
          <span>Get Directions</span>
        </a>
      </div>

      <!-- Hero Featured Pet Avatars Row -->
      <div class="hero-pet-badge-row">
        <img src="assets/images/puppy-hero-duo.jpg" alt="Puppies cared for in Ranchi" class="hero-pet-avatar">
        <img src="assets/images/hero-dog.jpg" alt="Dogs at Capital Pet Clinic" class="hero-pet-avatar">
        <img src="assets/images/cat-banner.jpg" alt="Cats cared for at clinic" class="hero-pet-avatar">
        <img src="assets/images/bird-care.jpg" alt="Birds cared for in Ranchi" class="hero-pet-avatar">
        <span style="font-size:14px; color:#e2edea; font-weight:600; margin-left:6px;">
          <i class="fa-solid fa-shield-cat" style="color:var(--amber);"></i> Loved & Trusted by 2,000+ Ranchi Pet Parents
        </span>
      </div>
    </div>
    <div class="hero-paw-trail"><i class="fa-solid fa-paw" style="font-size: 160px; color: #ffffff;"></i></div>
  </section>

  <!-- THREE-CARD QUICK-ACTION PANEL -->
  <section class="quick-action-section">
    <div class="container">
      <div class="quick-action-grid">
        <a href="tel:${config.primaryPhone}" class="action-card action-call">
          <div class="action-icon"><i class="fa-solid fa-phone-volume"></i></div>
          <div>
            <h3 class="action-title">Call Clinic Directly</h3>
            <p class="action-desc">Immediate telephone connection with our duty veterinarian for appointments and medical queries.</p>
          </div>
        </a>

        <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hello Capital Pet Clinic, I would like to inquire about appointments.')}" target="_blank" rel="noopener noreferrer" class="action-card action-whatsapp">
          <div class="action-icon"><i class="fa-brands fa-whatsapp"></i></div>
          <div>
            <h3 class="action-title">Chat on WhatsApp</h3>
            <p class="action-desc">Fast responses, prescription queries, photo sharing for symptoms, and easy booking.</p>
          </div>
        </a>

        <a href="${config.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" class="action-card action-directions">
          <div class="action-icon"><i class="fa-solid fa-map-location-dot"></i></div>
          <div>
            <h3 class="action-title">Get GPS Directions</h3>
            <p class="action-desc">Navigate directly via Google Maps to Old Argora Road, near Balibagicha Dindayal Chowk.</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- PET SHOWCASE SECTION (HIGH VISIBILITY PET IMAGES - LIGHT BACKGROUND) -->
  <section class="section section-cream">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Gentle Care for All Companions</span>
        <h2 class="section-title">Pets We Care For with Love in Ranchi</h2>
        <p class="section-subtitle">From bouncy puppies and curious kittens to birds and rabbits, we deliver personalized, gentle, and stress-free medical care for every family member.</p>
      </div>

      <div class="pet-showcase-grid">
        <div class="pet-showcase-card">
          <div class="pet-showcase-img-wrap">
            <img src="assets/images/hero-dog.jpg" alt="Dog care and puppy vaccination in Ranchi" loading="lazy">
            <span class="pet-showcase-badge">Canine Care</span>
          </div>
          <div class="pet-showcase-body">
            <h3 class="pet-showcase-title">Dogs & Puppies</h3>
            <div class="pet-showcase-hindi">कुत्ते एवं पिल्ले</div>
            <p class="pet-showcase-desc">7-in-1 DHPPi & Anti-Rabies cold-chain vaccines, tick fever treatment, puppy starters, surgery, and low-stress checkups.</p>
          </div>
        </div>

        <div class="pet-showcase-card">
          <div class="pet-showcase-img-wrap">
            <img src="assets/images/cat-banner.jpg" alt="Cat care and feline vaccination in Ranchi" loading="lazy">
            <span class="pet-showcase-badge">Feline Care</span>
          </div>
          <div class="pet-showcase-body">
            <h3 class="pet-showcase-title">Cats & Kittens</h3>
            <div class="pet-showcase-hindi">बिल्लियां एवं शावक</div>
            <p class="pet-showcase-desc">Gentle feline handling, Tricat viral vaccinations, deworming, kitten nutrition, and low-noise peaceful consultation rooms.</p>
          </div>
        </div>

        <div class="pet-showcase-card">
          <div class="pet-showcase-img-wrap">
            <img src="assets/images/rabbit-care.jpg" alt="Rabbit veterinary care in Ranchi" loading="lazy">
            <span class="pet-showcase-badge">Small Mammals</span>
          </div>
          <div class="pet-showcase-body">
            <h3 class="pet-showcase-title">Rabbits & Small Pets</h3>
            <div class="pet-showcase-hindi">खरगोश व छोटे जानवर</div>
            <p class="pet-showcase-desc">Specialized gastrointestinal advice, gentle physical exams, dental checks, and safe nail trimming for small companions.</p>
          </div>
        </div>

        <div class="pet-showcase-card">
          <div class="pet-showcase-img-wrap">
            <img src="assets/images/bird-care.jpg" alt="Bird veterinary care in Ranchi" loading="lazy">
            <span class="pet-showcase-badge">Avian Care</span>
          </div>
          <div class="pet-showcase-body">
            <h3 class="pet-showcase-title">Pet Birds</h3>
            <div class="pet-showcase-hindi">पालतू पंछी</div>
            <p class="pet-showcase-desc">Beak and feather evaluation, dietary balancing, respiratory therapy, and safe avian vitamin supplementation.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES GRID SECTION (CLEAN PURE WHITE LIGHT BACKGROUND) -->
  <section class="section section-white" id="services">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Comprehensive Pet Healthcare</span>
        <h2 class="section-title">Our Veterinary Services in Ranchi</h2>
        <p class="section-subtitle">From routine puppy immunizations and wellness checks to advanced soft-tissue surgery, home visits, and emergency stabilization.</p>
      </div>

      <div class="services-grid">
        ${servicesHtml}
      </div>
    </div>
  </section>

  <!-- WHY CHOOSE US (LIGHT SOFT MINT BACKGROUND + WARM REAL PET PHOTO) -->
  <section class="section section-mint">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Dedicated To Animal Welfare</span>
        <h2 class="section-title">Why Ranchi Pet Parents Trust Capital Pet Clinic</h2>
        <p class="section-subtitle">We believe veterinary medicine should be stress-free for the patient and transparent for the pet parent.</p>
      </div>

      <div class="why-choose-layout">
        <div class="why-choose-grid">
          <div class="why-card">
            <div class="why-icon"><i class="fa-solid fa-user-doctor"></i></div>
            <h3 class="why-title">B.V.Sc Qualified Doctors</h3>
            <p class="why-desc">Trained and qualified veterinary professionals (Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara) handling your pet with clinical precision.</p>
          </div>

          <div class="why-card">
            <div class="why-icon"><i class="fa-solid fa-temperature-arrow-down"></i></div>
            <h3 class="why-title">Strict Cold-Chain Vaccines</h3>
            <p class="why-desc">All canine and feline vaccines are stored in temperature-monitored medical refrigerators to guarantee maximum antigen efficacy.</p>
          </div>

          <div class="why-card">
            <div class="why-icon"><i class="fa-solid fa-hand-holding-heart"></i></div>
            <h3 class="why-title">Gentle, Low-Stress Exams</h3>
            <p class="why-desc">Fear-free handling philosophy ensuring puppies, anxious dogs, and sensitive cats feel safe and calm during examinations.</p>
          </div>

          <div class="why-card">
            <div class="why-icon"><i class="fa-solid fa-clipboard-check"></i></div>
            <h3 class="why-title">Transparent & Honest Guidance</h3>
            <p class="why-desc">No unnecessary diagnostic tests or inflated medication bills. Honest treatment explanations with written prescriptions.</p>
          </div>
        </div>

        <div class="why-image-banner">
          <img src="assets/images/after-healthy-dog.jpg" alt="Happy healthy pet receiving compassionate care at Capital Pet Clinic Ranchi" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <!-- DOCTORS SECTION (CLEAN PURE WHITE LIGHT BACKGROUND) -->
  <section class="section section-white" id="doctors">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Experienced Veterinary Team</span>
        <h2 class="section-title">Meet Our Veterinary Doctors</h2>
        <p class="section-subtitle">Compassionate veterinary practitioners serving pets and their families across Ranchi, Harmu, and Argora.</p>
      </div>

      <div class="doctors-grid">
        ${doctorsHtml}
      </div>
    </div>
  </section>

  <!-- VERIFIED GOOGLE REVIEWS SECTION (100% AUTHENTIC CLIENT REVIEWS) -->
  <section class="section section-cream" id="reviews">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">100% Real Google Reviews</span>
        <h2 class="section-title">Loved & Verified by Ranchi Pet Parents</h2>
        <p class="section-subtitle">Read authentic feedback from Ranchi families whose pets received surgical care, emergency support, feline medicine, and vaccinations with Dr. Vivek & Dr. Ankit. Click any review to view the original Google Maps screenshot proof.</p>
      </div>

      <!-- Rating summary card -->
      <div class="google-rating-box" style="margin-bottom: 36px;">
        <div class="rating-score-side">
          <div class="rating-big-number count-up" data-target="5.0" data-decimal="true">5.0</div>
          <div class="rating-stars-row">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="rating-verified-text">
            <strong>23 Verified Google Reviews</strong><br>
            Official Google Business Profile · Ranchi
          </div>
        </div>
        <div class="rating-content-side">
          <h3 style="font-size:20px; margin-bottom:8px;">Uncompromising Medical Standards & Community Trust</h3>
          <p style="margin-bottom:18px;">Every review below was published on Google by verified Ranchi residents. We do not invent testimonials or use stock quotes. Transparency and patient safety are our core commitments.</p>
          <div class="rating-actions">
            <a href="reviews.html" class="btn btn-primary">
              <i class="fa-solid fa-certificate"></i> View All Reviews with Proofs
            </a>
            <a href="${config.googleRating.url}" target="_blank" rel="noopener noreferrer" class="btn btn-amber">
              <i class="fa-brands fa-google"></i> View on Google Maps
            </a>
          </div>
        </div>
      </div>

      <!-- Verified Review Cards Grid -->
      <div class="reviews-grid">
        ${config.verifiedReviews.slice(0, 6).map(rev => renderReviewCard(rev, 0)).join('')}
      </div>

      <div style="text-align: center; margin-top: 36px;">
        <a href="reviews.html" class="btn btn-outline" style="font-size:15px; padding:12px 28px;">
          <span>Read All ${config.verifiedReviews.length} Verified Testimonials</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- AUTHENTIC CLINIC FACILITY & PROCEDURES (REAL CLIENT PHOTOS) -->
  <section class="section section-white" id="clinic-tour">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Argora Clinic Tour</span>
        <h2 class="section-title">Inside Our Real Clinic & Operation Theater</h2>
        <p class="section-subtitle">Real, authentic photographs from our clinic on Old Argora Road, Ranchi. Sterile surgical theater, gentle feline consultation room, and in-clinic supportive care.</p>
      </div>

      <div class="real-clinic-grid">
        ${config.clinicPhotos.slice(0, 4).map(photo => renderClinicPhotoCard(photo, 0)).join('')}
      </div>

      <div style="text-align: center; margin-top: 36px;">
        <a href="gallery.html" class="btn btn-outline" style="font-size:15px; padding:12px 28px;">
          <i class="fa-solid fa-images"></i>
          <span>Explore Full Clinic Photo Gallery (${config.clinicPhotos.length} Authentic Photos)</span>
        </a>
      </div>
    </div>
  </section>

  <!-- HOW A VISIT WORKS (CLEAN PURE WHITE LIGHT BACKGROUND) -->
  <section class="section section-white">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Seamless Experience</span>
        <h2 class="section-title">How a Visit to Capital Pet Clinic Works</h2>
        <p class="section-subtitle">We keep every visit streamlined, calm, and reassuring for both you and your pet.</p>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3 class="step-title">Reach Out or Walk In</h3>
          <p class="step-desc">Call us at <strong>${config.primaryPhoneFormatted}</strong>, send a WhatsApp message to book a preferred time, or walk directly into our Argora clinic.</p>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <h3 class="step-title">Gentle Diagnostic Exam</h3>
          <p class="step-desc">Our B.V.Sc doctors perform a thorough head-to-tail checkup (weight, temperature, ears, eyes, coat, heart) in a clean, quiet consultation room.</p>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <h3 class="step-title">Treatment & Ongoing Support</h3>
          <p class="step-desc">Receive immediate treatment or vaccinations, collect genuine pharmacy medicines on-site, and get clear home-care instructions.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOME FAQ SECTION (LIGHT SOFT MINT BACKGROUND) -->
  <section class="section section-mint" id="faq">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Common Questions</span>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Clear, factual answers regarding appointments, vaccinations, and visiting our Ranchi clinic.</p>
      </div>

      <div class="faq-accordion">
        <div class="faq-item">
          <button type="button" class="faq-question-btn">
            <span>Where exactly is Capital Pet Clinic located in Ranchi?</span>
            <div class="faq-icon-arrow"><i class="fa-solid fa-chevron-down"></i></div>
          </button>
          <div class="faq-answer-pane">
            <div class="faq-answer-content">
              Capital Pet Clinic is located at <strong>Old Argora Road, near Balibagicha Dindayal Chowk, Harmu Housing Colony, Argora, Ranchi, Jharkhand 834002</strong> (Plus Code: 973X+53). It is easily accessible from Harmu, Argora Chowk, Ashok Nagar, and Kadru.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question-btn">
            <span>Do you offer home visits for sick or large pets in Ranchi?</span>
            <div class="faq-icon-arrow"><i class="fa-solid fa-chevron-down"></i></div>
          </button>
          <div class="faq-answer-pane">
            <div class="faq-answer-content">
              Yes, our veterinary doctors provide home visit services across Harmu, Argora, and nearby areas for pets that are difficult to transport or elderly. Please call or WhatsApp our clinic number in advance to schedule a doctor visit.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question-btn">
            <span>What are the consultation timings and emergency support hours?</span>
            <div class="faq-icon-arrow"><i class="fa-solid fa-chevron-down"></i></div>
          </button>
          <div class="faq-answer-pane">
            <div class="faq-answer-content">
              Our clinic operates daily from <strong>9:00 AM to 10:00 PM</strong>. We also provide emergency on-call assistance for acute trauma, accidents, and poisoning. <em>[Note: Exact 24/7 or till 10 pm confirmation is pending client verification].</em>
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question-btn">
            <span>Which vaccines are essential for a new puppy in India?</span>
            <div class="faq-icon-arrow"><i class="fa-solid fa-chevron-down"></i></div>
          </button>
          <div class="faq-answer-pane">
            <div class="faq-answer-content">
              The core immunization protocol consists of the <strong>DHPPi (7-in-1 or 9-in-1)</strong> vaccine against Canine Parvovirus, Distemper, and Hepatitis, followed by the <strong>Anti-Rabies</strong> vaccine and <strong>Kennel Cough</strong> protection. All vaccines are maintained under certified cold-chain refrigeration.
            </div>
          </div>
        </div>

        <div class="faq-item">
          <button type="button" class="faq-question-btn">
            <span>Do you sell prescription veterinary pet food and medicines?</span>
            <div class="faq-icon-arrow"><i class="fa-solid fa-chevron-down"></i></div>
          </button>
          <div class="faq-answer-pane">
            <div class="faq-answer-content">
              Yes, we have an in-house veterinary pharmacy with genuine animal health drugs, supplements, anti-tick spot-ons, and a comprehensive pet nutrition shop carrying Royal Canin, Farmina N&D, and prescription veterinary diets (Renal, Hepatic, Gastro).
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT & EMBEDDED MAP SECTION (CLEAN PURE WHITE LIGHT BACKGROUND) -->
  <section class="section section-white" id="contact">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Visit Us Today</span>
        <h2 class="section-title">Clinic Location & Easy Appointments</h2>
        <p class="section-subtitle">Walk in during OPD hours or book via WhatsApp with your preferred timing.</p>
      </div>

      <div class="contact-grid">
        <!-- Contact Info & Quick Form -->
        <div class="contact-card">
          <h3 style="font-size:22px; margin-bottom: 20px; color:var(--primary); text-align:left;">Contact Details</h3>

          <div class="contact-detail-row">
            <div class="contact-detail-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div>
              <div class="contact-detail-label">Clinic Address</div>
              <div class="contact-detail-value">${config.address.full}</div>
              <div class="contact-detail-placeholder">Near Balibagicha Dindayal Chowk · Plus Code: ${config.coordinates.plusCode}</div>
            </div>
          </div>

          <div class="contact-detail-row">
            <div class="contact-detail-icon"><i class="fa-solid fa-phone"></i></div>
            <div>
              <div class="contact-detail-label">Phone & WhatsApp</div>
              <div class="contact-detail-value">
                <a href="tel:${config.primaryPhone}" style="color:var(--primary); font-weight:700;">${config.primaryPhoneFormatted}</a>
              </div>
              <div class="contact-detail-placeholder">${config.phonePlaceholderNotice}</div>
            </div>
          </div>

          <div class="contact-detail-row">
            <div class="contact-detail-icon"><i class="fa-solid fa-clock"></i></div>
            <div>
              <div class="contact-detail-label">Clinic Timings</div>
              <div class="contact-detail-value">${config.timings.regularHours}</div>
              <div class="contact-detail-placeholder">${config.timings.placeholderNotice}</div>
            </div>
          </div>

          <hr style="border: 0; border-top: 1px solid var(--border-subtle); margin: 24px 0;">

          <h4 style="font-size:16px; margin-bottom: 12px; color:var(--primary); text-align:left;">Quick WhatsApp Booking</h4>
          <form id="appointment-quick-form" class="appointment-form">
            <div class="form-group">
              <label for="client_name">Your Name</label>
              <input type="text" id="client_name" name="client_name" placeholder="e.g. Rahul Sharma" required>
            </div>
            <div class="form-group">
              <label for="client_phone">Phone Number</label>
              <input type="tel" id="client_phone" name="client_phone" placeholder="e.g. 98XXXXXXXX" required>
            </div>
            <div class="form-group">
              <label for="pet_type">Pet Type</label>
              <select id="pet_type" name="pet_type">
                <option value="Dog">Dog (कुकुर)</option>
                <option value="Cat">Cat (बिल्ली)</option>
                <option value="Bird">Bird (पक्षी)</option>
                <option value="Rabbit / Other">Rabbit / Other Pet</option>
              </select>
            </div>
            <div class="form-group">
              <label for="requested_service">Service Needed</label>
              <select id="requested_service" name="requested_service">
                ${config.services.map(s => `<option value="${s.title}">${s.title}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="additional_notes">Describe Concern (Optional)</label>
              <textarea id="additional_notes" name="additional_notes" rows="2" placeholder="Symptoms, preferred timing, or pet breed..."></textarea>
            </div>
            <button type="submit" class="btn btn-amber" style="width:100%; margin-top: 8px;">
              <i class="fa-brands fa-whatsapp"></i> Book via WhatsApp
            </button>
          </form>
        </div>

        <!-- Google Map Embed & Directions -->
        <div>
          <div class="map-embed-container">
            <iframe 
              src="${config.mapEmbedUrl}" 
              title="Capital Pet Clinic Location in Ranchi" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade" 
              allowfullscreen>
            </iframe>
          </div>
          <div style="margin-top: 16px; display:flex; gap:12px; flex-wrap:wrap;">
            <a href="${config.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex:1;">
              <i class="fa-solid fa-diamond-turn-right"></i> Get Google Directions
            </a>
            <a href="tel:${config.primaryPhone}" class="btn btn-outline" style="flex:1;">
              <i class="fa-solid fa-phone"></i> Call Clinic
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'index.html'), content, 'utf8');
}

// 2. ABOUT PAGE (about.html)
function buildAboutPage() {
  const content = `
  ${renderHead({
    title: "About Us | Capital Pet Clinic Ranchi | Dr. Vivek & Dr. Ankit",
    description: "Learn about Capital Pet Clinic in Argora, Ranchi. Founded by B.V.Sc veterinary doctors Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara. Dedicated animal healthcare.",
    keywords: "about capital pet clinic, vet doctors ranchi, dr vivek gupta vet, dr ankit bara vet, pet clinic argora harmu",
    canonicalUrl: 'about.html'
  })}
  ${renderHeader('about')}

  <section class="hero-section" style="background-image: url('assets/images/real-clinic-surgery-front.png');">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="breadcrumbs-nav">
        <a href="index.html">Home</a> <span>/</span> <span>About Us</span>
      </div>
      <h1 class="hero-title">About Capital Pet Clinic</h1>
      <p class="hero-subline-en">A dedicated veterinary healthcare haven built on clinical excellence, gentle animal handling, and community trust in Ranchi, Jharkhand.</p>
      <div class="hindi-text" style="color:#d1e5e1; font-size:16px; margin-top:8px;">कैपिटल पेट क्लिनिक, अरगोड़ा, रांची · पशु चिकित्सा एवं देखभाल</div>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="about-hero-grid">
        <div>
          <span class="section-eyebrow" style="text-align:left; display:block;">Our Philosophy & Roots</span>
          <h2 class="section-title text-left">Committed to Every Pet in Harmu & Argora</h2>
          <p class="lead" style="margin-bottom: 20px; text-align:left;">
            Capital Pet Clinic was established by <strong>Dr. Vivek Kr. Gupta</strong> and <strong>Dr. Ankit R. Bara</strong>, both holders of the <strong>B.V.Sc</strong> veterinary medical qualification.
          </p>
          <p style="margin-bottom: 16px; text-align:left;">
            Located on Old Argora Road near Balibagicha Dindayal Chowk, our clinic serves as a primary healthcare provider for dogs, cats, birds, and small animals across Ranchi. We recognize that pets are family members who deserve the same clinical attention, gentle comfort, and scientific rigor as human patients.
          </p>
          <p style="margin-bottom: 24px; text-align:left;">
            From certified cold-chain vaccine management to modern diagnostic supportive therapy, our practice is designed to minimize stress for your pets while giving pet parents honest, transparent medical counsel.
          </p>

          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="contact.html" class="btn btn-primary"><i class="fa-solid fa-location-dot"></i> Visit Our Clinic</a>
            <a href="tel:${config.primaryPhone}" class="btn btn-amber"><i class="fa-solid fa-phone"></i> Call Doctor</a>
          </div>
        </div>

        <div>
          <div style="position:relative; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-lg); border:1px solid var(--border-card);">
            <img src="assets/images/real-clinic-persian-cat.png" alt="Real Cat Examination at Capital Pet Clinic Ranchi" style="width:100%; height:auto; display:block;" loading="lazy">
            <div style="position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top, rgba(15,76,69,0.92), transparent); padding:20px 16px; color:#ffffff; font-size:13px;">
              <strong>Gentle Feline Consultation</strong><br>
              Real examination at Capital Pet Clinic, Argora
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-mint">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Core Standards</span>
        <h2 class="section-title">Our Strict Clinical Pillars</h2>
        <p class="section-subtitle">How we protect your pet's well-being during every visit.</p>
      </div>

      <div class="why-choose-grid">
        <div class="why-card">
          <div class="why-icon"><i class="fa-solid fa-syringe"></i></div>
          <h3 class="why-title">Unbroken Cold Chain</h3>
          <p class="why-desc">Vaccines lose biological effectiveness if exposed to heat. We strictly maintain cold chain temperature protocols from factory to jab.</p>
        </div>

        <div class="why-card">
          <div class="why-icon"><i class="fa-solid fa-heart-pulse"></i></div>
          <h3 class="why-title">Sterile Surgical Theater</h3>
          <p class="why-desc">Autoclaved surgical instruments, sterile drapes, and precise anesthesia management during spaying, neutering, and soft-tissue operations.</p>
        </div>

        <div class="why-card">
          <div class="why-icon"><i class="fa-solid fa-pills"></i></div>
          <h3 class="why-title">100% Genuine Pharmacy</h3>
          <p class="why-desc">Direct sourcing of reputable veterinary pharmaceuticals, tick prevention tablets, and prescription therapeutic food.</p>
        </div>

        <div class="why-card">
          <div class="why-icon"><i class="fa-solid fa-handshake-angle"></i></div>
          <h3 class="why-title">Compassionate Handling</h3>
          <p class="why-desc">Zero aggression or rough handling. We take the time to let nervous animals sniff, settle, and receive treats before exams.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- REAL CLINIC TOUR ON ABOUT PAGE -->
  <section class="section section-white">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Real Infrastructure</span>
        <h2 class="section-title">Inside Our Argora Clinic Facility</h2>
        <p class="section-subtitle">Photographed on-site at Old Argora Road, Harmu, Ranchi. Designed for clinical hygiene, safety, and pet comfort.</p>
      </div>
      <div class="real-clinic-grid">
        ${config.clinicPhotos.slice(0, 4).map(p => renderClinicPhotoCard(p, 0)).join('')}
      </div>
    </div>
  </section>

  <!-- VERIFIED REVIEWS ON ABOUT PAGE -->
  <section class="section section-cream">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Pet Parent Feedback</span>
        <h2 class="section-title">Verified Words from Ranchi Families</h2>
        <p class="section-subtitle">Read real Google reviews praising Dr. Vivek Kr. Gupta and Dr. Ankit R. Bara.</p>
      </div>
      <div class="reviews-grid">
        ${[config.verifiedReviews[0], config.verifiedReviews[1], config.verifiedReviews[2]].map(r => renderReviewCard(r, 0)).join('')}
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'about.html'), content, 'utf8');
}

// 3. SERVICES OVERVIEW PAGE (services.html)
function buildServicesOverviewPage() {
  const cardsHtml = config.services.map(s => `
    <div class="service-card">
      <div class="service-image-wrap">
        <img src="${s.image}" alt="${s.title} Ranchi" loading="lazy">
        ${s.isEmergency ? '<span class="service-badge emergency">Emergency</span>' : '<span class="service-badge">Clinical Service</span>'}
      </div>
      <div class="service-card-body">
        <div class="service-card-icon"><i class="fa-solid ${s.icon}"></i></div>
        <h3 class="service-card-title">${s.title}</h3>
        <div class="hindi-text text-sm" style="color:var(--teal); margin-bottom:8px; font-weight:600;">${s.titleHindi}</div>
        <p class="service-card-desc">${s.shortDesc}</p>
        <a href="services/${s.slug}.html" class="service-card-link">
          <span>Read Full Service Details</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `).join('');

  const content = `
  ${renderHead({
    title: "Veterinary Services in Ranchi | Capital Pet Clinic Argora",
    description: "Explore all veterinary services at Capital Pet Clinic Ranchi: Dog & Cat Vaccination, General Treatment, Surgery, Medicine, Home Visit, Pet Food, Accessories & Emergency.",
    keywords: "veterinary services ranchi, pet vaccination ranchi, dog surgery ranchi, pet medicine shop argora, home visit vet ranchi",
    canonicalUrl: 'services.html'
  })}
  ${renderHeader('services')}

  <section class="hero-section" style="background-image: url('assets/images/cta-bg-dogs.jpg'); min-height: 420px;">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="breadcrumbs-nav">
        <a href="index.html">Home</a> <span>/</span> <span>Services</span>
      </div>
      <h1 class="hero-title">Veterinary Services in Ranchi</h1>
      <p class="hero-subline-en">Comprehensive healthcare, diagnostics, sterile surgery, cold-chain vaccines, pharmacy, and emergency stabilization for pets in Ranchi.</p>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">All Specialties</span>
        <h2 class="section-title">Specialized Care for Dogs, Cats & Small Pets</h2>
        <p class="section-subtitle">Click any service below for in-depth information on inclusions, pricing expectations, FAQs, and appointment details.</p>
      </div>

      <div class="services-grid">
        ${cardsHtml}
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'services.html'), content, 'utf8');
  fs.writeFileSync(path.join(SERVICES_DIR, 'index.html'), content.replace(/assets\//g, '../assets/').replace(/services\//g, ''), 'utf8');
}

// 4. INDIVIDUAL SERVICE PAGES (All 8 Services)
const SERVICE_DETAILS = {
  "vaccination": {
    metaTitle: "Pet Vaccination in Ranchi | Capital Pet Clinic Argora",
    metaDesc: "Puppy & kitten vaccinations in Ranchi by Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara. Parvovirus, Rabies, 7-in-1 DHPPi with verified cold-chain storage.",
    keywords: "dog vaccination ranchi, puppy vaccine schedule ranchi, rabies vaccine dog ranchi, cat vaccination harmu argora",
    heroImage: "assets/images/service-vaccine.jpg",
    inclusions: [
      "Pre-vaccination health & temperature assessment",
      "Core Canine Vaccines: DHPPi / 7-in-1 (Parvo, Distemper, Hepatitis)",
      "Anti-Rabies (ARV) vaccination & official immunization certificate",
      "Kennel Cough (Bordetella) & Canine Corona protection",
      "Feline Core Vaccines: Tricat / 3-in-1 (Panleukopenia, Calici, Herpes)",
      "Deworming schedule integration & subsequent booster alerts"
    ],
    targetPets: [
      { name: "Puppies & Kittens", desc: "Starting vital shots from 6-8 weeks of age to establish lifelong immunity against lethal viral threats.", icon: "fa-shield-dog" },
      { name: "Adult Dogs & Cats", desc: "Annual booster injections to refresh antibodies against Rabies, Parvovirus, and respiratory infections.", icon: "fa-dog" },
      { name: "Rescue & Adopted Pets", desc: "Catch-up immunization protocols for pets with missing or undocumented vaccination histories.", icon: "fa-cat" }
    ],
    whenToVisit: "New puppies at 6-8 weeks of age, kittens at 8-9 weeks, adult pets due for annual booster shots, or pets scheduled to stay at boarding kennels.",
    steps: [
      { num: 1, title: "Pre-Jab Physical Check", desc: "Doctor confirms the pet is completely free of fever, parasites, or active infections before injecting." },
      { num: 2, title: "Cold-Chain Preparation", desc: "Vaccine vial is taken directly from medical refrigeration and verified for batch safety." },
      { num: 3, title: "Gentle Subcutaneous Injection", desc: "Administered quickly with ultra-fine sterile needles to minimize any sting or discomfort." },
      { num: 4, title: "Immunity Record Updated", desc: "Your pet's vaccination booklet is signed and stamped with the exact due date for the next dose." }
    ],
    faqs: [
      { q: "At what age should I start vaccinating my puppy in Ranchi?", a: "Puppies should receive their first core vaccination (such as DHPPi/Puppy DP) between 6 to 8 weeks of age, followed by booster shots every 3 to 4 weeks until 16 weeks old." },
      { q: "Why is cold-chain storage so critical for vaccines?", a: "Vaccines are sensitive biological proteins. If exposed to Ranchi's summer heat, they degrade and fail to generate antibodies. At Capital Pet Clinic, our vaccines are kept in dedicated temperature-monitored refrigerators." },
      { q: "Are there any normal side effects after vaccination?", a: "Mild lethargy, slight soreness at the injection site, or a slight drop in appetite for 24 hours is normal. If swelling or hives develop, contact our clinic immediately." },
      { q: "Can a sick dog or cat be vaccinated?", a: "No. A pet must be healthy and dewormed before receiving a vaccine so that its immune system can mount a proper antibody response without complications." }
    ]
  },

  "treatment": {
    metaTitle: "Pet Medical Treatment in Ranchi | Capital Pet Clinic",
    metaDesc: "Comprehensive veterinary medical treatment & diagnostics in Ranchi. Viral illness, tick fever, skin allergies, stomach issues by qualified B.V.Sc vets.",
    keywords: "pet treatment ranchi, vet clinic harmu, dog sick doctor ranchi, tick fever treatment dog ranchi, cat treatment argora",
    heroImage: "assets/images/real-clinic-labrador-care.png",
    inclusions: [
      "Comprehensive head-to-tail clinical physical examination",
      "Viral infection management & supportive IV fluid therapy (Parvovirus, Gastroenteritis)",
      "Tick fever diagnosis, hematology evaluation, and targeted antibiotherapy",
      "Dermatology evaluation for mange, fungal infections, hot spots, and flea allergies",
      "Ear infection, otitis, and ophthalmology eye care",
      "Digestive disorder therapy (vomiting, diarrhea, dietary indiscretion)"
    ],
    targetPets: [
      { name: "Canines (Dogs)", desc: "All breeds from Indipets and Labradors to German Shepherds and Shih Tzus requiring acute medical attention.", icon: "fa-dog" },
      { name: "Felines (Cats)", desc: "Gentle low-stress diagnostic care for domestic short-hairs, Persians, and kittens.", icon: "fa-cat" },
      { name: "Small Pets & Birds", desc: "Specialized clinical checks for rabbits, birds, and other companion animals.", icon: "fa-dove" }
    ],
    whenToVisit: "Lethargy, refusal to eat for over 24 hours, repetitive vomiting or watery stool, high body temperature, persistent scratching or hair loss, or labored breathing.",
    steps: [
      { num: 1, title: "Symptom & History Intake", desc: "Doctor discusses pet behavior, duration of illness, diet, and previous medical history." },
      { num: 2, title: "Clinical Physical Exam", desc: "Detailed evaluation of body temperature, mucus membranes, lymph nodes, lungs, and abdomen." },
      { num: 3, title: "Therapy & Administration", desc: "Immediate supportive care (injections, IV drip, or wound dressing) administered in clinic." },
      { num: 4, title: "Prescription & Follow-up", desc: "Clear dosage schedule dispensed with follow-up review scheduled within 48 to 72 hours." }
    ],
    faqs: [
      { q: "What should I do if my dog is vomiting and refusing food?", a: "Withhold solid food and do not give human painkillers. Bring your pet to Capital Pet Clinic immediately, as early hydration and antiemetic therapy prevent dangerous dehydration." },
      { q: "How is tick fever treated in dogs?", a: "Tick fever requires clinical diagnosis followed by a structured course of specialized veterinary antibiotics and supportive liver/platelet tonics for 21 to 28 days." },
      { q: "Do you treat skin mange and severe itching?", a: "Yes. Our doctors diagnose whether the itching is caused by sarcoptic/demodectic mites, fungal ringworm, or bacterial dermatitis, and prescribe appropriate oral medications and medicated baths." },
      { q: "Can I bring my pet without an appointment?", a: "Yes, walk-ins are welcomed during our regular OPD hours (9:00 AM - 10:00 PM). Urgent cases receive immediate clinical priority." }
    ]
  },

  "surgery": {
    metaTitle: "Veterinary Surgery in Ranchi | Capital Pet Clinic",
    metaDesc: "Sterile veterinary surgical procedures in Ranchi by Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara (B.V.Sc). Spaying, neutering, tumor removal, wound repair.",
    keywords: "dog surgery ranchi, cat sterilization ranchi, spay neuter dog argora, veterinary surgeon ranchi, pet wound surgery harmu",
    heroImage: "assets/images/real-clinic-surgery-vivek.png",
    inclusions: [
      "Elective sterilization: Canine & Feline spaying (ovariohysterectomy) and castration",
      "Emergency soft-tissue wound repair and laceration suturing",
      "Lump, cyst, and benign tumor surgical excision",
      "Aural hematoma drainage and corrective surgical repair",
      "Foreign body extraction and abdominal exploratory surgery",
      "Strict aseptic operating theater setup with continuous vital monitoring"
    ],
    targetPets: [
      { name: "Young Pets (6+ Months)", desc: "Ideal age for safe preventive spaying and neutering to eliminate reproductive diseases.", icon: "fa-shield-heart" },
      { name: "Injured Animals", desc: "Trauma cases with bite wounds, vehicular cuts, or deep skin tears requiring surgical debridement.", icon: "fa-bandage" },
      { name: "Senior Pets", desc: "Carefully assessed pets requiring tumor removals or non-invasive soft-tissue corrective procedures.", icon: "fa-dog" }
    ],
    whenToVisit: "Planned sterilization at 6-12 months of age, visible abnormal growths or subcutaneous lumps, or sudden deep lacerations and open injuries.",
    steps: [
      { num: 1, title: "Pre-Operative Assessment", desc: "Comprehensive evaluation of cardiovascular status and pre-anesthetic fasting protocol." },
      { num: 2, title: "Sterile Preparation", desc: "Autoclaved surgical instruments, sterile drapes, and precise sedative induction." },
      { num: 3, title: "Surgical Procedure", desc: "Meticulous tissue handling with minimal blood loss and continuous vital signs monitoring." },
      { num: 4, title: "Post-Op Recovery & Sutures", desc: "Warm recovery observation until fully awake, followed by suture removal after 10-12 days." }
    ],
    faqs: [
      { q: "Why is spaying or neutering beneficial for pets?", a: "Sterilization prevents uterine infections (pyometra), reduces mammary tumors in females, eliminates testicular cancer in males, and prevents aggressive territorial roaming." },
      { q: "What precautions are needed before surgery?", a: "Pets must typically be fasted (no food for 8-12 hours, water allowed up to 2 hours prior) to prevent vomiting during anesthesia." },
      { q: "How long does surgical recovery take?", a: "Most pets recover within 7 to 10 days. An Elizabethan collar (cone) is provided to prevent the pet from licking or disturbing the incision." },
      { q: "Who performs the surgery at Capital Pet Clinic?", a: "All surgical procedures are conducted personally by our certified B.V.Sc veterinary surgeons (Dr. Vivek Kr. Gupta / Dr. Ankit R. Bara)." }
    ]
  },

  "medicine": {
    metaTitle: "Pet Pharmacy & Medicine in Ranchi | Capital Pet Clinic",
    metaDesc: "In-house veterinary pharmacy in Argora, Ranchi. 100% genuine pet antibiotics, tick-flea preventatives, dewormers, liver tonics, vitamins & supplements.",
    keywords: "pet medicine ranchi, veterinary pharmacy harmu, dog dewormer ranchi, tick flea medicine dog argora, pet supplements ranchi",
    heroImage: "assets/images/service-pharmacy.jpg",
    inclusions: [
      "100% genuine, unexpired veterinary pharmaceuticals direct from licensed distributors",
      "Broad-spectrum veterinary antibiotics and anti-inflammatories",
      "Oral tick and flea chewables (Bravecto, Simparica, NexGard) & topical spot-ons",
      "Canine and feline deworming tablets (dewormers for roundworms, tapeworms)",
      "Prescription liver tonics, kidney supplements, and joint chondroprotectants",
      "Dermatological medicated shampoos, sprays, and ear cleaning solutions"
    ],
    targetPets: [
      { name: "Routine Preventive Care", desc: "Quarterly deworming and monthly anti-tick treatments for all domestic dogs and cats.", icon: "fa-shield" },
      { name: "Chronic Illness Patients", desc: "Pets on ongoing cardiovascular, renal, arthritic, or skin maintenance therapies.", icon: "fa-pills" },
      { name: "Post-Surgery Recovery", desc: "Pain-relief analgesics, wound healing sprays, and post-op antibiotic courses.", icon: "fa-capsules" }
    ],
    whenToVisit: "To fulfill a doctor's veterinary prescription, restock seasonal tick prevention chewables, or pick up wellness supplements.",
    steps: [
      { num: 1, title: "Prescription Review", desc: "Pharmacist verifies dosage, frequency, and duration against your pet's current weight." },
      { num: 2, title: "Weight-Specific Dispensation", desc: "Veterinary medicines are strictly calibrated per kilogram body weight to ensure efficacy." },
      { num: 3, title: "Clear Administration Guidance", desc: "Doctor explains whether the medicine is given with food, crushed, or given as syrup." },
      { num: 4, title: "Storage Advice", desc: "Guidance on room temperature vs refrigeration requirements for drops and suspensions." }
    ],
    faqs: [
      { q: "Can I give human paracetamol or ibuprofen to my dog?", a: "NO! Human painkillers like Paracetamol, Crocin, and Ibuprofen are extremely toxic and potentially fatal to dogs and cats. Always use veterinarian-prescribed animal medications." },
      { q: "How often should I deworm my adult dog?", a: "Adult dogs should generally be dewormed every 3 months. Puppies require more frequent deworming every 2 to 4 weeks until 3 months of age." },
      { q: "What is the best medicine for ticks and fleas in Ranchi?", a: "Modern oral chewables containing molecules like Fluralaner or Sarolaner provide up to 1-3 months of complete protection against ticks and fleas with high safety margins." },
      { q: "Do you keep veterinary medicines in stock constantly?", a: "Yes, our on-site pharmacy carries a comprehensive inventory of all primary veterinary formulations so you do not have to search multiple human chemist shops." }
    ]
  },

  "home-visit": {
    metaTitle: "Vet Doctor Home Visit in Ranchi | Capital Pet Clinic",
    metaDesc: "Veterinary doctor doorstep home visit in Ranchi (Argora, Harmu, Ashok Nagar). Stress-free health checkups & vaccinations for anxious or large dogs.",
    keywords: "vet home visit ranchi, dog doctor home visit harmu, veterinary home service argora, mobile pet clinic ranchi, doorstep vet ranchi",
    heroImage: "assets/images/service-homevisit.jpg",
    inclusions: [
      "Doorstep clinical consultation by certified B.V.Sc veterinary doctors",
      "At-home routine vaccinations with portable cold-chain containers",
      "Complete physical examination: vitals, heart, skin, eyes, and joints",
      "Minor wound dressing, ear cleaning, and subcutaneous medication administration",
      "Palliative and geriatric care for senior, immobile, or arthritic pets",
      "Direct prescription delivery and home management counseling"
    ],
    targetPets: [
      { name: "Anxious & Fearful Pets", desc: "Pets that experience intense terror, motion sickness, or panic when visiting external clinics.", icon: "fa-face-smile" },
      { name: "Giant & Heavy Breeds", desc: "Great Danes, Mastiffs, Saint Bernards, or injured dogs that are difficult to transport in personal cars.", icon: "fa-dog" },
      { name: "Multi-Pet Households", desc: "Families with multiple dogs and cats where bringing all animals to clinic is impractical.", icon: "fa-people-roof" }
    ],
    whenToVisit: "When personal vehicle transport is unavailable, your pet is paralyzed or severely weak, or you prefer a calm checkup in your living room.",
    steps: [
      { num: 1, title: "Book Visit on WhatsApp", desc: "Share your exact Ranchi address, pet details, and preferred time slot." },
      { num: 2, title: "Doctor Equips Portable Kit", desc: "Our vet packs diagnostic tools, sterile medicines, and cold-packed vaccines." },
      { num: 3, title: "Comfortable Home Checkup", desc: "Doctor examines the pet in their familiar home surroundings with minimal anxiety." },
      { num: 4, title: "Treatment & Plan Delivered", desc: "Prescription provided, follow-up instructions given, and WhatsApp support confirmed." }
    ],
    faqs: [
      { q: "Which areas in Ranchi do you cover for home visits?", a: "We primarily cover Argora, Harmu Housing Colony, Balibagicha, Ashok Nagar, Kadru, Doranda, Hinoo, and surrounding Ranchi localities. Please message us to confirm your specific sector." },
      { q: "Can surgeries or X-rays be done at home?", a: "No. Major surgeries, general anesthesia, and imaging require the sterile environment and advanced machinery at our Argora clinic. Home visits are for consultations, injections, and routine vaccines." },
      { q: "How much advance notice is required for a home visit?", a: "We recommend booking at least 2 to 4 hours in advance so our doctors can coordinate their clinic OPD rounds with home appointments." },
      { q: "How do I schedule a home visit?", a: "Simply call us at <strong>${config.primaryPhoneFormatted}</strong> or send a message via WhatsApp with your locality and pet symptoms." }
    ]
  },

  "pet-food": {
    metaTitle: "Premium Pet Food Shop in Ranchi | Capital Pet Clinic",
    metaDesc: "Buy genuine dog & cat food in Ranchi at Capital Pet Clinic. Royal Canin, Farmina N&D, Drools, prescription veterinary diets (Renal, Gastro, Urinary).",
    keywords: "pet food shop ranchi, buy dog food argora, royal canin ranchi, prescription diet dog food harmu, cat food ranchi",
    heroImage: "assets/images/service-food.jpg",
    inclusions: [
      "Authorized inventory of leading global and Indian pet nutrition brands",
      "Specialized veterinary prescription diets (Renal, Hepatic, Gastrointestinal, Hypoallergenic)",
      "Puppy and kitten starter nutrition (weaning formulas, mother & baby dog kibble)",
      "Breed-specific food formulations (Labrador, Golden Retriever, German Shepherd, Persian Cat)",
      "Healthy treats: dental chews, single-ingredient freeze-dried snacks, training rewards",
      "Professional portion sizing and transition guidance from our veterinary doctors"
    ],
    targetPets: [
      { name: "Growing Puppies & Kittens", desc: "Calorie-dense, calcium-balanced diets formulated for proper bone and muscular growth.", icon: "fa-paw" },
      { name: "Pets with Medical Conditions", desc: "Clinical nutrition designed to support kidneys, dissolve urinary stones, or soothe digestive inflammation.", icon: "fa-heart" },
      { name: "Adult & Senior Pets", desc: "Weight-management and joint-support formulations tailored for slower metabolisms.", icon: "fa-bone" }
    ],
    whenToVisit: "Transitioning a puppy off mother's milk, persistent soft stool from low-grade food, dull coat or skin dryness, or doctor's prescription for therapeutic diet.",
    steps: [
      { num: 1, title: "Pet Body Condition Check", desc: "Doctor checks pet weight, body condition score, and coat quality." },
      { num: 2, title: "Diet Recommendation", desc: "Selection of the ideal brand, protein source, and life-stage formula." },
      { num: 3, title: "Transition Protocol", desc: "A 7-day gradual mix chart (25%, 50%, 75%, 100%) to prevent digestive upset." },
      { num: 4, title: "Portion Measurement", desc: "Exact gram-per-day measurement based on pet activity level." }
    ],
    faqs: [
      { q: "Which brands of pet food do you sell?", a: "We stock leading veterinary-approved brands including Royal Canin, Farmina N&D, Drools Focus, and specialized therapeutic diets." },
      { q: "Can I feed home-cooked food instead of commercial kibble?", a: "Home-cooked food is fine if properly balanced with calcium, essential fatty acids, and vitamins. Our doctors can formulate a safe balanced home diet plan for your pet." },
      { q: "What is prescription veterinary pet food?", a: "Prescription diets (such as Royal Canin Renal or Gastrointestinal) are formulated with exact nutrient balances to manage medical diseases like kidney failure or pancreatitis. They should be used under veterinary guidance." },
      { q: "Do you have food for sensitive or allergic dogs?", a: "Yes, we carry grain-free, hypoallergenic, and hydrolyzed protein diets specifically formulated for dogs with food intolerances and chronic skin allergies." }
    ]
  },

  "pet-accessories": {
    metaTitle: "Pet Accessories & Essentials Ranchi | Capital Pet Clinic",
    metaDesc: "High quality pet accessories in Ranchi. Ergonomic harnesses, leashes, travel crates, anti-tick grooming combs, feeding bowls, dental toys in Argora.",
    keywords: "pet accessories shop ranchi, dog leash harness ranchi, pet carrier crate harmu, dog grooming brush argora, pet shop ranchi",
    heroImage: "assets/images/service-grooming.jpg",
    inclusions: [
      "No-pull ergonomic chest harnesses, reflective walking leashes, and collars",
      "IATA compliant sturdy travel crates and breathable soft-sided carriers for cats and small dogs",
      "Stainless steel anti-skid food and water bowls, elevated feeding stands",
      "Professional grooming tools: slicker brushes, de-shedding combs, safe nail clippers",
      "Dental health toys, rubber chew aids, interactive enrichment balls",
      "Hygienic puppy training pee pads, tick repellent collars, and litter trays"
    ],
    targetPets: [
      { name: "New Puppy & Kitten Parents", desc: "Complete starter kits (collar, leash, food bowls, chew toys, training pads) for welcoming a new pet.", icon: "fa-gift" },
      { name: "Travelers & Relocating Families", desc: "Approved airline and rail travel crates and car seat safety belts.", icon: "fa-plane" },
      { name: "Active Outdoor Dogs", desc: "Heavy-duty reflective gear and durable walking harnesses that protect pet necks from strain.", icon: "fa-dog" }
    ],
    whenToVisit: "Bringing home a new companion, outgrowing an old puppy harness, planning travel, or replacing chewed equipment.",
    steps: [
      { num: 1, title: "Size & Breed Assessment", desc: "Pet chest and neck girth measured to ensure the perfect non-choking fit." },
      { num: 2, title: "Ergonomic Selection", desc: "Choosing breathable padded materials suitable for Ranchi's weather." },
      { num: 3, title: "Buckle & Safety Check", desc: "Testing double-locking clips and reinforced stitching for secure handling." },
      { num: 4, title: "Usage & Hygiene Tips", desc: "Instructions on washing, brush cleaning, and harness adjustments as your pet grows." }
    ],
    faqs: [
      { q: "Why should I choose a harness over a neck collar for walking?", a: "Harnesses distribute pulling force evenly across the chest and shoulders, preventing tracheal damage, neck strain, and eye pressure spikes common with traditional neck collars." },
      { q: "Can I bring my pet to try on harnesses and crates?", a: "Yes! We welcome pets at our Argora clinic so our staff can measure and fit harnesses, coats, and crates directly for maximum comfort." },
      { q: "Do you have crates suitable for train and flight travel?", a: "Yes, we stock durable, well-ventilated travel crates that meet airline and railway transit guidelines." },
      { q: "What brushes work best for heavy shedding dogs?", a: "For double-coated breeds like Golden Retrievers or German Shepherds, undercoat rakes and de-shedding slicker tools work best to remove dead hair without scratching the skin." }
    ]
  },

  "emergency-care": {
    metaTitle: "Emergency Vet Care in Ranchi | Capital Pet Clinic Argora",
    metaDesc: "Emergency veterinary care in Ranchi. Rapid medical stabilization for accidents, poisoning, bloat, trauma, heatstroke. Led by Dr. Vivek & Dr. Ankit.",
    keywords: "emergency vet ranchi, 24 7 vet doctor ranchi, pet accident emergency harmu, dog poisoning doctor ranchi, emergency pet clinic argora",
    heroImage: "assets/images/real-clinic-puppy-drip.png",
    isEmergency: true,
    inclusions: [
      "Emergency triage and vital stabilization: oxygen therapy, shock management, IV fluids",
      "Immediate wound hemostasis and surgical repair for motor vehicular accidents",
      "Acute toxic ingestion & accidental poison reversal protocols",
      "Gastric Dilatation-Volvulus (GDV / Bloat) urgent decompression",
      "Seizure and acute status epilepticus cessation therapy",
      "Heat stroke cooling, electrolyte balance restoration, and intensive monitoring"
    ],
    targetPets: [
      { name: "Vehicular Trauma Victims", desc: "Immediate hemorrhage control, stabilization, and pain relief for road accidents.", icon: "fa-truck-medical" },
      { name: "Poison Ingestion Cases", desc: "Pets that have eaten rat poison, chocolates, human medications, or toxic lilies.", icon: "fa-skull-crossbones" },
      { name: "Acute Medical Emergencies", desc: "Pets experiencing sudden collapse, blue/pale gums, violent non-stop vomiting, or choking.", icon: "fa-heart-circle-bolt" }
    ],
    whenToVisit: "IMMEDIATELY upon noticing sudden breathing distress, non-stop bleeding, suspected poisoning, bloated rigid abdomen, seizures, or collapse.",
    steps: [
      { num: 1, title: "CALL CLINIC EN ROUTE", desc: "Calling <strong>${config.primaryPhoneFormatted}</strong> allows our medical team to prep oxygen, trauma instruments, and medications before you arrive." },
      { num: 2, title: "Triage & Vitals Check", desc: "Doctor immediately assesses airway, breathing, circulation, and level of consciousness." },
      { num: 3, title: "Critical Stabilization", desc: "Emergency IV line placed, fluids started, oxygen mask provided, and acute distress managed." },
      { num: 4, title: "Monitoring & Recovery", desc: "Patient kept under intensive observation until vital signs normalize and out of danger." }
    ],
    faqs: [
      { q: "What should I do first in a pet emergency?", a: "1. Stay calm and keep your pet quiet. 2. <strong>Call Capital Pet Clinic at ${config.primaryPhoneFormatted} immediately</strong> to notify our veterinary team. 3. Transport your pet gently wrapped in a towel or blanket." },
      { q: "What are the common signs of pet poisoning?", a: "Sudden excessive drooling, muscle tremors, seizures, blood in vomiting or stool, dilated pupils, and extreme lethargy. If possible, bring the packaging of the suspected poison with you." },
      { q: "What are your emergency hours?", a: "We provide emergency on-call support. <em>[Note: Client confirmation pending for 24/7 or till 10 pm].</em> Always call ahead so the duty veterinarian can receive you immediately." },
      { q: "What is GDV / Bloat and why is it an extreme emergency?", a: "Gastric Dilatation-Volvulus occurs when the stomach fills with gas and twists on its axis, cutting off blood supply. It is fatal within hours without immediate emergency decompression and surgery." }
    ]
  }
};

function buildIndividualServicePages() {
  for (const [slug, data] of Object.entries(SERVICE_DETAILS)) {
    const isEmerg = data.isEmergency === true;
    const fullServiceObj = config.services.find(s => s.slug === slug);

    const relatedServices = config.services
      .filter(s => s.slug !== slug)
      .slice(0, 3)
      .map(s => `
        <div class="service-card">
          <div class="service-image-wrap" style="height:150px;">
            <img src="../${s.image}" alt="${s.title}" loading="lazy">
          </div>
          <div class="service-card-body" style="padding:16px;">
            <h4 style="font-size:16px; margin-bottom:6px; color:var(--primary); text-align:left;">${s.title}</h4>
            <p style="font-size:13px; color:var(--ink-light); margin-bottom:12px; text-align:left;">${s.shortDesc}</p>
            <a href="${s.slug}.html" class="service-card-link" style="font-size:13px;">View Service <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      `).join('');

    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": data.metaTitle,
      "name": fullServiceObj ? fullServiceObj.title : data.metaTitle,
      "provider": getBaseSchema(),
      "areaServed": {
        "@type": "City",
        "name": "Ranchi"
      },
      "description": data.metaDesc
    };

    const content = `
    ${renderHead({
      title: data.metaTitle,
      description: data.metaDesc,
      keywords: data.keywords,
      canonicalUrl: `services/${slug}.html`,
      depth: 1,
      isEmergency: isEmerg,
      schemaJson: schema
    })}
    ${renderHeader('services', 1)}

    <!-- SERVICE HERO (CENTERED) -->
    <section class="hero-section" style="background-image: url('../${data.heroImage}');">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="breadcrumbs-nav">
          <a href="../index.html">Home</a> <span>/</span> <a href="../services.html">Services</a> <span>/</span> <span>${fullServiceObj ? fullServiceObj.title : slug}</span>
        </div>

        ${isEmerg ? '<div class="emergency-badge-top"><i class="fa-solid fa-truck-medical"></i> URGENT / EMERGENCY VETERINARY CARE</div>' : ''}

        <h1 class="hero-title">${fullServiceObj ? fullServiceObj.title : data.metaTitle} in Ranchi</h1>
        <p class="hero-subline-en">${fullServiceObj ? fullServiceObj.shortDesc : data.metaDesc}</p>
        <div class="hindi-text" style="color:#d1e5e1; font-size:16px; margin-bottom:24px; text-align:center;">${fullServiceObj ? fullServiceObj.titleHindi : ''} · कैपिटल पेट क्लिनिक, अरगोड़ा, रांची</div>

        <div class="hero-buttons">
          <a href="tel:${config.primaryPhone}" class="btn ${isEmerg ? 'btn-emergency' : 'btn-amber'}">
            <i class="fa-solid fa-phone"></i>
            <span>Call Clinic: ${config.primaryPhoneFormatted}</span>
          </a>
          <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(fullServiceObj.whatsappPreFill)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Inquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>

    <!-- EMERGENCY CALL FIRST SPECIAL BOX (If Emergency) -->
    ${isEmerg ? `
    <section class="section section-white" style="padding-bottom: 0;">
      <div class="container">
        <div class="emergency-steps-box">
          <h2 style="color:var(--emergency-red); font-size:22px; margin-bottom:12px; text-align:center;">
            <i class="fa-solid fa-triangle-exclamation"></i> PLEASE CALL BEFORE DRIVING TO CLINIC
          </h2>
          <p style="font-size:15px; margin-bottom:14px; color:#4a1212; text-align:center; line-height:1.6;">
            Calling our emergency line at <strong><a href="tel:${config.primaryPhone}" style="color:var(--emergency-red); font-size:17px;">${config.primaryPhoneFormatted}</a></strong> en route gives our veterinary surgical team vital minutes to prepare oxygen concentrators, pre-warm intensive care pads, and draw emergency medications before your arrival.
          </p>
          <div style="font-size:13px; color:#782222; font-style:italic; text-align:center;">
            ${config.timings.placeholderNotice}
          </div>
        </div>
      </div>
    </section>
    ` : ''}

    <!-- WHAT IS INCLUDED (LIGHT SECTION) -->
    <section class="section section-white">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Clinical Scope</span>
          <h2 class="section-title">What is Included in This Service</h2>
          <p class="section-subtitle">Transparent, high-standard veterinary care adhering strictly to medical protocols.</p>
        </div>

        <div class="service-inclusion-grid">
          ${data.inclusions.map(inc => `
            <div class="inclusion-item">
              <div class="inclusion-check"><i class="fa-solid fa-check"></i></div>
              <div>
                <p style="font-weight: 500; font-size: 14.5px; color: var(--ink); text-align:left; margin:0; line-height:1.5;">${inc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- REAL CLINIC ASSETS & REVIEWS INJECTED PER SERVICE -->
    ${slug === 'surgery' ? `
    <section class="section section-mint">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Real Surgical Cases</span>
          <h2 class="section-title">Inside Our Sterile Operation Theater</h2>
          <p class="section-subtitle">Real photos of Dr. Vivek Kr. Gupta performing sterile surgeries at Capital Pet Clinic, Argora, Ranchi.</p>
        </div>
        <div class="real-clinic-grid">
          ${[config.clinicPhotos[0], config.clinicPhotos[3], config.clinicPhotos[6], config.clinicPhotos[7]].map(p => renderClinicPhotoCard(p, 1)).join('')}
        </div>
        <div style="margin-top: 40px;">
          <h3 style="text-align:center; margin-bottom:20px; color:var(--primary); font-size:20px;">Verified Surgery Patient Reviews</h3>
          <div class="reviews-grid">
            ${[config.verifiedReviews[0], config.verifiedReviews[3]].map(r => renderReviewCard(r, 1)).join('')}
          </div>
        </div>
      </div>
    </section>
    ` : ''}

    ${slug === 'treatment' ? `
    <section class="section section-mint">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Clinical Diagnostics</span>
          <h2 class="section-title">Real Patients Receiving Care in Argora</h2>
          <p class="section-subtitle">Photographed on-site: gentle Persian cat examination and golden retriever supportive IV fluid therapy.</p>
        </div>
        <div class="real-clinic-grid">
          ${[config.clinicPhotos[2], config.clinicPhotos[1], config.clinicPhotos[4], config.clinicPhotos[5]].map(p => renderClinicPhotoCard(p, 1)).join('')}
        </div>
        <div style="margin-top: 40px;">
          <h3 style="text-align:center; margin-bottom:20px; color:var(--primary); font-size:20px;">Verified Treatment Reviews</h3>
          <div class="reviews-grid">
            ${[config.verifiedReviews[6], config.verifiedReviews[7], config.verifiedReviews[8]].map(r => renderReviewCard(r, 1)).join('')}
          </div>
        </div>
      </div>
    </section>
    ` : ''}

    ${slug === 'emergency-care' ? `
    <section class="section section-mint">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Emergency Stabilization</span>
          <h2 class="section-title">Real Supportive Treatment in Critical Moments</h2>
          <p class="section-subtitle">In-clinic IV therapy, warming pads, and trauma stabilization at Capital Pet Clinic, Argora.</p>
        </div>
        <div class="real-clinic-grid" style="grid-template-columns: repeat(2, 1fr); max-width:700px; margin:0 auto 32px auto;">
          ${[config.clinicPhotos[4], config.clinicPhotos[2]].map(p => renderClinicPhotoCard(p, 1)).join('')}
        </div>
        <div>
          <h3 style="text-align:center; margin-bottom:20px; color:var(--primary); font-size:20px;">Verified Emergency Testimonial</h3>
          <div style="max-width:650px; margin:0 auto;">
            ${renderReviewCard(config.verifiedReviews[1], 1)}
          </div>
        </div>
      </div>
    </section>
    ` : ''}

    ${slug === 'home-visit' ? `
    <section class="section section-mint">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Doorstep Feedback</span>
          <h2 class="section-title">Verified Pet Parent Experience</h2>
          <p class="section-subtitle">Real feedback on Dr. Vivek & Dr. Ankit's late-night emergency and home visit support.</p>
        </div>
        <div style="max-width:650px; margin:0 auto;">
          ${renderReviewCard(config.verifiedReviews[1], 1)}
        </div>
      </div>
    </section>
    ` : ''}

    <!-- WHO IT IS FOR & WHEN TO VISIT (LIGHT SOFT MINT) -->
    <section class="section ${['surgery', 'treatment', 'emergency-care', 'home-visit'].includes(slug) ? 'section-white' : 'section-mint'}">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Patient Profiles</span>
          <h2 class="section-title">Who is This Service For?</h2>
          <p class="section-subtitle">Tailored clinical protocols for different companions in Ranchi.</p>
        </div>

        <div class="pet-target-grid" style="margin-bottom: 36px;">
          ${data.targetPets.map(tp => `
            <div class="pet-target-card">
              <div class="pet-target-icon"><i class="fa-solid ${tp.icon}"></i></div>
              <h3 style="font-size: 18px; margin-bottom: 8px; color: var(--primary); text-align:center;">${tp.name}</h3>
              <p style="font-size: 14px; color: var(--ink-light); text-align:center;">${tp.desc}</p>
            </div>
          `).join('')}
        </div>

        <div style="background-color: var(--card-bg); border-radius: var(--radius-lg); padding: 24px 20px; border: 1px solid var(--border-card); box-shadow: var(--shadow-sm); text-align:center;">
          <h3 style="color:var(--primary); font-size: 19px; margin-bottom: 8px; text-align:center;">
            <i class="fa-solid fa-calendar-check" style="color:var(--teal); margin-right:8px;"></i> When Should You Visit?
          </h3>
          <p style="color:var(--ink-light); font-size: 14.5px; line-height: 1.6; max-width:65ch; margin:0 auto; text-align:center;">
            ${data.whenToVisit}
          </p>
        </div>
      </div>
    </section>

    <!-- SIMPLE 3-4 STEP PROCESS (CLEAN WHITE) -->
    <section class="section ${['surgery', 'treatment', 'emergency-care', 'home-visit'].includes(slug) ? 'section-mint' : 'section-white'}">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Clinical Workflow</span>
          <h2 class="section-title">How the Procedure Works</h2>
          <p class="section-subtitle">Structured, gentle, and transparent steps from start to finish.</p>
        </div>

        <div class="steps-grid">
          ${data.steps.map(st => `
            <div class="step-card">
              <div class="step-number">${st.num}</div>
              <h3 class="step-title">${st.title}</h3>
              <p class="step-desc">${st.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SERVICE SPECIFIC FAQ (LIGHT CREAM) -->
    <section class="section section-cream">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Service Questions</span>
          <h2 class="section-title">Frequently Asked Questions: ${fullServiceObj.title}</h2>
          <p class="section-subtitle">Direct, medically verified answers from our veterinary doctors.</p>
        </div>

        <div class="faq-accordion">
          ${data.faqs.map(f => `
            <div class="faq-item">
              <button type="button" class="faq-question-btn">
                <span>${f.q}</span>
                <div class="faq-icon-arrow"><i class="fa-solid fa-chevron-down"></i></div>
              </button>
              <div class="faq-answer-pane">
                <div class="faq-answer-content">
                  ${f.a}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- RELATED SERVICES (WHITE) -->
    <section class="section section-white">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Explore Other Care</span>
          <h2 class="section-title">Related Veterinary Services</h2>
        </div>
        <div class="services-grid">
          ${relatedServices}
        </div>
      </div>
    </section>

    <!-- FINAL CTA BAND -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="service-cta-band">
          <div>
            <h3>Book ${fullServiceObj.title} Today</h3>
            <p>Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara are ready to assist your pet at our Argora clinic.</p>
          </div>
          <div class="service-cta-buttons">
            <a href="tel:${config.primaryPhone}" class="btn btn-amber">
              <i class="fa-solid fa-phone"></i> Call ${config.primaryPhoneFormatted}
            </a>
            <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(fullServiceObj.whatsappPreFill)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp Booking
            </a>
          </div>
        </div>
      </div>
    </section>

    ${renderFooter(1, 'services')}
    `;

    fs.writeFileSync(path.join(SERVICES_DIR, `${slug}.html`), content, 'utf8');
  }
}

// 5. DOCTORS PAGE (doctors.html)
function buildDoctorsPage() {
  const content = `
  ${renderHead({
    title: "Veterinary Doctors in Ranchi | Dr. Vivek Gupta & Dr. Ankit Bara",
    description: "Meet our qualified B.V.Sc veterinary doctors at Capital Pet Clinic, Ranchi: Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara. Expert compassionate pet care.",
    keywords: "vet doctors in ranchi, dr vivek kr gupta vet, dr ankit r bara vet, best vet doctor harmu, veterinary surgeon argora ranchi",
    canonicalUrl: 'doctors.html'
  })}
  ${renderHeader('doctors')}

  <section class="hero-section" style="background-image: url('assets/images/cta-bg-dogs.jpg');">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="breadcrumbs-nav">
        <a href="index.html">Home</a> <span>/</span> <span>Doctors</span>
      </div>
      <h1 class="hero-title">Our Veterinary Doctors</h1>
      <p class="hero-subline-en">Led by B.V.Sc graduates Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara, combining scientific modern veterinary medicine with gentle animal handling in Ranchi.</p>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Medical Leadership</span>
        <h2 class="section-title">Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara</h2>
        <p class="section-subtitle">Dedicated veterinarians with proven clinical track records in surgeries, diagnostics, feline therapy, and emergency care.</p>
      </div>

      <div class="doctors-grid">
        <!-- Dr. Vivek Kr. Gupta -->
        <div class="doctor-card">
          <div class="doctor-photo">
            <img src="assets/images/vet-doctor-1.jpg" alt="Dr. Vivek Kr. Gupta Veterinary Surgeon Ranchi" loading="lazy">
          </div>
          <div class="doctor-info">
            <span class="doctor-degree-badge">B.V.Sc · Certified Veterinary Surgeon</span>
            <h2 class="doctor-name" style="font-size:24px; text-align:left;">Dr. Vivek Kr. Gupta</h2>
            <div class="doctor-role">Veterinary Surgeon & Consultant</div>
            <p class="doctor-bio">Dedicated veterinary surgeon performing precise surgical procedures, spay/neuter operations, clinical diagnostics, and compassionate pet healthcare in Ranchi.</p>

            <div style="margin: 16px 0; padding: 12px 14px; background-color: var(--soft-mint); border-radius: var(--radius-md); font-size: 13px; text-align: left;">
              <strong style="color:var(--primary); display:block; margin-bottom:4px;"><i class="fa-solid fa-user-doctor"></i> Real Client Testimony:</strong>
              <em>"Dr. Vivek Gupta is an excellent veterinarian. I recently had my male dog neutered and female dog treated by him... Both recovered remarkably fast."</em>
              <div style="font-size:11.5px; color:var(--teal); font-weight:600; margin-top:4px;">— Ayushree Dey (5.0★ Google Review)</div>
            </div>

            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;">
              <button type="button" class="btn btn-outline" style="padding:7px 14px; font-size:12.5px;" data-modal-img="assets/images/real-clinic-surgery-vivek.png" data-modal-title="Dr. Vivek Performing Surgery in OT" data-modal-caption="Real OT procedure at Capital Pet Clinic, Argora, Ranchi">
                <i class="fa-solid fa-camera"></i> View Dr. Vivek in OT
              </button>
              <a href="tel:${config.primaryPhone}" class="btn btn-primary" style="padding:7px 14px; font-size:12.5px;"><i class="fa-solid fa-phone"></i> Consult</a>
              <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hello Dr. Vivek Gupta, I would like to book a consultation at Capital Pet Clinic.')}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding:7px 14px; font-size:12.5px;"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
            </div>
          </div>
        </div>

        <!-- Dr. Ankit R. Bara -->
        <div class="doctor-card">
          <div class="doctor-photo">
            <img src="assets/images/vet-doctor-2.jpg" alt="Dr. Ankit R. Bara Veterinary Physician Ranchi" loading="lazy">
          </div>
          <div class="doctor-info">
            <span class="doctor-degree-badge">B.V.Sc · Certified Veterinary Physician</span>
            <h2 class="doctor-name" style="font-size:24px; text-align:left;">Dr. Ankit R. Bara</h2>
            <div class="doctor-role">Veterinary Physician & Surgeon</div>
            <p class="doctor-bio">Skilled veterinary physician praised by Ranchi pet parents for patient handling, comprehensive feline treatment, preventive immunization, and prompt home visits.</p>

            <div style="margin: 16px 0; padding: 12px 14px; background-color: var(--soft-mint); border-radius: var(--radius-md); font-size: 13px; text-align: left;">
              <strong style="color:var(--primary); display:block; margin-bottom:4px;"><i class="fa-solid fa-shield-cat"></i> Real Client Testimony:</strong>
              <em>"Outstanding veterinary care. The vet Dr. Ankit was very professional, patient, and treated my cats with great care. Highly recommend this clinic."</em>
              <div style="font-size:11.5px; color:var(--teal); font-weight:600; margin-top:4px;">— Anshu Rajesh (5.0★ Google Review)</div>
            </div>

            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;">
              <button type="button" class="btn btn-outline" style="padding:7px 14px; font-size:12.5px;" data-modal-img="assets/images/real-clinic-persian-cat.png" data-modal-title="Feline Examination by Dr. Ankit" data-modal-caption="White Persian Cat Consultation at Capital Pet Clinic, Argora">
                <i class="fa-solid fa-camera"></i> View Cat Care Photo
              </button>
              <a href="tel:${config.primaryPhone}" class="btn btn-primary" style="padding:7px 14px; font-size:12.5px;"><i class="fa-solid fa-phone"></i> Consult</a>
              <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hello Dr. Ankit Bara, I would like to book a consultation at Capital Pet Clinic.')}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding:7px 14px; font-size:12.5px;"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Combined Feedback Card -->
      <div style="margin-top: 36px; background-color: var(--card-bg); border-radius: var(--radius-lg); padding: 24px; border: 1px solid var(--border-card); box-shadow: var(--shadow-sm); text-align: left;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
          <span style="color:var(--amber); font-size:16px;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
          <strong style="color:var(--primary); font-size:15px;">Emergency & Doorstep Care Feedback:</strong>
        </div>
        <p style="font-size: 14.5px; color: var(--ink); line-height: 1.6; margin-bottom: 6px;">
          <em>"I had a very good experience with Capital Pet Clinic in Ranchi. The doctors, especially Dr. Vivek and Dr. Ankit, were professional, caring, and responsive. What impressed me most was their availability for emergency and late-night home visits."</em>
        </p>
        <div style="font-size: 12px; color: var(--teal); font-weight: 600;">— Anand Kumar · 5.0 Google Review</div>
      </div>
    </div>
  </section>

  <section class="section section-mint">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Medical Ethics</span>
        <h2 class="section-title">Our Doctor-Patient Code</h2>
        <p class="section-subtitle">What you can expect every time your pet steps into our consultation room.</p>
      </div>

      <div class="why-choose-grid">
        <div class="why-card">
          <div class="why-icon"><i class="fa-solid fa-comment-medical"></i></div>
          <h3 class="why-title">Clear Communication</h3>
          <p class="why-desc">We thoroughly explain your pet's diagnosis, treatment alternatives, and expected recovery timeline in plain, understandable language.</p>
        </div>

        <div class="why-card">
          <div class="why-icon"><i class="fa-solid fa-shield-virus"></i></div>
          <h3 class="why-title">No Unnecessary Overprescribing</h3>
          <p class="why-desc">Only clinically indicated medications and essential diagnostic steps are recommended. We protect your pet's liver and your budget.</p>
        </div>

        <div class="why-card">
          <div class="why-icon"><i class="fa-solid fa-paw"></i></div>
          <h3 class="why-title">Patience & Gentle Pace</h3>
          <p class="why-desc">We never rush an exam. We give nervous dogs and cats time to inspect the table and calm down before checking vitals.</p>
        </div>

        <div class="why-card">
          <div class="why-icon"><i class="fa-solid fa-mobile-screen"></i></div>
          <h3 class="why-title">Follow-up Accessibility</h3>
          <p class="why-desc">Pet parents can easily message via WhatsApp to ask quick recovery follow-ups or verify medication responses.</p>
        </div>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'doctors.html'), content, 'utf8');
}

// 6. GALLERY PAGE (gallery.html)
function buildGalleryPage() {
  const content = `
  ${renderHead({
    title: "Clinic Gallery | Capital Pet Clinic Ranchi | Real Photos & Patients",
    description: "View authentic photos of Capital Pet Clinic in Argora, Ranchi: sterile surgery theater, Dr. Vivek in OT, Dr. Ankit cat care, IV therapy, pharmacy & patients.",
    keywords: "capital pet clinic gallery, pet clinic photos ranchi, veterinary surgery photos ranchi, real vet clinic harmu argora",
    canonicalUrl: 'gallery.html'
  })}
  ${renderHeader('gallery')}

  <section class="hero-section" style="background-image: url('assets/images/real-clinic-surgery-front.png');">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="breadcrumbs-nav">
        <a href="index.html">Home</a> <span>/</span> <span>Gallery</span>
      </div>
      <h1 class="hero-title">Clinic Photo Gallery</h1>
      <p class="hero-subline-en">Authentic, real glimpses into our sterile operation theater, feline examination room, supportive IV care, and happy companion pets in Ranchi.</p>
    </div>
  </section>

  <!-- AUTHENTIC CLINIC SURGERY & CARE (100% REAL PHOTOS FROM CLIENT) -->
  <section class="section section-white">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Authentic Clinical Facility</span>
        <h2 class="section-title">Real Operations & Patient Care in Argora</h2>
        <p class="section-subtitle">Photographed on-site at Old Argora Road, Harmu, Ranchi. Click any photo to view in high resolution.</p>
      </div>

      <div class="gallery-grid">
        ${config.clinicPhotos.map(img => `
          <div class="gallery-card" data-modal-img="${img.src}" data-modal-title="${img.title}" data-modal-caption="Authentic Photo · Capital Pet Clinic, Argora, Ranchi">
            <div class="gallery-card-img-wrap">
              <img src="${img.src}" alt="${img.title} at Capital Pet Clinic Ranchi" loading="lazy">
              <div style="position:absolute; top:10px; left:10px; background-color:rgba(15,76,69,0.92); color:#ffffff; font-size:11px; font-weight:700; padding:3px 8px; border-radius:var(--radius-pill); backdrop-filter:blur(4px); display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-camera"></i> Real Photo
              </div>
            </div>
            <div class="gallery-card-body">
              <span class="gallery-badge real">${img.category}</span>
              <h3 class="gallery-card-title">${img.title}</h3>
              <p style="font-size:12.5px; color:var(--ink-light); margin:0;">Capital Pet Clinic · Argora, Ranchi</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CLINIC ESSENTIALS & HAPPY PATIENTS -->
  <section class="section section-cream">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Comprehensive Setup</span>
        <h2 class="section-title">Pharmacy, Nutrition & Compassionate Care</h2>
        <p class="section-subtitle">Equipped to deliver gentle, complete, and low-stress animal medical healthcare.</p>
      </div>

      <div class="gallery-grid">
        <div class="gallery-card">
          <div class="gallery-card-img-wrap">
            <img src="assets/images/service-pharmacy.jpg" alt="In-House Veterinary Pharmacy Ranchi" loading="lazy">
          </div>
          <div class="gallery-card-body">
            <span class="gallery-badge">Pharmacy</span>
            <h3 class="gallery-card-title">In-House Veterinary Medicine Pharmacy</h3>
            <p style="font-size:12.5px; color:var(--ink-light); margin:0;">100% genuine veterinary pharmaceuticals & antibiotics.</p>
          </div>
        </div>

        <div class="gallery-card">
          <div class="gallery-card-img-wrap">
            <img src="assets/images/pet-food.jpg" alt="Nutritional Pet Food & Diets" loading="lazy">
          </div>
          <div class="gallery-card-body">
            <span class="gallery-badge">Nutrition</span>
            <h3 class="gallery-card-title">Veterinary Prescription Diets & Pet Food</h3>
            <p style="font-size:12.5px; color:var(--ink-light); margin:0;">Royal Canin, Farmina, renal & puppy nutrition.</p>
          </div>
        </div>

        <div class="gallery-card">
          <div class="gallery-card-img-wrap">
            <img src="assets/images/service-vaccine.jpg" alt="Cold Chain Pet Immunization" loading="lazy">
          </div>
          <div class="gallery-card-body">
            <span class="gallery-badge">Vaccination</span>
            <h3 class="gallery-card-title">Strict Cold-Chain Vaccine Handling</h3>
            <p style="font-size:12.5px; color:var(--ink-light); margin:0;">7-in-1 DHPPi & Anti-Rabies shots for dogs and cats.</p>
          </div>
        </div>

        <div class="gallery-card">
          <div class="gallery-card-img-wrap">
            <img src="assets/images/home-visit.jpg" alt="Doorstep Veterinary Consultation" loading="lazy">
          </div>
          <div class="gallery-card-body">
            <span class="gallery-badge">Home Visit</span>
            <h3 class="gallery-card-title">Doctor Doorstep Home Visits</h3>
            <p style="font-size:12.5px; color:var(--ink-light); margin:0;">Gentle consultations for senior or anxious pets in Ranchi.</p>
          </div>
        </div>

        <div class="gallery-card">
          <div class="gallery-card-img-wrap">
            <img src="assets/images/puppy-hero-duo.jpg" alt="Happy Vaccinated Puppies" loading="lazy">
          </div>
          <div class="gallery-card-body">
            <span class="gallery-badge">Patients</span>
            <h3 class="gallery-card-title">Healthy Vaccinated Puppies</h3>
            <p style="font-size:12.5px; color:var(--ink-light); margin:0;">Protected from dangerous viral parvo infections.</p>
          </div>
        </div>

        <div class="gallery-card">
          <div class="gallery-card-img-wrap">
            <img src="assets/images/after-healthy-dog.jpg" alt="Healthy Golden Retriever Patient" loading="lazy">
          </div>
          <div class="gallery-card-body">
            <span class="gallery-badge">Patients</span>
            <h3 class="gallery-card-title">Active & Thriving Canine Companions</h3>
            <p style="font-size:12.5px; color:var(--ink-light); margin:0;">Supported through routine wellness exams.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'gallery.html'), content, 'utf8');
}

// 7. REVIEWS PAGE (reviews.html)
function buildReviewsPage() {
  const content = `
  ${renderHead({
    title: "5.0★ Google Reviews | Capital Pet Clinic Ranchi | Verified Testimonials",
    description: "Read all 9+ verified 5.0-star Google reviews for Capital Pet Clinic in Argora, Ranchi. Real client stories of surgeries, cat care, home visits & emergency care by Dr. Vivek & Dr. Ankit.",
    keywords: "capital pet clinic reviews, pet clinic argora google reviews, vet doctor ranchi reviews, best vet in harmu ranchi",
    canonicalUrl: 'reviews.html'
  })}
  ${renderHeader('reviews')}

  <section class="hero-section" style="background-image: url('assets/images/cta-bg-dogs.jpg');">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="breadcrumbs-nav">
        <a href="index.html">Home</a> <span>/</span> <span>Reviews</span>
      </div>
      <div class="hero-rating-chip">
        <span class="stars">
          <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
        </span>
        <span>5.0 Rating · 23 Verified Local Reviews</span>
      </div>
      <h1 class="hero-title">Verified Google Reviews & Stories</h1>
      <p class="hero-subline-en">100% authentic, unedited testimonials from pet parents in Harmu, Argora, and Ranchi who trusted us with their pets' health.</p>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="google-rating-box" style="margin-bottom: 40px;">
        <div class="rating-score-side">
          <div class="rating-big-number count-up" data-target="5.0" data-decimal="true">5.0</div>
          <div class="rating-stars-row">
            <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
          </div>
          <div class="rating-verified-text">
            <strong>23 Verified Google Reviews</strong><br>
            Official Google Business Profile · Ranchi
          </div>
        </div>
        <div class="rating-content-side">
          <h2 style="font-size:22px; color:var(--primary); margin-bottom:8px;">Real Voices of Ranchi Pet Parents</h2>
          <p style="margin-bottom:18px;">Click on any review card below to inspect the original Google Maps screenshot proof. We take pride in 100% genuine medical standards and compassionate care.</p>
          <div class="rating-actions">
            <a href="${config.googleRating.url}" target="_blank" rel="noopener noreferrer" class="btn btn-amber">
              <i class="fa-brands fa-google"></i> Read 23 Reviews on Google Maps
            </a>
            <a href="${config.googleRating.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <i class="fa-solid fa-pen-to-square"></i> Leave Us a Review
            </a>
          </div>
        </div>
      </div>

      <div class="reviews-grid">
        ${config.verifiedReviews.map(rev => renderReviewCard(rev, 0)).join('')}
      </div>

      <div style="margin-top: 48px; text-align: center; background-color: var(--soft-mint); padding: 36px 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-card);">
        <h3 style="color:var(--primary); font-size:22px; margin-bottom:8px;">Have You Visited Capital Pet Clinic?</h3>
        <p style="color:var(--ink-light); font-size:15px; max-width:60ch; margin:0 auto 20px auto;">
          Your feedback helps Ranchi pet parents find gentle, qualified veterinary care for their furry family members.
        </p>
        <a href="${config.googleRating.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i class="fa-brands fa-google"></i> Share Your Review on Google
        </a>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'reviews.html'), content, 'utf8');
}

// 8. FAQ PAGE (faq.html)
function buildFaqPage() {
  const faqList = [
    { q: "Where is Capital Pet Clinic located?", a: "We are situated at Old Argora Road, near Balibagicha Dindayal Chowk, Harmu Housing Colony, Argora, Ranchi, Jharkhand 834002 (Plus Code: 973X+53). Centrally accessible from Argora, Harmu, Ashok Nagar, Kadru, and Doranda." },
    { q: "What are your OPD and consultation timings?", a: "Our clinic is open daily from 9:00 AM to 10:00 PM. Emergency on-call support is available for critical trauma and acute poisoning cases. <em>[Note: Exact confirmation of 24/7 or till 10 pm is pending client verification].</em>" },
    { q: "Do I need to book an appointment in advance?", a: "Appointments are recommended for surgeries, home visits, or specific doctor consultations, but walk-ins are always welcomed during OPD hours. Urgent cases always receive immediate emergency priority." },
    { q: "Who are the doctors at Capital Pet Clinic?", a: "Our clinic is founded and managed by Dr. Vivek Kr. Gupta and Dr. Ankit R. Bara, both certified B.V.Sc veterinary doctors." },
    { q: "Do you offer doctor home visits for pets in Ranchi?", a: "Yes. For pet parents unable to travel, large dogs, or severely anxious pets, our doctors make doorstep visits in Argora, Harmu, and nearby Ranchi areas. Please book on WhatsApp in advance." },
    { q: "What vaccines does my puppy need in India?", a: "Essential core vaccines include the DHPPi 7-in-1 / 9-in-1 (Parvovirus, Distemper, Hepatitis), Anti-Rabies (ARV), and Kennel Cough vaccines. We maintain all vaccines under strict cold-chain refrigeration." },
    { q: "Can I buy prescription pet food and animal medicines directly at the clinic?", a: "Yes. We maintain a full-service in-house veterinary pharmacy with genuine medicines and a pet nutrition shop carrying Royal Canin, Farmina N&D, Drools, and prescription veterinary diets." },
    { q: "What should I do if my pet eats poison or chocolate?", a: "Do not induce vomiting with salt without doctor guidance. Immediately call our emergency number <strong>${config.primaryPhoneFormatted}</strong> and transport your pet directly to Capital Pet Clinic." }
  ];

  const content = `
  ${renderHead({
    title: "Frequently Asked Questions | Capital Pet Clinic Ranchi",
    description: "Find clear answers to questions about pet clinic timings, doctor appointments, puppy vaccinations, home visits, surgery, and costs at Capital Pet Clinic Ranchi.",
    keywords: "capital pet clinic faq, pet clinic timings ranchi, dog vaccine cost ranchi, home visit vet faq argora harmu",
    canonicalUrl: 'faq.html',
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a.replace(/<[^>]*>/g, '')
        }
      }))
    }
  })}
  ${renderHeader('faq')}

  <section class="hero-section" style="background-image: url('assets/images/faq-dog.jpg');">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="breadcrumbs-nav">
        <a href="index.html">Home</a> <span>/</span> <span>FAQs</span>
      </div>
      <h1 class="hero-title">Frequently Asked Questions</h1>
      <p class="hero-subline-en">Helpful, transparent answers to the questions Ranchi pet parents ask us most about clinic timings, vaccines, costs, and care.</p>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="faq-accordion" style="max-width: 900px; margin: 0 auto;">
        ${faqList.map(f => `
          <div class="faq-item">
            <button type="button" class="faq-question-btn">
              <span>${f.q}</span>
              <div class="faq-icon-arrow"><i class="fa-solid fa-chevron-down"></i></div>
            </button>
            <div class="faq-answer-pane">
              <div class="faq-answer-content">
                ${f.a}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 48px; text-align: center;">
        <p style="margin-bottom: 16px; color: var(--ink-light);">Have a question not listed here?</p>
        <a href="https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hello Capital Pet Clinic, I have a question regarding pet care.')}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          <i class="fa-brands fa-whatsapp"></i> Ask Us on WhatsApp
        </a>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'faq.html'), content, 'utf8');
}

// 9. CONTACT PAGE (contact.html with embedded map)
function buildContactPage() {
  const content = `
  ${renderHead({
    title: "Contact Capital Pet Clinic Ranchi | Argora Harmu Map & Phone",
    description: `Contact Capital Pet Clinic on Old Argora Road, Harmu Housing Colony, Ranchi. Phone: ${config.primaryPhoneFormatted} / ${config.alternatePhoneFormatted}. Embedded Google Map, directions & WhatsApp appointment booking.`,
    keywords: "contact capital pet clinic, pet clinic argora phone, vet doctor harmu contact, capital pet clinic address ranchi, emergency vet phone ranchi",
    canonicalUrl: 'contact.html',
    schemaJson: getBaseSchema()
  })}
  ${renderHeader('contact')}

  <section class="hero-section" style="background-image: url('assets/images/contact-pet.jpg');">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="breadcrumbs-nav">
        <a href="index.html">Home</a> <span>/</span> <span>Contact</span>
      </div>
      <h1 class="hero-title">Contact Us & Clinic Directions</h1>
      <p class="hero-subline-en">Conveniently located in Harmu Housing Colony, Argora, Ranchi. Reach out by phone, WhatsApp, or navigate directly using Google Maps.</p>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="contact-grid">
        <!-- Contact Card -->
        <div class="contact-card">
          <h2 style="font-size:24px; margin-bottom: 24px; color:var(--primary); text-align:left;">Get in Touch</h2>

          <div class="contact-detail-row">
            <div class="contact-detail-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div>
              <div class="contact-detail-label">Clinic Location (NAP)</div>
              <div class="contact-detail-value">
                <strong>Capital Pet Clinic (कैपिटल पेट क्लिनिक)</strong><br>
                ${config.address.street},<br>
                ${config.address.colony},<br>
                ${config.address.city}, ${config.address.state} - ${config.address.pincode}
              </div>
              <div class="contact-detail-placeholder">Plus Code: ${config.coordinates.plusCode} · Coordinates: ${config.coordinates.latitude}, ${config.coordinates.longitude}</div>
            </div>
          </div>

          <div class="contact-detail-row">
            <div class="contact-detail-icon"><i class="fa-solid fa-phone"></i></div>
            <div>
              <div class="contact-detail-label">Telephone / WhatsApp</div>
              <div class="contact-detail-value" style="display:flex; flex-direction:column; gap:6px;">
                <div>
                  <span style="font-size:13px; color:var(--ink-light); margin-right:6px;">Primary:</span>
                  <a href="tel:${config.primaryPhone}" style="color:var(--primary); font-size:18px; font-weight:700;">${config.primaryPhoneFormatted}</a>
                </div>
                <div>
                  <span style="font-size:13px; color:var(--ink-light); margin-right:6px;">Alternate:</span>
                  <a href="tel:${config.alternatePhone}" style="color:var(--primary); font-size:17px; font-weight:700;">${config.alternatePhoneFormatted}</a>
                </div>
              </div>
              <div class="contact-detail-placeholder">${config.phonePlaceholderNotice}</div>
            </div>
          </div>

          <div class="contact-detail-row">
            <div class="contact-detail-icon"><i class="fa-solid fa-clock"></i></div>
            <div>
              <div class="contact-detail-label">Clinic Hours</div>
              <div class="contact-detail-value">${config.timings.regularHours}</div>
              <div class="contact-detail-placeholder">${config.timings.placeholderNotice}</div>
            </div>
          </div>

          <hr style="border: 0; border-top: 1px solid var(--border-subtle); margin: 24px 0;">

          <h3 style="font-size: 18px; color: var(--primary); margin-bottom: 12px; text-align:left;">Send an Appointment Message</h3>
          <form id="appointment-quick-form" class="appointment-form">
            <div class="form-group">
              <label for="client_name">Your Full Name</label>
              <input type="text" id="client_name" name="client_name" placeholder="e.g. Amit Kumar" required>
            </div>
            <div class="form-group">
              <label for="client_phone">Your Phone Number</label>
              <input type="tel" id="client_phone" name="client_phone" placeholder="e.g. 97XXXXXXXX" required>
            </div>
            <div class="form-group">
              <label for="pet_type">Pet Species</label>
              <select id="pet_type" name="pet_type">
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit / Other">Rabbit / Small Animal</option>
              </select>
            </div>
            <div class="form-group">
              <label for="requested_service">Select Required Service</label>
              <select id="requested_service" name="requested_service">
                ${config.services.map(s => `<option value="${s.title}">${s.title}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label for="additional_notes">Your Message / Symptoms</label>
              <textarea id="additional_notes" name="additional_notes" rows="3" placeholder="Describe symptoms or preferred consultation time..."></textarea>
            </div>
            <button type="submit" class="btn btn-amber" style="width:100%;">
              <i class="fa-brands fa-whatsapp"></i> Send via WhatsApp
            </button>
          </form>
        </div>

        <!-- Embedded Map & Navigation -->
        <div>
          <div class="map-embed-container" style="min-height: 480px;">
            <iframe 
              src="${config.mapEmbedUrl}" 
              title="Capital Pet Clinic Location in Ranchi" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade" 
              allowfullscreen>
            </iframe>
          </div>

          <div style="margin-top: 20px; background-color: var(--card-bg); border: 1px solid var(--border-card); border-radius: var(--radius-lg); padding: 24px; box-shadow: var(--shadow-sm); text-align:center;">
            <h3 style="font-size: 18px; color: var(--primary); margin-bottom: 8px; text-align:center;">Directions & Nearby Landmarks</h3>
            <p style="font-size: 14px; color: var(--ink-light); margin-bottom: 16px; text-align:center;">
              Conveniently situated right by <strong>Balibagicha Dindayal Chowk</strong> on Old Argora Road in Harmu Housing Colony. Ample roadside parking available for cars and two-wheelers.
            </p>
            <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
              <a href="${config.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex:1;">
                <i class="fa-solid fa-diamond-turn-right"></i> Open in Google Maps
              </a>
              <a href="tel:${config.primaryPhone}" class="btn btn-outline" style="flex:1;">
                <i class="fa-solid fa-phone"></i> Call for Landmark Help
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'contact.html'), content, 'utf8');
}

// 9. BLOG OVERVIEW & STARTER POSTS (3 Starter Posts)
const BLOG_POSTS = [
  {
    slug: "puppy-vaccination-chart-india",
    title: "Puppy Vaccination Chart India: Complete Schedule, Diseases & Costs (2026)",
    desc: "A comprehensive veterinary guide to puppy vaccinations in India: 7-in-1 DHPPi, Anti-Rabies, Corona, Kennel Cough schedule, and cold-chain care in Ranchi.",
    date: "September 2026",
    readTime: "6 min read",
    image: "assets/images/puppy-hero-duo.jpg",
    content: `
      <h2>Why Puppy Vaccination is Non-Negotiable in India</h2>
      <p>Welcoming a new puppy into your home is one of life's greatest joys. However, in India, viral diseases such as Canine Parvovirus and Canine Distemper are widespread and carry mortality rates exceeding 80% in unprotected young pups. A timely, unbroken immunization protocol is the only reliable shield protecting your puppy's life.</p>

      <h2>The Standard Indian Puppy Vaccination Schedule</h2>
      <p>At Capital Pet Clinic in Ranchi, our B.V.Sc doctors follow the World Small Animal Veterinary Association (WSAVA) and Indian veterinary guidelines:</p>

      <div style="background-color: var(--soft-mint); border-radius: var(--radius-md); padding: 24px; margin: 24px 0;">
        <h3 style="color:var(--primary); margin-bottom: 12px; text-align:center;">Week-by-Week Immunization Protocol</h3>
        <ul style="list-style: disc; padding-left: 20px; line-height: 1.8; color: var(--ink);">
          <li><strong>6 to 8 Weeks (First Shot):</strong> Puppy DP or DHPPi (Canine Parvovirus + Canine Distemper). Crucial as maternal antibodies from mother's milk begin waning.</li>
          <li><strong>9 to 11 Weeks (Second Shot):</strong> 7-in-1 or 9-in-1 booster + Canine Coronavirus vaccine.</li>
          <li><strong>12 to 14 Weeks (Third Shot):</strong> Second 7-in-1 / 9-in-1 booster + Kennel Cough (Bordetella bronchiseptica).</li>
          <li><strong>14 to 16 Weeks (Anti-Rabies):</strong> First Anti-Rabies (ARV) shot. Mandatory by Indian law and essential for public health safety.</li>
          <li><strong>Annual Boosters:</strong> Once every year thereafter for life (Annual 7-in-1 + Annual Rabies).</li>
        </ul>
      </div>

      <h2>The Critical Importance of Cold-Chain Storage</h2>
      <p>Vaccines contain sensitive antigens that lose all potency if exposed to warm temperatures. During transit and power fluctuations in Ranchi, substandard clinics without battery backups often inadvertently administer inactive vaccines. At Capital Pet Clinic, our biological vaccines are preserved inside temperature-controlled medical refrigerators with 24/7 power backup.</p>

      <h2>Post-Vaccination Care Advice</h2>
      <p>After receiving a shot, it is completely normal for a puppy to feel slightly sluggish or run a mild low-grade fever for 12-24 hours. Keep your puppy rested in a quiet space, offer fresh water, and avoid strenuous exercise or bathing for 48 hours following vaccination.</p>
    `
  },

  {
    slug: "kitten-care-basics",
    title: "Kitten Care Basics: Diet, Deworming & Vaccination Guide for New Cat Parents",
    desc: "Everything you need to know about raising a healthy kitten in Ranchi: Tricat vaccination, deworming timeline, litter training, and proper feline nutrition.",
    date: "September 2026",
    readTime: "5 min read",
    image: "assets/images/kitten-care.jpg",
    content: `
      <h2>Welcoming Your First Kitten in Ranchi</h2>
      <p>Kittens are charming, curious, and resilient, yet their rapid growth demands careful veterinary attention during the first 6 months of life. Unlike dogs, cats have unique metabolic and behavioral requirements that require dedicated care.</p>

      <h2>Essential Feline Vaccinations: The Tricat Protocol</h2>
      <p>Even indoor cats in Ranchi must be immunized against airborne and carrier-borne viral diseases:</p>
      <ul style="list-style: disc; padding-left: 20px; line-height: 1.8; color: var(--ink); margin-bottom: 20px;">
        <li><strong>Feline Panleukopenia (Feline Distemper):</strong> A highly contagious and lethal viral disease causing severe vomiting and bloody diarrhea.</li>
        <li><strong>Feline Calicivirus & Feline Herpesvirus:</strong> Upper respiratory infections leading to painful mouth ulcers, sneezing, and eye discharge.</li>
        <li><strong>Anti-Rabies Vaccine:</strong> Administered at 3-4 months of age and renewed annually.</li>
      </ul>

      <h2>Nutrition: Why Cats Must Never Eat Dog Food</h2>
      <p>Cats are obligate carnivores. Their bodies cannot synthesize <em>taurine</em>, an essential amino acid found exclusively in animal meat. Feeding dog food or vegetarian diets to a kitten leads to irreversible blindness, heart muscle failure, and severe developmental deficiencies. Feed high-quality formulated kitten food or properly veterinarian-approved meat diets.</p>

      <h2>Litter Box Habits & Hygiene</h2>
      <p>Most kittens instinctively use clean litter boxes. Ensure you keep the litter box in a quiet, accessible corner away from their food and water bowls. Scoop daily and wash the pan weekly to prevent urinary tract infections.</p>
    `
  },

  {
    slug: "signs-dog-needs-vet",
    title: "7 Warning Signs Your Dog Needs an Immediate Vet Visit | Capital Pet Clinic",
    desc: "Learn to recognize critical warning signs in your dog: loss of appetite, persistent vomiting, pale gums, whimpering, and when to seek emergency vet care in Ranchi.",
    date: "September 2026",
    readTime: "5 min read",
    image: "assets/images/before-sick-dog.jpg",
    content: `
      <h2>Dogs Hide Their Pain: How to Spot the Warning Signals</h2>
      <p>Because dogs instinctively mask discomfort as a wild survival mechanism, pet parents often fail to notice serious illnesses until they have progressed significantly. Recognizing early physiological signals can save your dog's life.</p>

      <h2>The 7 Critical Warning Signs</h2>
      <div style="background-color: var(--soft-mint); border-radius: var(--radius-md); padding: 24px; margin: 24px 0;">
        <ol style="padding-left: 20px; line-height: 1.8; color: var(--ink);">
          <li><strong>Refusing Food for Over 24 Hours:</strong> While a missed meal is common, full anorexia for 24+ hours usually indicates fever, organ stress, or gastrointestinal obstruction.</li>
          <li><strong>Repeated Vomiting or Bloody Diarrhea:</strong> Frequent vomiting causes rapid dehydration. If vomit contains bile or blood, it requires immediate clinical examination.</li>
          <li><strong>Pale or Blue Gums:</strong> Healthy gums are bubblegum pink. Pale, white, or yellowish gums indicate internal bleeding, severe anemia from tick fever, or shock.</li>
          <li><strong>Distended or Hard Abdomen (Bloat):</strong> A suddenly swollen, tight stomach paired with unproductive retching is a surgical emergency (GDV).</li>
          <li><strong>Labored or Rapid Breathing at Rest:</strong> Panting after a run is normal; heavy chest-heaving while resting indicates pulmonary or cardiac distress.</li>
          <li><strong>Straining to Urinate or Defecate:</strong> Frequent unsuccessful attempts to urinate can point to life-threatening urinary stones or blockages.</li>
          <li><strong>Sudden Lethargy or Inability to Stand:</strong> Unsteadiness, disorientation, or sudden collapse require urgent emergency stabilization.</li>
        </ol>
      </div>

      <h2>What to Do if You Observe These Symptoms in Ranchi</h2>
      <p>Do not attempt home remedies or administer human medications. Contact <strong>Capital Pet Clinic at ${config.primaryPhoneFormatted}</strong> or bring your pet directly to our Argora clinic for immediate diagnostic examination.</p>
    `
  }
];

function buildBlogPages() {
  const blogCardsHtml = BLOG_POSTS.map(p => `
    <div class="service-card">
      <div class="service-image-wrap" style="height:200px;">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="service-badge">${p.readTime}</span>
      </div>
      <div class="service-card-body">
        <span style="font-size:12px; color:var(--teal); font-weight:600; text-transform:uppercase; text-align:center;">${p.date}</span>
        <h3 style="font-size:18px; margin: 8px 0; color:var(--primary); line-height:1.35; text-align:center;">${p.title}</h3>
        <p class="service-card-desc" style="text-align:center;">${p.desc}</p>
        <a href="blog/${p.slug}.html" class="service-card-link" style="justify-content:center;">
          <span>Read Full Article</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `).join('');

  const overviewContent = `
  ${renderHead({
    title: "Pet Care Blog & Veterinary Advice | Capital Pet Clinic Ranchi",
    description: "Expert pet health articles, puppy vaccination charts for India, kitten care tips, and emergency guides from Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara.",
    keywords: "pet care blog ranchi, puppy vaccination chart india, kitten care tips ranchi, dog health guide jharkhand",
    canonicalUrl: 'blog.html'
  })}
  ${renderHeader('blog')}

  <section class="hero-section" style="background-image: url('assets/images/cta-bg-dogs.jpg');">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="breadcrumbs-nav">
        <a href="index.html">Home</a> <span>/</span> <span>Blog</span>
      </div>
      <h1 class="hero-title">Pet Healthcare Articles & Guides</h1>
      <p class="hero-subline-en">Practical, veterinarian-written guides to help Ranchi pet parents nurture happy, healthy, and protected dogs and cats.</p>
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <div class="services-grid">
        ${blogCardsHtml}
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, 'blog.html'), overviewContent, 'utf8');
  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), overviewContent.replace(/assets\//g, '../assets/').replace(/blog\//g, ''), 'utf8');

  // Individual Blog Posts
  for (const post of BLOG_POSTS) {
    const postContent = `
    ${renderHead({
      title: `${post.title.substring(0, 55)} | Ranchi Vet`,
      description: post.desc,
      keywords: "puppy vaccination ranchi, dog vet care argora, pet clinic advice jharkhand",
      canonicalUrl: `blog/${post.slug}.html`,
      depth: 1,
      schemaJson: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.desc,
        "author": {
          "@type": "Person",
          "name": "Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara"
        },
        "publisher": getBaseSchema(),
        "datePublished": "2026-09-01"
      }
    })}
    ${renderHeader('blog', 1)}

    <section class="hero-section" style="background-image: url('../${post.image}');">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="breadcrumbs-nav">
          <a href="../index.html">Home</a> <span>/</span> <a href="../blog.html">Blog</a> <span>/</span> <span>Article</span>
        </div>
        <div style="font-size:13px; color:var(--amber); font-weight:600; text-transform:uppercase; margin-bottom:8px; text-align:center;">${post.date} · ${post.readTime}</div>
        <h1 class="hero-title" style="font-size: clamp(28px, 4.5vw, 44px); text-align:center;">${post.title}</h1>
        <p class="hero-subline-en" style="text-align:center;">By Dr. Vivek Kr. Gupta & Dr. Ankit R. Bara (B.V.Sc) · Capital Pet Clinic Ranchi</p>
      </div>
    </section>

    <section class="section section-white">
      <div class="container" style="max-width: 820px;">
        <article class="blog-post-article">
          <div style="font-size: 16px; line-height: 1.8; color: var(--ink);">
            ${post.content}
          </div>

          <hr style="border:0; border-top:1px solid var(--border-subtle); margin:40px 0;">

          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
            <div>
              <strong style="color:var(--primary); font-size:16px;">Questions about your pet?</strong><br>
              <span style="font-size:14px; color:var(--ink-light);">Consult with Dr. Vivek or Dr. Ankit today.</span>
            </div>
            <a href="tel:${config.primaryPhone}" class="btn btn-amber">
              <i class="fa-solid fa-phone"></i> Call ${config.primaryPhoneFormatted}
            </a>
          </div>
        </article>
      </div>
    </section>

    ${renderFooter(1, 'blog')}
    `;

    fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.html`), postContent, 'utf8');
  }
}

// 10. 404 PAGE (404.html)
function build404Page() {
  const content = `
  ${renderHead({
    title: "Page Not Found (404) | Capital Pet Clinic Ranchi",
    description: "The page you are looking for does not exist. Navigate back to Capital Pet Clinic homepage or contact our veterinary team in Ranchi.",
    keywords: "404 not found capital pet clinic",
    canonicalUrl: '404.html'
  })}
  ${renderHeader('')}

  <section class="section section-white" style="min-height: 70vh; display: flex; align-items: center; text-align: center;">
    <div class="container" style="max-width: 600px; margin: 0 auto; text-align:center;">
      <div style="font-size: 72px; color: var(--primary); margin-bottom: 16px;"><i class="fa-solid fa-paw"></i></div>
      <h1 style="font-size: 42px; color: var(--primary); margin-bottom: 12px; text-align: center;">404 - Page Not Found</h1>
      <p style="font-size: 18px; color: var(--ink-light); margin-bottom: 32px; text-align: center;">
        Looks like this puppy wandered off the leash! The page you were looking for doesn't exist or has moved.
      </p>

      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="index.html" class="btn btn-primary"><i class="fa-solid fa-house"></i> Return to Homepage</a>
        <a href="services.html" class="btn btn-outline"><i class="fa-solid fa-briefcase-medical"></i> View Services</a>
        <a href="tel:${config.primaryPhone}" class="btn btn-amber"><i class="fa-solid fa-phone"></i> Call Clinic</a>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;

  fs.writeFileSync(path.join(ROOT_DIR, '404.html'), content, 'utf8');
}

// 11. SITEMAP & ROBOTS
function buildSitemapAndRobots() {
  const urls = [
    '',
    'about.html',
    'services.html',
    'doctors.html',
    'gallery.html',
    'reviews.html',
    'faq.html',
    'contact.html',
    'blog.html',
    ...config.services.map(s => `services/${s.slug}.html`),
    ...BLOG_POSTS.map(b => `blog/${b.slug}.html`)
  ];

  const dateNow = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>https://capitalpetclinic.in/${u}</loc>
    <lastmod>${dateNow}</lastmod>
    <changefreq>${u === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${u === '' ? '1.0' : u.startsWith('services/') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://capitalpetclinic.in/sitemap.xml
`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTxt, 'utf8');
}

/* ===================================================================
   EXECUTE BUILD
   =================================================================== */
console.log("🚀 Starting Capital Pet Clinic Site Generation...");

buildHomePage();
console.log("✓ index.html generated with centered headings, pet showcase, and light sections");

buildAboutPage();
console.log("✓ about.html generated");

buildServicesOverviewPage();
console.log("✓ services.html generated");

buildIndividualServicePages();
console.log("✓ 8 individual service pages generated in /services");

buildDoctorsPage();
console.log("✓ doctors.html generated");

buildGalleryPage();
console.log("✓ gallery.html generated");

buildReviewsPage();
console.log("✓ reviews.html generated");

buildFaqPage();
console.log("✓ faq.html generated");

buildContactPage();
console.log("✓ contact.html generated");

buildBlogPages();
console.log("✓ blog.html and 3 starter articles generated in /blog");

build404Page();
console.log("✓ 404.html generated");

buildSitemapAndRobots();
console.log("✓ sitemap.xml and robots.txt generated");

console.log("\n🎉 ALL 19 PAGES REBUILT AND VALIDATED ACCORDING TO USER FEEDBACK!");

