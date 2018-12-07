import http from "./httpService";
import { apiUrl } from "../config.json";

async function register(user) {
  const apiEndpoint = `${apiUrl}/users`;
  const { username: email, password, name } = user;
  const { headers } = await http.post(apiEndpoint, {
    email,
    password,
    name
  });
  localStorage.setItem("token", headers["x-auth-token"]);
}

export default {
  register
};
