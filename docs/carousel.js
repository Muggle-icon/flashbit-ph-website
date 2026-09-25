(() => {
  const AUTOPLAY_DELAY = 6000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('[data-app-carousel]').forEach(root => {
    const viewport = root.querySelector('[data-carousel-viewport]');
    const slides = [...root.querySelectorAll('[data-carousel-slide]')];
    const selectors = [...root.querySelectorAll('[data-carousel-go]')];
    const playback = root.querySelector('[data-carousel-playback]');
    const status = root.querySelector('[data-carousel-status]');
    if (!viewport || slides.length < 2 || !playback) return;

    let current = 0;
    let destination = 0;
    let requested = !reduceMotion.matches && !root.contains(document.activeElement);
    let visible = false;
    let hovered = false;
    let programmatic = false;
    let announceOnSettle = false;
    let timer = null;
    let settleTimer = null;
    let frame = null;
    let pointerIntent = null;

    const wrap = index => (index + slides.length) % slides.length;
    const nearest = () => Math.max(0, Math.min(slides.length - 1,
      Math.round(viewport.scrollLeft / Math.max(1, viewport.clientWidth))));
    const clearTimer = () => {
      window.clearTimeout(timer);
      timer = null;
    };
    const updatePlayback = () => {
      playback.textContent = requested ? 'Pause autoplay' : 'Play autoplay';
      playback.setAttribute('aria-label', requested ? 'Pause automatic screen changes' : 'Play automatic screen changes');
    };
    const updateSlide = index => {
      current = index;
      selectors.forEach((button, i) => {
        if (i === index) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
      // Slides contain only images: hide the offscreen copies from the accessibility tree.
      slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== index)));
      root.querySelector('[data-carousel-label]').textContent = slides[index].dataset.label;
      root.querySelector('[data-carousel-count]').textContent = `${index + 1} / ${slides.length}`;
    };
    const announce = message => { status.textContent = message; };
    const schedule = () => {
      clearTimer();
      if (requested && visible && !hovered && !document.hidden && !programmatic) {
        timer = window.setTimeout(() => move(destination + 1, false), AUTOPLAY_DELAY);
      }
    };
    const pause = () => {
      requested = false;
      clearTimer();
      updatePlayback();
    };
    const settle = () => {
      window.clearTimeout(settleTimer);
      updateSlide(nearest());
      destination = current;
      programmatic = false;
      if (announceOnSettle) announce(`${slides[current].dataset.label}. Screen ${current + 1} of ${slides.length}.`);
      announceOnSettle = false;
      schedule();
    };
    const move = (index, manual = true) => {
      if (manual) pause();
      else clearTimer();
      destination = wrap(index);
      announceOnSettle = manual;
      programmatic = true;
      window.clearTimeout(settleTimer);
      viewport.scrollTo({
        left: destination * viewport.clientWidth,
        behavior: reduceMotion.matches ? 'instant' : 'smooth',
      });
      // Also settles same-slide selections and instant scrolling, which may emit no event.
      settleTimer = window.setTimeout(settle, 180);
    };
    const manualScroll = () => {
      pause();
      programmatic = false;
      destination = nearest();
      announceOnSettle = true;
    };

    viewport.addEventListener('scroll', () => {
      clearTimer();
      window.clearTimeout(settleTimer);
      if (frame === null) frame = window.requestAnimationFrame(() => {
        updateSlide(nearest());
        if (!programmatic) destination = current;
        frame = null;
      });
      settleTimer = window.setTimeout(settle, 180);
    }, { passive: true });
    viewport.addEventListener('pointerdown', manualScroll, { passive: true });
    viewport.addEventListener('wheel', manualScroll, { passive: true });
    viewport.addEventListener('keydown', event => {
      const targets = { ArrowLeft: destination - 1, ArrowRight: destination + 1, Home: 0, End: slides.length - 1 };
      if (Object.hasOwn(targets, event.key)) {
        event.preventDefault();
        move(targets[event.key]);
      }
    });
    root.querySelector('[data-carousel-previous]').addEventListener('click', () => move(destination - 1));
    root.querySelector('[data-carousel-next]').addEventListener('click', () => move(destination + 1));
    selectors.forEach(button => button.addEventListener('click', () => move(Number(button.dataset.carouselGo))));

    // Keyboard focus pauses persistently. Only an explicit Play action starts it again.
    root.addEventListener('focusin', pause);
    // Capture the intended pointer action before focusin updates the button label.
    playback.addEventListener('pointerdown', () => { pointerIntent = requested ? 'pause' : 'play'; });
    playback.addEventListener('pointercancel', () => { pointerIntent = null; });
    // Keep this intent until click: a touch browser may dispatch click after pointerup.
    // Keyboard/synthetic clicks have detail 0 and intentionally ignore pointer intent.
    playback.addEventListener('click', event => {
      const action = event.detail && pointerIntent ? pointerIntent : (requested ? 'pause' : 'play');
      pointerIntent = null;
      requested = action === 'play';
      updatePlayback();
      announce(requested ? 'Autoplay enabled. Screens change every six seconds while in view.' : 'Autoplay paused.');
      schedule();
    });
    root.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') { hovered = true; clearTimer(); }
    });
    root.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') { hovered = false; schedule(); }
    });
    document.addEventListener('visibilitychange', schedule);
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches) pause();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        const entry = entries[entries.length - 1];
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        schedule();
      }, { threshold: [0, 0.25] }).observe(viewport);
    } else {
      // Preserve manual navigation if the browser cannot reliably observe visibility.
      requested = false;
      playback.hidden = true;
    }

    let width = viewport.clientWidth;
    const resize = () => {
      if (Math.abs(viewport.clientWidth - width) < 1) return;
      width = viewport.clientWidth;
      window.clearTimeout(settleTimer);
      viewport.scrollTo({ left: destination * width, behavior: 'instant' });
      settle();
    };
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(viewport);
    else window.addEventListener('resize', resize);

    root.querySelector('[data-carousel-controls]').hidden = false;
    root.classList.add('is-enhanced');
    updateSlide(0);
    updatePlayback();
  });
})();
