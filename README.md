# Capital Pet Clinic (कैपिटल पेट क्लिनिक) - Ranchi, Jharkhand

[![Google Rating](https://img.shields.io/badge/Google%20Rating-5.0%20%E2%98%85-gold.svg)](https://maps.google.com/?q=23.3529227,85.2976377)
[![Location](https://img.shields.io/badge/Location-Argora%2C%20Ranchi-008080.svg)](https://maps.google.com/?q=23.3529227,85.2976377)
[![Doctors](https://img.shields.io/badge/Veterinarians-Dr.%20Vivek%20%26%20Dr.%20Ankit-blue.svg)](#veterinary-doctors)

A modern, responsive, conversion-focused multi-page website built for **Capital Pet Clinic**, Ranchi's premier veterinary care and pet health facility.

---

## 🏥 Clinic Information (NAP)

- **Clinic Name:** Capital Pet Clinic (कैपिटल पेट क्लिनिक)
- **Founding Doctors:**
  - **Dr. Vivek Kr. Gupta** (B.V.Sc & A.H. — Veterinary Surgeon & Physician)
  - **Dr. Ankit R. Bara** (B.V.Sc & A.H. — Veterinary Physician & Diagnostic Specialist)
- **Address:** Old Argora Road, near Balibagicha Dindayal Chowk, Harmu Housing Colony, Argora, Ranchi, Jharkhand 834002
- **Geo Coordinates:** `23.3529227, 85.2976377` | **Plus Code:** `973X+53 Ranchi, Jharkhand`
- **Phone / WhatsApp:** `+91 97981 72418` / `+91 97981 72415`
- **Google Reviews:** 5.0 ★ Rating (23+ Verified Client Reviews)

---

## ✨ Key Features & Architecture

- **Multi-Page Static Site Architecture:**
  - `index.html`: Hero with Ranchi pet photography, verified Google reviews, clinic tour, services grid, and emergency CTA.
  - `about.html`: Clinic story, philosophy, modern OT equipment, and doctor credentials.
  - `services.html` & `services/*.html`: 8 dedicated service pages (Vaccination, Treatment, Surgery, Medicine, Home Visit, Pet Food, Pet Accessories, Emergency Care).
  - `doctors.html`: In-depth veterinary bios, surgery focus, and client testimonials.
  - `gallery.html`: Real sterile OT surgery photos, clinical treatment photos, and interactive image modal lightbox.
  - `reviews.html`: All 9 authentic Google Maps client review cards with direct "View Review Proof" modal screenshots.
  - `faq.html`: Structured accordion FAQs covering vaccination costs, emergency protocols, timings, and payment options.
  - `contact.html`: Direct WhatsApp booking, one-click phone dialer, embedded Google Maps, and operating hours.
  - `blog.html` & `blog/*.html`: Educational guides on puppy vaccine charts, warning signs, and kitten care.
  - `404.html`, `sitemap.xml`, `robots.txt`.
- **Mobile-First Responsive Layout:**
  - Custom fluid CSS grid & flexbox design (zero heavy CSS framework bloat).
  - Clean centered hero headers and natural left-aligned card content.
  - Single-column smooth collapse for mobile viewports (`<= 768px`).
- **Interactive Lightbox Modal:**
  - Click-to-zoom for real clinic surgery photos and verified Google Maps review screenshots.
- **Local SEO & Schema Markup:**
  - `LocalBusiness` / `VeterinaryCare` JSON-LD schema on all pages.
  - OpenGraph and Twitter cards for social sharing.
  - Verified NAP data consistent across footer, headers, and metadata.

---

## 🚀 Getting Started

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/rahulrajmehta/Capital-Pet-Clinic.git
   cd Capital-Pet-Clinic
   ```

2. Start the local preview server:
   ```bash
   node server.js
   ```
   Open `http://localhost:8085/` in your browser.

3. Rebuild / Generate Pages:
   ```bash
   node build.js
   ```

---

## 📁 Project Structure

```text
├── assets/
│   ├── css/
│   │   └── style.css            # Responsive styles, dark mode tokens, typography
│   ├── js/
│   │   ├── clinic-config.js     # Single source of truth for NAP, doctors, reviews & timings
│   │   └── main.js              # Header scroll, mobile drawer, modal lightbox, FAQs
│   ├── Clinic Image/            # Authentic surgery & facility photos
│   ├── Reviews/                 # Authentic Google review screenshots
│   └── images/                  # Pet care & clinic assets
├── services/                    # 8 dedicated clinical service subpages
├── blog/                        # Educational pet care articles
├── index.html                   # Clinic homepage
├── about.html                   # About the clinic & founders
├── services.html                # Services overview
├── doctors.html                 # Doctor profiles & credentials
├── gallery.html                 # Facility & surgery photo gallery
├── reviews.html                 # 5.0 Google reviews with proof modal
├── faq.html                     # Frequently asked questions
├── contact.html                 # Location, directions & contact
├── 404.html                     # Error page
├── build.js                     # Static site compiler script
├── server.js                    # Zero-dependency local Node.js server
├── sitemap.xml                  # Search engine sitemap
└── robots.txt                   # Web crawler instructions
```

---

## 📞 Emergency & Booking Contacts

- **Phone Call:** [+91 97981 72418](tel:09798172418)
- **WhatsApp Chat:** [Click to Message on WhatsApp](https://wa.me/919798172418)
- **Google Maps Directions:** [Harmu Housing Colony, Argora, Ranchi](https://maps.google.com/?q=23.3529227,85.2976377)
