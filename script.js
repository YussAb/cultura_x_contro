const tabButtons = [...document.querySelectorAll("[data-tab-target]")];
const homeButtons = [...document.querySelectorAll(".home-card[data-tab-target]")];
const tabPanels = [...document.querySelectorAll("[data-tab-panel]")];
const subtabButtons = [...document.querySelectorAll("[data-subtab-target]")];
const subtabPanels = [...document.querySelectorAll("[data-subtab-panel]")];
const jumpHome = document.querySelector("[data-jump='landing']");
const homePanel = document.querySelector("[data-home-panel]");
const langButtons = [...document.querySelectorAll("[data-lang]")];
const newsletterForms = [...document.querySelectorAll(".newsletter-form")];
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileMenuQuery = window.matchMedia("(max-width: 640px)");
const siteShell = document.querySelector(".site-shell");
const entryExperience = document.querySelector("[data-entry-experience]");
const entrySteps = [...document.querySelectorAll("[data-entry-step]")];
const entrySkip = document.querySelector("[data-entry-skip]");
const entryAccept = document.querySelector("[data-entry-accept]");
const entryMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let entryTimer = null;
let entryCloseTimer = null;
let entryIsOpen = false;

const translations = {
  it: {
    nav_manifesto: "Manifesto",
    nav_events: "Eventi",
    nav_artists: "Artisti",
    nav_merch: "Merch",
    nav_newsletter: "Newsletter",
    menu_open_label: "Apri menu",
    menu_close_label: "Chiudi menu",
    entry_skip: "Salta",
    entry_intro: "Stai entrando nel mondo dei pirati",
    entry_signal: "Patto riconosciuto",
    entry_connection: "Connessione",
    entry_resistance: "Resistenza",
    entry_revolution: "Rivoluzione",
    entry_rules_kicker: "Prima di varcare la soglia",
    entry_rules_title: "Accetta il codice",
    entry_rule_1: "La parola data pesa più del rumore: se prometti, mantieni.",
    entry_rule_2: "L'ego resta fuori dalla porta: disciplina, presenza e rispetto prima del personaggio.",
    entry_rule_3: "Nessuno viene salvato dal ruolo: conta come ti muovi quando nessuno ti guarda.",
    entry_rule_4: "La ciurma cresce se ogni persona sceglie di diventare più forte anche per gli altri.",
    entry_accept: "Accetto la rotta",
    hero_cultura: "Cultura",
    hero_contro: "Contro",
    hero_text: "Uno spazio netto per creare presenza, comunità e movimento fuori dal rumore.",
    home_manifesto_title: "Manifesto",
    home_manifesto_text: "Alcuni punti su cui iniziare a costruire.",
    home_events_title: "Eventi",
    home_events_text: "Iscriviti alla newsletter per restare aggiornato sui prossimi appuntamenti.",
    home_artists_title: "Artisti",
    home_artists_text: "Produzione artistica, risorse, visione e pratica.",
    home_merch_title: "Merch",
    home_merch_text: "Maglie, dj set esclusivi e un beatape riservato alla ciurma.",
    home_newsletter_title: "Newsletter",
    home_newsletter_text: "Il canale diretto per tenere insieme la community.",
    manifesto_title: "Manifesto",
    manifesto_intro_1: "Cultura X Contro è un progetto apolitico, apartitico e areligioso.",
    manifesto_intro_2: "Mette al centro le persone, la responsabilità e la comunità reale, contro le logiche istituzionali che spengono il pensiero, addomesticano la cultura e trasformano le relazioni in pubblico passivo.",
    m1_title: "Cultura",
    m1_p1: "La cultura non è decoro, non è ornamento, non è consumo passivo.",
    m1_p2: "È presa di posizione, esercizio critico, conflitto con l'ovvio.",
    m2_title: "Contro",
    m2_p1: "Essere contro non significa opporsi per riflesso.",
    m2_p2: "Significa rifiutare ciò che appiattisce, semplifica, addomestica.",
    m2_p3: "È separare senza chiedere scusa.",
    m3_title: "Il gusto",
    m3_p1: "Il gusto è disciplina dello sguardo, sensibilità e capacità di selezione.",
    m4_title: "Lo stile",
    m4_p1: "Ogni stile autentico è una sintesi di necessità e misura.",
    m4_p2: "È coerenza tra forma e visione, precisione del gesto, responsabilità della voce.",
    manifesto_more: "Da qui in poi si aggiungeranno nel tempo.",
    events_title: "Eventi",
    events_kicker: "Fuori dalla logica dei locali",
    events_intro_title: "Un posto paritario in cui stare liberi.",
    events_intro_p1: "L'idea è uscire dalla logica dei locali come contenitori e creare uno spazio in cui le persone possano incontrarsi senza gerarchie inutili.",
    events_intro_p2: "Iscrivendoti alla newsletter resterai aggiornato sui prossimi eventi, sulle aperture e sui momenti in cui la ciurma si muove davvero.",
    event_link: "Richiedi informazioni via email",
    poster_brand: "Cultura X Contro",
    poster_title: "Spazio libero in cui celebrare la vita",
    poster_date: "TBA",
    poster_note: "Richiesta partecipazione attiva",
    artists_title: "Artisti",
    about_title: "Profilo",
    artist_rumor: "In giro dicono che ne sia un tipo imprevedibile.",
    about_p1: "Fondatore di Cultura Contro, un progetto nato dalla convinzione che, in un'epoca dominata dal consumo rapido dei contenuti, sia necessario andare controcorrente e restituire alla cultura il suo ruolo più autentico per stimolare il pensiero critico e generare nuove forme di incontro e dialogo.",
    join_tab: "Unisciti alla ciurma",
    join_title: "Sei un artista?",
    join_intro: "Se cerchi like facili, scorciatoie o qualcuno che faccia il lavoro al posto tuo, probabilmente questo non è il posto giusto.",
    join_point_1: "Impara a fare qualcosa che valga la pena vedere/sentire. Prima di chiedere attenzione, dedica tempo a creare qualcosa che la meriti.",
    join_point_2: "Lavora. Tanto. A casa, in strada, in studio. Continua anche quando nessuno guarda.",
    join_point_3: "Trova la tua voce. Non inseguire le mode. Diventa riconoscibile per quello che fai, non per quello che copi.",
    join_point_4: "Resta indipendente. Accetta consigli, ma non lasciare che siano gli altri a decidere chi devi essere.",
    join_point_5: "Torna quando hai qualcosa da dire. Se il tuo lavoro ci colpisce, ce ne accorgeremo.",
    join_signoff: "Buona fortuna.",
    join_cta_text: "Se dopo aver letto tutto sei ancora convinto, scrivici. Manda una presentazione breve, un link al tuo lavoro e il motivo per cui senti vicino questo progetto.",
    join_email_link: "Scrivici via email",
    mixcloud_meta: "Selezioni di vinili biologici",
    soundcloud_meta: "Beats e fichi",
    medium_meta: "Pensieri sparsi",
    youtube_meta: "Produzioni video",
    philosophy_title: "Filosofia",
    philosophy_quote: "\"Sono convinto che la vita sia un viaggio meraviglioso e che valga la pena di aver vissuto così.\"",
    philosophy_cite: "O_nastyyy",
    masters_title: "Le radici del mio suono",
    root_1: "Idris Muhammad - Power of Soul",
    root_2: "George Duke - Faces in Reflection No. 1",
    root_3: "Moodymann - Silentintroduction",
    root_4: "Theo Parrish - DJ-Kicks: Detroit Forward",
    root_5: "Gang Starr - Moment of Truth",
    root_6: "Erykah Badu - Mama's Gun",
    merch_title: "Merch",
    merch_kicker: "Drop iniziale",
    merch_intro_title: "Due maglie. Un segnale da portare addosso.",
    merch_intro_p1: "Ogni maglia costa 25 euro. Il merch arriverà con tre dj set esclusivi di O_nastyyy e un beatape riservato.",
    merch_intro_p2: "Non è solo prodotto: è un modo per sostenere Cultura X Contro e riconoscersi fuori dal rumore.",
    merch_white_label: "T-shirt bianca",
    merch_black_label: "T-shirt nera",
    merch_cta_title: "Vuoi sapere quando esce?",
    merch_cta_text: "Lascia la mail: riceverai aggiornamenti sul drop, sui contenuti esclusivi e sui prossimi passaggi della ciurma.",
    newsletter_title: "Newsletter",
    newsletter_kicker: "Community",
    newsletter_intro_title: "Un canale diretto, senza filtri inutili.",
    newsletter_intro_p1: "La newsletter serve a tenere aggiornate le persone su eventi, uscite, testi, aperture e passaggi di Cultura X Contro.",
    newsletter_intro_p2: "È uno strumento semplice ma essenziale per far crescere qualcosa di forte, stabile e fuori dalle logiche di mercato.",
    cta_label: "Newsletter",
    cta_title: "Iscriviti per costruire qualcosa di forte fuori dalle logiche di mercato.",
    cta_manifesto_text: "Se vuoi seguire il progetto nel tempo e contribuire a una comunità più solida, questo è il canale giusto.",
    cta_events_text: "La newsletter è il modo più diretto per restare dentro il progetto e far crescere una comunità viva, concreta e indipendente.",
    cta_artists_text: "Per far crescere una scena serve un contatto diretto, stabile e reale. La newsletter è uno degli strumenti centrali per farlo.",
    email_placeholder: "Inserisci la tua email",
    subscribe: "Iscriviti",
    form_invalid: "Inserisci un'email valida.",
    form_success: "Iscrizione ricevuta. Ti aggiorneremo presto.",
    form_error: "Qualcosa non ha funzionato. Riprova tra poco."
  },
  en: {
    nav_manifesto: "Manifesto",
    nav_events: "Events",
    nav_artists: "Artists",
    nav_merch: "Merch",
    nav_newsletter: "Newsletter",
    menu_open_label: "Open menu",
    menu_close_label: "Close menu",
    entry_skip: "Skip",
    entry_intro: "Stai entrando nel mondo dei pirati",
    entry_signal: "Patto riconosciuto",
    entry_connection: "Connessione",
    entry_resistance: "Resistenza",
    entry_revolution: "Rivoluzione",
    entry_rules_kicker: "Prima di varcare la soglia",
    entry_rules_title: "Accetta il codice",
    entry_rule_1: "La parola data pesa più del rumore: se prometti, mantieni.",
    entry_rule_2: "L'ego resta fuori dalla porta: disciplina, presenza e rispetto prima del personaggio.",
    entry_rule_3: "Nessuno viene salvato dal ruolo: conta come ti muovi quando nessuno ti guarda.",
    entry_rule_4: "La ciurma cresce se ogni persona sceglie di diventare più forte anche per gli altri.",
    entry_accept: "Accetto la rotta",
    hero_cultura: "Cultura",
    hero_contro: "Contro",
    hero_text: "A sharp space to build presence, community, and movement beyond noise.",
    home_manifesto_title: "Manifesto",
    home_manifesto_text: "A few points to start building from.",
    home_events_title: "Events",
    home_events_text: "Subscribe to the newsletter to stay updated on the next gatherings.",
    home_artists_title: "Artists",
    home_artists_text: "Artistic production, resources, vision, and practice.",
    home_merch_title: "Merch",
    home_merch_text: "T-shirts, exclusive DJ sets, and a beatape reserved for the crew.",
    home_newsletter_title: "Newsletter",
    home_newsletter_text: "The direct channel to keep the community together.",
    manifesto_title: "Manifesto",
    manifesto_intro_1: "Cultura X Contro is an apolitical, non-partisan, and areligious project.",
    manifesto_intro_2: "It places people, responsibility, and real community at the center, against institutional logics that dull thought, domesticate culture, and turn relationships into a passive audience.",
    m1_title: "Culture",
    m1_p1: "Culture is not decor, not ornament, not passive consumption.",
    m1_p2: "It is taking a position, critical practice, conflict with the obvious.",
    m2_title: "Against",
    m2_p1: "Being against does not mean opposing by reflex.",
    m2_p2: "It means refusing what flattens, simplifies, domesticates.",
    m2_p3: "It is separating without apologizing.",
    m3_title: "Taste",
    m3_p1: "Taste is discipline of the gaze, sensitivity, and the ability to select.",
    m4_title: "Style",
    m4_p1: "Every authentic style is a synthesis of necessity and measure.",
    m4_p2: "It is coherence between form and vision, precision of gesture, responsibility of voice.",
    manifesto_more: "More points will be added over time.",
    events_title: "Events",
    events_kicker: "Outside the venue logic",
    events_intro_title: "An equal place where people can be free.",
    events_intro_p1: "The idea is to move beyond venues as containers and create a space where people can meet without useless hierarchies.",
    events_intro_p2: "By subscribing to the newsletter, you will stay updated on upcoming events, openings, and the moments when the crew truly moves.",
    event_link: "Request information by email",
    poster_brand: "Cultura X Contro",
    poster_title: "A free space in which to celebrate life",
    poster_date: "TBA",
    poster_note: "Active participation requested",
    artists_title: "Artists",
    about_title: "About me",
    artist_rumor: "People say he is an unpredictable type.",
    about_p1: "Founder of Cultura Contro, a project born from the belief that, in an era dominated by fast content consumption, it is necessary to go against the current and return culture to its most authentic role: stimulating critical thinking and generating new forms of encounter and dialogue.",
    join_tab: "Join the crew",
    join_title: "Are you an artist? Read this first.",
    join_intro: "If you are looking for easy likes, shortcuts, or someone to do the work for you, this is probably not the right place.",
    join_point_1: "Learn to make something worth seeing. Before asking for attention, spend time creating something that deserves it.",
    join_point_2: "Work. A lot. At home, in the street, in the studio. Keep going even when nobody is watching.",
    join_point_3: "Find your voice. Do not chase trends. Become recognizable for what you make, not for what you copy.",
    join_point_4: "Stay independent. Accept advice, but do not let others decide who you have to be.",
    join_point_5: "Come back when you have something to say. If your work hits us, we will notice.",
    join_signoff: "Good luck.",
    join_cta_text: "If you are still convinced after reading this, write to us. Send a short introduction, a link to your work, and why this project feels close to you.",
    join_email_link: "Write by email",
    mixcloud_meta: "Organic vinyl selections",
    soundcloud_meta: "Original productions",
    medium_meta: "Loose thoughts",
    youtube_meta: "Video productions",
    philosophy_title: "My philosophy",
    philosophy_quote: "\"I am convinced that life is a wonderful journey, and that it was worth living it this way.\"",
    philosophy_cite: "O_nastyyy",
    masters_title: "The roots of my sound",
    root_1: "Idris Muhammad - Power of Soul",
    root_2: "George Duke - Faces in Reflection No. 1",
    root_3: "Moodymann - Silentintroduction",
    root_4: "Theo Parrish - DJ-Kicks: Detroit Forward",
    root_5: "Gang Starr - Moment of Truth",
    root_6: "Erykah Badu - Mama's Gun",
    merch_title: "Merch",
    merch_kicker: "Initial drop",
    merch_intro_title: "Two shirts. A signal to wear.",
    merch_intro_p1: "Each shirt costs 25 euros. The merch will arrive with three exclusive O_nastyyy DJ sets and a reserved beatape.",
    merch_intro_p2: "It is not just product: it is a way to support Cultura X Contro and recognize each other beyond the noise.",
    merch_white_label: "White T-shirt",
    merch_black_label: "Black T-shirt",
    merch_cta_title: "Want to know when it drops?",
    merch_cta_text: "Leave your email: you will receive updates on the drop, exclusive content, and the crew's next moves.",
    newsletter_title: "Newsletter",
    newsletter_kicker: "Community",
    newsletter_intro_title: "A direct channel, without useless filters.",
    newsletter_intro_p1: "The newsletter exists to keep people updated on events, releases, texts, openings, and transitions within Cultura X Contro.",
    newsletter_intro_p2: "It is a simple but essential tool for growing something strong, stable, and outside market logic.",
    cta_label: "Newsletter",
    cta_title: "Subscribe to build something strong outside market logic.",
    cta_manifesto_text: "If you want to follow the project over time and contribute to a stronger community, this is the right channel.",
    cta_events_text: "The newsletter is the most direct way to stay inside the project and help a living, concrete, independent community grow.",
    cta_artists_text: "To grow a scene you need direct, stable, real contact. The newsletter is one of the central tools for doing that.",
    email_placeholder: "Enter your email",
    subscribe: "Subscribe",
    form_invalid: "Please enter a valid email address.",
    form_success: "Subscription received. We will update you soon.",
    form_error: "Something went wrong. Please try again shortly."
  }
};

