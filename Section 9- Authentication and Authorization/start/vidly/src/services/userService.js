import http from "./httpService";
import { apiUrl } from "../config.json";

export function register(user) {
  const apiEndpoint = `${apiUrl}/users`;
  const { username: email, password, name } = user;
  return http.post(apiEndpoint, {
    email,
    password,
    name
  });
}
