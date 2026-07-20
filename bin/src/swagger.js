"use strict";

const SwaggerParser = require("@apidevtools/swagger-parser");

const JSON_CONTENT_TYPE = "application/json";
const FORM_CONTENT_TYPE = "multipart/form-data";

/**
 * @param {string} input  path or URL to an OpenAPI document
 * @returns {Promise<Object>} the fully dereferenced OpenAPI document
 */
async function parseSwagger(input) {
  return SwaggerParser.dereference(input);
}

/**
 * Flattens an OpenAPI document into a simple list of endpoints. Each
 * endpoint carries both its JSON body schema (`requestBody`) and its
 * multipart/form-data schema (`formData`) separately, since they need
 * different codegen treatment downstream.
 * @param {Object} api
 * @returns {import("./types").Endpoint[]}
 */
function extractEndpoints(api) {
  const endpoints = [];

  for (const [routePath, methods] of Object.entries(api.paths || {})) {
    for (const [method, route] of Object.entries(methods)) {
      const content = route.requestBody?.content || {};

      endpoints.push({
        method,
        path: routePath,
        summary: route.summary,
        description: route.description,
        operationId: route.operationId,
        tag: route.tags?.[0] || "common",
        parameters: route.parameters,
        requestBody: content[JSON_CONTENT_TYPE]?.schema?.properties ?? null,
        formData: content[FORM_CONTENT_TYPE]?.schema?.properties ?? null,
      });
    }
  }

  return endpoints;
}

/**
 * Groups endpoints by their swagger tag, e.g. `{ users: [...], orders: [...] }`.
 * This is what drives the one-file-per-section output (users.ts, orders.ts, ...).
 * @param {import("./types").Endpoint[]} endpoints
 * @returns {Record<string, import("./types").Endpoint[]>}
 */
function groupByTag(endpoints) {
  const groups = {};
  for (const endpoint of endpoints) {
    (groups[endpoint.tag] ??= []).push(endpoint);
  }
  return groups;
}

module.exports = { parseSwagger, extractEndpoints, groupByTag };
