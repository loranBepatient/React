import httpService from "../services/httpService";
import config from "../config.json";

const apiEndpoint = `${config.apiEndpoint}/movies`;

const movieUrl = id => {
  if (id) return `${apiEndpoint}/${id}`;
  return `${apiEndpoint}`;
};
export function getMovies() {
  return httpService.get(movieUrl());
}

export function deleteMovie(id) {
  return httpService.delete(movieUrl(id));
}

export function getMovie(id) {
  return httpService.get(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    httpService.put(movieUrl(movie._id), body);
  } else {
    httpService.post(movieUrl(), movie);
  }
}
