const correctCode = "KR2026";

const videoURL = `
https://www.youtube.com/embed/Qz_YPmpfzjY
?autoplay=1
&mute=0
&controls=0
&rel=0
&modestbranding=1
&fs=1
`;

const inputs = document.querySelectorAll(".code-box input");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

inputs[0].focus();

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.toUpperCase();

    if (input.value === correctCode[index]) {
      input.classList.add("correct");
      correctSound.currentTime = 0;
      correctSound.play();

      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        launchVideo();
      }

    } else {
      input.classList.add("wrong", "shake");
      wrongSound.currentTime = 0;
      wrongSound.play();

      setTimeout(() => {
        input.classList.remove("wrong", "shake");
        input.value = "";
        input.focus();
      }, 450);
    }
  });
});

function launchVideo() {
  document.body.innerHTML = `
    <iframe
      id="videoFrame"
      src="https://www.youtube.com/embed/Qz_YPmpfzjY?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1"
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
      iframe.webkitRequestFullscreen(); // Safari
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen(); // IE/Edge
    }
  }, 500);
}

