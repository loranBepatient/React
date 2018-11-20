import httpService from "../services/httpService";

export function getMovies(apiEndpoint) {
  return httpService.get(apiEndpoint);
}

export function deleteMovie(id) {
  //   let movieInDb = movies.find(m => m._id === id);
  //   movies.splice(movies.indexOf(movieInDb), 1);
  //   return movieInDb;
}
