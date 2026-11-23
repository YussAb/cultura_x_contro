const tabButtons = [...document.querySelectorAll("[data-tab-target]")];
const tabPanels = [...document.querySelectorAll("[data-tab-panel]")];
const subtabButtons = [...document.querySelectorAll("[data-subtab-target]")];
const subtabPanels = [...document.querySelectorAll("[data-subtab-panel]")];
const jumpHome = document.querySelector("[data-jump='landing']");
const homePanel = document.querySelector("[data-home-panel]");
const langButtons = [...document.querySelectorAll("[data-lang]")];
const themeButtons = [...document.querySelectorAll("[data-theme]")];
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
const merchZoomButtons = [...document.querySelectorAll("[data-merch-zoom]")];
const merchLightbox = document.querySelector("[data-merch-lightbox]");
const merchLightboxImage = document.querySelector("[data-merch-lightbox-image]");
const merchLightboxTitle = document.querySelector("[data-merch-lightbox-title]");
const merchClose = document.querySelector("[data-merch-close]");
const merchZoomIn = document.querySelector("[data-merch-zoom-in]");
const merchZoomOut = document.querySelector("[data-merch-zoom-out]");
const merchZoomReset = document.querySelector("[data-merch-zoom-reset]");

let entryTimer = null;
let entryCloseTimer = null;
let entryIsOpen = false;
let merchZoomLevel = 1;
// Open in dark mode; the theme switch remains available during the visit.
let currentTheme = "acid";

// A playful client-side entrance, not an authentication boundary.
const gateSettings = {
  culture: { password: 'contro', storageKey: 'cxc-culture-unlocked' },
  artists: { password: 'cultura', storageKey: 'cxc-onasty-unlocked' }
};
const unlockedGates = new Set();
try {
  for (const [id, { storageKey }] of Object.entries(gateSettings)) {
    if (sessionStorage.getItem(storageKey) === 'yes') unlockedGates.add(id);
  }
} catch {}
const cultureSections = ['culture', 'vision', 'stories', 'selection', 'events', 'merch-page', 'manifesto-page', 'map'];
const resolveSectionAccess = (id) => !unlockedGates.has('culture') && cultureSections.includes(id) ? 'culture' : id;

const sectionHashById = {
  culture: "cultura-contro",
  vision: "visione",
  stories: "storie",
  selection: "selezione",
  "mixcloud-page": "mixcloud",
  "soundcloud-page": "soundcloud",
  events: "eventi",
  artists: "onasty",
  "merch-page": "merch",
  "manifesto-page": "manifesto",
  map: "mappa"
};
const sectionIdByHash = Object.fromEntries(
  [...Object.entries(sectionHashById).map(([id, hash]) => [hash, id]), ["artisti", "artists"]]
);

