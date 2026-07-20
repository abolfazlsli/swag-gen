"use strict";

const { generateOperationName } = require("./naming");
const { propertiesToTsType, formDataToTsType } = require("./type-builder");

const BODY_METHODS = new Set(["post", "put", "patch"]);
const PATH_PARAM_RE = /\{([^}]+)\}/g;

/**
 * @param {string} path
 * @returns {string[]} names of `{param}` segments, in order
 */
function extractPathParams(path) {
  return [...path.matchAll(PATH_PARAM_RE)].map((match) => match[1]);
}

/**
 * @param {import("./types").Endpoint} endpoint
 * @returns {"json"|"formData"|null}
 */
function bodyKind(endpoint) {
  if (!BODY_METHODS.has(endpoint.method.toLowerCase())) return null;
  if (endpoint.formData) return "formData";
  if (endpoint.requestBody) return "json";
  return "data"; // body shape unknown ahead of time, still accept `data`
}

/**
 * Builds the function's parameter list.
 * @param {import("./types").Endpoint} endpoint
 * @param {boolean} useTypeScript
 * @returns {string}
 */
function buildArgs(endpoint, useTypeScript) {
  const args = extractPathParams(endpoint.path).map((param) =>
    useTypeScript ? `${param}: string` : param
  );

  const kind = bodyKind(endpoint);
  if (kind === "formData") {
    args.push(useTypeScript ? `data: ${formDataToTsType(endpoint.formData)}` : "data");
  } else if (kind === "json") {
    args.push(useTypeScript ? `data: ${propertiesToTsType(endpoint.requestBody)}` : "data");
  } else if (kind === "data") {
    args.push("data");
  }

  return args.join(", ");
}

/**
 * Builds the expression passed as the request body to `network(...)`.
 * Form-data endpoints get wrapped in `buildFormData(data)` so files and
 * regular fields both end up in a real `FormData` instance.
 * @param {import("./types").Endpoint} endpoint
 * @returns {string}
 */
function buildBodyExpression(endpoint) {
  const kind = bodyKind(endpoint);
  if (kind === "formData") return "buildFormData(data)";
  if (kind === "json" || kind === "data") return "data";
  return "";
}

/**
 * @param {import("./types").Endpoint} endpoint
 * @returns {string}
 */
function buildDocComment(endpoint) {
  const text = [endpoint.description, endpoint.summary].filter(Boolean).join(" ");
  return text ? `/* ${text} */\n` : "";
}

/**
 * Generates the full source for a single endpoint function.
 * @param {import("./types").Endpoint} endpoint
 * @param {boolean} useTypeScript
 * @returns {string}
 */
function generateEndpointCode(endpoint, useTypeScript) {
  const name = generateOperationName(endpoint.method, endpoint.path, endpoint.operationId);
  const args = buildArgs(endpoint, useTypeScript);
  const bodyExpr = buildBodyExpression(endpoint);
  const urlTemplate = endpoint.path.replace(/\{/g, "${");

  const networkArgs = [`\`${urlTemplate}\``, `"${endpoint.method.toUpperCase()}"`, bodyExpr]
    .filter(Boolean)
    .join(", ");

  return `${buildDocComment(endpoint)}export const ${name} = (${args}) =>\n  network(${networkArgs});\n`;
}

module.exports = { generateEndpointCode, extractPathParams, bodyKind };