let currentLang = "it";

function applyLanguage(lang) {
  const dictionary = translations[lang] || translations.it;
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      node.setAttribute('placeholder', dictionary[key]);
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === lang);
  });

  if (menuToggle) {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", dictionary[isOpen ? "menu_close_label" : "menu_open_label"]);
  }
}

function setMenuOpen(isOpen) {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  const dictionary = translations[currentLang] || translations.it;
  menuToggle.classList.toggle("is-open", isOpen);
  mobileMenu.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", dictionary[isOpen ? "menu_close_label" : "menu_open_label"]);

  const isHiddenOnMobile = mobileMenuQuery.matches && !isOpen;
  mobileMenu.toggleAttribute("inert", isHiddenOnMobile);
  mobileMenu.setAttribute("aria-hidden", String(isHiddenOnMobile));
}

function closeMobileMenu() {
  setMenuOpen(false);
}

function setEntryStep(activeIndex) {
  entrySteps.forEach((step, index) => {
    const isActive = index === activeIndex;
    step.classList.toggle("is-active", isActive);
    step.setAttribute("aria-hidden", String(!isActive));
  });
}

function closeEntryExperience() {
  if (!entryExperience) {
    return;
  }

  window.clearTimeout(entryTimer);
  window.clearTimeout(entryCloseTimer);
  entryTimer = null;
  entryIsOpen = false;
  entryExperience.classList.add("is-closing");
  document.body.classList.add("entry-is-leaving");

  const closeDelay = entryMotionQuery.matches ? 0 : 760;
  entryCloseTimer = window.setTimeout(() => {
    entryExperience.hidden = true;
    entryExperience.classList.remove("is-closing");
    document.body.classList.remove("entry-is-open", "entry-is-leaving");
    siteShell?.removeAttribute("inert");
    jumpHome?.focus({ preventScroll: true });
  }, closeDelay);
}

