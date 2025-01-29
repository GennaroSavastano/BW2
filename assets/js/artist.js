const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const artista = [];
const URL = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`;
fetch(URL)
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
  console.log(artista.picture);
  imgArt.style.backgroundImage = "url(" + artista[0].picture + ")";
  imgArt.style.backgroundColor = "red";
}
