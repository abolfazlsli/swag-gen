"use strict";

const SWAGGER_TYPE_TO_TS = {
  integer: "number",
  number: "number",
  string: "string",
  boolean: "boolean",
};


/**
 * @param {Object} param
 * @returns {string}
 */
function resolveQueryParamType(param) {
  const schema = param.schema || param;

  if (Array.isArray(schema.enum) && schema.enum.length) {
    return schema.enum.map((value) => JSON.stringify(value)).join(" | ");
  }

  return resolveFieldType(schema);
}

/**
 * 
 * @param {import("./types").EndpointParam[]} parameters
 * @returns {string}
 */
function queryParamsToTsType(parameters) {
  if (!parameters || parameters.length === 0) return "any";

  const fields = parameters.map((param) => {
    const optional = param.required ? "" : "?";
    return `${param.name}${optional}: ${resolveQueryParamType(param)}`;
  });

  return `{ ${fields.join("; ")} }`;
}
/**
 * Converts an OpenAPI "properties" object (application/json body) into an
 * inline TypeScript type string, e.g. `{ id: number; name: string }`.
 * @param {Object|null} properties
 * @returns {string}
 */
function propertiesToTsType(properties) {
  if (!properties || Object.keys(properties).length === 0) return "any";
  return `{ ${Object.entries(properties).map(([key, value]) => `${key}: ${resolveFieldType(value)}`).join("; ")} }`;
}

/**
 * Same as {@link propertiesToTsType} but for multipart/form-data bodies:
 * binary/file fields are typed as `File | Blob` instead of `string`.
 * @param {Object|null} properties
 * @returns {string}
 */
function formDataToTsType(properties) {
  if (!properties || Object.keys(properties).length === 0) return "any";
  return `{ ${Object.entries(properties).map(([key, value]) => `${key}: ${resolveFieldType(value, { treatBinaryAsFile: true })}`).join("; ")} }`;
}

/**
 * @param {Object} value  a single OpenAPI schema property
 * @param {{treatBinaryAsFile?: boolean}} [opts]
 * @returns {string}
 */
function resolveFieldType(value, opts = {}) {
  if (!value) return "any";

  if (opts.treatBinaryAsFile && value.type === "string" && value.format === "binary") {
    return "File | Blob";
  }

  if (value.type === "array") {
    const itemType =
      opts.treatBinaryAsFile && value.items?.format === "binary"
        ? "File | Blob"
        : SWAGGER_TYPE_TO_TS[value.items?.type] || "any";
    return `${itemType}[]`;
  }

  return (
    SWAGGER_TYPE_TO_TS[value.type] ||
    "any /** unrecognized schema type — please verify manually */"
  );
}

module.exports = { propertiesToTsType ,
                  formDataToTsType,
                  queryParamsToTsType,
                  resolveQueryParamType,
                };
