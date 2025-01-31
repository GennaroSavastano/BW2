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
    // console.log(artista);
    imgs(artista);
  });

function imgs(artista) {
  const imgArt = document.getElementById("artista");
  const imgSelezione = document.getElementById("imgSelezione")
  // console.log(artista[0].picture);
  imgArt.style.backgroundImage = "url(" + artista[0].picture_xl + ")";
  imgArt.style.backgroundRepeat = "no-repeat";
  imgArt.style.backgroundSize = "cover";
  imgArt.style.backgroundPosition = "center";

  imgSelezione.src = artista[0].picture_xl;
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
                                    <div class="col-4 d-flex align-items-center">
                                      <span class="align-self-center pe-1">${i + 1}</span>
                                      <img src="${popular[i].album.cover}" width="45px" height="45" class="mb-2 mx-2 rounded" />
                                      <span class="fs-6">${popular[i].title}</span>
                                    </div>
                                    <div class="col-4 text-end">${parseInt(popular[i].rank).toLocaleString("it-IT")}</div>
                                    <div class="col-4 text-end"><span>${formatTime(popular[i].duration)}</span></div>
                                  </div>`;
  }

  document.querySelectorAll("#containerPopular .row").forEach((row) => {
    row.addEventListener("mouseover", () => (row.style.backgroundColor = "#2f3235"));
    row.addEventListener("mouseout", () => (row.style.backgroundColor = "transparent"));
  });
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

folder = `artist/${id}/top?limit=50`;
const albums = [];
fetch(URL + folder)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error("Ci dispiace non siamo riusciti a recuperare l'artista");
    }
  })
  .then((albumList) => {
    const listAlbum = [...albumList.data];
    console.log(listAlbum[0].album.id);
    listAlbum.forEach((ele) => {
      // console.log(ele.album.id);
      if (!albums.includes(ele.album.id)) {
        albums.push(ele.album.id);
      }
    });
    console.log(albums);

    createCard(albums);
  });

const cardAlbums = [];

function createCard(albums) {
  const cardDiscografia = document.getElementById("discografia");
  for (let i = 0; i < 6; i++) {
    let idAlbum = albums[i];
    let folderAlbum = `album/${idAlbum}`;
    fetch(URL + folderAlbum)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Ci dispiace non siamo riusciti a recuperare l'album");
        }
      })
      .then((albumCardList) => {
        // const listCardAlbum = [...albumCardList.data];
        console.log(albumCardList);

        const col = document.createElement("div");
        col.classList.add("col-2");

        const card = document.createElement("div");
        card.classList.add("card", "cardAlbum");
        card.addEventListener("mouseover", () => {
          card.style.backgroundColor = "#2f3235";
        });
        card.addEventListener("mouseout", () => {
          card.style.backgroundColor = "transparent";
        });

        const imgCard = document.createElement("img");
        imgCard.src = albumCardList.cover_medium;
        imgCard.alt = "cover album";
        imgCard.classList.add("card-img-top");

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const cardH5 = document.createElement("h5");
        cardH5.classList.add("card-title", "fs-7");
        cardH5.innerText = albumCardList.title;

        const cardP = document.createElement("p");
        cardP.classList.add("card-text", "cardP", "fs-7");
        cardP.innerText = albumCardList.release_date;

        const cardLink = document.createElement("a");
        cardLink.classList.add("btn", "bg-secondary", "d-none", "stretched-link");
        cardLink.href = "album.html?albumId=" + albumCardList.id;
        cardLink.innerText = "camillo";

        card.appendChild(imgCard);
        card.appendChild(divBody);

        divBody.appendChild(cardH5);
        divBody.appendChild(cardP);
        divBody.appendChild(cardLink);

        col.appendChild(card);

        cardDiscografia.appendChild(col);
        footer();
      });
  }
}

function footer() {
  const linkFooter = document.getElementsByClassName("footerLink");
  for (let link of linkFooter) {
    link.addEventListener("mouseover", () => {
      link.style.textDecoration = "underline";
      link.style.color = "white";
    });

    link.addEventListener("mouseout", () => {
      link.style.textDecoration = "none";
      link.style.color = "gray";
    });
  }
  const footerBtn = document.getElementsByClassName("btnFooter");
  for (let btn of footerBtn) {
    btn.addEventListener("mouseover", () => {
      btn.style.backgroundColor = "#484e54";
    });

    btn.addEventListener("mouseout", () => {
      btn.style.backgroundColor = "#2f3235";
    });
  }
}
