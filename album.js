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

<div id="albumInfo" class="row d-flex flex-row p-1 m-0" style="height: 186px">
  <div class="col-auto p-0 d-flex flex-column justify-content-end me-3">
    <button class="p-0 border border-0">
      <img style="max-width: 128px" src="./assets/imgs/main/image-15.jpg" alt="" />
    </button>
  </div>
  <div class="col p-0 d-flex flex-column justify-content-end">
    <p class="m-0">Album</p>
    <h1 class="m-0 text-uppercase fw-bold fs-4">Titolo Album</h1>
    <div class="m-0 d-flex align-items-baseline">
      <img class="m-0 border border-rounded" src="" alt="" />
      <h2 class="m-0 fs-5">Autore</h2>
      <p class="m-0 dateOfRelease">Anno</p>
      <p class="m-0"># brani, durata totale in min. sec.</p>
    </div>
  </div>
</div>;
