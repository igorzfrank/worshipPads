const audio = document.getElementById("audio");
const main = document.querySelector("main");

let typePad = "custom";
let tomPad;

audio.playing = false;

function updateType() {
  const typeBtns = document.querySelectorAll(".type-btn");

  typeBtns.forEach((typeBtn) => {
    typeBtn.addEventListener("click", function () {
      typeBtns.forEach((item) => {
        item.classList.remove("is-active");
      });
      typeBtn.classList.add("is-active");
      typePad = typeBtn.dataset.type;

      if (audio.playing == true) {
        main.classList.add("disabled");
        const volumeInterval = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1; // Ajuste este valor conforme necessário
          } else {
            clearInterval(volumeInterval);

            // Troca a faixa de áudio
            audio.src = `./audio/audio-${typePad}-${padTom}.mp3`;
            audio.playing = true;
            audio.play();

            // Aumenta o volume gradualmente para 1
            const fadeInInterval = setInterval(() => {
              if (audio.volume < 0.9) {
                audio.volume += 0.1; // Ajuste este valor conforme necessário
              } else {
                clearInterval(fadeInInterval);
                main.classList.remove("disabled");
              }
            }, 200);
          }
        }, 200);
      }
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
        audio.playing = false;
      } else {
        pads.forEach((item) => {
          item.classList.remove("is-active");
        });
        pad.classList.add("is-active");
        main.classList.add("disabled");
        padTom = pad.dataset.tom;
        const volumeInterval = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1; // Ajuste este valor conforme necessário
          } else {
            clearInterval(volumeInterval);

            // Troca a faixa de áudio
            audio.src = `./audio/audio-${typePad}-${padTom}.mp3`;
            audio.playing = true;
            audio.play();

            // Aumenta o volume gradualmente para 1
            const fadeInInterval = setInterval(() => {
              if (audio.volume < 0.9) {
                audio.volume += 0.1; // Ajuste este valor conforme necessário
              } else {
                clearInterval(fadeInInterval);
                main.classList.remove("disabled");
                // pads.forEach((item) => {
                //   item.disabled = false;
                // });
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
