"use strict";

/**
 * These are plain template strings — they get written verbatim into the
 * consumer's `services/network.{js,ts}` file. They are not executed here.
 *
 * NOTE: the original `surces/network.js` from this project could not be
 * read (the uploaded file was empty), so these templates were rebuilt from
 * scratch to match how `utils.js` was calling them (`network(url, method, data)`).
 * Swap the `BASE_URL` placeholder for your real API origin after generation.
 */

const JsNetworkFetch = `import {getCookie} from "./cookie"
const BASE_URL = ""; // TODO: set your API base URL
const token_name = "token_name" ; // TODO: set your token name (default : "token_name")

const buildQueryString = (params) => {
  if (!params) return "";
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    query.append(key, value);
  });
  const qs = query.toString();
  return qs ? \`?\${qs}\` : "";
};

export const buildFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const network = async (path, method = "GET", body, params) => {
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const url = \`\${BASE_URL}\${path}\${buildQueryString(params)}\`;

  const response = await fetch(url, {
    method,
    headers: isFormData ? { "Content-Type": "multipart/form-data" , "Authorization" : \`Bearer \${getCookie(token_name)}\` } : { "Content-Type": "application/json" , "Authorization" : \`Bearer \${getCookie(token_name)}\` },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status} \${response.statusText}\`);
  }

  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json") ? response.json() : response.text();
};
`;

const TsNetworkFetch = `import {getCookie} from "./cookie"
const BASE_URL = ""; // TODO: set your API base URL
const token_name = "token_name" ; // TODO: set your token name (default : "token_name")
type QueryValue = string | number | boolean | Array<string | number | boolean> | null | undefined;
type QueryParams = Record<string, QueryValue>;

const buildQueryString = (params?: QueryParams): string => {
  if (!params) return "";

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, String(item)));
    } else {
      query.append(key, String(value));
    }
  });

  const qs = query.toString();
  return qs ? \`?\${qs}\` : "";
};
export const buildFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item as any));
    } else {
      formData.append(key, value as any);
    }
  });
  return formData;
};

export const network = async <T = any>(
  path: string,
  method: string = "GET",
  body?: any,
  params?: QueryParams
): Promise<T> => {
  const isFormData = body instanceof FormData;
  const url = \`\${BASE_URL}\${path}'\${buildQueryString(params)}\`;

  const response = await fetch(url, {
    method,
    headers: isFormData ? { "Content-Type": "multipart/form-data" , "Authorization" : \`Bearer \${getCookie(token_name)}\` } : { "Content-Type": "application/json" , "Authorization" : \`Bearer \${getCookie(token_name)}\` },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status} \${response.statusText}\`);
  }

  const contentType = response.headers.get("content-type") || "";
  return (contentType.includes("application/json") ? response.json() : response.text()) as Promise<T>;
};
`;

const JsNetworkAxios = `import axios from "axios";
import {getCookie} from "./cookie"
const token_name = "token_name" ; // TODO: set your token name (default : "token_name")
const client = axios.create({
  baseURL: "", // TODO: set your API base URL
  withCredentials: true,
});

export const buildFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const network = async (path, method = "GET", body, params) => {
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const { data } = await client.request({
    url: path,
    method,
    data: body,
    params,
    headers: isFormData ? { "Content-Type": "multipart/form-data" , "Authorization" : \`Bearer \${getCookie(token_name)}\` } : { "Content-Type": "application/json" , "Authorization" : \`Bearer \${getCookie(token_name)}\` },
  });

  return data;
};
`;

const TsNetworkAxios = `import {getCookie} from "./cookie"
import axios from "axios";
const token_name = "token_name" ; // TODO: set your token name (default : "token_name")
const client = axios.create({
  baseURL: "", // TODO: set your API base URL
  withCredentials: true,
});

export const buildFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item as any));
    } else {
      formData.append(key, value as any);
    }
  });
  return formData;
};

export const network = async <T = any>(
  path: string,
  method: string = "GET",
  body?: any
  params? : any
): Promise<T> => {
  const isFormData = body instanceof FormData;

  const { data } = await client.request<T>({
    url: path,
    method,
    data: body,
    params,
    headers: isFormData ? { "Content-Type": "multipart/form-data" , "Authorization" : \`Bearer \${getCookie(token_name)}\` } : { "Content-Type": "application/json" , "Authorization" : \`Bearer \${getCookie(token_name)}\` },,
  });

  return data;
};
`;

module.exports = { JsNetworkFetch, TsNetworkFetch, JsNetworkAxios, TsNetworkAxios };