const translations = {
  it: {
    sade_mix_intro: "Sade incontra Erykah Badu tra groove ricchi di anima, ritmi profondi, voci vellutate e atmosfere neo-soul senza tempo.",
    sade_mix_closing: "Due regine del soul, un unico viaggio. Rilassato, sensuale e pieno di stile.",
    theme_white: "Bianco",
    theme_black: "Nero",
    work_in_progress: "Lavori in corso",
    print_1: "stampa#1",
    print_2: "stampa#2",
    print_3: "stampa#3",
    entry_region_label: "Benvenuti in Cultura X Contro",
    main_navigation_label: "Navigazione principale",
    language_switch_label: "Selettore lingua",
    theme_switch_label: "Selettore tema colore",
    theme_white_label: "Modalità bianca",
    theme_black_label: "Modalità nera",
    home_sections_label: "Sezioni principali",
    mix_player_label: "Radio Onasty",
    mix_previous_label: "Mix precedente",
    mix_next_label: "Mix successivo",
    mix_player_error: "Impossibile caricare il mix. Riprova.",
    mix_play_here: "Ascolta nel player",
    culture_strip_label: "Resistenza, connessione, rivoluzione",
    gallery_label: "Stampe Cultura Contro",
    gallery_track_label: "Tre stampe",
    gallery_slide_1: "Stampa 1 di 3",
    gallery_slide_2: "Stampa 2 di 3",
    gallery_slide_3: "Stampa 3 di 3",
    gallery_previous_label: "Stampa precedente",
    gallery_next_label: "Stampa successiva",
    onasty_gallery_label: "Foto di Onasty",
    onasty_gallery_track_label: "Tre foto",
    onasty_gallery_slide_1: "Foto 1 di 3",
    onasty_gallery_slide_2: "Foto 2 di 3",
    onasty_gallery_slide_3: "Foto 3 di 3",
    onasty_gallery_previous_label: "Foto precedente",
    onasty_gallery_next_label: "Foto successiva",
    culture_sections_label: "Sezioni di Cultura Contro",
    soundcloud_releases_label: "Uscite SoundCloud",
    section_path_label: "Percorso della sezione",
    event_programme_label: "Programma eventi",
    event_poster_label: "Locandina evento",
    onasty_links_label: "Musica e social",
    form_local_preview: "Anteprima locale: email valida. Nessun dato è stato inviato o salvato.",
    cta_shared_text: "Lascia la tua email e continua il viaggio con noi. Ci sarà da divertirsi.",
    gate_request_title: "Vuoi salire a bordo?",
    gate_request_intro: "Lascia la tua email. Il capitano potrebbe ricontattarti.",
    gate_request_submit: "Chiedi di salire a bordo ↗",
    gate_request_success: "Email ricevuta. Il capitano valuterà la tua candidatura alla ciurma. Nessuna promessa, marinaio.",
    gate_title: "Parola D’ordine",
    gate_intro: "Questa rotta è riservata alla ciurma.",
    gate_enter: "Sali a bordo ↗",
    gate_contact: "Non conosci la parola d’ordine? Scrivimi.",
    gate_wrong: "Bella prova, pesce di terra! Qui non si sale con una parola a caso. Lascia la tua email e tenta la sorte.",
    gate_welcome: "Parola giusta. Benvenuto a bordo!",
    stories_title: "Storie",
    stories_intro: "Uno spazio da sviluppare.",
    foundation_line_2: "Una selezione dalle radici profonde, tra sonorità calde, groove polverosi e ritmi ricchi di anima.",
    foundation_line_3: "Dal jazz spirituale alle percussioni latine, un viaggio nei suoni che hanno gettato le basi per generazioni di groove.",
    deep_cuts_line_1: "Una selezione di gemme nascoste, sonorità ricche di anima, groove polverosi e ritmi non convenzionali.",
    deep_cuts_line_2: "Ispirata agli angoli più profondi della cultura dance underground.",
    deep_cuts_closing: "Per gli appassionati, i cercatori di dischi e i curiosi.",
    beat_tape_1_description: "Beats onesti e un pò di cremeria dalle fattorie. Realizzati interamente su sp404MKII",
    beat_tape_2_description: "Beats biologici realizzati grazie allo spirito di Mario Più. Realizzati interamente su sp404MKII",
    random_jamz_description: "Texture campionate e elementi elettronici per le random più cose",
    soundcloud_listen: "Ascolta su SoundCloud ↗",
    vision_title: "Visione",
    vision_intro: "Uno spazio da sviluppare.",
    selection_title: "Selezione",
    selection_listen: "Ascolta su Mixcloud",
    home_mixcloud_title: "Mixcloud",
    home_soundcloud_title: "SoundCloud",
    home_onasty_title: "Onasty",
    entry_welcome: "Benvenuti",
    entry_enter: "Entra nel sito ↗",
    welcome_newsletter_title: "Restiamo in contatto.",
    welcome_newsletter_text: "Lascia la tua email per ricevere novità, eventi e nuove selezioni musicali.",
    home_culture_title: "Cultura Contro",
    home_culture_text: "Il sogno di un pirata",
    culture_intro: "Uno spazio per il progetto e le sue connessioni. Da qui si parte.",
    home_mixcloud_text: "Selezioni in vinile da ascoltare",
    home_soundcloud_text: "Produzioni originali",
    home_onasty_text: "La persona e la visione dietro al progetto",
    home_map_title: "Mappa",
    nav_map: "Mappa",
    map_kicker: "Il territorio, da vicino",
    home_map_text: "Luoghi, persone e connessioni. La prima tappa è il Piemonte.",
    edition_label: "Cultura indipendente. Presenza reale.",
    hero_kicker: "Fuori dal rumore. Dentro la cultura.",
    home_quote_disobedience: "L'atto di disobbedienza",
    home_quote_as: "in quanto ",
    home_quote_act: "atto",
    home_quote_of: "di ",
    home_quote_freedom: "libertà",
    home_quote_end: "è l'inizio della ragione.",
    hero_cta: "Leggi il manifesto",
    hero_note: "Pensiero libero. Azione collettiva.",
    explore_label: "Esplora il collettivo",
    footer_note: "Indipendenti, insieme.",
    footer_contact: "Parliamone ↗",
    nav_manifesto: "Manifesto",
    nav_events: "Eventi",
    nav_artists: "Artisti",
    nav_merch: "Merch",
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
    entry_rule_1: "I. L'avventura è l'unico tesoro che nessuno può rubare.",
    entry_rule_2: "II. Dire e fare devono essere una cosa sola.",
    entry_rule_3: "III. La forza della ciurma nasce dalla crescita di ciascuno.",
    entry_rule_4: "IV. Non sale a bordo chi si prende troppo sul serio.",
    entry_rule_5: "V. Qui si lavora, si sbaglia, si ride e si impara.",
    entry_accept: "Accetto la rotta",
    hero_cultura: "Cultura",
    hero_contro: "Contro",
    hero_text: "Uno spazio netto per creare presenza, comunità e movimento fuori dal rumore.",
    home_manifesto_title: "Manifesto",
    home_manifesto_text: "Alcuni punti su cui iniziare a costruire.",
    home_events_title: "Eventi",
    home_events_text: "Iscriviti alla newsletter per restare aggiornato sui prossimi appuntamenti.",
    home_artists_title: "Onasty",
    home_artists_text: "Produzione artistica, risorse, visione e pratica.",
    home_merch_title: "Merch",
    home_merch_text: "Maglie, dj set esclusivi e un beatape riservato alla ciurma.",
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
    m4_p2: "È coerenza tra forma e visione nella precisione del gesto.",
    manifesto_more: "Da qui in poi si aggiungeranno nel tempo.",
    events_title: "Eventi",
    programme_1_title: "Evento 1 – Hip Hop Culture",
    programme_1_text: "Un approfondimento sull’hip hop come movimento culturale multidisciplinare, analizzandone le origini, il contesto sociale e il ruolo come strumento di espressione e identità.",
    programme_2_title: "Evento 2 – Club Culture",
    programme_2_text: "Un focus sulla club culture, a partire dalla nascita di house e techno come spazi di aggregazione, sperimentazione musicale e libertà espressiva, fino alle loro evoluzioni contemporanee.",
    programme_3_title: "Evento 3 – Sound System Culture",
    programme_3_text: "Un evento dedicato alla cultura dei sound system, intesa come pratica collettiva, sonora e politica, capace di creare comunità temporanee attraverso il suono.",
    programme_4_title: "Evento 4 – Writing and Skateboarding",
    programme_4_text: "Un evento dedicato alla cultura del writing come forma di espressione urbana, linguaggio visivo e pratica identitaria, analizzata nel suo contesto storico e nel suo impatto culturale.",
    programme_4_extra: "Un focus sulla cultura dello skateboarding come pratica urbana e comunitaria, espressione di autonomia, stile di vita e appropriazione dello spazio pubblico.",
    event_link: "Richiedi informazioni via email",
    poster_brand: "Cultura X Contro",
    poster_title: "Spazio libero in cui celebrare la vita",
    poster_date: "TBA",
    poster_note: "Richiesta partecipazione attiva",
    artists_title: "Onasty",
    about_title: "Due parole",
    artist_rumor: "In giro dicono che sia un tipo imprevedibile.",
    about_p1: "E' inoltre il fondatore di Cultura Contro, un progetto nato dalla convinzione che, in un'epoca dominata dal consumo rapido dei contenuti, sia necessario andare controcorrente e restituire alla cultura il suo ruolo più autentico per stimolare il pensiero critico e generare nuove forme di incontro e dialogo.",
    philosophy_title: "Filosofia",
    philosophy_quote: "\"Un buon viaggiatore non ha piani precisi e il suo scopo non è arrivare.\"",
    philosophy_cite: "Lao Tzu",
    masters_title: "Le radici del mio suono",
    roots_timeline_label: "Cronologia dei dischi",
    roots_listen: "Ascolta su YouTube ↗",
    merch_title: "Merch",
    merch_kicker: "Drop iniziale",
    merch_intro_title: "T-shirt + 2 mixtape e un beatape esclusivi.",
    merch_white_label: "T-shirt bianca",
    merch_black_label: "T-shirt nera",
    merch_description_1: "Non è solo prodotto, è un modo per sostenere Cultura X Contro.",
    merch_description_2: "Il merch arriverà con due dj set esclusivi di Onasty e un beatape riservato.",
    merch_cta_title: "Vuoi sapere quando esce?",
    merch_cta_text: "Lascia la mail: riceverai aggiornamenti sul drop, sui contenuti esclusivi e sui prossimi passaggi della ciurma.",
    newsletter_title: "Newsletter",
    newsletter_kicker: "Community",
    newsletter_intro_title: "Un canale diretto, senza filtri inutili.",
    newsletter_intro_p1: "La newsletter serve a tenere aggiornate le persone su eventi, uscite, testi, aperture e passaggi di Cultura X Contro.",
    newsletter_intro_p2: "È uno strumento semplice ma essenziale per far crescere qualcosa di forte, stabile e fuori dalle logiche di mercato.",
    cta_label: "Newsletter",
    newsletter_popup_title: "Resta dentro la rotta.",
    newsletter_popup_text: "Iscriviti per ricevere aggiornamenti su eventi, drop e contenuti esclusivi. In più riceverai un mixtape riservato, selezionato da vinili.",
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
    sade_mix_intro: "Sade meets Erykah Badu in a blend of soulful grooves, deep rhythms, velvet vocals and timeless neo-soul vibes.",
    sade_mix_closing: "Two queens of soul, one smooth journey. Laid-back, sensual and effortlessly cool.",
    theme_white: "White",
    theme_black: "Black",
    work_in_progress: "Work in progress",
    print_1: "print#1",
    print_2: "print#2",
    print_3: "print#3",
    entry_region_label: "Welcome to Cultura X Contro",
    main_navigation_label: "Main navigation",
    language_switch_label: "Language switcher",
    theme_switch_label: "Colour theme switcher",
    theme_white_label: "White mode",
    theme_black_label: "Black mode",
    home_sections_label: "Main sections",
    mix_player_label: "Onasty radio",
    mix_previous_label: "Previous mix",
    mix_next_label: "Next mix",
    mix_player_error: "Could not load the mix. Try again.",
    mix_play_here: "Listen in the player",
    culture_strip_label: "Resistance, connection, revolution",
    gallery_label: "Cultura Contro prints",
    gallery_track_label: "Three prints",
    gallery_slide_1: "Print 1 of 3",
    gallery_slide_2: "Print 2 of 3",
    gallery_slide_3: "Print 3 of 3",
    gallery_previous_label: "Previous print",
    gallery_next_label: "Next print",
    onasty_gallery_label: "Onasty photos",
    onasty_gallery_track_label: "Three photos",
    onasty_gallery_slide_1: "Photo 1 of 3",
    onasty_gallery_slide_2: "Photo 2 of 3",
    onasty_gallery_slide_3: "Photo 3 of 3",
    onasty_gallery_previous_label: "Previous photo",
    onasty_gallery_next_label: "Next photo",
    culture_sections_label: "Cultura Contro sections",
    soundcloud_releases_label: "SoundCloud releases",
    section_path_label: "Section navigation",
    event_programme_label: "Event programme",
    event_poster_label: "Event poster",
    onasty_links_label: "Music and social links",
    form_local_preview: "Local preview: valid email. No data has been sent or saved.",
    cta_shared_text: "Leave your email and continue the journey with us. There’s fun ahead.",
    gate_request_title: "Want to come aboard?",
    gate_request_intro: "Leave your email. The captain might get back to you.",
    gate_request_submit: "Ask to come aboard ↗",
    gate_request_success: "Email received. The captain will consider your place in the crew. No promises, sailor.",
    gate_title: "The Password",
    gate_intro: "This route is reserved for the crew.",
    gate_enter: "Come aboard ↗",
    gate_contact: "Don’t know the password? Get in touch.",
    gate_wrong: "Nice try, landlubber! Random words won’t get you aboard. Leave your email and try your luck.",
    gate_welcome: "That’s the word. Welcome aboard!",
    stories_title: "Stories",
    stories_intro: "A space to be developed.",
    foundation_line_2: "A selection of deep roots, warm textures, dusty grooves and soulful rhythms.",
    foundation_line_3: "From spiritual jazz to Latin percussion, exploring the sounds that laid the foundation for generations of groove.",
    deep_cuts_line_1: "A selection of overlooked gems, soulful textures, dusty grooves and unconventional rhythms.",
    deep_cuts_line_2: "Inspired by the deeper corners of underground dance culture.",
    deep_cuts_closing: "For the heads, the diggers and the curious.",
    beat_tape_1_description: "Honest beats with a little farm-fresh cream. Made entirely on the SP-404MKII",
    beat_tape_2_description: "Organic beats guided by the spirit of Mario Più. Made entirely on the SP-404MKII",
    random_jamz_description: "Sampled textures and electronic elements for the most random things.",
    soundcloud_listen: "Listen on SoundCloud ↗",
    vision_title: "Vision",
    vision_intro: "A space to be developed.",
    selection_title: "Selection",
    selection_listen: "Listen on Mixcloud",
    home_mixcloud_title: "Mixcloud",
    home_soundcloud_title: "SoundCloud",
    home_onasty_title: "Onasty",
    entry_welcome: "Welcome",
    entry_enter: "Enter the site ↗",
    welcome_newsletter_title: "Let’s stay in touch.",
    welcome_newsletter_text: "Leave your email for news, events and new music selections.",
    home_culture_title: "Cultura Contro",
    home_culture_text: "A pirate’s dream",
    culture_intro: "A space for the project and its connections. This is where it starts.",
    home_mixcloud_text: "Vinyl selections to listen to",
    home_soundcloud_text: "Original productions",
    home_onasty_text: "The person and the vision behind the project",
    home_map_title: "Map",
    nav_map: "Map",
    map_kicker: "A closer look at the territory",
    home_map_text: "Places, people and connections. Starting in Piedmont.",
    edition_label: "Independent culture. Real presence.",
    hero_kicker: "Outside the noise. Inside culture.",
    home_quote_disobedience: "The act of disobedience",
    home_quote_as: "as an ",
    home_quote_act: "act",
    home_quote_of: "of ",
    home_quote_freedom: "freedom",
    home_quote_end: "is the beginning of reason.",
    hero_cta: "Read the manifesto",
    hero_note: "Free thought. Collective action.",
    explore_label: "Explore the collective",
    footer_note: "Independent, together.",
    footer_contact: "Let’s talk ↗",
    nav_manifesto: "Manifesto",
    nav_events: "Events",
    nav_artists: "Artists",
    nav_merch: "Merch",
    menu_open_label: "Open menu",
    menu_close_label: "Close menu",
    entry_skip: "Skip",
    entry_intro: "Stai entrando nel mondo dei pirati",
    entry_signal: "Patto riconosciuto",
    entry_connection: "Connection",
    entry_resistance: "Resistance",
    entry_revolution: "Revolution",
    entry_rules_kicker: "Prima di varcare la soglia",
    entry_rules_title: "Accetta il codice",
    entry_rule_1: "I. Adventure is the only treasure no one can steal.",
    entry_rule_2: "II. Word and action must be one.",
    entry_rule_3: "III. The crew's strength comes from each person's growth.",
    entry_rule_4: "IV. No one comes aboard who takes themselves too seriously.",
    entry_rule_5: "V. Here we work, fail, laugh, and learn.",
    entry_accept: "Accetto la rotta",
    hero_cultura: "Cultura",
    hero_contro: "Contro",
    hero_text: "A sharp space to build presence, community, and movement beyond noise.",
    home_manifesto_title: "Manifesto",
    home_manifesto_text: "A few points to start building from.",
    home_events_title: "Events",
    home_events_text: "Subscribe to the newsletter to stay updated on the next gatherings.",
    home_artists_title: "Onasty",
    home_artists_text: "Artistic production, resources, vision, and practice.",
    home_merch_title: "Merch",
    home_merch_text: "T-shirts, exclusive DJ sets, and a beatape reserved for the crew.",
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
    m4_p2: "It is coherence between form and vision in the precision of the gesture.",
    manifesto_more: "More points will be added over time.",
    events_title: "Events",
    programme_1_title: "Event 1 – Hip Hop Culture",
    programme_1_text: "An exploration of hip hop as a multidisciplinary cultural movement, examining its origins, social context and role as a means of expression and identity.",
    programme_2_title: "Event 2 – Club Culture",
    programme_2_text: "A focus on club culture, from the emergence of house and techno as spaces for gathering, musical experimentation and freedom of expression to their contemporary developments.",
    programme_3_title: "Event 3 – Sound System Culture",
    programme_3_text: "An event dedicated to sound system culture as a collective, sonic and political practice capable of creating temporary communities through sound.",
    programme_4_title: "Event 4 – Writing and Skateboarding",
    programme_4_text: "An event dedicated to graffiti writing culture as a form of urban expression, visual language and identity, explored through its historical context and cultural impact.",
    programme_4_extra: "A focus on skateboarding culture as an urban and community practice, an expression of autonomy, a way of life and a way to reclaim public space.",
    event_link: "Request information by email",
    poster_brand: "Cultura X Contro",
    poster_title: "A free space in which to celebrate life",
    poster_date: "TBA",
    poster_note: "Active participation requested",
    artists_title: "Onasty",
    about_title: "A few words",
    artist_rumor: "People say he is an unpredictable type.",
    about_p1: "He is also the founder of Cultura Contro, a project born from the belief that, in an era dominated by fast content consumption, it is necessary to go against the current and return culture to its most authentic role: stimulating critical thinking and generating new forms of encounter and dialogue.",
    philosophy_title: "My philosophy",
    philosophy_quote: "\"A good traveler has no fixed plans and is not intent on arriving.\"",
    philosophy_cite: "Lao Tzu",
    masters_title: "The roots of my sound",
    roots_timeline_label: "Release timeline",
    roots_listen: "Listen on YouTube ↗",
    merch_title: "Merch",
    merch_kicker: "Initial drop",
    merch_intro_title: "T-shirt + 2 exclusive mixtapes and a beatape.",
    merch_white_label: "White T-shirt",
    merch_black_label: "Black T-shirt",
    merch_description_1: "It is not just product, it is a way to support Cultura X Contro.",
    merch_description_2: "The merch will arrive with two exclusive Onasty DJ sets and a reserved beatape.",
    merch_cta_title: "Want to know when it drops?",
    merch_cta_text: "Leave your email: you will receive updates on the drop, exclusive content, and the crew's next moves.",
    newsletter_title: "Newsletter",
    newsletter_kicker: "Community",
    newsletter_intro_title: "A direct channel, without useless filters.",
    newsletter_intro_p1: "The newsletter exists to keep people updated on events, releases, texts, openings, and transitions within Cultura X Contro.",
    newsletter_intro_p2: "It is a simple but essential tool for growing something strong, stable, and outside market logic.",
    cta_label: "Newsletter",
    newsletter_popup_title: "Stay on the route.",
    newsletter_popup_text: "Subscribe to receive updates on events, drops, and exclusive content. You will also receive a reserved mixtape selected from vinyl records.",
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

  document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    if (dictionary[key]) node.setAttribute('aria-label', dictionary[key]);
  });

  document.querySelectorAll('[data-i18n-aria-roledescription]').forEach((node) => {
    const key = node.dataset.i18nAriaRoledescription;
    if (dictionary[key]) node.setAttribute('aria-roledescription', dictionary[key]);
  });

  langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === lang);
    button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
  });

  if (getSectionFromLocation() === "map") window.renderCultureMap?.();

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
  const focusWasInMenu = isHiddenOnMobile && mobileMenu.contains(document.activeElement);
  mobileMenu.toggleAttribute("inert", isHiddenOnMobile);
  mobileMenu.setAttribute("aria-hidden", String(isHiddenOnMobile));
  if (focusWasInMenu) menuToggle.focus({ preventScroll: true });
}

