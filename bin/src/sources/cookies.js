"use strict";

/**
 * Plain template strings written into `services/cookie.{js,ts}` based on
 * `--cookie-method`. Same rebuild note as sources/network.js: the original
 * `surces/cookies.js` couldn't be read, so these are fresh implementations
 * matching the methods already documented in the CLI's --help text.
 */

const customJs = `/*
  Custom cookie method — implement your own get/set/remove logic here.
*/
export const getCookie = (name) => {
  // TODO: implement
};

export const setCookie = (name, value, options) => {
  // TODO: implement
};

export const removeCookie = (name) => {
  // TODO: implement
};
`;

const customTs = `/*
  Custom cookie method — implement your own get/set/remove logic here.
*/
export const getCookie = (name : string) => {
  // TODO: implement
};

export const setCookie = (name: string, value : string, options : any) => {
  // TODO: implement
};

export const removeCookie = (name : string) => {
  // TODO: implement
};
`;

const localStorgeJs = `export const getCookie = (name) => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(name);
};

export const setCookie = (name, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(name, value);
};

export const removeCookie = (name) => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(name);
};
`;

const localStorgeTs = `export const getCookie = (name : string) => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(name);
};

export const setCookie = (name : string, value : string) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(name, value);
};

export const removeCookie = (name : string) => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(name);
};
`;

const sessionStorgeJs = `export const getCookie = (name) => {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(name);
};

export const setCookie = (name, value) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(name, value);
};

export const removeCookie = (name) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(name);
};
`;


const sessionStorgeTs = `export const getCookie = (name : string) => {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(name);
};

export const setCookie = (name : string, value : string) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(name, value);
};

export const removeCookie = (name : string) => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(name);
};
`;

const nookieTs = `import { parseCookies, setCookie as nookieSetCookie, destroyCookie } from "nookies";
import { GetServerSidePropsContext, NextPageContext } from "next";

type CookieContext = GetServerSidePropsContext | NextPageContext | null | undefined;

export const getCookie = (name: string, ctx: CookieContext = null): string | null => {
  const cookies = parseCookies(ctx);
  return cookies[name] ?? null;
};

export const setCookie = (
  name: string,
  value: string,
  ctx: CookieContext = null,
) => {
  nookieSetCookie(ctx, name, value);
};

export const removeCookie = (
  name: string, 
  ctx: CookieContext = null, 
) => {
  destroyCookie(ctx, name);
};
`;

const nookieJs = `
import { parseCookies, setCookie as nookieSetCookie, destroyCookie } from "nookies";
import { GetServerSidePropsContext, NextPageContext } from "next";


export const getCookie = (name, ctx = null) => {
  const cookies = parseCookies(ctx);
  return cookies[name] ?? null;
};

export const setCookie = (
  name,
  value,
  ctx,
) => {
  nookieSetCookie(ctx, name, value);
};

export const removeCookie = (
  name, 
  ctx, 
) => {
  destroyCookie(ctx, name);
};
`

// TypeScript + React Native only, per the CLI's --help text.
const expoGo = `import * as SecureStore from "expo-secure-store";

export const getCookie = async (name: string): Promise<string | null> => {
  return SecureStore.getItemAsync(name);
};

export const setCookie = async (name: string, value: string): Promise<void> => {
  await SecureStore.setItemAsync(name, value);
};

export const removeCookie = async (name: string): Promise<void> => {
  await SecureStore.deleteItemAsync(name);
};
`;

module.exports = {
  customJs,
  customTs ,
  localStorgeJs,
  localStorgeTs ,
  sessionStorgeJs,
  sessionStorgeTs ,
  nookieJs,
  nookieTs ,
  "expo-go": expoGo,
};
