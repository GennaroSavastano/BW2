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
      console.log(result.title);

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
  imgGenre.src = result.picture;
  imgGenre.classList.add("imggenre");

  const titleGenre = document.createElement("p");
  titleGenre.classList.add("mb-0", "ps-2", "fs-7", "text-light");
  titleGenre.innerText = result.title;

  divGenre.appendChild(imgGenre);
  divGenre.appendChild(titleGenre);
  genre.appendChild(divGenre);
}
