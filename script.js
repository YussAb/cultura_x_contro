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

const translations = {
  it: {
    nav_manifesto: "Manifesto",
    nav_events: "Eventi",
    nav_artists: "Artisti",
    nav_newsletter: "Newsletter",
    menu_open_label: "Apri menu",
    menu_close_label: "Chiudi menu",
    hero_cultura: "Cultura",
    hero_contro: "Contro",
    hero_text: "Uno spazio netto per creare presenza, comunità e movimento fuori dal rumore.",
    home_manifesto_title: "Manifesto",
    home_manifesto_text: "Alcuni punti su cui iniziare a costruire.",
    home_events_title: "Eventi",
    home_events_text: "Appuntamenti, presenza reale, occasioni per incontrarsi.",
    home_artists_title: "Artisti",
    home_artists_text: "Produzione artistica, risorse, visione e pratica.",
    home_newsletter_title: "Newsletter",
    home_newsletter_text: "Il canale diretto per tenere insieme la community.",
    manifesto_title: "Manifesto",
    m1_title: "Cultura",
    m1_p1: "La cultura non è decoro, non è ornamento, non è consumo passivo.",
    m1_p2: "È presa di posizione, esercizio critico, conflitto con l'ovvio.",
    m1_p3: "È ciò che rompe l'automatismo, che sottrae alla pigrizia del consenso, che restituisce profondità al presente.",
    m2_title: "Contro",
    m2_p1: "Essere contro non significa opporsi per riflesso.",
    m2_p2: "Significa rifiutare ciò che appiattisce, semplifica, addomestica.",
    m2_p3: "Contro non è equilibrio: è taglio. È separare senza chiedere scusa.",
    m3_title: "Il gusto",
    m3_p1: "Il gusto non è adesione alla moda, né ricerca dell'approvazione.",
    m3_p2: "È disciplina dello sguardo, capacità di selezione, sensibilità formata attraverso attrito, studio, esperienza.",
    m3_p3: "Il gusto vero non segue: riconosce, separa, espone.",
    m4_title: "Lo stile",
    m4_p1: "Ogni stile autentico è una sintesi di necessità, rifiuto e misura.",
    m4_p2: "È coerenza tra forma e visione, precisione del gesto, responsabilità della voce.",
    m4_p3: "Nasce da quello che ti è mancato e da quello che hai rifiutato, dal togliere peso finché resta solo il colpo giusto.",
    m5_title: "Indipendenza",
    m5_p1: "L'indipendenza non è isolamento, ma libertà dal ricatto del consenso.",
    m5_p2: "È parlare senza chiedere permesso, scegliere senza subordinarsi al mercato, pensare senza piegarsi al linguaggio dominante.",
    m5_p3: "Essere indipendenti significa assumersi il costo della propria autonomia.",
    m6_title: "Spazi",
    m6_p1: "Gli spazi non sono contenitori neutri.",
    m6_p2: "Sono campi di tensione, luoghi da occupare, ridefinire, sottrarre all'inerzia e alla funzione imposta.",
    m6_p3: "Ogni spazio autentico nasce da un atto: apertura, rottura, appropriazione.",
    m7_title: "Merito",
    m7_p1: "Il merito non dipende da sesso, razza o orientamento: dipende dalla sostanza, dalla disciplina, dalla forza del lavoro.",
    m7_p2: "Non conta il ruolo che interpreti per piacere agli altri. Conta ciò che costruisci quando smetti di recitare.",
    m7_p3: "Il riconoscimento, se arriva, deve inseguire il valore. Non sostituirlo.",
    events_title: "Eventi",
    event_link: "Richiedi informazioni via email",
    poster_brand: "Cultura X Contro",
    poster_title: "Spazio libero in cui celebrare la vita",
    poster_date: "TBA",
    poster_note: "Richiesta partecipazione attiva",
    artists_title: "Artisti",
    about_title: "About me",
    about_p1: "DJ e producer attivo sul territorio, O_nastyyy muove i primi passi nel mondo artistico attraverso la cultura del writing, un'esperienza che gli permette fin da giovane di entrare in un contesto fondato sul confronto paritario, sul rispetto reciproco e sulla valorizzazione delle competenze individuali.",
    about_p2: "Negli anni successivi vive gli ultimi frammenti di una club culture autentica, quando il dancefloor era ancora uno spazio di connessione reale, libero dalla costante mediazione degli smartphone e dei social. Un luogo in cui la musica era il centro dell'esperienza e il club diventava un punto d'incontro capace di creare comunità, fratellanza e condivisione.",
    about_p3: "Nel tempo sviluppa un percorso di sperimentazione che attraversa il rap, il DJing su vinile e la produzione musicale, maturando una particolare attenzione per il suono analogico, il campionamento e la ricerca sonora.",
    mixcloud_meta: "Selezioni di vinili biologici",
    soundcloud_meta: "Beats e fichi",
    medium_meta: "Pensieri sparsi",
    youtube_meta: "Produzioni video",
    philosophy_title: "My philosophy",
    philosophy_quote: "\"Un buon viaggiatore non ha piani precisi e il suo scopo non è arrivare.\"",
    philosophy_cite: "Lao Tzu",
    masters_title: "Le radici del mio suono",
    root_1: "Idris Muhammad - Power of Soul",
    root_2: "George Duke - Faces in Reflection No. 1",
    root_3: "Moodymann - Silentintroduction",
    root_4: "Theo Parrish - DJ-Kicks: Detroit Forward",
    root_5: "Gang Starr - Moment of Truth",
    root_6: "Erykah Badu - Mama's Gun",
    newsletter_title: "Newsletter",
    newsletter_kicker: "Community",
    newsletter_intro_title: "Un canale diretto, senza filtri inutili.",
    newsletter_intro_p1: "La newsletter serve a tenere aggiornate le persone su eventi, uscite, testi, aperture e passaggi di Cultura X Contro.",
    newsletter_intro_p2: "È uno strumento semplice ma essenziale per far crescere qualcosa di forte, stabile e fuori dal mainstream.",
    cta_label: "Newsletter",
    cta_title: "Iscriviti per costruire qualcosa di forte fuori dal mainstream.",
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
    nav_newsletter: "Newsletter",
    menu_open_label: "Open menu",
    menu_close_label: "Close menu",
    hero_cultura: "Culture",
    hero_contro: "Against",
    hero_text: "A sharp space to build presence, community, and movement beyond noise.",
    home_manifesto_title: "Manifesto",
    home_manifesto_text: "A few points to start building from.",
    home_events_title: "Events",
    home_events_text: "Appointments, real presence, chances to meet.",
    home_artists_title: "Artists",
    home_artists_text: "Artistic production, resources, vision, and practice.",
    home_newsletter_title: "Newsletter",
    home_newsletter_text: "The direct channel to keep the community together.",
    manifesto_title: "Manifesto",
    m1_title: "Culture",
    m1_p1: "Culture is not decor, not ornament, not passive consumption.",
    m1_p2: "It is taking a position, critical practice, conflict with the obvious.",
    m1_p3: "It is what breaks automatism, escapes the laziness of consensus, and gives depth back to the present.",
    m2_title: "Against",
    m2_p1: "Being against does not mean opposing by reflex.",
    m2_p2: "It means refusing what flattens, simplifies, domesticates.",
    m2_p3: "Against is not balance: it is a cut. It is separating without apologizing.",
    m3_title: "Taste",
    m3_p1: "Taste is not following fashion, nor seeking approval.",
    m3_p2: "It is discipline of the gaze, capacity for selection, sensitivity shaped through friction, study, and experience.",
    m3_p3: "True taste does not follow: it recognizes, separates, exposes.",
    m4_title: "Style",
    m4_p1: "Every authentic style is a synthesis of necessity, refusal, and measure.",
    m4_p2: "It is coherence between form and vision, precision of gesture, responsibility of voice.",
    m4_p3: "It is born from what you lacked and what you refused, from removing weight until only the right strike remains.",
    m5_title: "Independence",
    m5_p1: "Independence is not isolation, but freedom from the blackmail of consensus.",
    m5_p2: "It means speaking without asking permission, choosing without bowing to the market, thinking without bending to dominant language.",
    m5_p3: "Being independent means accepting the cost of your own autonomy.",
    m6_title: "Spaces",
    m6_p1: "Spaces are not neutral containers.",
    m6_p2: "They are fields of tension, places to occupy, redefine, and remove from inertia and imposed function.",
    m6_p3: "Every authentic space begins with an act: opening, rupture, appropriation.",
    m7_title: "Merit",
    m7_p1: "Merit does not depend on sex, race, or orientation: it depends on substance, discipline, and the force of work.",
    m7_p2: "What matters is not the role you perform to please others. What matters is what you build once you stop acting.",
    m7_p3: "Recognition, if it comes, should follow value. Not replace it.",
    events_title: "Events",
    event_link: "Request information by email",
    poster_brand: "Culture X Against",
    poster_title: "A free space in which to celebrate life",
    poster_date: "TBA",
    poster_note: "Active participation requested",
    artists_title: "Artists",
    about_title: "About me",
    about_p1: "A DJ and producer active locally, O_nastyyy first moved into the art world through writing culture, an experience that from a young age brought him into a context built on equal exchange, mutual respect, and the value of individual skills.",
    about_p2: "In the following years he lived through the last fragments of an authentic club culture, when the dancefloor was still a space of real connection, free from the constant mediation of smartphones and social media. A place where music was at the center of the experience and the club became a meeting point capable of creating community, brotherhood, and sharing.",
    about_p3: "Over time he developed a path of experimentation across rap, vinyl DJing, and music production, building a particular attention to analog sound, sampling, and sonic research.",
    mixcloud_meta: "Organic vinyl selections",
    soundcloud_meta: "Original productions",
    medium_meta: "Loose thoughts",
    youtube_meta: "Video productions",
    philosophy_title: "My philosophy",
    philosophy_quote: "\"A good traveler has no fixed plans and is not intent on arriving.\"",
    philosophy_cite: "Lao Tzu",
    masters_title: "The roots of my sound",
    root_1: "Idris Muhammad - Power of Soul",
    root_2: "George Duke - Faces in Reflection No. 1",
    root_3: "Moodymann - Silentintroduction",
    root_4: "Theo Parrish - DJ-Kicks: Detroit Forward",
    root_5: "Gang Starr - Moment of Truth",
    root_6: "Erykah Badu - Mama's Gun",
    newsletter_title: "Newsletter",
    newsletter_kicker: "Community",
    newsletter_intro_title: "A direct channel, without useless filters.",
    newsletter_intro_p1: "The newsletter exists to keep people updated on events, releases, texts, openings, and transitions within Cultura X Contro.",
    newsletter_intro_p2: "It is a simple but essential tool for growing something strong, stable, and outside the mainstream.",
    cta_label: "Newsletter",
    cta_title: "Subscribe to build something strong outside the mainstream.",
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

document.addEventListener("keydown", (event) => {
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
