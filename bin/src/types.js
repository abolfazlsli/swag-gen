"use strict";

/**
 * Pure JSDoc type documentation for the CLI's internal data shapes.
 * Nothing here executes — it exists so editors/TS-checkers can type-check
 * the rest of the codebase via `@param`/`@returns` references.
 *
 * If you migrate this CLI to TypeScript later, these typedefs translate
 * almost 1:1 into `interface`/`type` declarations.
 */

/**
 * @typedef {Object} EndpointParam
 * @property {string} name
 * @property {"path"|"query"|"header"|"cookie"} in
 * @property {boolean} [required]
 * @property {Object} [schema]
 */

/**
 * @typedef {Object} Endpoint
 * @property {string} method              HTTP method, lowercase (get, post, ...)
 * @property {string} path                Raw OpenAPI path, e.g. "/users/{id}"
 * @property {string} [summary]
 * @property {string} [description]
 * @property {string} [operationId]
 * @property {string} tag                 First swagger tag, or "common"
 * @property {EndpointParam[]} [parameters]
 * @property {Object|null} requestBody    application/json schema properties, or null
 * @property {Object|null} formData       multipart/form-data schema properties, or null
 */

/**
 * @typedef {Object} CliState
 * @property {boolean} useAxios
 * @property {boolean} useTypeScript
 * @property {string|null} url
 * @property {string|null} dir
 * @property {string|null} cookieMethod
 */

/**
 * @typedef {Object} CliFlagHandler
 * @property {(value: string|boolean|null) => void} service
 */

/**
 * @typedef {Object} ParsedFlag
 * @property {string} flag
 * @property {string|boolean} value
 */

module.exports = {};
