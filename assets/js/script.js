const genre = document.getElementById("genre");
let idGenreRandom = 0;

function randomId() {
  return (idGenreRandom = Math.round(Math.random() * 24) + 1);
}

function fetchGenre(idGenreRandom) {
  console.log(idGenreRandom);
  const url = "https://deezerdevs-deezer.p.rapidapi.com/genre/" + idGenreRandom;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  const myGenre = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);

      createGenre(result);
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };
  myGenre();
}

for (let i = 0; i < 8; i++) {
  fetchGenre(randomId());
}

function createGenre(result) {
  const divGenre = document.createElement("div");
  divGenre.classList.add("d-flex", "align-items-center", "divgenre");

  const imgGenre = document.createElement("img");
  imgGenre.src = result.picture;
  imgGenre.classList.add("imggenre");

  const titleGenre = document.createElement("p");
  titleGenre.classList.add("mb-0", "ps-2");
  titleGenre.innerText = result.name;

  divGenre.appendChild(imgGenre);
  divGenre.appendChild(titleGenre);
  genre.appendChild(divGenre);
}
