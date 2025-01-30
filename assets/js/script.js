const API_KEY = `"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNGFkNGI3NDcwMTAwMTU4YjJhYmQiLCJpYXQiOjE3MzgwNzE5MTksImV4cCI6MTczOTI4MTUxOX0.AN_MS8rLwZlPFMsvU_j6nZSMWj80EiwBU6Q5HHL7fLY"`;
let myApiUrl = "https://striveschool-api.herokuapp.com/api/deezer/";

let idArtist = 0;
let artistCreated = 0;
const numArtists = 22;
const artists = [];
const daily = document.getElementById("daily");
const dailyLenght = 6;
const genre = document.getElementById("genre");
const randomLenght = dailyLenght + 8;
const betterArtist = document.getElementById("betterartist");
const betterArtistLenght = randomLenght + 6;
const recommendedSongs = [];
const numSongs = 6;
let songsCreated = 0;
const divRecoSongs = document.getElementById("recommendedsongs");

// Codice per gestione spinner
const isLoading = function (loadingState) {
  const spinner = document.querySelector(".spinner-border");
  if (loadingState) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

if (sessionStorage.getItem("artists")) {
  artists.push(JSON.parse(sessionStorage.getItem("artists")));
  isLoading(false);
  createDaily(artists[0]);
} else {
  fetchArtists(numArtists, myApiUrl, API_KEY);
}

// Faccio la fetch degli artisti (nel caso in cui la prima volta non sia stata fatta)
async function fetchArtists(numArtists, apiUrl, apiKey) {
  const idArr = [];
  const artists = [];
  let artistCreated = 0;

  const fetchSingleArtist = async () => {
    const idArtist = Math.round(Math.random() * 100);

    if (idArr.includes(idArtist)) {
      idArtist += 50;
    }

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
  isLoading(false);
  sessionStorage.setItem("artists", JSON.stringify(artists));
  return createDaily(artists);
}

function createDaily(artists) {
  console.log(artists);
  let numArtist = 0;
  for (let i = 0; i < dailyLenght; i++) {
    numArtist = i + 1;

    const colArtist = document.createElement("div");
    colArtist.classList.add("coldaily", "item");

    const divArtist = document.createElement("div");
    divArtist.classList.add("d-flex", "align-items-center", "card", "w-100", "border-0");

    const dailyMix = document.createElement("div", "text-truncate");
    dailyMix.classList.add("d-flex", "justify-content-between", "w-100", "align-items-center", "dailyinfo");
    dailyMix.innerHTML = `<span class="fs-6 dailymix dailymix0${numArtist}">Daily Mix</span><span class="fs-3 dailymix dx dailymix0${numArtist}">0${numArtist}</span>`;

    const imgArtist = document.createElement("img");
    imgArtist.src = artists[i].picture_medium;
    imgArtist.classList.add("imgdaily", "rounded");

    const titleArtist = document.createElement("p");
    titleArtist.classList.add("mb-0", "ps-2", "fs-7", "text-secondary", "mt-3", "space-normal");
    titleArtist.innerText = `${artists[i].name}, ${artists[i + 7].name}, ${artists[i + 8].name}`;

    const dailyIcon = document.createElement("span");
    dailyIcon.classList.add("dailyicon", `dailyicon0${numArtist}`);
    dailyIcon.innerHTML = `<i class="bi bi-spotify fs-6"></i>`;

    const playBtn = document.createElement("button");
    playBtn.classList.add("player-btn", "play-pause-daily", "me-2");
    playBtn.type = "button";
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="svgplayer" viewBox="0 0 16 16">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
      </svg>`;

    dailyMix.appendChild(playBtn);
    divArtist.appendChild(dailyMix);
    divArtist.appendChild(dailyIcon);
    divArtist.appendChild(imgArtist);
    divArtist.appendChild(titleArtist);
    colArtist.appendChild(divArtist);

    daily.appendChild(colArtist);

    colArtist.style.cursor = "pointer";

    colArtist.addEventListener("mouseover", () => {
      playBtn.classList.add("show");
    });

    colArtist.addEventListener("mouseout", () => {
      playBtn.classList.remove("show");
    });

    colArtist.addEventListener("click", () => {
      window.location.href = `artist.html?id=${artists[i].id}`;
    });
  }
  const h2 = document.getElementById("foryou");
  h2.classList.add("mt-5", "mb-0", "fs-4");
  h2.innerText = "Creato per te";
  return createRandom(artists);
}

function createRandom(artists) {
  for (let i = dailyLenght; i < randomLenght; i++) {
    const divGenre = document.createElement("div");
    divGenre.classList.add("d-flex", "align-items-center", "divgenre");

    const imgGenre = document.createElement("img");
    imgGenre.src = artists[i].picture_small;
    imgGenre.classList.add("imggenre");

    const titleGenre = document.createElement("p");
    titleGenre.classList.add("mb-0", "ps-2", "fs-7", "text-secondary", "w-100", "space-normal");
    titleGenre.innerText = artists[i].name;

    const playBtn = document.createElement("button");
    playBtn.classList.add("player-btn", "play-pause-green", "me-2");
    playBtn.type = "button";
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="svgplayer" viewBox="0 0 16 16">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
      </svg>`;

    divGenre.appendChild(imgGenre);
    divGenre.appendChild(titleGenre);
    divGenre.appendChild(playBtn);
    genre.appendChild(divGenre);

    divGenre.style.cursor = "pointer";

    divGenre.addEventListener("mouseover", () => {
      playBtn.classList.add("show");
    });

    divGenre.addEventListener("mouseout", () => {
      playBtn.classList.remove("show");
    });

    divGenre.addEventListener("click", () => {
      window.location.href = `artist.html?id=${artists[i].id}`;
    });
  }
  return createBetter(artists);
}

function createBetter(artists) {
  for (let i = randomLenght; i < betterArtistLenght; i++) {
    const colArtist = document.createElement("div");
    colArtist.classList.add("coldaily");

    const divArtist = document.createElement("div");
    divArtist.classList.add("d-flex", "align-items-center", "card", "w-100", "border-0", "card-better");

    const imgArtist = document.createElement("img");
    imgArtist.src = artists[i].picture_medium;
    imgArtist.classList.add("imgdaily", "rounded");

    const titleArtist = document.createElement("p");
    titleArtist.classList.add("mb-0", "ps-2", "fs-7", "text-secondary", "mt-3", "space-normal");
    titleArtist.innerText = `${artists[i].name}`;

    const playBtn = document.createElement("button");
    playBtn.classList.add("player-btn", "play-pause-card", "me-2");
    playBtn.type = "button";
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="svgplayer" viewBox="0 0 16 16">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
      </svg>`;

    divArtist.appendChild(playBtn);
    divArtist.appendChild(imgArtist);
    divArtist.appendChild(titleArtist);
    colArtist.appendChild(divArtist);

    betterArtist.appendChild(colArtist);

    colArtist.style.cursor = "pointer";

    colArtist.addEventListener("mouseover", () => {
      playBtn.classList.add("show");
    });

    colArtist.addEventListener("mouseout", () => {
      playBtn.classList.remove("show");
    });

    colArtist.addEventListener("click", () => {
      window.location.href = `artist.html?id=${artists[i].id}`;
    });
  }
  const h2 = document.getElementById("better");
  h2.classList.add("mt-5", "mb-0", "fs-4");
  h2.innerText = "Il meglio degli artisti";

  if (sessionStorage.getItem("recommended")) {
    recommendedSongs.push(JSON.parse(sessionStorage.getItem("recommended")));
    isLoading(false);
    createRecommended(recommendedSongs[0]);
  } else {
    return fetchRecommended(artists, myApiUrl, API_KEY, 0);
  }
}

async function fetchRecommended(artists, apiUrl, apiKey, idSongs) {
  const idArtist = Math.round(Math.random() * 100);
  const url = `${apiUrl}artist/${idArtist}/top?limit=1`;
  const options = {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Errore per l'artista ${idArtist}: ${response.statusText}`);
    }
    const singleSong = await response.json();
    if (singleSong.total !== 0) {
      recommendedSongs.push(singleSong.data);
      songsCreated++;
    }
    idSongs++;
  } catch (err) {
    console.error(`Errore durante il fetch della canzone per l'artista ${idArtist}: ${err.message}`);
  }

  if (songsCreated !== numSongs) {
    fetchRecommended(artists, apiUrl, apiKey, idSongs);
  } else {
    sessionStorage.setItem("recommended", JSON.stringify(recommendedSongs));
    return createRecommended(recommendedSongs);
  }
}