function queueEntryStep(activeIndex, delay) {
  window.clearTimeout(entryTimer);
  entryTimer = window.setTimeout(() => {
    setEntryStep(activeIndex);

    if (activeIndex === 1) {
      queueEntryStep(2, 1900);
      return;
    }

    if (activeIndex === 2) {
      entryAccept?.focus({ preventScroll: true });
    }
  }, delay);
}

function initEntryExperience() {
  if (!entryExperience || !entrySteps.length) {
    return;
  }

  entryIsOpen = true;
  entryExperience.hidden = false;
  entryExperience.classList.remove("is-closing");
  document.body.classList.remove("entry-is-leaving");
  document.body.classList.add("entry-is-open");
  siteShell?.setAttribute("inert", "");

  if (entryMotionQuery.matches) {
    setEntryStep(2);
    entryAccept?.focus({ preventScroll: true });
    return;
  }

  setEntryStep(0);
  entrySkip?.focus({ preventScroll: true });
  queueEntryStep(1, 2100);
}

function setActiveTab(targetId) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabTarget === targetId);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === targetId);
  });

  homePanel?.classList.remove("is-active");
}

function showHome() {
  tabButtons.forEach((button) => {
    button.classList.remove("is-active");
  });

  tabPanels.forEach((panel) => {
    panel.classList.remove("is-active");
  });

  homePanel?.classList.add("is-active");
}

