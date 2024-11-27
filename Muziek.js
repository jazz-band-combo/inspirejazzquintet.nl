document.addEventListener("DOMContentLoaded", function() {
  const songItems = document.querySelectorAll(".song-item");
  let currentlyPlayingAudio = null;

  songItems.forEach((item) => {
    item.addEventListener("click", function(event) {
      if (event.target.closest('.media-controls')) {
        return;
      }

      const audioFile = this.getAttribute("data-audio");

      if (audioFile) {
        const isExpanded = this.classList.contains("expanded");

        songItems.forEach(i => {
          i.classList.remove("expanded");
          const controls = i.querySelector(".media-controls");
          if (controls) {
            controls.remove();
          }
        });

        this.classList.toggle("expanded", !isExpanded);

        if (!isExpanded && !this.querySelector(".media-controls")) {
          const mediaControls = createAudioControls(audioFile);
          this.appendChild(mediaControls);
        }
      }
    });
  });

  function createAudioControls(audioFile) {
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "media-controls";

    controlsDiv.innerHTML = `
      <audio id="audioPlayer" src="${audioFile}"></audio>
      <div class="audio-controls">
        <button id="playPauseBtn"><i class="fas fa-play"></i></button>
        <div class="progress-container">
          <span id="currentTime">0:00</span>
          <input type="range" id="progressBar" value="0" max="100">
          <span id="durationTime">-0:00</span>
        </div>
      </div>
    `;

    const audio = controlsDiv.querySelector("#audioPlayer");
    const playPauseBtn = controlsDiv.querySelector("#playPauseBtn");
    const progressBar = controlsDiv.querySelector("#progressBar");
    const currentTimeEl = controlsDiv.querySelector("#currentTime");
    const durationTimeEl = controlsDiv.querySelector("#durationTime");

    audio.addEventListener("loadedmetadata", () => {
      durationTimeEl.textContent = `-${formatTime(audio.duration)}`;
    });

    playPauseBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.closest('.media-controls').querySelector('#playPauseBtn i').classList.replace("fa-pause", "fa-play");
      }

      if (audio.paused) {
        audio.play();
        playPauseBtn.querySelector("i").classList.replace("fa-play", "fa-pause");
        currentlyPlayingAudio = audio;
      } else {
        audio.pause();
        playPauseBtn.querySelector("i").classList.replace("fa-pause", "fa-play");
        currentlyPlayingAudio = null;
      }
    });

    audio.addEventListener("timeupdate", () => {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.value = progressPercent;

      currentTimeEl.textContent = formatTime(currentTime);
      durationTimeEl.textContent = `-${formatTime(duration - currentTime)}`;
    });

    audio.addEventListener("ended", () => {
      playPauseBtn.querySelector("i").classList.replace("fa-pause", "fa-play");
      currentlyPlayingAudio = null;
    });

    progressBar.addEventListener("input", () => {
      const newTime = (progressBar.value / 100) * audio.duration;
      audio.currentTime = newTime;
    });

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${minutes}:${secondsPart}`;
    }

    return controlsDiv;
  }
});