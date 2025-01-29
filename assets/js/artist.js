const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const artista = [];
const URL = `https://striveschool-api.herokuapp.com/api/deezer/`;
let folder = `artist/${id}`;
fetch(URL + folder)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Ci dispiace non siamo riusciti a recuperare l'artista");
    }
  })
  .then((artist) => {
    artista.push(artist);
    console.log(artista);
    imgs(artista);
  });

function imgs(artista) {
  const imgArt = document.getElementById("artista");
  console.log(artista[0].picture);
  imgArt.style.backgroundImage = "url(" + artista[0].picture_xl + ")";
  imgArt.style.backgroundColor = "red";
  imgArt.style.backgroundRepeat = "no-repeat";
  imgArt.style.backgroundSize = "cover";
  imgArt.style.backgroundPosition = "center";
  return nameArtist(artista);
}

function nameArtist(artista) {
  const name = document.querySelector("h1");
  name.innerText = artista[0].name;
  const fans = document.getElementById("fans");
  fans.innerText = parseInt(artista[0].nb_fan).toLocaleString("it-IT");
}

folder += `/top?limit=5`;
// const popular = [];
fetch(URL + folder)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Ci dispiace non siamo riusciti a recuperare l'artista");
    }
  })
  .then((topList) => {
    const popular = [...topList.data];
    console.log(popular);
    listPopular(popular);
  });

function listPopular(popular) {
  const containerPopular = document.getElementById("containerPopular");
  console.log(popular.length);
  // titolo1.innerText = popular[0][0].title;
  for (let i = 0; i < popular.length; i++) {
    containerPopular.innerHTML += `<div class="row m-1">
                                    <div class="col-4 d-flex">
                                      <span class="align-self-center pe-1">${i + 1}</span>
                                      <img src="${popular[i].album.cover}" width="45px" class="mb-2 mx-2 rounded" />
                                      <span>${popular[i].title}</span>
                                    </div>
                                    <div class="col-4 text-end">30.964.869</div>
                                    <div class="col-4 text-end"><span>${formatTime(popular[i].duration)}</span></div>
                                  </div>`;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
