"use strict";

const ACTION_MAP = {
  get: "get",
  post: "create",
  put: "update",
  patch: "update",
  delete: "delete",
};

const SPLIT_RE = /[-_\s]+/;
const PARAM_RE = /^\{(.+)\}$/;

/**
 * @param {string} str
 * @returns {string}
 */
function toPascalCase(str) {
  if (!str) return "";
  return str
    .split(SPLIT_RE)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

/**
 * @param {string} word
 * @returns {string}
 */
function singularize(word) {
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.endsWith("ses")) return word.slice(0, -2);
  if (word.endsWith("s") && word.length > 1) return word.slice(0, -1);
  return word;
}

/**
 * Splits a raw OpenAPI path into its static resource segments and its
 * `{param}` segments, in order.
 * @param {string} path
 * @returns {{resources: string[], params: string[]}}
 */
function splitPathSegments(path) {
  const resources = [];
  const params = [];

  for (const segment of path.split("/").filter(Boolean)) {
    const match = segment.match(PARAM_RE);
    if (match) params.push(match[1]);
    else resources.push(segment);
  }

  return { resources, params };
}

/**
 * Builds a readable function name for an endpoint. Prefers the swagger
 * `operationId` when present, otherwise derives one from method + path,
 * e.g. GET /users/{id} -> "getUserById".
 * @param {string} method
 * @param {string} path
 * @param {string} [operationId]
 * @returns {string}
 */
function generateOperationName(method, path, operationId) {
  // if (operationId?.trim()) return operationId.trim();

  const action = ACTION_MAP[method.toLowerCase()] || "call";
  const { resources, params } = splitPathSegments(path);

  const nameParts = resources.map((resource, index) => {
    const isLastBeforeParam = index === resources.length - 1 && params.length > 0;
    return toPascalCase(isLastBeforeParam ? singularize(resource) : resource);
  });
  
  let result = action + nameParts.join("");
  if (params.length) {
    result += "By" + params.map(toPascalCase).join("And");
  }
  // console.log(result)
  return result;
}

module.exports = {
  toPascalCase,
  singularize,
  generateOperationName,
  splitPathSegments,
  ACTION_MAP,
};