function createRecommended(recommendedSongs) {
  console.log(recommendedSongs);
  for (let i = 0; i < recommendedSongs.length; i++) {
    const colArtist = document.createElement("div");
    colArtist.classList.add("coldaily");

    const divArtist = document.createElement("div");
    divArtist.classList.add("d-flex", "align-items-center", "card", "w-100", "border-0", "card-better");

    const imgArtist = document.createElement("img");
    imgArtist.src = recommendedSongs[i][0].album.cover_medium;
    imgArtist.classList.add("imgdaily", "rounded");

    const titleArtist = document.createElement("p");
    titleArtist.classList.add(
      "mb-0",
      "ps-2",
      "fs-7",
      "text-secondary",
      "mt-3",
      "d-flex",
      "flex-column",
      "w-100",
      "space-normal"
    );
    titleArtist.innerHTML = `${recommendedSongs[i][0].title}<span class="text-light">${recommendedSongs[i][0].artist.name}</span>`;

    const playBtn = document.createElement("button");
    playBtn.classList.add("player-btn", "play-pause-card", "me-2");
    playBtn.type = "button";
    playBtn.innerHTML = `<svg data-encore-id="icon" role="img" aria-hidden="true" class="svgplayer" viewBox="0 0 16 16">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
      </svg>`;

    divArtist.appendChild(playBtn);
    divArtist.appendChild(imgArtist);
    divArtist.appendChild(titleArtist);
    colArtist.appendChild(divArtist);

    divRecoSongs.classList.remove("d-none");
    divRecoSongs.classList.add("d-flex");
    divRecoSongs.appendChild(colArtist);

    colArtist.style.cursor = "pointer";

    colArtist.addEventListener("mouseover", () => {
      playBtn.classList.add("show");
    });

    colArtist.addEventListener("mouseout", () => {
      playBtn.classList.remove("show");
    });

    colArtist.addEventListener("click", () => {
      window.location.href = `artist.html?id=${recommendedSongs[i][0].artist.id}`;
    });
  }
  const h2 = document.getElementById("recommended");
  h2.classList.remove("d-none");
  h2.classList.add("mt-5", "mb-0", "fs-4", "d-block");
  h2.innerText = "Consigliata per oggi";
  //return fetchRecommended(artists, myApiUrl, API_KEY, 0);
}

