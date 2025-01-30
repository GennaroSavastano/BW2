const params = new URLSearchParams(window.location.search);
const albumId = params.get("albumId") || "125219";

const URL = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

fetch(URL, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjM1YmI3NDcwMTAwMTU4YjJiM2QiLCJpYXQiOjE3Mzc3MTI0NzUsImV4cCI6MTczODkyMjA3NX0.G35XYSgW1idS8P7PFphzDi_nEEqC1B0A7YhCTz-o85M`,
  },
})
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Errore durante la ricerca dell' Album !");
    }
  })
  .then((album) => {
    console.log(album);
    createAlbumInfo(album);
    createTrackList(album);
  });

const albumInfo = document.getElementById("albumInfo");

function createAlbumInfo(album) {
  const recordType = document.getElementById("record-type");
  recordType.innerText = album.record_type;
  recordType.classList.add("text-capitalize");

  const albumImg = document.getElementById("albumImg");
  albumImg.src = album.cover_medium;

  const albumName = document.getElementById("albumName");
  albumName.innerText = album.title;

  const authorName = document.getElementById("authorName");
  authorName.innerText = album.artist.name;

  const dateOfRelease = document.getElementById("dateOfRelease");
  dateOfRelease.innerHTML = new Date(album.release_date).getFullYear();

  const trackNumAndTime = document.getElementById("trackNumAndTime");
  trackNumAndTime.innerText = `${album.nb_tracks} brani , ${formatTime(album.duration)}`;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} min ${remainingSeconds.toString().padStart(2, "0")} sec.`;
}

function createTrackList(album) {
  const trackList = document.getElementById("trackList");

  album.tracks.data.forEach((track, index) => {
    const trackItem = document.createElement("div");
    trackItem.classList.add("row", "d-flex", "justify-content-between", "align-items-center", "trackItem");
    trackItem.innerHTML = `<div class="col-auto py-2 d-flex flex-column align-items-center">
                    <p id="trackNum${index + 1}" class="trackNum ms-3 mb-0">${index + 1}</p>
                    <button id="albPlay${index + 1}" class="albPlay border-0 bg-transparent fs-5 d-none" type="button">
                      <i class="bi bi-play-fill"></i>
                    </button>
                  </div>
                  <div class="col-8 d-flex py-2 align-items-center justify-content-between">
                    <div>
                      <a class="text-decoration-none albTextAccent hov" href="${track.link}">${track.title}</a>
                      <a class="text-decoration-none albText hov d-block" href="${track.artist.name}">${
      track.artist.name
    }</a>
                    </div>
                    <div>
                      <button id="albPlus${index + 1}" type="button" class="albPlus btn ms-3 d-none">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" class="svgicon" viewBox="0 0 24 24">
                          <path
                            d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"
                          ></path>
                          <path
                            d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="col-2 py-2 d-flex align-items-center justify-content-end">
                    <p class="mb-0 flex-end">${formatTime2(track.duration)}</p>
                    <div id="trackDrop${index + 1}" class="trackDrop dropdown ms-3 invisible">
                      <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg data-encore-id="icon" role="img" aria-hidden="true" class="svgicon" viewBox="0 0 24 24">
                          <path
                            d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                          ></path>
                        </svg>
                      </button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                      </ul>
                    </div>
                  </div>`;
    trackList.appendChild(trackItem);

    let enable = "";

    trackItem.addEventListener("mouseover", () => {
      if (enable !== index + 1) {
        trackItem.style.backgroundColor = "#2e2e2e";
        const trackNum = document.getElementById(`trackNum${index + 1}`);
        trackNum.classList.add("d-none");
        const albPlay = document.getElementById(`albPlay${index + 1}`);
        albPlay.classList.remove("d-none");
        const albPlus = document.getElementById(`albPlus${index + 1}`);
        albPlus.classList.remove("d-none");
        const trackDrop = document.getElementById(`trackDrop${index + 1}`);
        trackDrop.classList.remove("invisible");
      }
    });

    trackItem.addEventListener("mouseout", () => {
      if (enable !== index + 1) {
        trackItem.style.backgroundColor = "inherit";
        const trackNum = document.getElementById(`trackNum${index + 1}`);
        trackNum.classList.remove("d-none");
        const albPlay = document.getElementById(`albPlay${index + 1}`);
        albPlay.classList.add("d-none");
        const albPlus = document.getElementById(`albPlus${index + 1}`);
        albPlus.classList.add("d-none");
        const trackDrop = document.getElementById(`trackDrop${index + 1}`);
        trackDrop.classList.add("invisible");
      }
    });

    trackItem.addEventListener("click", () => {
      enable = index + 1;
      const allRows = document.querySelectorAll(".trackItem");
      allRows.forEach((ele) => ele.classList.remove("songActive"));

      const allTrackNum = document.querySelectorAll(".trackNum");
      allTrackNum.forEach((ele) => ele.classList.remove("d-none"));

      const allAlbPlay = document.querySelectorAll(".albPlay");
      allAlbPlay.forEach((ele) => ele.classList.add("d-none"));

      const allAlbPlus = document.querySelectorAll(".albPlus");
      allAlbPlus.forEach((ele) => ele.classList.add("d-none"));

      const allTrackDrop = document.querySelectorAll(".trackDrop");
      allTrackDrop.forEach((ele) => ele.classList.add("invisible"));

      trackItem.classList.add("songActive");
      const trackNum = document.getElementById(`trackNum${index + 1}`);
      trackNum.classList.add("d-none");
      const albPlay = document.getElementById(`albPlay${index + 1}`);
      albPlay.classList.remove("d-none");
      const albPlus = document.getElementById(`albPlus${index + 1}`);
      albPlus.classList.remove("d-none");
      const trackDrop = document.getElementById(`trackDrop${index + 1}`);
      trackDrop.classList.remove("invisible");
    });
  });
}

function formatTime2(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
