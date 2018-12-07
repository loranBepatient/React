import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const tokenKey = "token";

http.setJwt(_getToken());

async function login(user) {
  const apiEndpoint = `${apiUrl}/auth`;
  const { username: email, password } = user;
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password
  });

  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  const token = localStorage.getItem(tokenKey);
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

function _getToken() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser
};
