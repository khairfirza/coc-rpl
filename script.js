const code = "KR2026";
let index = 0;

const boxes = document.querySelectorAll(".box");
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

document.addEventListener("keydown", (e) => {
  if (index >= code.length) return;

  const key = e.key.toUpperCase();
  if (!/^[A-Z0-9]$/.test(key)) return;

  const box = boxes[index];

  // Show typed character FIRST
  box.textContent = key;

  if (key === code[index]) {
    // ✅ CORRECT
    box.classList.add("correct");
    correctSound.play();
    index++;

    if (index === code.length) {
      setTimeout(openVideo, 700);
    }
  } else {
    // ❌ WRONG
    wrongSound.play();
    box.classList.add("wrong");

    setTimeout(() => {
      box.classList.remove("wrong");
      box.textContent = "";
    }, 450);
  }
});

function openVideo() {
  document.body.innerHTML = `
    <iframe
      id="yt"
      src="https://www.youtube.com/embed/AAnsjyAH5e4?autoplay=1&controls=0&rel=0&mute=0"
      allow="autoplay; fullscreen"
      frameborder="0"
      style="position:fixed; inset:0; width:100vw; height:100vh;">
    </iframe>
  `;

  const iframe = document.getElementById("yt");

  setTimeout(() => {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    }
  }, 500);
}
