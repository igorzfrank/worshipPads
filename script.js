const audio = document.getElementById("audio");

let typePad = "custom";

function updateType() {
  const typeBtns = document.querySelectorAll(".type-btn");

  typeBtns.forEach((typeBtn) => {
    typeBtn.addEventListener("click", function () {
      typeBtns.forEach((item) => {
        item.classList.remove("is-active");
      });
      typeBtn.classList.add("is-active");
      typePad = typeBtn.dataset.type
    });
  });
}

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
        console.log(typePad)

        const volumeInterval = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1; // Ajuste este valor conforme necessário
          } else {
            clearInterval(volumeInterval);

            // Troca a faixa de áudio
            audio.src = `./audio/audio-${typePad}-${pad.dataset.tom}.mp3`;
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
updateType();
