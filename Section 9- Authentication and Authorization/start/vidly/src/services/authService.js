import http from "./httpService";
import { apiUrl } from "../config.json";

export function login(user) {
  const apiEndpoint = `${apiUrl}/auth`;
  const { username: email, password } = user;
  return http.post(apiEndpoint, {
    email,
    password
  });
}
