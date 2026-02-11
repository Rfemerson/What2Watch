import { loadHeaderFooter } from "./utils.mjs";
import WatchList from "./WatchList.mjs";

loadHeaderFooter();

const listElement = document.querySelector("#saved-movies");
const myWatchList = new WatchList(listElement);

myWatchList.init();