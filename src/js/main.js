import ExternalServices from "./ExternalServices.mjs";
import MovieList from "./MovieList.mjs";
import { loadHeaderFooter, initSearch } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const listElement = document.querySelector("#movie-list");
const myList = new MovieList("movie/popular", dataSource, listElement);

myList.init();

initSearch(dataSource, myList);