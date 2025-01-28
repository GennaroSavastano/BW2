const API_KEY = `"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNGFkNGI3NDcwMTAwMTU4YjJhYmQiLCJpYXQiOjE3MzgwNzE5MTksImV4cCI6MTczOTI4MTUxOX0.AN_MS8rLwZlPFMsvU_j6nZSMWj80EiwBU6Q5HHL7fLY"`;
let myApiUrl = "https://striveschool-api.herokuapp.com/api/deezer/";

let idArtist = 0;
let artistCreated = 0;
const numArtists = 20;
const artists = [];

async function fetchArtists(numArtists, apiUrl, apiKey) {
  const artists = [];
  let artistCreated = 0;

  const fetchSingleArtist = async () => {
    const idArtist = Math.round(Math.random() * 17355);
    const url = `${apiUrl}artist/${idArtist}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      artists.push(result);
      artistCreated++;
    } catch (error) {
      console.error("Errore nel recupero artista:", error.message);
    }
  };

  while (artistCreated < numArtists) {
    await fetchSingleArtist();
  }

  console.log("Artisti recuperati:", artists);
  return createDaily(artists);
}

// Chiamata alla funzione
fetchArtists(numArtists, myApiUrl, API_KEY);

const daily = document.getElementById("daily");

const dailyLenght = 7;

function createDaily(artists) {
  let numArtist = 0;
  for (let i = 0; i < dailyLenght; i++) {
    numArtist = i + 1;
    const colArtist = document.createElement("div");
    colArtist.classList.add("coldaily");

    const divArtist = document.createElement("div");
    divArtist.classList.add("d-flex", "align-items-center", "card", "w-100", "border-0");

    const dailyMix = document.createElement("div");
    dailyMix.classList.add("d-flex", "justify-content-between", "w-100", "align-items-center", "dailyinfo");
    dailyMix.innerHTML = `<span class="dailymix dailymix0${numArtist}">Daily Mix</span><span class="fs-3 dailymix dailymix0${numArtist}">0${numArtist}</span>`;

    const imgArtist = document.createElement("img");
    imgArtist.src = artists[i].picture_medium;
    imgArtist.classList.add("imgdaily", "rounded");

    const titleArtist = document.createElement("p");
    titleArtist.classList.add("mb-0", "ps-2", "fs-7", "text-light", "mt-3");
    titleArtist.innerText = artists[i].name;

    const dailyIcon = document.createElement("span");
    dailyIcon.classList.add("dailyicon", `dailyicon0${numArtist}`);
    dailyIcon.innerHTML = `<i class="bi bi-spotify fs-6"></i>`;

    divArtist.appendChild(dailyMix);
    divArtist.appendChild(imgArtist);
    divArtist.appendChild(titleArtist);
    colArtist.appendChild(divArtist);
    colArtist.appendChild(dailyIcon);

    daily.appendChild(colArtist);
  }
  return createRadio(artists);
}

const genre = document.getElementById("genre");

const radioLenght = dailyLenght + 8;

function createRadio(artists) {
  for (let i = 7; i < radioLenght; i++) {
    const divGenre = document.createElement("div");
    divGenre.classList.add("d-flex", "align-items-center", "divgenre");

    const imgGenre = document.createElement("img");
    imgGenre.src = artists[i].picture_small;
    imgGenre.classList.add("imggenre");

    const titleGenre = document.createElement("p");
    titleGenre.classList.add("mb-0", "ps-2", "fs-7", "text-light");
    titleGenre.innerText = artists[i].name;

    divGenre.appendChild(imgGenre);
    divGenre.appendChild(titleGenre);
    genre.appendChild(divGenre);
  }
}