function setActiveSubtab(targetId) {
  subtabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.subtabTarget === targetId);
  });

  subtabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === targetId);
  });
}

function openSection(targetId) {
  if (!targetId) {
    return;
  }

  setActiveTab(targetId);
  if (targetId === "artists") {
    setActiveSubtab("onastyyy");
  }
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function encodeForm(data) {
  return new URLSearchParams(data).toString();
}

function setFeedback(form, type, message) {
  let feedback = form.querySelector('.form-feedback');
  if (!feedback) {
    feedback = document.createElement('p');
    feedback.className = 'form-feedback';
    feedback.setAttribute('aria-live', 'polite');
    form.appendChild(feedback);
  }
  feedback.textContent = message;
  feedback.classList.remove('is-error', 'is-success');
  if (type) feedback.classList.add(type);
}

async function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const emailInput = form.querySelector('input[type="email"]');
  const submitButton = form.querySelector('button[type="submit"]');
  if (!emailInput) return;

  const email = emailInput.value.trim().toLowerCase();
  emailInput.value = email;
  form.elements.lang.value = currentLang;
  form.elements.source_section.value = form.dataset.newsletterSource || 'unknown';
  form.elements.company.value = '';

  if (!emailInput.checkValidity()) {
    setFeedback(form, 'is-error', translations[currentLang].form_invalid);
    emailInput.reportValidity();
    return;
  }

  const payload = new FormData(form);
  setFeedback(form, null, '');
  if (submitButton) {
    submitButton.disabled = true;
  }

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeForm(payload)
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    form.reset();
    form.elements.lang.value = currentLang;
    form.elements.source_section.value = form.dataset.newsletterSource || 'unknown';
    setFeedback(form, 'is-success', translations[currentLang].form_success);
  } catch (error) {
    setFeedback(form, 'is-error', translations[currentLang].form_error);
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openSection(button.dataset.tabTarget);
    closeMobileMenu();
  });
});

homeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openSection(button.dataset.tabTarget);
  });
});

subtabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { subtabTarget } = button.dataset;

    if (!subtabTarget) {
      return;
    }

    setActiveSubtab(subtabTarget);
  });
});

langButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyLanguage(button.dataset.lang || 'it');
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

entrySkip?.addEventListener("click", closeEntryExperience);
entryAccept?.addEventListener("click", closeEntryExperience);

document.addEventListener("keydown", (event) => {
  if (entryIsOpen && event.key === "Escape") {
    closeEntryExperience();
    return;
  }

  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

mobileMenuQuery.addEventListener("change", () => {
  closeMobileMenu();
});

newsletterForms.forEach((form) => {
  form.addEventListener('submit', handleNewsletterSubmit);
});

jumpHome?.addEventListener("click", (event) => {
  event.preventDefault();
  showHome();
  closeMobileMenu();
  document.getElementById("landing")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

showHome();
applyLanguage('it');
closeMobileMenu();
initEntryExperience();
