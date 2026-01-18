function hideLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 400);
}

// Normal page load
window.addEventListener("load", hideLoader);

// Back / forward navigation (bfcache)
window.addEventListener("pageshow", e => {
  if (e.persisted) {
    hideLoader();
  }
});

// Page transitions
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#") || link.target === "_blank") return;

      e.preventDefault();
      loader.style.display = "flex";
      loader.style.opacity = "1";

      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
});
