(() => {
  const player = document.querySelector('[data-beat-player]');
  const tapes = [...document.querySelectorAll('[data-beat-playlist]')].map((release) => ({
    widgetUrl: `https://api.soundcloud.com/playlists/${release.dataset.beatPlaylist}`,
    href: release.href,
    name: release.querySelector('.release-title').textContent,
    cover: release.querySelector('.release-cover').src,
  }));
  if (!player || !tapes.length) return;

  const frame = player.querySelector('[data-beat-widget]');
  const cover = player.querySelector('[data-beat-cover]');
  const title = player.querySelector('[data-beat-title]');
  const tapeName = player.querySelector('[data-beat-tape]');
  const source = player.querySelector('[data-beat-link]');
  const progress = player.querySelector('[data-beat-progress]');
  const previous = player.querySelector('[data-beat-previous]');
  const toggle = player.querySelector('[data-beat-toggle]');
  const next = player.querySelector('[data-beat-next]');
  const playIcon = toggle.querySelector('[data-beat-play-icon]');
  const pauseIcon = toggle.querySelector('[data-beat-pause-icon]');
  const error = player.querySelector('[data-beat-error]');

  const widgetFactory = window.SC?.Widget;
  player.hidden = false;
  if (!widgetFactory) {
    error.hidden = false;
    return;
  }

  const widgetOptions = { auto_play: false, show_artwork: false };
  const initialParams = new URLSearchParams({ ...widgetOptions, url: tapes[0].widgetUrl });
  frame.src = `https://w.soundcloud.com/player/?${initialParams}`;
  const widget = widgetFactory(frame);
  const events = widgetFactory.Events;
  const trackCounts = [];
  let tapeIndex = 0;
  let trackIndex = 0;
  let tracks = [];
  let ready = false;
  let playing = false;
  let loadId = 0;
  let loadTimeout;

  function setReady(value) {
    ready = value;
    previous.disabled = toggle.disabled = next.disabled = !value;
  }

  function setPlaying(value) {
    playing = value;
    const key = value ? 'beat_pause_label' : 'beat_play_label';
    toggle.dataset.i18nAriaLabel = key;
    const dictionary = translations[document.documentElement.lang] || translations.it;
    toggle.setAttribute('aria-label', dictionary[key]);
    playIcon.toggleAttribute('hidden', value);
    pauseIcon.toggleAttribute('hidden', !value);
  }

  function showTrack() {
    const name = tracks[trackIndex]?.title || tapes[tapeIndex].name;
    if (title.textContent !== name) title.textContent = name;
    title.title = name;
  }

  function showError() {
    window.clearTimeout(loadTimeout);
    setReady(false);
    setPlaying(false);
    error.hidden = false;
  }

  function readTracks(id, startTrack, playWhenReady) {
    widget.getSounds((sounds) => {
      if (id !== loadId) return;
      if (!sounds?.length) {
        showError();
        return;
      }
      window.clearTimeout(loadTimeout);
      tracks = sounds;
      trackCounts[tapeIndex] = sounds.length;
      trackIndex = Math.min(startTrack, sounds.length - 1);
      error.hidden = true;
      showTrack();
      setReady(true);
      if (playWhenReady && !playing) widget.play();
    });
  }

  function loadTape(index, startTrack = 0) {
    const id = ++loadId;
    tapeIndex = index;
    setReady(false);
    setPlaying(false);
    progress.value = 0;

    const tape = tapes[index];
    title.textContent = tape.name;
    title.title = tape.name;
    tapeName.textContent = tape.name;
    source.href = tape.href;
    cover.src = tape.cover;
    loadTimeout = window.setTimeout(showError, 15000);
    widget.load(tape.widgetUrl, {
      ...widgetOptions,
      auto_play: true,
      start_track: startTrack,
      callback: () => readTracks(id, startTrack, true),
    });
  }

  function advanceTape() {
    loadTape((tapeIndex + 1) % tapes.length);
  }

  function playTrack(index) {
    trackIndex = index;
    progress.value = 0;
    showTrack();
    widget.skip(index);
    widget.play();
  }

  widget.bind(events.READY, () => {
    widget.unbind(events.READY);
    readTracks(0, 0, false);
  });
  widget.bind(events.PLAY, () => {
    setPlaying(true);
    const id = loadId;
    widget.getCurrentSoundIndex((index) => {
      if (id !== loadId || !ready) return;
      trackIndex = index;
      showTrack();
    });
  });
  widget.bind(events.PAUSE, () => setPlaying(false));
  widget.bind(events.PLAY_PROGRESS, ({ relativePosition }) => {
    if (ready && Number.isFinite(relativePosition)) progress.value = relativePosition;
  });
  widget.bind(events.FINISH, () => {
    if (!ready) return;
    progress.value = 0;
    if (trackIndex === tracks.length - 1) advanceTape();
  });
  widget.bind(events.ERROR, showError);

  toggle.addEventListener('click', () => {
    if (playing) widget.pause();
    else widget.play();
  });
  next.addEventListener('click', () => {
    if (trackIndex < tracks.length - 1) playTrack(trackIndex + 1);
    else advanceTape();
  });
  previous.addEventListener('click', () => {
    if (trackIndex > 0) {
      playTrack(trackIndex - 1);
      return;
    }
    const index = (tapeIndex + tapes.length - 1) % tapes.length;
    if (trackCounts[index]) loadTape(index, trackCounts[index] - 1);
    else widget.seekTo(0);
  });

  loadTimeout = window.setTimeout(showError, 15000);
})();
