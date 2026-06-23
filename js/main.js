/* ============================================================
   ΑΝΑΠΛΟΥΣ — main.js
   Progressive enhancement + live EL / EN / FR translation.
   Everything works without JS; this adds polish and language.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile navigation toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");
  if (toggle && navList) {
    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      navList.classList.remove("open");
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      navList.classList.toggle("open", !open);
    });
    navList.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  var revealSelectors = [
    ".hero-inner > *",
    ".section-head",
    ".section-media",
    ".grid-2 > div",
    ".card",
    ".news-item",
    ".pub-list li",
    ".logo-box",
    ".testimonial"
  ];
  var revealEls = document.querySelectorAll(revealSelectors.join(","));
  if ("IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 6) * 60 + "ms";
    });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contact form (demo handler) ----------
     No backend wired yet — show confirmation and reset.
     Replace with a real endpoint (fetch POST) when available. */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var note = form.querySelector(".form-note");
      if (note) note.hidden = false;
      form.querySelectorAll("input, textarea").forEach(function (f) { f.value = ""; });
    });
  }

  /* ---------- Images with graceful fallback ----------
     Each img.img-fade points at a file in assets/ (see assets/README.md).
     If it loads, it fades in and hides its [data-fallback] sibling.
     If it's missing, the img is removed and the styled placeholder stays —
     so no broken-image icons ever appear. */
  document.querySelectorAll("img.img-fade").forEach(function (img) {
    var fallback = img.parentElement
      ? img.parentElement.querySelector("[data-fallback]")
      : null;
    var reveal = function () {
      img.classList.add("is-loaded");
      if (fallback) fallback.style.display = "none";
    };
    var fail = function () {
      if (img.parentNode) img.parentNode.removeChild(img);
    };
    if (img.complete) {
      if (img.naturalWidth > 0) reveal(); else fail();
    } else {
      img.addEventListener("load", reveal);
      img.addEventListener("error", fail);
    }
  });

  /* ============================================================
     i18n — EL / EN / FR
     Translatable nodes carry data-i18n="key".
     Use data-i18n-html="key" when the value contains markup.
     ============================================================ */
  var I18N = {
    el: {
      "doc.title": "ΑΝΑΠΛΟΥΣ | Βασιλεία Κατσάνη",
      "brand.role": "Πολιτισμός · Εκπαίδευση · Επικοινωνία",
      "nav.home": "Αρχική",
      "nav.profile": "Προφίλ",
      "nav.areas": "Δραστηριότητα",
      "nav.news": "Παραγωγές & Νέα",
      "nav.publications": "Εκδόσεις",
      "nav.representations": "Εκπροσωπήσεις",
      "nav.contact": "Επικοινωνία",

      "hero.eyebrow": "Πολιτισμός & Στρατηγική Επικοινωνία · Από το 2005",
      "hero.title": "Συνδέουμε τον πολιτισμό<br>με την ανάπτυξη και τον άνθρωπο.",
      "hero.lead": "Η ΑΝΑΠΛΟΥΣ σχεδιάζει και υλοποιεί πολιτιστικές παραγωγές, εκπαιδευτικά προγράμματα και δράσεις στρατηγικής επικοινωνίας, συνδέοντας την πολιτιστική επιχειρηματικότητα με την οικονομική ανάπτυξη και την ποιότητα ζωής.",
      "hero.cta1": "Επικοινωνήστε μαζί μας",
      "hero.cta2": "Η δραστηριότητά μας",
      "stat.years": "Χρόνια δραστηριότητας",
      "stat.cases": "Τελετές Ολυμπιακών Αγώνων",
      "stat.langs": "Γλώσσες εργασίας",

      "profile.eyebrow": "Προφίλ",
      "profile.title": "ΑΝΑΠΛΟΥΣ — πολιτιστική επιχειρηματικότητα με όραμα",
      "profile.p1": "Η ΑΝΑΠΛΟΥΣ ιδρύθηκε το 2005 από τη Βασιλεία Κατσάνη, αξιοποιώντας πολυετή εμπειρία στον χώρο του πολιτισμού, της εκπαίδευσης και της στρατηγικής επικοινωνίας.",
      "profile.p2": "Με αφετηρία τη συμμετοχή στον συντονισμό της μουσικής παραγωγής για τις Τελετές Έναρξης και Λήξης των Ολυμπιακών Αγώνων της Αθήνας 2004, η ΑΝΑΠΛΟΥΣ σχεδιάζει και υλοποιεί δράσεις που συνδέουν τον πολιτισμό με την ανάπτυξη, σε εθνικό και διεθνές επίπεδο.",
      "profile.li1": "Ιδρύτρια & Διευθύνουσα Σύμβουλος: Βασιλεία Κατσάνη",
      "profile.li2": "Συντονισμός μουσικής παραγωγής — Τελετές Ολυμπιακών Αγώνων, Αθήνα 2004",
      "profile.li3": "Γλώσσες εργασίας: Ελληνικά, Αγγλικά, Γαλλικά",
      "profile.portrait": "Φωτογραφία",

      "areas.eyebrow": "Δραστηριότητα",
      "areas.title": "Πεδία δράσης",
      "areas.sub": "Ολοκληρωμένες υπηρεσίες πολιτισμού, εκπαίδευσης και επικοινωνίας.",
      "areas.c1.t": "Πολιτιστική Παραγωγή",
      "areas.c1.p": "Σχεδιασμός και υλοποίηση πολιτιστικών παραγωγών και εκδηλώσεων.",
      "areas.c2.t": "Συμβουλευτική Πολιτισμού",
      "areas.c2.p": "Στρατηγική και συμβουλευτική υποστήριξη πολιτιστικών φορέων και οργανισμών.",
      "areas.c3.t": "Εκπαίδευση & Επιμόρφωση",
      "areas.c3.p": "Σχεδιασμός και υλοποίηση εκπαιδευτικών και επιμορφωτικών προγραμμάτων.",
      "areas.c4.t": "Εταιρική Κοινωνική Ευθύνη",
      "areas.c4.p": "Δράσεις εταιρικής κοινωνικής ευθύνης με πολιτιστικό αποτύπωμα.",
      "areas.c5.t": "Στρατηγική Επικοινωνία",
      "areas.c5.p": "Σχεδιασμός και διαχείριση στρατηγικής επικοινωνίας και δημοσίων σχέσεων.",
      "areas.c6.t": "Επιχειρησιακές Υπηρεσίες",
      "areas.c6.p": "Οργάνωση, διοίκηση και υλοποίηση έργων και παραγωγών.",

      "news.eyebrow": "Παραγωγές & Νέα",
      "news.title": "Παραγωγές & δράσεις",
      "news.d1": "Πολιτισμός",
      "news.t1": "Πολιτιστικές παραγωγές & εκδηλώσεις",
      "news.p1": "Σχεδιασμός και υλοποίηση παραγωγών που αναδεικνύουν τον πολιτισμό και την τέχνη.",
      "news.d2": "Εκπαίδευση",
      "news.t2": "Εκπαιδευτικά & επιμορφωτικά προγράμματα",
      "news.p2": "Προγράμματα που συνδέουν τη γνώση με τη δημιουργικότητα και την κοινωνία.",
      "news.d3": "Επικοινωνία",
      "news.t3": "Δράσεις στρατηγικής επικοινωνίας",
      "news.p3": "Ολοκληρωμένες δράσεις επικοινωνίας για φορείς και οργανισμούς.",

      "pub.eyebrow": "Εκδόσεις",
      "pub.title": "Εκδόσεις & δημοσιεύσεις",
      "pub.sub": "Εκδοτικό έργο και δημοσιεύσεις γύρω από τον πολιτισμό και την επικοινωνία.",
      "pub.t1": "«Πολιτιστική επιχειρηματικότητα & ανάπτυξη»",
      "pub.p1": "Έκδοση για τη σύνδεση του πολιτισμού με την οικονομική ανάπτυξη.",
      "pub.t2": "«Τέχνη, εκπαίδευση & κοινωνία»",
      "pub.p2": "Συλλογικός τόμος για τον ρόλο της τέχνης στην εκπαίδευση.",
      "pub.t3": "«Στρατηγική επικοινωνία στον πολιτισμό»",
      "pub.p3": "Άρθρα και αναλύσεις για τη σύγχρονη πολιτιστική επικοινωνία.",

      "rep.eyebrow": "Εκπροσωπήσεις",
      "rep.title": "Συνεργασίες & εκπροσωπήσεις",
      "rep.quote": "«Η ΑΝΑΠΛΟΥΣ μετατρέπει το πολιτιστικό όραμα σε ουσιαστικό αποτέλεσμα, με συνέπεια και δημιουργικότητα.»",
      "rep.cite": "— Συνεργαζόμενος φορέας",

      "contact.eyebrow": "Επικοινωνία",
      "contact.title": "Ας συνεργαστούμε",
      "contact.intro": "Επικοινωνήστε μαζί μας για συνεργασίες, παραγωγές ή προγράμματα. Θα χαρούμε να συζητήσουμε το όραμά σας.",
      "contact.addr": "Διεύθυνση",
      "contact.phone": "Τηλέφωνο",
      "contact.email": "Email",
      "contact.hours": "Ώρες",
      "contact.hoursVal": "Δευτέρα–Παρασκευή, 09:00–18:00",
      "form.name": "Ονοματεπώνυμο",
      "form.email": "Email",
      "form.phone": "Τηλέφωνο",
      "form.message": "Μήνυμα",
      "form.submit": "Αποστολή",
      "form.note": "Σας ευχαριστούμε! Το μήνυμά σας στάλθηκε.",

      "footer.copy": "Με την επιφύλαξη παντός δικαιώματος.",
      "footer.profile": "Προφίλ",
      "footer.areas": "Δραστηριότητα",
      "footer.contact": "Επικοινωνία",
      "footer.terms": "Όροι Χρήσης",
      "cta.more": "Μάθετε περισσότερα",
      "cta.allAreas": "Δείτε όλη τη δραστηριότητα"
    },

    en: {
      "doc.title": "ANAPLOUS | Vasileia Katsani",
      "brand.role": "Culture · Education · Communication",
      "nav.home": "Home",
      "nav.profile": "Profile",
      "nav.areas": "Activity",
      "nav.news": "Productions & News",
      "nav.publications": "Publications",
      "nav.representations": "Representations",
      "nav.contact": "Contact",

      "hero.eyebrow": "Culture & Strategic Communication · Since 2005",
      "hero.title": "Connecting culture<br>with development and people.",
      "hero.lead": "ANAPLOUS designs and delivers cultural productions, educational programmes and strategic communication initiatives, linking cultural enterprise with economic development and quality of life.",
      "hero.cta1": "Get in touch",
      "hero.cta2": "Our activity",
      "stat.years": "Years of activity",
      "stat.cases": "Olympic Games ceremonies",
      "stat.langs": "Working languages",

      "profile.eyebrow": "Profile",
      "profile.title": "ANAPLOUS — cultural enterprise with vision",
      "profile.p1": "ANAPLOUS was founded in 2005 by Vasileia Katsani, drawing on many years of experience in culture, education and strategic communication.",
      "profile.p2": "Building on her role coordinating the music production for the Opening and Closing Ceremonies of the Athens 2004 Olympic Games, ANAPLOUS designs and delivers initiatives that connect culture with development, both nationally and internationally.",
      "profile.li1": "Founder & Managing Director: Vasileia Katsani",
      "profile.li2": "Music production coordination — Athens 2004 Olympic Games ceremonies",
      "profile.li3": "Working languages: Greek, English, French",
      "profile.portrait": "Photograph",

      "areas.eyebrow": "Activity",
      "areas.title": "Fields of work",
      "areas.sub": "Comprehensive services across culture, education and communication.",
      "areas.c1.t": "Cultural Production",
      "areas.c1.p": "Design and delivery of cultural productions and events.",
      "areas.c2.t": "Cultural Consulting",
      "areas.c2.p": "Strategic and advisory support for cultural bodies and organisations.",
      "areas.c3.t": "Education & Training",
      "areas.c3.p": "Design and delivery of educational and training programmes.",
      "areas.c4.t": "Corporate Social Responsibility",
      "areas.c4.p": "Corporate social responsibility initiatives with a cultural footprint.",
      "areas.c5.t": "Strategic Communication",
      "areas.c5.p": "Design and management of strategic communication and public relations.",
      "areas.c6.t": "Operational Services",
      "areas.c6.p": "Organisation, management and delivery of projects and productions.",

      "news.eyebrow": "Productions & News",
      "news.title": "Productions & initiatives",
      "news.d1": "Culture",
      "news.t1": "Cultural productions & events",
      "news.p1": "Design and delivery of productions that showcase culture and the arts.",
      "news.d2": "Education",
      "news.t2": "Educational & training programmes",
      "news.p2": "Programmes connecting knowledge with creativity and society.",
      "news.d3": "Communication",
      "news.t3": "Strategic communication initiatives",
      "news.p3": "Integrated communication initiatives for bodies and organisations.",

      "pub.eyebrow": "Publications",
      "pub.title": "Publications & articles",
      "pub.sub": "Publishing work and articles around culture and communication.",
      "pub.t1": "“Cultural enterprise & development”",
      "pub.p1": "A publication on linking culture with economic development.",
      "pub.t2": "“Art, education & society”",
      "pub.p2": "A collective volume on the role of art in education.",
      "pub.t3": "“Strategic communication in culture”",
      "pub.p3": "Articles and analyses on contemporary cultural communication.",

      "rep.eyebrow": "Representations",
      "rep.title": "Partnerships & representations",
      "rep.quote": "“ANAPLOUS turns cultural vision into meaningful results, with consistency and creativity.”",
      "rep.cite": "— Partner organisation",

      "contact.eyebrow": "Contact",
      "contact.title": "Let's work together",
      "contact.intro": "Get in touch for partnerships, productions or programmes. We would be glad to discuss your vision.",
      "contact.addr": "Address",
      "contact.phone": "Phone",
      "contact.email": "Email",
      "contact.hours": "Hours",
      "contact.hoursVal": "Monday–Friday, 09:00–18:00",
      "form.name": "Full name",
      "form.email": "Email",
      "form.phone": "Phone",
      "form.message": "Message",
      "form.submit": "Send",
      "form.note": "Thank you! Your message has been sent.",

      "footer.copy": "All rights reserved.",
      "footer.profile": "Profile",
      "footer.areas": "Activity",
      "footer.contact": "Contact",
      "footer.terms": "Terms of Use",
      "cta.more": "Learn more",
      "cta.allAreas": "See all activity"
    },

    fr: {
      "doc.title": "ANAPLOUS | Vasileia Katsani",
      "brand.role": "Culture · Éducation · Communication",
      "nav.home": "Accueil",
      "nav.profile": "Profil",
      "nav.areas": "Activité",
      "nav.news": "Productions & Actualités",
      "nav.publications": "Publications",
      "nav.representations": "Représentations",
      "nav.contact": "Contact",

      "hero.eyebrow": "Culture & Communication Stratégique · Depuis 2005",
      "hero.title": "Relier la culture<br>au développement et à l'humain.",
      "hero.lead": "ANAPLOUS conçoit et réalise des productions culturelles, des programmes éducatifs et des actions de communication stratégique, reliant l'entrepreneuriat culturel au développement économique et à la qualité de vie.",
      "hero.cta1": "Contactez-nous",
      "hero.cta2": "Notre activité",
      "stat.years": "Années d'activité",
      "stat.cases": "Cérémonies des Jeux Olympiques",
      "stat.langs": "Langues de travail",

      "profile.eyebrow": "Profil",
      "profile.title": "ANAPLOUS — l'entrepreneuriat culturel avec vision",
      "profile.p1": "ANAPLOUS a été fondée en 2005 par Vasileia Katsani, forte d'une longue expérience dans la culture, l'éducation et la communication stratégique.",
      "profile.p2": "S'appuyant sur son rôle de coordination de la production musicale des cérémonies d'ouverture et de clôture des Jeux Olympiques d'Athènes 2004, ANAPLOUS conçoit et réalise des actions reliant la culture au développement, à l'échelle nationale et internationale.",
      "profile.li1": "Fondatrice & Directrice Générale : Vasileia Katsani",
      "profile.li2": "Coordination de la production musicale — cérémonies des JO d'Athènes 2004",
      "profile.li3": "Langues de travail : grec, anglais, français",
      "profile.portrait": "Photographie",

      "areas.eyebrow": "Activité",
      "areas.title": "Domaines d'action",
      "areas.sub": "Des services complets en culture, éducation et communication.",
      "areas.c1.t": "Production Culturelle",
      "areas.c1.p": "Conception et réalisation de productions et d'événements culturels.",
      "areas.c2.t": "Conseil Culturel",
      "areas.c2.p": "Soutien stratégique et consultatif aux structures et organisations culturelles.",
      "areas.c3.t": "Éducation & Formation",
      "areas.c3.p": "Conception et réalisation de programmes éducatifs et de formation.",
      "areas.c4.t": "Responsabilité Sociétale",
      "areas.c4.p": "Actions de responsabilité sociétale à empreinte culturelle.",
      "areas.c5.t": "Communication Stratégique",
      "areas.c5.p": "Conception et gestion de la communication stratégique et des relations publiques.",
      "areas.c6.t": "Services Opérationnels",
      "areas.c6.p": "Organisation, gestion et réalisation de projets et de productions.",

      "news.eyebrow": "Productions & Actualités",
      "news.title": "Productions & actions",
      "news.d1": "Culture",
      "news.t1": "Productions & événements culturels",
      "news.p1": "Conception et réalisation de productions mettant en valeur la culture et les arts.",
      "news.d2": "Éducation",
      "news.t2": "Programmes éducatifs & de formation",
      "news.p2": "Des programmes reliant le savoir à la créativité et à la société.",
      "news.d3": "Communication",
      "news.t3": "Actions de communication stratégique",
      "news.p3": "Des actions de communication intégrées pour structures et organisations.",

      "pub.eyebrow": "Publications",
      "pub.title": "Publications & articles",
      "pub.sub": "Travail éditorial et articles autour de la culture et de la communication.",
      "pub.t1": "« Entrepreneuriat culturel & développement »",
      "pub.p1": "Une publication sur le lien entre culture et développement économique.",
      "pub.t2": "« Art, éducation & société »",
      "pub.p2": "Un ouvrage collectif sur le rôle de l'art dans l'éducation.",
      "pub.t3": "« Communication stratégique dans la culture »",
      "pub.p3": "Articles et analyses sur la communication culturelle contemporaine.",

      "rep.eyebrow": "Représentations",
      "rep.title": "Partenariats & représentations",
      "rep.quote": "« ANAPLOUS transforme la vision culturelle en résultats concrets, avec constance et créativité. »",
      "rep.cite": "— Organisation partenaire",

      "contact.eyebrow": "Contact",
      "contact.title": "Travaillons ensemble",
      "contact.intro": "Contactez-nous pour des partenariats, des productions ou des programmes. Nous serions ravis de discuter de votre vision.",
      "contact.addr": "Adresse",
      "contact.phone": "Téléphone",
      "contact.email": "Email",
      "contact.hours": "Horaires",
      "contact.hoursVal": "Lundi–Vendredi, 09h00–18h00",
      "form.name": "Nom complet",
      "form.email": "Email",
      "form.phone": "Téléphone",
      "form.message": "Message",
      "form.submit": "Envoyer",
      "form.note": "Merci ! Votre message a été envoyé.",

      "footer.copy": "Tous droits réservés.",
      "footer.profile": "Profil",
      "footer.areas": "Activité",
      "footer.contact": "Contact",
      "footer.terms": "Conditions d'Utilisation",
      "cta.more": "En savoir plus",
      "cta.allAreas": "Voir toute l'activité"
    }
  };

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.el;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    // Per-page title: prefix the site title with the current page name.
    // Pages declare themselves via <html data-page="profile"> and reuse the nav.* labels.
    var base = dict["doc.title"] || document.title;
    var pageKey = document.documentElement.getAttribute("data-page");
    if (pageKey && dict["nav." + pageKey]) {
      document.title = dict["nav." + pageKey] + " · " + base;
    } else {
      document.title = base;
    }
    document.documentElement.lang = lang;

    document.querySelectorAll(".lang-switch .lang").forEach(function (b) {
      b.classList.toggle("active", (b.dataset.lang || "el") === lang);
    });
    try { localStorage.setItem("anaplous-lang", lang); } catch (e) {}
  }

  document.querySelectorAll(".lang-switch .lang").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.dataset.lang || "el");
    });
  });

  var saved;
  try { saved = localStorage.getItem("anaplous-lang"); } catch (e) {}
  applyLang(saved || document.documentElement.lang || "el");
})();