function closeMobileMenu() {
  setMenuOpen(false);
}

function applyTheme(theme) {
  currentTheme = theme === "purple" ? "purple" : "acid";
  document.body.classList.toggle("theme-purple", currentTheme === "purple");
  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === currentTheme;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setMerchZoom(level) {
  merchZoomLevel = Math.min(Math.max(level, 1), 2.8);
  if (merchLightboxImage) {
    merchLightboxImage.style.transform = `scale(${merchZoomLevel})`;
  }
}

function openMerchLightbox(button) {
  if (!merchLightbox || !merchLightboxImage) {
    return;
  }

  const previewImage = button.querySelector("img");
  const source = button.dataset.merchZoom || previewImage?.getAttribute("src") || "";
  const title = button.dataset.merchTitle || previewImage?.alt || "Merch";

  merchLightboxImage.src = source;
  merchLightboxImage.alt = previewImage?.alt || title;
  if (merchLightboxTitle) {
    merchLightboxTitle.textContent = title;
  }

  setMerchZoom(1);
  merchLightbox.hidden = false;
  document.body.classList.add("merch-lightbox-open");
  merchClose?.focus({ preventScroll: true });
}

function closeMerchLightbox() {
  if (!merchLightbox) {
    return;
  }

  merchLightbox.hidden = true;
  document.body.classList.remove("merch-lightbox-open");
}

function setEntryStep(activeIndex) {
  entryExperience?.querySelector("[role=dialog]")?.setAttribute("aria-labelledby", `entry-heading-${activeIndex}`);
  entrySteps.forEach((step, index) => {
    const isActive = index === activeIndex;
    step.classList.toggle("is-active", isActive);
    step.setAttribute("aria-hidden", String(!isActive));
    step.inert = !isActive;
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
    if (activeIndex < entrySteps.length - 1) {
      queueEntryStep(activeIndex + 1, 1500);
    } else {
      entryTimer = window.setTimeout(closeEntryExperience, 1400);
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
    closeEntryExperience();
    return;
  }

  setEntryStep(0);
  entrySkip?.focus({ preventScroll: true });
  queueEntryStep(1, 1400);
}

function syncSectionPlayers(sectionId) {
  document.querySelectorAll('template[data-player-section]').forEach((template) => {
    const player = template.parentElement.querySelector('iframe');
    if (template.dataset.playerSection === sectionId) {
      if (!player) template.after(template.content.cloneNode(true));
    } else {
      // Removing the frame stops playback without a frame navigation in browser history.
      player?.remove();
    }
  });
}

function setActiveTab(targetId) {
  targetId = resolveSectionAccess(targetId);
  tabButtons.forEach((button) => {
    const isCulturePage = cultureSections.includes(targetId);
    const isActive = button.dataset.tabTarget === targetId ||
      (button.classList.contains("nav-link") && button.dataset.tabTarget === "culture" && isCulturePage);
    button.classList.toggle("is-active", isActive);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === targetId);
  });

  homePanel?.classList.remove("is-active");
  syncSectionPlayers(targetId);
  if (targetId === "map") window.renderCultureMap?.();
}

function showHome() {
  tabButtons.forEach((button) => {
    button.classList.remove("is-active");
  });

  tabPanels.forEach((panel) => {
    panel.classList.remove("is-active");
  });

  homePanel?.classList.add("is-active");
  syncSectionPlayers('home');
}

function setActiveSubtab(targetId) {
  subtabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.subtabTarget === targetId);
  });

  subtabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === targetId);
  });
}

