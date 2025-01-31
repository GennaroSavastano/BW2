const closePanel = document.getElementById("closePanel");
const rightBar = document.getElementById("rightsidebar");
const contentMusic = document.getElementById("contentmusic");

closePanel.addEventListener("click", () => {
  console.log("Ciao");
  rightBar.classList.add("d-none");
  if (window.location.href.match("album.html" || "artist.html") != null) {
    const discografy = document.querySelectorAll(".discografy");
    discografy.forEach((ele) => ele.classList.remove("d-none", "col-lg-3"));
    discografy.forEach((ele) => ele.classList.add("col-lg-2"));
  }
});

const friendstasks = document.querySelector("#friendstasks");
friendstasks.addEventListener("click", (e) => {
  e.preventDefault();
  rightBar.classList.remove("d-none");
  if (window.location.href.match("album.html" || "artist.html") != null) {
    const discografy = document.querySelectorAll(".discografy");
    discografy.forEach((ele) => ele.classList.add("d-none", "col-lg-3"));
    discografy.forEach((ele) => ele.classList.remove("col-lg-2"));

    for (let i = 0; i < 4; i++) {
      discografy[i].classList.remove("d-none");
    }
  }
});

const library = document.querySelector("#yourlibrary");
const leftBar = document.querySelector("#leftsidebar");
const spanlibrary = document.querySelector("#yourlibrary + span");
const plus = document.querySelector("#plus");
const arrow = document.querySelector("#arrow");
const makeplaylist = document.querySelector("#makeplaylist");
const podcast = document.querySelector("#podcast");

library.addEventListener("click", () => {
  if (leftBar.classList.contains("minleftbar")) {
    leftBar.classList.add("col-3");
    leftBar.classList.remove("minleftbar");
    spanlibrary.classList.remove("d-none");
    library.parentElement.parentElement.classList.remove("flex-column", "align-items-center");
    plus.classList.add("mx-5");
    plus.classList.remove("mt-2");
    arrow.classList.remove("d-none");
    makeplaylist.classList.remove("d-none");
    podcast.classList.remove("d-none");
  } else {
    leftBar.classList.remove("col-3");
    leftBar.classList.add("minleftbar");
    spanlibrary.classList.add("d-none");
    library.parentElement.parentElement.classList.add("flex-column", "align-items-center");
    plus.classList.remove("mx-5");
    plus.classList.add("mt-2");
    arrow.classList.add("d-none");
    makeplaylist.classList.add("d-none");
    podcast.classList.add("d-none");
  }
});

arrow.addEventListener("click", () => {
  if (leftBar.classList.contains("col-3")) {
    leftBar.classList.remove("col-3");
    leftBar.classList.add("col-6");
    rightBar.classList.add("d-none");
    arrow.innerHTML = `<i class="bi bi-arrow-left fs-5"></i>`;
  } else {
    leftBar.classList.add("col-3");
    leftBar.classList.remove("col-6");
    rightBar.classList.remove("d-none");
    arrow.innerHTML = `<i class="bi bi-arrow-right fs-5"></i>`;
  }
});
