(() => {
  const root = document.getElementById('bacheca-page');
  if (!root) return;

  const search = root.querySelector('[data-board-search]');
  const form = root.querySelector('[data-board-form]');
  const mapElement = root.querySelector('[data-board-map]');
  const results = root.querySelector('[data-board-results]');
  const searchStatus = root.querySelector('[data-board-search-status]');
  const sendStatus = root.querySelector('[data-board-send-status]');
  const readStatus = root.querySelector('[data-board-read-status]');
  const list = root.querySelector('[data-board-messages]');
  const allCities = root.querySelector('[data-board-all]');
  const publish = form.querySelector('[type="submit"]');
  const cityInput = search.elements.city;
  const placeInput = form.elements.place;
  const endpoint = './api/bacheca';
  const previewKey = 'cxc-bacheca-preview';
  const geocoder = 'https://geocoding-api.open-meteo.com/v1/search';
  let preview = location.protocol === 'file:';
  let messages = [];
  let selectedCity = null;
  let cityResults = new Map();
  let loading = false;
  let publishing = false;
  let map, markers, loadingMap;

  const language = () => document.documentElement.lang === 'en' ? 'en' : 'it';
  const translation = key => translations[language()][key];
  const isLocalHost = /^(localhost|127\.0\.0\.1|\[::1\])$|^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(location.hostname);

  function status(element, key) {
    element.textContent = key ? translation(key) : '';
    if (key) element.dataset.i18n = key;
    else delete element.dataset.i18n;
  }

  function getPreviewMessages() {
    return JSON.parse(localStorage.getItem(previewKey) || '[]');
  }

  function cityLabel(city) {
    return [city.name, city.region, city.country].filter((part, index, parts) => part && parts.indexOf(part) === index).join(', ');
  }

  function textElement(tag, text, className = '') {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function filterByCity(id) {
    selectedCity = id;
    renderMessages();
  }

  function renderMessages() {
    const visibleMessages = selectedCity ? messages.filter(item => item.city.id === selectedCity) : messages;
    const dateFormat = new Intl.DateTimeFormat(language(), { dateStyle: 'medium' });
    allCities.hidden = !selectedCity;
    list.replaceChildren();

    for (const item of visibleMessages) {
      const entry = textElement('article', '', 'bacheca-message');
      const meta = textElement('div', '', 'bacheca-message-meta');
      const city = textElement('button', item.city.name);
      city.type = 'button';
      city.addEventListener('click', () => {
        filterByCity(item.city.id);
        map?.setView([item.city.latitude, item.city.longitude], 9);
        list.querySelector('button')?.focus({ preventScroll: true });
      });
      const date = textElement('time', dateFormat.format(new Date(item.createdAt)));
      date.dateTime = item.createdAt;
      meta.append(city, textElement('span', item.nickname || translation('board_anonymous')), date);
      entry.append(meta, textElement('p', item.message));
      list.append(entry);
    }
    renderMarkers();
  }

  function renderMarkers() {
    if (!markers) return;
    markers.clearLayers();
    const groups = new Map();
    for (const { city } of messages) {
      const group = groups.get(city.id) || { city, count: 0 };
      group.count += 1;
      groups.set(city.id, group);
    }
    for (const { city, count } of groups.values()) {
      const description = `${cityLabel(city)} · ${count}`;
      const icon = window.L.divIcon({ className: 'bacheca-pin', html: String(count), iconSize: [28, 28] });
      const marker = window.L.marker([city.latitude, city.longitude], { icon, title: description });
      marker.addTo(markers).on('click', () => {
        filterByCity(city.id);
        list.querySelector('button')?.focus();
      });
      const pin = marker.getElement();
      pin.setAttribute('aria-label', description);
      pin.setAttribute('aria-pressed', String(selectedCity === city.id));
    }
  }

  function loadMap() {
    if (loadingMap) return;
    const assets = 'https://unpkg.com/leaflet@1.9.4/dist/';
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = assets + 'leaflet.css';
    style.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    style.crossOrigin = 'anonymous';
    const script = document.createElement('script');
    script.src = assets + 'leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = 'anonymous';

    loadingMap = true;
    const unavailable = () => {
      mapElement.hidden = true;
      root.querySelector('[data-board-map-error]').hidden = false;
    };
    style.addEventListener('error', unavailable);
    script.addEventListener('error', unavailable);
    script.addEventListener('load', () => {
      const { L } = window;
      map = L.map(mapElement, { scrollWheelZoom: false }).setView([42.6, 12.5], 5);
      markers = L.layerGroup().addTo(map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      renderMarkers();
    });
    document.head.append(style, script);
  }

  async function refreshMessages() {
    if (loading || publishing) return;
    loading = true;
    if (!messages.length) status(readStatus, 'board_loading');
    try {
      if (!preview) {
        const response = await fetch(endpoint, { signal: AbortSignal.timeout(8000) });
        preview = response.status === 404 && isLocalHost;
        if (!preview) {
          if (!response.ok) throw new Error('Could not load greetings');
          messages = await response.json();
        }
      }
      if (preview) messages = getPreviewMessages();
      if (selectedCity && !messages.some(item => item.city.id === selectedCity)) selectedCity = null;
      renderMessages();
      status(readStatus, messages.length ? null : 'board_empty');
      if (preview && !sendStatus.textContent) status(sendStatus, 'board_preview');
    } catch {
      status(readStatus, 'board_read_error');
    } finally {
      loading = false;
      publish.disabled = !placeInput.value || publishing;
    }
  }

  function resetCityResults() {
    cityResults.clear();
    placeInput.replaceChildren();
    placeInput.disabled = true;
    results.hidden = true;
    publish.disabled = true;
    status(searchStatus, null);
  }

  cityInput.addEventListener('input', resetCityResults);
  placeInput.addEventListener('change', () => {
    publish.disabled = !placeInput.value || publishing || loading;
  });
  search.addEventListener('submit', async event => {
    event.preventDefault();
    const query = cityInput.value.trim();
    if (query.length < 2) return;
    resetCityResults();
    const searchButton = search.querySelector('button');
    searchButton.disabled = true;
    try {
      const params = new URLSearchParams({ name: query, count: '30', language: language() });
      const response = await fetch(`${geocoder}?${params}`, { signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('Could not search cities');
      const data = await response.json();
      if (cityInput.value.trim() !== query) return;
      const cities = (data.results || []).filter(city => city.feature_code?.startsWith('PPL')).slice(0, 8);
      if (!cities.length) {
        status(searchStatus, 'board_no_city');
        return;
      }
      for (const item of cities) {
        const city = {
          id: item.id, name: item.name, region: item.admin1, country: item.country,
          latitude: item.latitude, longitude: item.longitude
        };
        cityResults.set(String(city.id), city);
        placeInput.add(new Option(cityLabel(city), city.id));
      }
      placeInput.disabled = false;
      results.hidden = false;
      publish.disabled = publishing || loading;
      placeInput.focus();
    } catch {
      status(searchStatus, 'board_search_error');
    } finally {
      searchButton.disabled = false;
    }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityResults.get(placeInput.value);
    const message = form.elements.message.value.trim();
    const nickname = form.elements.nickname.value.trim();
    if (!city || !message || publishing || loading || form.elements.company.value) return;
    publishing = publish.disabled = true;
    status(sendStatus, null);
    try {
      if (preview) {
        const item = { city, message, nickname, createdAt: new Date().toISOString() };
        messages = [item, ...getPreviewMessages()];
        localStorage.setItem(previewKey, JSON.stringify(messages));
      } else {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cityId: city.id, message, nickname, language: language() }),
          signal: AbortSignal.timeout(12000)
        });
        if (!response.ok) throw new Error('Could not publish greeting');
        messages = [await response.json(), ...messages];
      }
      filterByCity(city.id);
      map?.setView([city.latitude, city.longitude], 9);
      form.elements.message.value = '';
      status(readStatus, null);
      status(sendStatus, preview ? 'board_saved' : 'board_sent');
    } catch {
      status(sendStatus, 'board_send_error');
    } finally {
      publishing = false;
      publish.disabled = !placeInput.value;
    }
  });

  allCities.addEventListener('click', () => {
    filterByCity(null);
    list.querySelector('button')?.focus({ preventScroll: true });
  });

  window.renderBacheca = () => {
    loadMap();
    if (map) requestAnimationFrame(() => map.invalidateSize({ pan: false }));
    if (messages.length) renderMessages();
    refreshMessages();
  };
})();
