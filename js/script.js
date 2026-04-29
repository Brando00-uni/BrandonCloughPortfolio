document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video[autoplay]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });

  videos.forEach((video) => {
    video.muted = true;
    video.playsInline = true;
  });

  if (prefersReducedMotion) {
    return;
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link || event.defaultPrevented) {
      return;
    }

    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    if (link.target && link.target !== "_self") {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    const current = new URL(window.location.href);
    const samePageHash =
      destination.pathname === current.pathname &&
      destination.search === current.search &&
      destination.hash;
    const sameSite =
      destination.protocol === current.protocol &&
      destination.host === current.host;

    if (!sameSite || samePageHash || link.hasAttribute("download")) {
      return;
    }

    event.preventDefault();
    document.body.getBoundingClientRect();
    document.body.classList.add("is-leaving");

    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, 320);
  });
});
