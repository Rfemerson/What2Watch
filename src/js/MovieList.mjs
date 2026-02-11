import { renderListWithTemplate } from "./utils.mjs";

function movieCardTemplate(movie) {
  return `<li class="movie-card">
    <a href="/movie-details/index.html?movie=${movie.id}">
        <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="Poster de ${movie.title}"
        />
        <h3 class="card__brand">${movie.title}</h3>
        <p class="movie-card__rating">⭐ ${movie.vote_average.toFixed(1)}</p>
    </a>
  </li>`;
}

export default class MovieList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(movieCardTemplate, this.listElement, list, "afterbegin", true);
  }
}