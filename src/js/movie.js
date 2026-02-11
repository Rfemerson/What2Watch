import ExternalServices from "./ExternalServices.mjs";
import MovieDetails from "./MovieDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const params = new URLSearchParams(window.location.search);
const movieId = params.get("movie");

const dataSource = new ExternalServices();
const movie = new MovieDetails(movieId, dataSource);

movie.init();