function getSectionFromLocation() {
  const hash = window.location.hash.replace("#", "").split("/")[0];
  return resolveSectionAccess(sectionIdByHash[hash] || null);
}

function saveScrollPosition() {
  history.replaceState({
    ...history.state,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    mapTab: window.getCultureMapState?.().tab,
    subtab: subtabPanels.find((panel) => panel.classList.contains("is-active"))?.id
  }, "", window.location.href);
}

function setRoute(targetId, replace = false) {
  // Reopening the current section must not add another Back step.
  if (!replace && getSectionFromLocation() === targetId) {
    return;
  }

  const hash = targetId ? sectionHashById[targetId] : "";
  const nextUrl = hash ? `#${hash}` : window.location.pathname + window.location.search;

  if (replace) {
    history.replaceState({ ...history.state, section: targetId || "home" }, "", nextUrl);
    return;
  }

  // Capture the departing page before hiding it changes the document height.
  saveScrollPosition();
  history.pushState({ section: targetId || "home", scrollX: 0, scrollY: 0 }, "", nextUrl);
}

function focusSection(targetId) {
  const panel = targetId ? document.getElementById(targetId) : homePanel;
  if (!panel) return;
  const heading = [...panel.querySelectorAll('h2, h3')]
    .find((node) => !node.closest('[hidden], [inert]'));
  const target = targetId ? (heading || panel) : panel;
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
}

