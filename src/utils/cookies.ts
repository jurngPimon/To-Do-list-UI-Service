import {
  setCookie as set,
  getCookie as get,
  deleteCookie as del,
  CookieValueTypes,
} from "cookies-next";

export const setCookie = (
  name: string,
  value: string,
  options?: any
): void | Promise<void> => {
  console.log("setCookie", name, value, options);
  return set(name, value, options);
};

export const getCookie = (
  name: string
): CookieValueTypes | Promise<CookieValueTypes> => {
  return get(name);
};

export const deleteCookie = (name: string): void | Promise<void> => {
  return del(name);
};
