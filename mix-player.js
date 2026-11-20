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

  async function move(step) {
    if (switching) return;
    switching = true;
    controls.setAttribute('aria-busy', 'true');
    error.hidden = true;
    const position = (index + step + mixes.length) % mixes.length;
    try {
      await widget.load(mixes[position], true);
      index = position;
    } catch {
      error.hidden = false;
    } finally {
      switching = false;
      controls.removeAttribute('aria-busy');
    }
  }

  widget.ready.then(() => {
    if (mixes.length < 2) return;
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    widget.events.ended.on(() => move(1));
    controls.hidden = false;
  }, () => {
    error.hidden = false;
  });
})();
