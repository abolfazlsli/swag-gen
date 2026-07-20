#!/usr/bin/env node
"use strict";

const { Command } = require("commander");
const { handlers, parseRawCLI } = require("./src/cli");
const { handleGenerate } = require("./src/generate");

const program = new Command();

program
  .option("-i, --input <path>", "swagger file or url")
  .option("-o, --output <dir>", "output folder", "generated")
  .option("-v, --verbose", "enable verbose logging")
  .option("-h, --help", "show help information");

const flags = parseRawCLI(process.argv);
for (const { flag, value } of flags) {
  handlers[flag]?.service(value ?? null);
}

handleGenerate();
