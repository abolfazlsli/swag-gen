#!/usr/bin/env node

const { Command } = require("commander");


const {handlers , parseRawCLI , handleGenerate} = require("./utils")







const program = new Command();


program
  .option("-i, --input <path>", "swagger file or url")
  .option("-o, --output <dir>", "output folder", "generated")
  .option("-v, --verbose", "enable verbose logging")
  .option("-h, --help", "show help information")
  ;




const ref = parseRawCLI(process.argv)
ref.map(item => {
    handlers[item.flag] && handlers[item.flag].service(item.value ?? null)
})




handleGenerate()

