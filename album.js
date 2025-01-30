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
  });

const albumInfo = document.getElementById("albumInfo");

function createAlbumInfo(album) {
  const albumImg = document.getElementById("albumImg");
  albumImg.src = `${album.cover_medium}`;

  const albumName = document.getElementById("albumName");
  albumName.innerText = `${album.title}`;

  const authorName = document.getElementById("authorName");
  authorName.innerText = `${album.artist.name}`;

  const dateOfRelease = document.getElementById("dateOfRelease");
  dateOfRelease.innerText = `${album.releae_date}`;

  const trackNumAndTime = document.getElementById("trackNumAndTime");
  trackNumAndTime.innerText = `${album.nb_tracks} + "," + ${formatTime(album.duration)}`;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} +"min"+  ${remainingSeconds.toString().padStart(2, "0")}+"sec."`;
}
