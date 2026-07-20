"use strict";

const state = require("./state");

function setUseAxios() {
  state.useAxios = true;
}

function setUseTypeScript() {
  state.useTypeScript = true;
}

/** @param {string} value */
function setUrl(value) {
  state.url = value;
}

/** @param {string} value */
function setDir(value) {
  state.dir = value;
}

/** @param {string} value */
function setCookieMethod(value) {
  state.cookieMethod = value;
}

/** @type {Record<string, import("./types").CliFlagHandler>} */
const handlers = {
  "-i": { service: setDir },
  "--input": { service: setDir },
  "-t": { service: () => setUseTypeScript() },
  "--ts": { service: () => setUseTypeScript() },
  "--typescript": { service: () => setUseTypeScript() },
  "-a": { service: () => setUseAxios() },
  "--axios": { service: () => setUseAxios() },
  "-u": { service: setUrl },
  "--url": { service: setUrl },
  "--cookie-method": { service: setCookieMethod },
  "-c-m": { service: setCookieMethod },
};

/**
 * Parses raw `process.argv` into `{ flag, value }` pairs. A flag consumes
 * the next token as its value unless that token is itself a flag, in which
 * case the value defaults to `true`.
 * @param {string[]} argv
 * @returns {import("./types").ParsedFlag[]}
 */
function parseRawCLI(argv) {
  const flags = [];

  for (let i = 2; i < argv.length; i++) {
    if (!argv[i].startsWith("-")) continue;

    const next = argv[i + 1];
    flags.push({
      flag: argv[i],
      value: next && !next.startsWith("-") ? next : true,
    });
  }

  return flags;
}

module.exports = {
  handlers,
  parseRawCLI,
  setUseAxios,
  setUseTypeScript,
  setUrl,
  setDir,
  setCookieMethod,
};
