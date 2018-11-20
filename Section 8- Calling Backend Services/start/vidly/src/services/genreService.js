import httpService from "../services/httpService";

export function getGenres(apiEndpoint) {
  return httpService.get(apiEndpoint);
}
