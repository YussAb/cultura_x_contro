(() => {
  const player = document.querySelector('[data-mix-player]');
  if (!player || !window.Mixcloud?.PlayerWidget) return;

  const mixes = [...document.querySelectorAll('[data-radio-order]')]
    .sort((left, right) => Number(left.dataset.radioOrder) - Number(right.dataset.radioOrder))
    .map((link) => new URL(link.href).pathname);
  const controls = player.querySelector('[data-mix-controls]');
  const previous = player.querySelector('[data-mix-previous]');
  const next = player.querySelector('[data-mix-next]');
  const error = player.querySelector('[data-mix-error]');
  const widget = window.Mixcloud.PlayerWidget(player.querySelector('[data-mix-widget]'));
  let index = 0;
  let switching = false;

  async function playMix(position) {
    if (switching) return;
    switching = true;
    controls.setAttribute('aria-busy', 'true');
    error.hidden = true;
    try {
      if (position === index) {
        await widget.play();
      } else {
        await widget.load(mixes[position], true);
        index = position;
      }
    } catch {
      error.hidden = false;
    } finally {
      switching = false;
      controls.removeAttribute('aria-busy');
    }
  }

  function move(step) {
    return playMix((index + step + mixes.length) % mixes.length);
  }

  widget.ready.then(() => {
    document.querySelectorAll('a.mix-release').forEach((link) => {
      const position = mixes.indexOf(new URL(link.href).pathname);
      if (position === -1) return;
      const label = link.querySelector('[data-i18n="selection_listen"]');
      label.dataset.i18n = 'mix_play_here';
      label.textContent = (translations[document.documentElement.lang] || translations.it).mix_play_here;
      link.addEventListener('click', (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        playMix(position);
      });
    });

    if (mixes.length < 2) return;
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    widget.events.ended.on(() => move(1));
    controls.hidden = false;
  }, () => {
    error.hidden = false;
  });
})();
