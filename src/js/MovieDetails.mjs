import { renderListWithTemplate, getLocalStorage, setLocalStorage, alertMessage} from "./utils.mjs";

export default class MovieDetails {
  constructor(movieId, dataSource) {
    this.movieId = movieId;
    this.dataSource = dataSource;
    this.movie = {};
  }

  async init() {
    this.movie = await this.dataSource.findMovieById(this.movieId);
    this.renderMovieDetails();

    document.querySelector("#addToWatchlist").addEventListener("click", this.addToWatchlist.bind(this));
  }

  renderMovieDetails() {
    const mainElement = document.querySelector(".movie-detail-container");
    
    const trailer = this.movie.videos.results.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
    );

    const trailerHTML = trailer
      ? `<div class="video-container">
           <iframe src="https://www.youtube.com/embed/${trailer.key}" 
           title="YouTube video player" frameborder="0" allowfullscreen></iframe>
         </div>`
      : `<p>No trailer available for this movie.</p>`;

    const template = `
      <div class="movie-header">
        <img src="https://image.tmdb.org/t/p/w500${this.movie.poster_path}" alt="${this.movie.title}">
        <div class="movie-info">
          <h1>${this.movie.title} <span class="year">(${this.movie.release_date.split("-")[0]})</span></h1>
          <p class="genres">${this.movie.genres.map(g => g.name).join(", ")}</p>
          <p class="rating">⭐ ${this.movie.vote_average.toFixed(1)}</p>
          <h3>Overview</h3>
          <p class="overview">${this.movie.overview}</p>
          
          <button id="addToWatchlist" data-id="${this.movie.id}">+ Add to Watchlist</button>
        </div>
      </div>
      
      <div class="trailer-section">
        <h2>Official Trailer</h2>
        ${trailerHTML}
      </div>
    `;

    mainElement.innerHTML = template;
  }

  addToWatchlist() {
    let favorites = getLocalStorage("w2w-watchlist") || [];

    const found = favorites.find((item) => item.id == this.movie.id);

    if (!found) {
      favorites.push(this.movie);
      
      setLocalStorage("w2w-watchlist", favorites);
      
      alertMessage(`"${this.movie.title}" added to your watchlist.`)
      document.querySelector("#addToWatchlist").innerText = "✔ Added";
      document.querySelector("#addToWatchlist").disabled = true;
    } else {
      alertMessage("This movie is already in your watchlist.");
    }
  }
}