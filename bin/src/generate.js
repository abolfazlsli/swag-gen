"use strict";

const fs = require("fs");
const path = require("path");
const ora = require("ora");
const state = require("./state");
const network = require("./sources/network");
const cookies = require("./sources/cookies");
const types = require("./sources/types");
const { parseSwagger, extractEndpoints, groupByTag } = require("./swagger");
const { writeEndpointFiles } = require("./file-writer");

const OUTPUT_DIR = "services";

const STICKERS = [
  ";)", "3]", "3>", ":)", ":D", ":]", "=)", "^_^",
  "(>‿<)", "(◕‿◕)", "♥‿♥", "(•‿•)", "(¬‿¬)", "✌(◕‿-)✌", "٩(◕‿◕)۶",
];

function randomSticker() {
  return STICKERS[Math.floor(Math.random() * STICKERS.length)];
}

function printHelp() {
  console.log(`
    -i, --input <path/url>: Specifies the path to your OpenAPI file or the URL of the OpenAPI specification.
    -t, --ts, --typescript: Use this flag to generate TypeScript code.
    -a, --axios: Use this flag to generate service code that utilizes the Axios library for HTTP requests.
    -u, --url <url>: An alternative way to specify the URL of your OpenAPI specification.
    -c-m, --cookie-method <method>: For creating and managing your cookies, <method> can be:
                      custom       : you provide your own implementation
                      localStorge  : uses localStorage
                      nookie       : uses the nookie module
                      expo-go      : uses expo-secure-store
                                     !!! TypeScript + React Native only !!!
                      sessionStorge: uses sessionStorage
  `);
}

/** @returns {boolean} whether it's safe to proceed */
function validateState() {
  if (!state.url && !state.dir) {
    printHelp();
    return false;
  }
  if (state.url && state.dir) {
    console.log("error: cannot use --input/-i and --url/-u at the same time");
    return false;
  }
  return true;
}

function ensureOutputDir() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function resolveCookieSourceKey() {
  if (!state.cookieMethod) return null;
  if (state.cookieMethod === "expo-go") return "expo-go";
  return `${state.cookieMethod}${state.useTypeScript ? "Ts" : "Js"}`;
}

/** Writes network.{ext}, types.ts (TS only), cookie.{ext}, apiCustom.{ext}. */
function writeSharedFiles() {
  const ext = state.useTypeScript ? "ts" : "js";

  if (state.useTypeScript) {
    fs.writeFileSync(path.join(OUTPUT_DIR, "types.ts"), types.TsFetchType, "utf-8");
  }

  const networkSource = state.useAxios
    ? (state.useTypeScript ? network.TsNetworkAxios : network.JsNetworkAxios)
    : (state.useTypeScript ? network.TsNetworkFetch : network.JsNetworkFetch);
  fs.writeFileSync(path.join(OUTPUT_DIR, `network.${ext}`), networkSource, "utf-8");

  const cookieKey = resolveCookieSourceKey();
  const cookieSource = cookieKey ? (cookies[cookieKey] ?? "") : "";
  fs.writeFileSync(path.join(OUTPUT_DIR, `cookie.${ext}`), cookieSource, "utf-8");

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `apiCustom.${ext}`),
    `/*\n  place to write your custom API endpoints.\n  write them here, don't forget to export, good luck.\n*/\n`,
    "utf-8"
  );
}


async function runWithSpinner(task, text, successText) {
  process.stdout.write(`${text}\n`);
  try {
    const result = await task();
    console.log(successText);
    return result;
  } catch (err) {
    console.error("Generation failed:", err.message);
    throw err;
  }
}

async function handleGenerate() {
  if (!validateState()) return;

  const api = await parseSwagger(state.url || state.dir);
  console.log("Extracting endpoints...");

  const endpoints = extractEndpoints(api);
  const groups = groupByTag(endpoints);
  const sectionCount = Object.keys(groups).length;

  await runWithSpinner(
  async () => {
    ensureOutputDir();
    writeSharedFiles();
    return writeEndpointFiles(groups, state.useTypeScript);
  },
  `Generating code for ${sectionCount} section(s) ...`,
  `Code generated <3 ${randomSticker()}`
);
}

module.exports = { handleGenerate, printHelp };
