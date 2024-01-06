const audio = document.getElementById("audio");

// function playSound(frequency) {
//   updatePads();
//   audio.src = `path/to/your/audio-${frequency}.mp3`; // Substitua pelo caminho do seu áudio
//   audio.play();
// }

function updatePads() {
  const pads = document.querySelectorAll(".tom-btn");

  pads.forEach((pad) => {
    pad.addEventListener("click", function () {
      if (pad.classList.contains("is-active")) {
        pad.classList.remove("is-active");
        audio.pause();
      } else {
        pads.forEach((item) => {
          item.classList.remove("is-active");
          item.disabled = true;
        });
        pad.classList.add("is-active");

        const volumeInterval = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1; // Ajuste este valor conforme necessário
          } else {
            clearInterval(volumeInterval);

            // Troca a faixa de áudio
            audio.src = `./audio/audio-${pad.dataset.tom}.mp3`;
            console.log(audio.src);
            audio.play();

            // Aumenta o volume gradualmente para 1
            const fadeInInterval = setInterval(() => {
              if (audio.volume < 0.9) {
                audio.volume += 0.1; // Ajuste este valor conforme necessário
              } else {
                clearInterval(fadeInInterval);
                pads.forEach((item) => {
                  item.disabled = false;
                });
              }
            }, 200);
          }
        }, 200);
      }
    });
  });
}

// Atualiza os pads com a frequência inicial
updatePads();
