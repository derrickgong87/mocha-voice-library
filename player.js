const players = [...document.querySelectorAll("audio")];
for (const player of players) {
  player.addEventListener("play", () => {
    for (const other of players) {
      if (other !== player && !other.paused) other.pause();
    }
  });
}

for (const button of document.querySelectorAll("[data-copy]")) {
  const field = document.getElementById(button.dataset.copy);
  const status = button.parentElement.querySelector("output");
  let reset;
  button.addEventListener("click", async () => {
    clearTimeout(reset);
    try {
      await navigator.clipboard.writeText(field.textContent);
      button.textContent = "已复制";
      status.textContent = "音色 ID 已复制";
      reset = setTimeout(() => {
        button.textContent = "复制 ID";
        status.textContent = "";
      }, 1800);
    } catch {
      field.focus();
      const range = document.createRange();
      range.selectNodeContents(field);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "音色 ID 已选中，可手动复制";
    }
  });
}