function openSection(targetId, options = {}) {
  targetId = resolveSectionAccess(targetId);
  if (!targetId) {
    return;
  }

  if (options.updateHistory !== false) {
    setRoute(targetId, Boolean(options.replaceHistory));
  }

  setActiveTab(targetId);
  if (targetId === "artists") {
    setActiveSubtab("onastyyy");
  }
  focusSection(targetId);
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

function openHome(options = {}) {
  if (options.updateHistory !== false) {
    setRoute(null, Boolean(options.replaceHistory));
  }

  showHome();
  focusSection(null);
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

function applyRouteFromLocation() {
  const targetId = getSectionFromLocation();
  const savedPosition = history.state?.section === (targetId || "home") ? history.state : null;
  closeMobileMenu();

  if (targetId) {
    setActiveTab(targetId);
    if (targetId === "artists") {
      setActiveSubtab(savedPosition?.subtab || "onastyyy");
    }
  } else {
    showHome();
  }

  if (document.activeElement?.closest('.tab-panel:not(.is-active), .landing:not(.is-active)')) {
    focusSection(targetId);
  }

  // Restore after displaying the panel, without the CSS smooth-scroll animation.
  window.scrollTo({ left: savedPosition?.scrollX || 0, top: savedPosition?.scrollY || 0, behavior: "instant" });
}

function encodeForm(data) {
  return new URLSearchParams(data).toString();
}

function setFeedback(form, type, message, translationKey = null) {
  let feedback = form.querySelector('.form-feedback');
  if (!feedback) {
    feedback = document.createElement('p');
    feedback.className = 'form-feedback';
    feedback.setAttribute('aria-live', 'polite');
    form.appendChild(feedback);
  }
  feedback.textContent = message;
  if (translationKey) feedback.dataset.i18n = translationKey;
  else delete feedback.dataset.i18n;
  feedback.classList.remove('is-error', 'is-success', 'is-preview');
  if (type) feedback.classList.add(type);
}

async function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const emailInput = form.querySelector('input[type="email"]');
  const submitButton = form.querySelector('button[type="submit"]');
  if (!emailInput || submitButton?.disabled) return;

  const email = emailInput.value.trim().toLowerCase();
  emailInput.value = email;
  form.elements.lang.value = currentLang;
  form.elements.source_section.value = form.dataset.newsletterSource || 'unknown';
  if (form.elements.company.value) return;

  if (!emailInput.checkValidity()) {
    setFeedback(form, 'is-error', translations[currentLang].form_invalid, 'form_invalid');
    emailInput.reportValidity();
    return;
  }

  // Local validation is useful, but a static server cannot accept real signups.
  const isLocalPreview = window.location.protocol === 'file:' ||
    ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
  if (isLocalPreview) {
    setFeedback(form, 'is-preview', translations[currentLang].form_local_preview, 'form_local_preview');
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
    const successKey = form.name === 'crew-access' ? 'gate_request_success' : 'form_success';
    setFeedback(form, 'is-success', translations[currentLang][successKey], successKey);
  } catch (error) {
    setFeedback(form, 'is-error', translations[currentLang].form_error, 'form_error');
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

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme || "acid");
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

entrySkip?.addEventListener("click", closeEntryExperience);
entryAccept?.addEventListener("click", closeEntryExperience);

merchZoomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openMerchLightbox(button);
  });
});

