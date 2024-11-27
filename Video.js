document.addEventListener("DOMContentLoaded", function() {
  const mediaItems = document.querySelectorAll(".song-item");
  let currentlyPlayingVideo = null;

  mediaItems.forEach((item) => {
    item.addEventListener("click", function(event) {
      if (event.target.closest('.media-controls')) {
        return; // Prevent collapse when clicking controls
      }

      const videoFile = this.getAttribute("data-video");

      if (videoFile) {
        const isExpanded = this.classList.contains("expanded");

        mediaItems.forEach(i => {
          i.classList.remove("expanded");
          const controls = i.querySelector(".media-controls");
          if (controls) {
            controls.remove();
          }
        });

        this.classList.toggle("expanded", !isExpanded);

        if (!isExpanded) {
          const mediaControls = createVideoControls(videoFile);
          this.appendChild(mediaControls);
        }
      }
    });
  });

  // Function to create video controls
  function createVideoControls(videoFile) {
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "media-controls";

    // HTML structure for video player
    controlsDiv.innerHTML = `
      <video id="videoPlayer" src="${videoFile}" width="600"></video>
      <div class="video-controls">
        <button id="playPauseBtn"><i class="fas fa-play"></i></button>
        <div class="progress-container">
          <span id="currentTime">0:00</span>
          <input type="range" id="progressBar" value="0" max="100">
          <span id="durationTime">-0:00</span>
        </div>
      </div>
    `;

    const video = controlsDiv.querySelector("#videoPlayer");
    const playPauseBtn = controlsDiv.querySelector("#playPauseBtn");
    const progressBar = controlsDiv.querySelector("#progressBar");
    const currentTimeEl = controlsDiv.querySelector("#currentTime");
    const durationTimeEl = controlsDiv.querySelector("#durationTime");

    // Play/Pause functionality
    playPauseBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
        currentlyPlayingVideo.pause();
        const prevPlayPauseBtn = currentlyPlayingVideo.closest('.media-controls').querySelector('#playPauseBtn');
        prevPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }

      if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        currentlyPlayingVideo = video;
      } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        currentlyPlayingVideo = null;
      }
    });

    // Update the progress bar and time display
    video.addEventListener("timeupdate", () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.value = progressPercent;

      currentTimeEl.textContent = formatTime(currentTime);
      durationTimeEl.textContent = `-${formatTime(duration - currentTime)}`;
    });

    // Seek functionality
    progressBar.addEventListener("input", () => {
      const newTime = (progressBar.value / 100) * video.duration;
      video.currentTime = newTime;
    });

    // Video ended event to reset controls
    video.addEventListener("ended", () => {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      currentlyPlayingVideo = null;
    });

    // Format time in minutes:seconds
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${minutes}:${secondsPart}`;
    }

    return controlsDiv;
  }
});