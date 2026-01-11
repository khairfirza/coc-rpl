const correctCode = "KR2026";
let currentIndex = 0;

const boxes = document.querySelectorAll(".code-box");

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

document.addEventListener("keydown", (e) => {
  if (currentIndex >= correctCode.length) return;

  const key = e.key.toUpperCase();
  if (!/^[A-Z0-9]$/.test(key)) return;

  const currentBox = boxes[currentIndex];

  if (key === correctCode[currentIndex]) {
    // CORRECT
    currentBox.textContent = key;
    currentBox.classList.add("correct");
    correctSound.play();

    currentIndex++;

    if (currentIndex === correctCode.length) {
      setTimeout(openVideo, 600);
    }
  } else {
    // WRONG
    wrongSound.play();
    currentBox.classList.add("wrong");

    setTimeout(() => {
      currentBox.classList.remove("wrong");
      currentBox.textContent = "";
    }, 500);
  }
});

function openVideo() {
  document.body.innerHTML = `
    <iframe
      id="videoFrame"
      src="https://www.youtube.com/embed/Qz_YPmpfzjY?autoplay=1&controls=0&rel=0&mute=0"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
      style="position:fixed; inset:0; width:100vw; height:100vh;">
    </iframe>
  `;

  const iframe = document.getElementById("videoFrame");

  setTimeout(() => {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    }
  }, 500);
}