merchClose?.addEventListener("click", closeMerchLightbox);
merchZoomIn?.addEventListener("click", () => setMerchZoom(merchZoomLevel + 0.25));
merchZoomOut?.addEventListener("click", () => setMerchZoom(merchZoomLevel - 0.25));
merchZoomReset?.addEventListener("click", () => setMerchZoom(1));

merchLightbox?.addEventListener("click", (event) => {
  if (event.target === merchLightbox) {
    closeMerchLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (entryIsOpen && event.key === "Tab") {
    const controls = [...entryExperience.querySelectorAll('button, input:not([type="hidden"]), a[href]')]
      .filter((node) => !node.disabled && node.tabIndex >= 0 && !node.closest('[inert]'));
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  if (entryIsOpen && event.key === "Escape") {
    closeEntryExperience();
    return;
  }

  if (event.key === "Escape") {
    if (merchLightbox && !merchLightbox.hidden) {
      closeMerchLightbox();
      return;
    }

    closeMobileMenu();
  }
});

// Keep the same language controls outside the collapsed menu on phones.
const languageSwitch = document.querySelector('.lang-switch');
function placeLanguageSwitch() {
  if (!languageSwitch || !menuToggle || !mobileMenu) return;
  if (mobileMenuQuery.matches) {
    menuToggle.before(languageSwitch);
  } else {
    mobileMenu.querySelector('.theme-switch')?.before(languageSwitch);
  }
}
placeLanguageSwitch();
mobileMenuQuery.addEventListener("change", () => {
  placeLanguageSwitch();
  closeMobileMenu();
});

newsletterForms.forEach((form) => {
  form.addEventListener('submit', handleNewsletterSubmit);
});

jumpHome?.addEventListener("click", (event) => {
  event.preventDefault();
  closeMobileMenu();
  openHome();
});

document.querySelectorAll('[data-culture-gate]').forEach((gate) => {
  const panel = gate.closest('[data-tab-panel]');
  const { password, storageKey } = gateSettings[panel.id];
  const content = panel.querySelector('[data-culture-content]');
  const passwordForm = gate.querySelector('[data-culture-password-form]');
  const unlocked = unlockedGates.has(panel.id);
  gate.hidden = unlocked;
  content.hidden = !unlocked;
  content.inert = !unlocked;
  passwordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (unlockedGates.has(panel.id)) return;
    const field = passwordForm.elements.password;
    const feedback = gate.querySelector('.culture-gate-feedback');
    const dictionary = translations[currentLang] || translations.it;
    if (field.value.trim().toLowerCase() !== password) {
      feedback.dataset.i18n = 'gate_wrong';
      feedback.textContent = dictionary.gate_wrong;
      field.setAttribute('aria-invalid', 'true');
      field.focus();
      field.select();
      return;
    }
    unlockedGates.add(panel.id);
    setRoute(panel.id, true);
    try { sessionStorage.setItem(storageKey, 'yes'); } catch {}
    field.removeAttribute('aria-invalid');
    field.value = '';
    feedback.dataset.i18n = 'gate_welcome';
    feedback.textContent = dictionary.gate_welcome;
    passwordForm.querySelector('button').disabled = true;
    gate.classList.add('is-unlocking');
    window.setTimeout(() => {
      gate.hidden = true;
      content.hidden = false;
      content.inert = false;
      content.classList.add('is-revealed');
      if (panel.classList.contains('is-active')) content.focus({ preventScroll: true });
    }, entryMotionQuery.matches ? 0 : 500);
  });
  passwordForm.elements.password.addEventListener('input', () => {
    passwordForm.elements.password.removeAttribute('aria-invalid');
  });
});

