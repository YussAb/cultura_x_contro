/* Local, dependency-free atlas. Geography attribution is shown in the map footer. */
(() => {
  const root = document.querySelector('[data-culture-map]');
  if (!root) return;
  const cities = {
    TO: {slug:'torino', city:'Torino', name:'Torino',
      it:['Capoluogo del Piemonte, Torino si sviluppa lungo il Po. Portici, piazze e architetture barocche convivono con musei, arte contemporanea e una forte identità urbana.', 'Prima capitale d’Italia, conserva nelle residenze e nell’impianto monumentale del centro le tracce della storia sabauda.'],
      en:['The capital of Piedmont, Turin lies on the River Po. Arcades, squares and Baroque architecture coexist with museums, contemporary art and a strong urban identity.', 'Italy’s first capital retains the traces of Savoy history in its royal residences and monumental city centre.'],
      source:'https://www.visitpiemonte.com/destinazioni/torino'},
    VC: {slug:'vercelli', city:'Vercelli', name:'Vercelli',
      it:['Vercelli è una città della pianura piemontese, legata al paesaggio delle risaie e al percorso della Via Francigena.', 'Nel Medioevo fu una tappa per i pellegrini diretti a Roma. Nel Novecento la risicoltura ha segnato la vita economica e sociale del territorio.'],
      en:['Vercelli is a city in the Piedmont plain, connected to the rice-growing landscape and the Via Francigena route.', 'In the Middle Ages it was a stop for pilgrims travelling to Rome. Rice cultivation shaped the area’s economic and social life in the twentieth century.'],
      source:'https://old.visitpiemonte.com/it/destinazioni/citta-darte'},
    NO: {slug:'novara', city:'Novara', name:'Novara',
      it:['Tra Sesia e Ticino, Novara è circondata dalla pianura e dalle risaie. Il suo profilo è segnato dalla cupola della Basilica di San Gaudenzio.', 'Il centro conserva testimonianze di epoche diverse: dal battistero paleocristiano al Broletto medievale e al Castello Visconteo-Sforzesco.'],
      en:['Between the Sesia and Ticino rivers, Novara is surrounded by plains and rice fields. The dome of the Basilica of San Gaudenzio defines its skyline.', 'Its centre preserves traces of different eras, from the early Christian baptistery to the medieval Broletto and the Visconti-Sforza Castle.'],
      source:'https://www.visitpiemonte.com/destinazioni/novara-gioiello-barocco-tra-pianura-e-risaie'},
    CN: {slug:'cuneo', city:'Cuneo', name:'Cuneo',
      it:['Cuneo è il punto d’incontro di valli che si aprono verso la Liguria e la Francia. Il centro cittadino si riconosce per i portici e gli spazi di Via Roma e Piazza Galimberti.', 'Contrada Mondovì racconta l’evoluzione della città attraverso antiche vie di passaggio, edifici religiosi e le tracce dello storico quartiere ebraico.'],
      en:['Cuneo is a meeting point for valleys opening towards Liguria and France. Arcades, Via Roma and Piazza Galimberti give the city centre its character.', 'Contrada Mondovì tells the city’s story through old routes, religious buildings and traces of its historic Jewish quarter.'],
      source:'https://old.visitpiemonte.com/it/cuneo-cuore-di-provincia-granda'},
    AT: {slug:'asti', city:'Asti', name:'Asti',
      it:['Asti si trova nel territorio del Monferrato. Il centro è caratterizzato da torri, chiese e palazzi, mentre la provincia è legata al paesaggio delle colline e dei vigneti.', 'La città medievale è ricordata per le sue numerose torri. Tra i luoghi della memoria cittadina c’è Palazzo Alfieri, casa natale dello scrittore Vittorio Alfieri.'],
      en:['Asti lies in Monferrato. Towers, churches and palaces characterise its centre, while the surrounding province is associated with hills and vineyards.', 'The medieval city is remembered for its many towers. Palazzo Alfieri, the birthplace of writer Vittorio Alfieri, is one of its landmarks.'],
      source:'https://www.italia.it/it/piemonte/asti'},
    AL: {slug:'alessandria', city:'Alessandria', name:'Alessandria',
      it:['Alessandria è un centro del Basso Monferrato. Piazze, portici e palazzi barocchi ne disegnano il paesaggio urbano; la Cittadella è uno dei suoi simboli.', 'La fortezza della Cittadella testimonia il passato militare sabaudo. Il centro conserva anche edifici medievali e interventi artistici come il mosaico di Gino Severini sul Palazzo delle Poste.'],
      en:['Alessandria is a city in Lower Monferrato. Squares, arcades and Baroque palaces shape its urban landscape; the Cittadella is one of its symbols.', 'The Cittadella fortress reflects its Savoy military past. The centre also preserves medieval buildings and artworks such as Gino Severini’s mosaic on the post office.'],
      source:'https://old.visitpiemonte.com/it/destinazioni/citta-darte/alessandria-capitale-del-basso-monferrato'},
    BI: {slug:'biella', city:'Biella', name:'Biella',
      it:['Biella unisce tradizione tessile, paesaggio e arte contemporanea. Il quartiere alto del Piazzo e gli antichi lanifici raccontano due volti della città.', 'La manifattura tessile ha segnato la storia locale. Nell’ex Lanificio Trombetta, Cittadellarte lega oggi il patrimonio industriale alla ricerca artistica.'],
      en:['Biella brings together textile heritage, landscape and contemporary art. The upper Piazzo district and old wool mills tell two sides of the city’s story.', 'Textile manufacturing has shaped local history. At the former Trombetta wool mill, Cittadellarte connects industrial heritage with artistic research.'],
      source:'https://old.visitpiemonte.com/it/destinazioni/citta-darte/biella-la-manchester-ditalia-citta-creativa-unesco'},
    VB: {slug:'verbano-cusio-ossola', city:'Verbania', name:'Verbano-Cusio-Ossola',
      it:['Verbania è il capoluogo del Verbano-Cusio-Ossola, affacciato sul Lago Maggiore. Il paesaggio cittadino è legato ai giardini, alle ville e al Golfo Borromeo.', 'La città nasce nel 1939 dall’unione di centri preesistenti. Il rapporto con il lago resta una chiave per leggere il suo sviluppo urbano.'],
      en:['Verbania is the capital of Verbano-Cusio-Ossola, on Lake Maggiore. Gardens, villas and the Borromean Gulf shape its landscape.', 'The city was formed in 1939 by joining existing towns. Its relationship with the lake remains central to understanding its urban development.'],
      source:'https://old.visitpiemonte.com/it/destinazioni/citta-darte',
      historySource:'https://www.cnr.it/it/evento/13997'}
  };
  const text = {
    it: {italy:'Italia', map:'Mappa', subtitle:'Un atlante di luoghi, persone e connessioni. Si parte dal Piemonte.', available:'Territorio aperto', locked:'Ancora da esplorare', intro:'La prima tappa è qui.', introText:'Il Piemonte è aperto. Tocca la regione o usa il pulsante per entrare. Gli altri territori si aggiungeranno nel tempo.', enter:'Esplora il Piemonte', regionText:'Otto territori, altrettante storie. Scegli una provincia sulla mappa o nell’elenco.', provinces:'Province e città metropolitana', city:'Città', scenes:'Situazioni', artists:'Artisti', history:'Storia', capital:'Primo sguardo · capoluogo', situationsTitle:'La scena è ancora da raccontare.', situationsText:'Spazi, collettivi, incontri e iniziative del territorio: questa sezione è in costruzione.', artistsTitle:'Le voci del territorio.', artistsText:'La selezione degli artisti di questo territorio è in costruzione.', back:'Tutte le province', source:'Approfondisci · fonte', credits:'Confini: ISTAT / geojson-italy · CC BY 4.0. Geometrie semplificate.', status:'01 / 20 REGIONI APERTE', regionStatus:'01 / PIEMONTE', choose:'Scegli una provincia', atlas:'ATLANTE INDIPENDENTE', mapLabel:'Mappa delle regioni italiane. Solo il Piemonte è disponibile.', provinceLabel:'Mappa delle province del Piemonte', selected:'Provincia selezionata'},
    en: {italy:'Italy', map:'Map', subtitle:'An atlas of places, people and connections. Starting in Piedmont.', available:'Open territory', locked:'Still to explore', intro:'The first stop is here.', introText:'Piedmont is open. Select the region or use the button to explore. More territories will follow.', enter:'Explore Piedmont', regionText:'Eight territories, eight stories. Choose a province on the map or from the list.', provinces:'Provinces and metropolitan city', city:'City', scenes:'Scenes', artists:'Artists', history:'History', capital:'First look · provincial capital', situationsTitle:'A scene waiting to be told.', situationsText:'Spaces, collectives, gatherings and local initiatives: this section is being built.', artistsTitle:'Voices of the territory.', artistsText:'The selection of artists for this territory is being built.', back:'All provinces', source:'Read more · source', credits:'Boundaries: ISTAT / geojson-italy · CC BY 4.0. Simplified geometry.', status:'01 / 20 REGIONS OPEN', regionStatus:'01 / PIEDMONT', choose:'Choose a province', atlas:'INDEPENDENT ATLAS', mapLabel:'Map of Italy’s regions. Only Piedmont is available.', provinceLabel:'Map of Piedmont’s provinces', selected:'Selected province'}
  };
  let contentTab = 'city';
  let lastProvince = null;
  let lastLang = null;
  let lastRoute = null;
  const el = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  function navigate(path) {
    if (location.hash === path) return;
    saveScrollPosition();
    history.pushState({section:'map'}, '', path);
    applyRouteFromLocation();
    root.querySelector('h3')?.focus({preventScroll:true});
  }
  function button(label, className, action) {
    const node=el('button', className, label); node.type='button'; node.addEventListener('click',action); return node;
  }
  function geography(layer, lang, province) {
    const data=window.cxcGeography[layer], ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox',`0 0 ${data.width} ${data.height}`);
    svg.setAttribute('class','atlas-svg'); svg.setAttribute('role','group');
    svg.setAttribute('aria-label',layer==='italy'?text[lang].mapLabel:text[lang].provinceLabel);
    for (const f of data.features) {
      const path=document.createElementNS(ns,'path');
      path.setAttribute('d',f.path);path.setAttribute('fill-rule','evenodd');
      const available=layer!=='italy'||f.active;
      path.setAttribute('class',`atlas-shape ${available?'is-open':'is-locked'}${province===f.code?' is-selected':''}`);
      const label=layer==='italy'?`${f.name} · ${available?text[lang].available:text[lang].locked}`:f.name;
      path.setAttribute('aria-label',label);
      const title=document.createElementNS(ns,'title');title.textContent=label;path.append(title);
      if (available) {
        path.setAttribute('role','button');path.setAttribute('tabindex','0');
        if(layer!=='italy')path.setAttribute('aria-pressed',String(province===f.code));
        const open=()=>navigate(layer==='italy'?'#mappa/piemonte':`#mappa/piemonte/${cities[f.code].slug}`);
        path.addEventListener('click',open);
        path.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
      } else {path.setAttribute('aria-disabled','true');}
      svg.append(path);
    }
    if (layer==='piemonte') {
      for (const f of data.features) {
        const label=document.createElementNS(ns,'text');
        label.setAttribute('x',f.label[0]);label.setAttribute('y',f.label[1]);
        label.setAttribute('class','atlas-map-label');label.setAttribute('aria-hidden','true');
        label.textContent=f.code;svg.append(label);
      }
    }
    return svg;
  }
  function detail(city,lang,t) {
    const article=el('section','atlas-detail'); article.setAttribute('aria-label',city.name);
    article.append(el('p','atlas-eyebrow',city.name));
    const heading=el('h3','',city.city);heading.tabIndex=-1;article.append(heading);
    const tabs=el('div','atlas-content-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',city.city);
    const panel=el('div','atlas-content');panel.id='atlas-content';panel.setAttribute('role','tabpanel');panel.tabIndex=0;
    const sections=['city','scenes','artists','history'];
    function update() {
      tabs.querySelectorAll('button').forEach(b=>{const active=b.dataset.section===contentTab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
      panel.setAttribute('aria-labelledby',`atlas-tab-${contentTab}`);panel.replaceChildren();
      if(contentTab==='city'||contentTab==='history') {
        panel.append(el('p','atlas-eyebrow',contentTab==='city'?t.capital:t.history));
        panel.append(el('p','atlas-body',city[lang][contentTab==='city'?0:1]));
        const link=el('a','atlas-source',`${t.source} ↗`);link.href=contentTab==='history'?(city.historySource||city.source):city.source;link.target='_blank';link.rel='noopener noreferrer';panel.append(link);
      } else {
        panel.append(el('p','atlas-empty-mark','↗'));
        panel.append(el('h4','',contentTab==='scenes'?t.situationsTitle:t.artistsTitle));
        panel.append(el('p','atlas-body',contentTab==='scenes'?t.situationsText:t.artistsText));
      }
    }
    for(const section of sections) {
      const b=button(t[section], '',()=>{contentTab=section;update();saveScrollPosition();});
      b.dataset.section=section;b.id=`atlas-tab-${section}`;b.setAttribute('role','tab');b.setAttribute('aria-controls','atlas-content');
      b.addEventListener('keydown',e=>{let i=sections.indexOf(contentTab);if(e.key==='ArrowRight')i=(i+1)%4;else if(e.key==='ArrowLeft')i=(i+3)%4;else if(e.key==='Home')i=0;else if(e.key==='End')i=3;else return;e.preventDefault();contentTab=sections[i];update();saveScrollPosition();tabs.querySelector(`#atlas-tab-${contentTab}`).focus();});
      tabs.append(b);
    }
    article.append(tabs,panel); update();return article;
  }
  window.getCultureMapState = () => ({tab:contentTab});
  window.renderCultureMap = () => {
    const lang=document.documentElement.lang==='en'?'en':'it',t=text[lang];
    const parts=location.hash.slice(1).split('/');
    const region=parts[1]==='piemonte';
    const code=region?Object.keys(cities).find(k=>cities[k].slug===parts[2]):null;
    const route=region?(code||'piemonte'):'italy';
    if(route===lastRoute&&lang===lastLang)return;
    if(code!==lastProvince)contentTab=['city','scenes','artists','history'].includes(history.state?.mapTab)?history.state.mapTab:'city';lastProvince=code;lastRoute=route;lastLang=lang;
    root.replaceChildren();
    const breadcrumbs=el('nav','atlas-breadcrumbs');breadcrumbs.setAttribute('aria-label',lang==='it'?'Percorso nella mappa':'Map navigation');
    const italy=button(t.italy,'',()=>navigate('#mappa')); if(!region)italy.setAttribute('aria-current','page');breadcrumbs.append(italy);
    if(region){breadcrumbs.append(el('span','','/'));const piedmont=button('Piemonte','',()=>navigate('#mappa/piemonte'));if(!code)piedmont.setAttribute('aria-current','page');breadcrumbs.append(piedmont);}
    if(code){breadcrumbs.append(el('span','','/'),el('span','atlas-current',cities[code].name));}
    root.append(breadcrumbs);
    const layout=el('div',`atlas-layout${code?' has-detail':''}`),visual=el('div','atlas-visual');
    const mast=el('div','atlas-map-mast');mast.append(el('span','',t.atlas),el('span','',region?t.regionStatus:t.status));visual.append(mast);
    visual.append(geography(region?'piemonte':'italy',lang,code));
    const legend=el('div','atlas-legend');legend.append(el('span','atlas-key-open',t.available),el('span',region?(code?'atlas-key-selected':'atlas-hint'):'atlas-key-locked',region?(code?t.selected:t.choose):t.locked));visual.append(legend);
    layout.append(visual);
    const aside=el('div','atlas-aside');
    if(!region) {
      aside.append(el('p','atlas-eyebrow','01 / PIEMONTE'));
      const h=el('h3','',t.intro);h.tabIndex=-1;aside.append(h,el('p','atlas-body',t.introText),button(`${t.enter} ↗`,'atlas-enter',()=>navigate('#mappa/piemonte')));
      aside.append(el('p','atlas-note',t.subtitle));
    } else if(code) {
      aside.append(button(`← ${t.back}`,'atlas-back',()=>navigate('#mappa/piemonte')),detail(cities[code],lang,t));
    } else {
      aside.append(el('p','atlas-eyebrow',t.provinces));const h=el('h3','','Piemonte');h.tabIndex=-1;aside.append(h,el('p','atlas-body',t.regionText));
    }
    if(region) {
      const list=el('div','atlas-province-list');list.setAttribute('role','group');list.setAttribute('aria-label',t.provinces);
      for(const [key,city] of Object.entries(cities)) {
        const b=button('',`atlas-province${key===code?' is-active':''}`,()=>navigate(`#mappa/piemonte/${city.slug}`));b.append(el('span','',key),el('span','',city.name),el('span','','↗'));if(key===code)b.setAttribute('aria-current','page');list.append(b);
      }
      if(code) visual.append(list); else aside.append(list);
    }
    layout.append(aside);root.append(layout);
    const credits=el('p','atlas-credits');const link=el('a','',t.credits);link.href='https://github.com/guglielmo/geojson-italy';link.target='_blank';link.rel='noopener noreferrer';credits.append(link);root.append(credits);
  };
})();
