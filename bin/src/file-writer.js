"use strict";

const fs = require("fs");
const path = require("path");
const { generateEndpointCode } = require("./codegen");

const OUTPUT_DIR = "services";

/**
 * Converts a swagger tag into a safe kebab-case file name.
 * e.g. "User Accounts" -> "user-accounts"
 * @param {string} tag
 * @returns {string}
 */
function toFileName(tag) {
  const cleaned = tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return cleaned || "common";
}

/**
 * Writes one generated file per swagger tag, e.g. services/users.ts with
 * getUser/updateUser/... and services/orders.ts with its own endpoints.
 * Also writes a services/index.{ext} barrel file that re-exports everything.
 * @param {Record<string, import("./types").Endpoint[]>} groups
 * @param {boolean} useTypeScript
 * @returns {string[]} paths of every file written
 */
function writeEndpointFiles(groups, useTypeScript) {
  const ext = useTypeScript ? "ts" : "js";
  const writtenFiles = [];
  const fileNames = [];

  for (const [tag, endpoints] of Object.entries(groups)) {
    const fileName = toFileName(tag);
    fileNames.push(fileName);

    const needsFormData = endpoints.some((endpoint) => endpoint.formData);
    const namedImports = needsFormData ? "network, buildFormData" : "network";

    const body = endpoints
      .map((endpoint) => generateEndpointCode(endpoint, useTypeScript))
      .join("\n");

    const content = `import { ${namedImports} } from "./network";\n\n${body}`;
    const filePath = path.join(OUTPUT_DIR, `${fileName}.${ext}`);

    fs.writeFileSync(filePath, content, "utf-8");
    writtenFiles.push(filePath);
  }

  const barrelPath = path.join(OUTPUT_DIR, `index.${ext}`);
  const barrelContent = fileNames.map((fileName) => `export * from "./${fileName}";`).join("\n") + "\n";
  fs.writeFileSync(barrelPath, barrelContent, "utf-8");
  writtenFiles.push(barrelPath);

  return writtenFiles;
}

module.exports = { writeEndpointFiles, toFileName };
