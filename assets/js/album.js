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
    trackItem.classList.add("row", "d-flex", "justify-content-between", "align-items-center");
    trackItem.innerHTML = `<div class="col-auto d-flex flex-column align-items-center">
                    <p class="ms-3 mb-0">${[index] + 1}</p>
                    <button class="border-0 bg-transparent fs-2 d-none" type="button">
                      <i class="bi bi-play-fill"></i>
                    </button>
                  </div>
                  <div class="col-8 d-flex align-items-center justify-content-between">
                    <div>
                      <a href="${track.link}">${track.title}</a>
                      <a href="${track.artist.name}">${track.artist.name}</a>
                    </div>
                    <div>
                      <button type="button" class="btn ms-3 d-none">
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
                  <div class="col-2 d-flex align-items-center">
                    <p>${formatTime2(track.duration)}</p>
                    <div class="dropdown ms-3">
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
  });
}

function formatTime2(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
