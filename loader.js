console.log("Loader JS loaded");

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (!loader) {
    console.error("Loader element not found");
    return;
  }

  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
});

// Page transition loader
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
