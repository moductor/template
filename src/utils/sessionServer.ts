import { cookies, headers } from "next/headers";
import { getDataFromTokenStr } from "./generateToken";

export function getCurrentUserFromAuthHeader() {
  const val = headers().get("Authorization");
  if (!val) return;
  if (!val.startsWith("Bearer ")) return;
  const token = val.replace("Bearer ", "").trim();
  return getDataFromTokenStr(token);
}

export function getCurrentUserFromAuthCookie() {
  const cookie = cookies().get("JWT");
  if (!cookie) return;
  const token = cookie.value;
  return getDataFromTokenStr(token);
}

export function getCurrentUserData() {
  return getCurrentUserFromAuthHeader() || getCurrentUserFromAuthCookie();
}

export function isLoggedIn() {
  return !!getCurrentUserData();
}
