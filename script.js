const correctCode = "KR2026";
const boxes = document.querySelectorAll(".code-boxes input");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

let index = 0;
boxes[0].disabled = false;
boxes[0].focus();

document.addEventListener("keydown", (e) => {
  if (index >= boxes.length) return;

  const key = e.key.toUpperCase();

  if (!/^[A-Z0-9]$/.test(key)) return;

  const currentBox = boxes[index];
  currentBox.value = key;

  if (key === correctCode[index]) {
    currentBox.classList.add("correct");
    correctSound.play();

    index++;
    if (index < boxes.length) {
      boxes[index].disabled = false;
      boxes[index].focus();
    } else {
      setTimeout(openVideo, 600);
    }

  } else {
    wrongSound.play();
    currentBox.classList.add("wrong", "shake");

    setTimeout(() => {
      boxes.forEach(b => {
        b.value = "";
        b.classList.remove("correct", "wrong", "shake");
        b.disabled = true;
      });
      index = 0;
      boxes[0].disabled = false;
      boxes[0].focus();
    }, 600);
  }
});

function openVideo() {
  const videoId = "Qz_YPmpfzjY";
  const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&fs=1&rel=0`;

  document.body.innerHTML = `
    <iframe 
      src="${url}" 
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
      style="position:fixed;top:0;left:0;width:100%;height:100%;">
    </iframe>
  `;

  setTimeout(() => {
    document.querySelector("iframe").requestFullscreen();
  }, 1000);
}
