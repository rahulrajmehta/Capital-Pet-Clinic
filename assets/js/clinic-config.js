/**
 * CAPITAL PET CLINIC, RANCHI - CENTRAL CONFIGURATION
 * Single source of truth for all clinic facts, contact info, real Google reviews,
 * and authentic clinic photography.
 */

const CLINIC_CONFIG = {
  // Brand details
  name: "Capital Pet Clinic",
  nameHindi: "कैपिटल पेट क्लिनिक",
  tagline: "Compassionate Veterinary Care in Ranchi",
  taglineHindi: "रांची में आपके पालतू जानवरों की संपूर्ण देखभाल व चिकित्सा",
  
  // Primary Phone & WhatsApp
  primaryPhone: "9798172415",
  primaryPhoneFormatted: "+91 97981 72415",
  alternatePhone: "8340338945",
  alternatePhoneFormatted: "+91 83403 38945",
  whatsappNumber: "919798172415",
  phonePlaceholderNotice: "Official Clinic Lines: +91 97981 72415 / +91 83403 38945",

  // Address & Geographic Coordinates
  address: {
    street: "Old Argora Road, near Balibagicha Dindayal Chowk",
    colony: "Harmu Housing Colony, Argora",
    city: "Ranchi",
    state: "Jharkhand",
    pincode: "834002",
    full: "Old Argora Road, near Balibagicha Dindayal Chowk, Harmu Housing Colony, Argora, Ranchi, Jharkhand 834002"
  },
  coordinates: {
    latitude: 23.3529227,
    longitude: 85.2976377,
    plusCode: "973X+53"
  },
  
  // Google Maps links
  mapEmbedUrl: "https://www.google.com/maps?q=23.3529227,85.2976377&z=17&output=embed",
  mapDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=23.3529227,85.2976377",
  
  // Verified Google Business Profile Rating
  googleRating: {
    score: "5.0",
    reviewCount: 23,
    url: "https://maps.google.com/?q=23.3529227,85.2976377"
  },

  // Timings
  timings: {
    display: "9:00 AM – 10:00 PM (Daily) · Emergency On-Call",
    placeholderNotice: "Regular OPD: 9:00 AM – 10:00 PM Daily · 24/7 Emergency On-Call Support",
    regularHours: "Monday – Sunday: 9:00 AM – 10:00 PM",
    emergencyHours: "Emergency & Late-Night On-Call Available"
  },

  // Registered Veterinary Doctors
  doctors: [
    {
      id: "dr-vivek-gupta",
      name: "Dr. Vivek Kr. Gupta",
      degree: "B.V.Sc",
      designation: "Veterinary Surgeon & Consultant",
      image: "assets/images/vet-doctor-1.jpg",
      surgeryActionImage: "assets/images/real-clinic-surgery-vivek.png",
      experiencePlaceholder: "Senior Veterinary Surgeon specializing in soft-tissue surgery, neutering, and emergency trauma",
      bio: "Dedicated veterinary surgeon performing precise surgical procedures, spay/neuter operations, clinical diagnostics, and compassionate pet healthcare in Ranchi."
    },
    {
      id: "dr-ankit-bara",
      name: "Dr. Ankit R. Bara",
      degree: "B.V.Sc",
      designation: "Veterinary Physician & Surgeon",
      image: "assets/images/vet-doctor-2.jpg",
      experiencePlaceholder: "Veterinary Physician specializing in feline care, vaccination protocols, and doorstep home visits",
      bio: "Skilled veterinary physician praised by Ranchi pet parents for patient handling, comprehensive feline treatment, preventive immunization, and prompt home visits."
    }
  ],

  // 8 Canonical Services
  services: [
    {
      slug: "vaccination",
      title: "Pet Vaccination",
      titleHindi: "टीकाकरण सेवा",
      shortDesc: "Comprehensive immunization against Parvovirus, Rabies, Distemper, and feline viral diseases with safe cold-chain preservation.",
      image: "assets/images/service-vaccine.jpg",
      icon: "fa-syringe",
      whatsappPreFill: "Hello Capital Pet Clinic, I would like to inquire about pet vaccination schedule and appointments in Ranchi."
    },
    {
      slug: "treatment",
      title: "General Treatment & Diagnostics",
      titleHindi: "सामान्य उपचार एवं निदान",
      shortDesc: "Accurate clinical diagnoses and compassionate therapy for viral fevers, tick-borne infections, skin disorders, and stomach upsets.",
      image: "assets/images/real-clinic-labrador-care.png",
      icon: "fa-stethoscope",
      whatsappPreFill: "Hello Capital Pet Clinic, my pet is unwell and needs a medical consultation and treatment."
    },
    {
      slug: "surgery",
      title: "Veterinary Surgery",
      titleHindi: "शल्य चिकित्सा (सर्जरी)",
      shortDesc: "Safe, sterile elective and soft-tissue procedures including spaying, neutering, wound repairs, and tumor excisions in sterile OT.",
      image: "assets/images/real-clinic-surgery-vivek.png",
      icon: "fa-heart-pulse",
      whatsappPreFill: "Hello Capital Pet Clinic, I want to consult regarding surgical procedures and pre-op requirements for my pet."
    },
    {
      slug: "medicine",
      title: "Pharmacy & Veterinary Medicine",
      titleHindi: "पशु चिकित्सा दवाएं",
      shortDesc: "Well-stocked in-house pharmacy with 100% genuine veterinary prescription medicines, antibiotics, pain relievers, and multivitamins.",
      image: "assets/images/service-pharmacy.jpg",
      icon: "fa-pills",
      whatsappPreFill: "Hello Capital Pet Clinic, I want to check availability of veterinary medicines and supplements."
    },
    {
      slug: "home-visit",
      title: "Veterinary Home Visit",
      titleHindi: "होम विजिट सेवा (घर पर जांच)",
      shortDesc: "Stress-free veterinary checkups, routine vaccinations, and emergency late-night care right at your doorstep in Argora, Harmu, and Ranchi.",
      image: "assets/images/service-homevisit.jpg",
      icon: "fa-house-chimney-medical",
      whatsappPreFill: "Hello Capital Pet Clinic, I would like to request a veterinary doctor home visit in Ranchi."
    },
    {
      slug: "pet-food",
      title: "Nutritional Pet Food",
      titleHindi: "पौष्टिक पेट फूड",
      shortDesc: "Premium breed-specific food, puppy starters, prescription veterinary diets (renal, hepatic, gastro), and healthy treats.",
      image: "assets/images/service-food.jpg",
      icon: "fa-bowl-food",
      whatsappPreFill: "Hello Capital Pet Clinic, I want to inquire about premium pet food brands and prescription diets in stock."
    },
    {
      slug: "pet-accessories",
      title: "Pet Accessories & Essentials",
      titleHindi: "पेट एक्सेसरीज एवं जरूरी सामान",
      shortDesc: "High-grade leashes, collars, travel crates, anti-tick grooming combs, feeding bowls, dental toys, and hygiene aids.",
      image: "assets/images/service-grooming.jpg",
      icon: "fa-paw",
      whatsappPreFill: "Hello Capital Pet Clinic, I would like to know about available pet accessories and grooming supplies."
    },
    {
      slug: "emergency-care",
      title: "Emergency Vet Care",
      titleHindi: "आपातकालीन चिकित्सा",
      shortDesc: "Immediate stabilization for acute trauma, vehicular accidents, toxic ingestions, bloat (GDV), heat stroke, and severe respiratory distress.",
      image: "assets/images/real-clinic-puppy-drip.png",
      icon: "fa-truck-medical",
      isEmergency: true,
      whatsappPreFill: "EMERGENCY: Hello Capital Pet Clinic, I have a pet medical emergency and need immediate assistance in Ranchi."
    }
  ],

  // 100% Real Google Reviews Uploaded by Client
  verifiedReviews: [
    {
      name: "Ayushree Dey",
      stars: 5,
      date: "2 months ago",
      badge: "Dog Neutering & Care",
      text: "Dr. Vivek Gupta is an excellent veterinarian. I recently had my male dog neutered and my female dog treated by him a week ago. Both of them recovered remarkably fast. The treatments and medicines he prescribed worked wonders, and my dogs are back to health in no time. Moreover, his services are very reasonably priced. Thank you so much, Dr. Vivek",
      screenshot: "assets/images/reviews/review-ayushree-dey.png"
    },
    {
      name: "Anand Kumar",
      stars: 5,
      date: "3 months ago",
      badge: "Emergency & Home Visit",
      text: "I had a very good experience with Capital Pet Clinic in Ranchi. The doctors, especially Dr. Vivek and Dr. Ankit, were professional, caring, and responsive. What impressed me most was their availability for emergency and late-night home visits.",
      screenshot: "assets/images/reviews/review-anand-kumar.png"
    },
    {
      name: "Anshu Rajesh",
      stars: 5,
      date: "3 months ago",
      badge: "Feline Medical Care",
      text: "Outstanding veterinary care. The team is compassionate, professional, and genuinely concerned about the well-being of animals. The vet (Dr. Ankit) was very professional, patient, and treated my pet (cats)with great care. Highly recommend this clinic.",
      screenshot: "assets/images/reviews/review-anshu-rajesh.png"
    },
    {
      name: "Unknown Facts",
      stars: 5,
      date: "2 months ago",
      badge: "Cat Neutering Surgery",
      text: "I got my two cats, male and female, neutered at Capital Pet Clinic Argora Ranchi. The operation went very well and both the cats are completely healthy now.",
      screenshot: "assets/images/reviews/review-unknown-facts.png"
    },
    {
      name: "Rishav Kumar",
      stars: 5,
      date: "3 months ago",
      badge: "Pet Health Care",
      text: "I would highly recommend this clinic to everyone. They provide excellent care for pets. I no longer have to worry whenever my pet has any health issue—I simply consult them, and they always help.",
      screenshot: "assets/images/reviews/review-rishav-kumar.png"
    },
    {
      name: "Anugrah Anmol Minz",
      stars: 5,
      date: "3 months ago",
      badge: "Homely Treatment",
      text: "Absolutely best pet clinic in town, they are available for various services with homely treatment for our lovely pets.",
      screenshot: "assets/images/reviews/review-anugrah-minz.png"
    },
    {
      name: "Riya Murmu",
      stars: 5,
      date: "3 months ago",
      badge: "Dog Treatment",
      text: "I took my dog to this clinic for treatment, the vet was caring and professional. I am really happy and satisfied with the care provided to my dog.",
      screenshot: "assets/images/reviews/review-riya-murmu.png"
    },
    {
      name: "Vanucia Nongbsap",
      stars: 5,
      date: "3 months ago",
      badge: "Compassionate Vet",
      text: "Highly recommend! Very cooperative, compassionate, and professional. My dog received timely care and treatment, and I'm truly thankful for the excellent service.",
      screenshot: "assets/images/reviews/review-vanucia.png"
    },
    {
      name: "Mohan Studio",
      stars: 5,
      date: "3 months ago",
      badge: "Clean OT & Service",
      text: "Excellent pet clinic with caring staff, experienced doctors, clean facilities, and prompt service. My pet received outstanding treatment.",
      screenshot: "assets/images/reviews/review-mohan-studio.png"
    }
  ],

  // Authentic Clinic Photos Uploaded by Client
  clinicPhotos: [
    { src: "assets/images/real-clinic-surgery-vivek.png", title: "Dr. Vivek Kr. Gupta Performing Surgery in OT", category: "Surgery" },
    { src: "assets/images/real-clinic-persian-cat.png", title: "White Persian Cat Examination", category: "Feline Care" },
    { src: "assets/images/real-clinic-labrador-care.png", title: "Golden Labrador Receiving IV Fluid Therapy", category: "Treatment" },
    { src: "assets/images/real-clinic-surgery-front.png", title: "Sterile Surgical Operation Theater Setup", category: "Surgery" },
    { src: "assets/images/real-clinic-puppy-drip.png", title: "Puppy Care & In-Clinic Supportive Treatment", category: "Emergency" },
    { src: "assets/images/real-clinic-cat-basket.png", title: "Safe Feline Carrier & Low-Stress Arrival", category: "Feline Care" },
    { src: "assets/images/real-clinic-surgery-table.png", title: "Canine Surgical Procedure on Sterile Table", category: "Surgery" },
    { src: "assets/images/real-clinic-surgery-1.png", title: "Surgeon Focused under Operation Lamp", category: "Surgery" }
  ]
};

// Export for Node build script or browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CLINIC_CONFIG;
}
