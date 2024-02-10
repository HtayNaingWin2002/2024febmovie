import { voteChange } from "./fixnumber.js";
const menuBar = document.querySelector("#menu-bar");
const headerNav = document.querySelector(".nav-menu-container");
const darkLight = document.querySelector("#light-dark");
const movieCollection = document.querySelector(".movie-collection");
menuBar.addEventListener("click", () => {
  headerNav.classList.toggle("menu-toggle-show");
});
const settingIcon = document.querySelector("#setting-icon");
const imageBox = document.querySelector(".image-box");
settingIcon.addEventListener("click", () => {
  imageBox.classList.toggle("image-box-active");
});
const images = document.querySelectorAll(".image-box > img");
const mainImage = document.querySelector(".main-image");
images.forEach((image) => {
  image.addEventListener("click", () => {
    images.forEach((image) => {
      image.style.opacity = "1";
    });
    mainImage.src = image.src;
    image.style.opacity = "0.8";
  });
});
//Dark Mode Toggle star
darkLight.addEventListener("click", () => {
  if (document.querySelector("body").classList.contains("dark-mode-on")) {
    localStorage.setItem("dark", "on");
  } else {
    localStorage.setItem("dark", "off");
  }
  document.querySelector("body").classList.toggle("dark-mode-on");
});
window.addEventListener("load", () => {
  if (localStorage.getItem("dark") === "off") {
    document.querySelector("body").classList.add("dark-mode-on");
  } else {
    document.querySelector("body").classList.remove("dark-mode-on");
  }
});
//dark mode toggle end
// Movie fetch
const movieDbData = {
  api_key: "1839a48124076ded1c557de77aed4bfb",
  baseUrl: "https://api.themoviedb.org/3/discover/movie?",
};
let imageUrl = "https://image.tmdb.org/t/p/w500"; // Adjust the image size as needed

async function fetchMovie() {
  const fetchUrl =
    movieDbData.baseUrl +
    "api_key=" +
    movieDbData.api_key +
    "&sort_by=popularity.desc";
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error("Network try again");
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching ", error);
  }
}
function showMovie(data) {
  let movieResult = data.results;
  movieResult.forEach((movie) => {
    movieCollection.innerHTML += `
  <div class="movie-card">
  <img src="${imageUrl + movie.poster_path}" alt="" />
  <h4 class="movie-title">${movie.original_title}</h4>
  <h5 class="movie-star">${voteChange(movie.vote_average)}</h5>
</div>`;
  });
}
fetchMovie().then((data) => {
  showMovie(data);
});

document.querySelector("#search-movie-input").addEventListener("keyup", (e) => {
  const searchValue = e.target.value.trim().toUpperCase();
  const movieCard = document.querySelectorAll(".movie-card");
  if (searchValue === "") {
    movieCard.forEach((card) => {
      card.style.display = "block";
      return;
    });
  }
  if (e.keyCode === 13) {
    // Check if Enter key is pressed
    movieCard.forEach((card) => {
      const movieTitle = card
        .querySelector(".movie-title")
        .innerText.toUpperCase();
      if (movieTitle.includes(searchValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
});