// Hidden panels change the page height, so restore scroll after showing the route.
history.scrollRestoration = "manual";
window.addEventListener("scroll", saveScrollPosition, { passive: true });
window.addEventListener("pagehide", saveScrollPosition);
window.addEventListener("popstate", applyRouteFromLocation);
window.addEventListener("hashchange", applyRouteFromLocation);

const rootsTimeline = document.querySelector('.roots-timeline');
if (rootsTimeline) {
  const stops = [...rootsTimeline.querySelectorAll('[role="tab"]')];
  const releases = stops.map((stop) => document.getElementById(stop.getAttribute('aria-controls')));
  let selectedIndex = -1;
  const selectRelease = (index) => {
    if (index === selectedIndex) return;
    rootsTimeline.style.setProperty('--roots-position', `${100 * (index + .5) / stops.length}%`);
    stops.forEach((stop, position) => {
      const selected = position === index;
      stop.setAttribute('aria-selected', String(selected));
      stop.tabIndex = selected ? 0 : -1;
      releases[position].hidden = !selected;
      releases[position].classList.toggle('roots-release-entering', selected && selectedIndex >= 0);
    });
    selectedIndex = index;
  };

  stops.forEach((stop, index) => {
    releases[index].setAttribute('role', 'tabpanel');
    releases[index].setAttribute('aria-labelledby', stop.id);
    stop.addEventListener('click', () => selectRelease(index));
    stop.addEventListener('keydown', (event) => {
      const destinations = {
        ArrowLeft: (index + stops.length - 1) % stops.length,
        ArrowRight: (index + 1) % stops.length,
        Home: 0,
        End: stops.length - 1,
      };
      if (!Object.hasOwn(destinations, event.key)) return;
      event.preventDefault();
      const destination = destinations[event.key];
      selectRelease(destination);
      stops[destination].focus();
    });
  });

  selectRelease(0);
  rootsTimeline.hidden = false;
}

