import httpService from "../services/httpService";
import config from "../config.json";

const endPoint = `${config["apiEndpoint"]}/genres`;

export function getGenres() {
  return httpService.get(endPoint);
}
