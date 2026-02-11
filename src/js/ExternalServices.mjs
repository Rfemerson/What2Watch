const baseURL = "https://api.themoviedb.org/3/";
const apiKey = "f380fd14e34f84fa8a6aaba4d2a0fef9"; 

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  async getData(category = "movie/popular") {
    const response = await fetch(`${baseURL}${category}?api_key=${apiKey}&language=en-US`);
    const data = await convertToJson(response);
    return data.results; 
  }

  async findMovieById(id) {
    const response = await fetch(`${baseURL}movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos`);
    return await convertToJson(response);
  }

  async searchMovies(query) {
    const response = await fetch(
      `${baseURL}search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
    );
    const data = await convertToJson(response);
    return data.results;
  }
}

export const services = new ExternalServices();