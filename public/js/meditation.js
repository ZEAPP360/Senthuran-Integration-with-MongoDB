const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  const sounds = document.querySelectorAll(".sound-picker button");
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  const outlineLength = outline.getTotalLength();

  //duration (data-time)
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      this.children[0].classList.remove("hidden");

      for (let i = 0; i < sounds.length; i++) {
        sounds[i].name !== this.name &&
          sounds[i].children[0].classList.add("hidden");
      }

      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      video.setAttribute("playsinline", "playsinline");
      checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  replay.addEventListener("click", function () {
    restartSong(song);
  });

  const restartSong = (song) => {
    song.currentTime = 0;
  };

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${pad(Math.floor(fakeDuration / 60))} : ${pad(
        Math.floor(fakeDuration % 60)
      )}`;
    });
  });

  function pad(val) {
    const valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = pad(Math.floor(elapsed % 60));
    let minutes = pad(Math.floor(elapsed / 60));

    //circle progress
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};


let logout = ()=>{
  localStorage.clear()
  window.location.replace("/login")
}

app();
