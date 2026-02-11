export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
};

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template
};

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  const html = list.map((item) => templateFn(item)).join("");
  parentElement.insertAdjacentHTML(position, html);
}

export function initSearch(dataSource, movieList, searchBtnSelector = "#searchButton", searchInputSelector = "#searchInput") {
  const searchBtn = document.querySelector(searchBtnSelector);
  
  if (searchBtn) {
    searchBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const searchInput = document.querySelector(searchInputSelector);
      const query = searchInput.value.trim();

      if (query) {
        try {
          const results = await dataSource.searchMovies(query);
          
          const title = document.querySelector("h2");
          if(title) title.innerText = `Results for: "${query}"`;

          movieList.renderList(results);
          
        } catch (err) {
          console.error("Search error:", err);
        }
      }
    });
  }
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}