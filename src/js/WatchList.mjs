import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

function movieCardTemplate(movie) {
  return `<li class="movie-card">
    <button class="remove-btn" data-id="${movie.id}">&#10005;</button>
    
    <a href="/movie-details/index.html?movie=${movie.id}">
        <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="${movie.title}"
        />
        <h3 class="card__brand">${movie.title}</h3>
        <p class="movie-card__rating">⭐ ${movie.vote_average.toFixed(1)}</p>
    </a>
  </li>`;
}
export default class WatchList {
  constructor(listElement) {
    this.listElement = listElement;
  }

  init() {
    const list = getLocalStorage("w2w-watchlist") || [];
    
    this.renderList(list);
  }

  renderList(list) {
    this.listElement.innerHTML = "";

    if (list.length > 0) {
      renderListWithTemplate(movieCardTemplate, this.listElement, list, "afterbegin", true);
      
      this.addEventListeners();
    } else {
      this.listElement.innerHTML = "<p class='empty-msg'>Your list is empty. Go find some movies!</p>";
    }
  }
  addEventListeners() {
    const buttons = this.listElement.querySelectorAll(".remove-btn");
    
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idToRemove = e.target.dataset.id;
        this.removeFromList(idToRemove);
      });
    });
  }

  removeFromList(id) {
    let list = getLocalStorage("w2w-watchlist");
    
    list = list.filter((item) => item.id != id);
    
    setLocalStorage("w2w-watchlist", list);
    
    this.refreshList();
  }
}