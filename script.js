(() => {
  const dialog = document.querySelector(".image-lightbox");
  const preview = dialog.querySelector("img");
  let trigger = null;

  document.querySelectorAll(".zoom-button").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      trigger = button;
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt;
      dialog.showModal();
      document.body.classList.add("preview-open");
    });
  });

  dialog.querySelector("button").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("preview-open");
    preview.removeAttribute("src");
    preview.alt = "";
    trigger?.focus({preventScroll: true});
  });

  document.querySelectorAll(".mesh-demo-card").forEach((card) => {
    const video = card.querySelector("video");
    const quality = card.querySelector(".mesh-quality");
    let restorePlayback = null;

    quality.addEventListener("change", () => {
      const time = video.currentTime;
      const playing = !video.paused && !video.ended;
      if (restorePlayback) video.removeEventListener("loadedmetadata", restorePlayback);
      video.pause();
      restorePlayback = () => {
        video.currentTime = Math.min(time, Math.max(0, video.duration - 0.01));
        if (playing) video.play().catch(() => {});
        restorePlayback = null;
      };
      video.addEventListener("loadedmetadata", restorePlayback, {once: true});
      video.src = quality.value;
      video.load();
    });
  });
})();
