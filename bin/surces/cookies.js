const localStrogeMethodJS = `
export const setCookie = (value,key = "token") => {
    localStorage.setItem(key , value)
}


export const getCookie = (key = "token") => {
    return localStorage.getItem(key)
}


export const removeCookie = (key = "token") => {
    localStorage.removeItem(key)
}

export const clearCookie = () => {
    localStorage.clear()
}
`

const localStrogeMethodTS = `
export const setCookie = (value : string,key : string = "token") : void => {
    localStorage.setItem(key , value)
}


export const getCookie = (key : string = "token") => {
    return localStorage.getItem(key)
}


export const removeCookie = (key : string = "token") : void => {
    localStorage.removeItem(key)
}

export const clearCookie = () : void => {
    localStorage.clear()
}
`

const sessionStorgeMethodJS = `
export const setCookie = (value,key = "token") => {
    sessionStorge.setItem(key , value)
}


export const getCookie = (key = "token") => {
    return sessionStorge.getItem(key)
}


export const removeCookie = (key = "token") => {
    sessionStorge.removeItem(key)
}

export const clearCookie = () => {
    sessionStorge.clear()
}
`

const sessionStorgeMethodTS = `
export const setCookie = (value : string,key : string = "token") : void => {
    sessionStroge.setItem(key , value)
}


export const getCookie = (key : string = "token") => {
    return sessionStroge.getItem(key)
}


export const removeCookie = (key : string = "token") : void => {
    sessionStroge.removeItem(key)
}

export const clearCookie = () : void => {
    sessionStroge.clear()
}
`

const nookieMethodJS = `
import { parseCookies, setCookie, destroyCookie } from "nookies"

export const getCookie = (name) => {
  const cookies = parseCookies()
  return cookies[name] ?? null
}

export const setAuthCookie = (value) => {
  if (!value) return

  setCookie(null, "token", value, {
    maxAge: 60 * 60 * 24 * 30, 
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export const deleteCookie = (name = "token") => {
  destroyCookie(null, name, { path: "/" })
}
`

const nookieMethodTS = `
import { parseCookies, setCookie, destroyCookie } from "nookies"


export const getCookie = (name: string): string | null => {
  const cookies = parseCookies()
  return cookies[name] ?? null
}

export const setAuthCookie = (value: string): void => {
  if (!value) return

  setCookie(null, "token", value, {
    maxAge: 60 * 60 * 24 * 30, 
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export const deleteCookie = (name: string = "token"): void => {
  destroyCookie(null, name, { path: "/" })
}
`

const expoSecureStoreMethodTS = `
import * as SecureStore from 'expo-secure-store';

export async function saveCookie(cookie: string) {
  await SecureStore.setItemAsync("user_cookie", cookie);
}


export async function getCookie() {
  return await SecureStore.getItemAsync("user_cookie");
}

export async function removeCookie() {
    return await SecureStore.deleteItemAsync("user_cookie")
}
`


const customMethod = `
export const getCookie = () => {

}

export const setCookie = () => {
    
}

export const removeCookie = () => {

}

export const clearCookie = () => {

}
`


module.exports = {
    localStrogeMethodJS , localStrogeMethodTS , sessionStorgeMethodJS , sessionStorgeMethodTS , nookieMethodJS , nookieMethodTS , expoSecureStoreMethodTS , customMethod
}