// codice per la gestione del carosello

$(".carousel").slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});

const closePanel = document.getElementById("closePanel");
const rightBar = document.getElementById("rightsidebar");
const contentMusic = document.getElementById("contentmusic");

closePanel.addEventListener("click", () => {
  rightBar.classList.add("d-none");
  contentMusic.classList.add("grow1");
});

const friendstasks = document.querySelector("#friendstasks");
friendstasks.addEventListener("click", () => {
  rightBar.classList.remove("d-none");
  contentMusic.classList.remove("grow1");
});

const library = document.querySelector("#yourlibrary");
const leftBar = document.querySelector("#leftsidebar");
const spanlibrary = document.querySelector("#yourlibrary + span");
const plus = document.querySelector("#plus");
const arrow = document.querySelector("#arrow");

library.addEventListener("click", () => {
  if (leftBar.classList.contains("col-1")) {
    leftBar.classList.add("col-3");
    contentMusic.classList.remove("grow1");
    leftBar.classList.remove("col-1");
    spanlibrary.classList.remove("d-none");
    library.parentElement.classList.remove("flex-column", "align-items-center");
    plus.classList.add("mx-5");
    plus.classList.remove("mt-2");
    arrow.classList.remove("d-none");
  } else {
    leftBar.classList.remove("col-3");
    leftBar.classList.add("col-1");
    contentMusic.classList.add("grow1");
    spanlibrary.classList.add("d-none");
    library.parentElement.classList.add("flex-column", "align-items-center");
    plus.classList.remove("mx-5");
    plus.classList.add("mt-2");
    arrow.classList.add("d-none");
  }
});