applyRouteFromLocation();
if (getSectionFromLocation() === "map") {
  history.replaceState({ ...history.state, section: "map" }, "", window.location.href);
} else {
  setRoute(getSectionFromLocation(), true);
}
applyLanguage('it');
applyTheme(currentTheme);
closeMobileMenu();
initEntryExperience();


// Each gallery scrolls independently in the narrow layout.
const swipeGalleryQuery = window.matchMedia('(max-width: 760px)');
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const track = gallery.querySelector('[data-gallery-track]');
  const status = gallery.querySelector('[data-gallery-status]');
  const slideCount = track.children.length;
  const slideIndex = () => Math.round(track.scrollLeft / track.clientWidth) || 0;
  const syncStatus = () => {
    if (!swipeGalleryQuery.matches || !track.clientWidth) return;
    const label = `${slideIndex() + 1} / ${slideCount}`;
    if (status.textContent !== label) status.textContent = label;
  };
  const syncLayout = () => {
    if (swipeGalleryQuery.matches) track.tabIndex = 0;
    else track.removeAttribute('tabindex');
    syncStatus();
  };
  const scrollSlide = (step) => {
    if (!swipeGalleryQuery.matches || !track.clientWidth) return;
    const index = Math.max(0, Math.min(slideCount - 1, slideIndex() + step));
    track.scrollTo({ left: index * track.clientWidth, behavior: entryMotionQuery.matches ? 'instant' : 'smooth' });
  };

  gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => scrollSlide(-1));
  gallery.querySelector('[data-gallery-next]').addEventListener('click', () => scrollSlide(1));
  track.addEventListener('scroll', syncStatus, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (!swipeGalleryQuery.matches || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
    event.preventDefault();
    scrollSlide(event.key === 'ArrowRight' ? 1 : -1);
  });
  swipeGalleryQuery.addEventListener('change', syncLayout);
  syncLayout();
});
