const genre = document.getElementById("genre");
let idRadio = 1;
let radioCreated = 0; // Imposto il valore di controllo per definire quante Radio vengono create
const lastRadio = 8; // Definisco il massimo di radio da ottenere

function fetchRadio(idRadio) {
  const url = "https://deezerdevs-deezer.p.rapidapi.com/radio/" + idRadio;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  const myRadio = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.title === undefined) {
        idRadio++;
      } else {
        radioCreated++;
        idRadio++;
        createRadio(result);
      }

      console.log("idRadio; ", idRadio);
      if (radioCreated < lastRadio) {
        fetchRadio(idRadio);
      }
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };
  myRadio();
}

fetchRadio(idRadio);

function createRadio(result) {
  const divGenre = document.createElement("div");
  divGenre.classList.add("d-flex", "align-items-center", "divgenre");

  const imgGenre = document.createElement("img");
  imgGenre.src = result.picture_small;
  imgGenre.classList.add("imggenre");

  const titleGenre = document.createElement("p");
  titleGenre.classList.add("mb-0", "ps-2", "fs-7", "text-light");
  titleGenre.innerText = result.title;

  divGenre.appendChild(imgGenre);
  divGenre.appendChild(titleGenre);
  genre.appendChild(divGenre);
}

const daily = document.getElementById("daily");
let idArtist = Math.round(Math.random() * 17355) + 1;
let artistCreated = 0;
const lastArtist = 7;

function fetchDaily(idArtist) {
  const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + idArtist;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  const myRadio = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.name === undefined) {
        idArtist++;
      } else {
        artistCreated++;
        idArtist++;
        createDaily(result);
      }

      console.log("idArtist; ", idArtist);
      if (artistCreated < lastArtist) {
        fetchDaily(idArtist);
      }
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };
  myRadio();
}

fetchDaily(idArtist);

function createDaily(result) {
  const colArtist = document.createElement("div");
  colArtist.classList.add("coldaily");

  const divArtist = document.createElement("div");
  divArtist.classList.add("d-flex", "align-items-center", "card", "w-100");

  const imgArtist = document.createElement("img");
  imgArtist.src = result.picture;
  imgArtist.classList.add("imgdaily");

  const titleArtist = document.createElement("p");
  titleArtist.classList.add("mb-0", "ps-2", "fs-7", "text-light");
  titleArtist.innerText = result.name;

  divArtist.appendChild(imgArtist);
  divArtist.appendChild(titleArtist);
  colArtist.appendChild(divArtist);
  daily.appendChild(colArtist);
}
