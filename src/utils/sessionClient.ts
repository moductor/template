import Cookies from "js-cookie";
import { getDataFromTokenStr } from "./generateToken";

export function deleteSessionToken() {
  Cookies.remove("JWT");
}

export function getSessionToken() {
  return Cookies.get("JWT");
}

export function getCurrentUserData() {
  return getDataFromTokenStr(getSessionToken());
}

export function isLoggedIn() {
  return !!getCurrentUserData();
}
