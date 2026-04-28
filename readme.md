
# Swag-Gen

[![NPM Version][npm-image]][npm-url]

Swag-Gen is a command-line interface (CLI) tool built with Node.js that simplifies the process of generating front-end service code from OpenAPI specifications. It takes an OpenAPI file or URL as input and automatically generates service code, making front-end development more efficient.

## Features

*   Automatic generation of front-end service code from OpenAPI specifications.
*   Support for both file paths and URLs as input for OpenAPI definitions.
*   Option to generate code using TypeScript for better type safety.
*   Option to use Axios for making HTTP requests.

## Installation

You can install Swag-Gen globally using npm or yarn:

**Using npm:**

```bash
npm install @abolfask/swag-gen -g
```

**Using yarn:**

```bash
yarn global add @abolfask/swag-gen
```

## Usage

The basic command to generate service code is `swag-gen` followed by your options.

### Options

*   `-i`, `--input <path/url>`: Specifies the path to your OpenAPI file or the URL of the OpenAPI specification.
*   `-t`, `--ts`, `--typescript`: Use this flag to generate TypeScript code.
*   `-a`, `--axios`: Use this flag to generate service code that utilizes the Axios library for HTTP requests.
*   `-u`, `--url <url>`: An alternative way to specify the URL of your OpenAPI specification.

### Examples

**1. Generate JavaScript service code from a local OpenAPI file:**

```bash
swag-gen --input ./path/to/your/openapi.json
```

**2. Generate TypeScript service code from a URL:**

```bash
swag-gen --url https://your-api.com/openapi.json --typescript
```

**3. Generate JavaScript service code using Axios from a local file:**

```bash
swag-gen -i ./path/to/your/openapi.yaml -a
```

**4. Generate TypeScript service code using Axios from a URL:**

```bash
swag-gen --url https://petstore.swagger.io/v2/swagger.json --ts --axios
```

**Note:** When using the `-i` or `--input` option, you can provide either a file path or a URL. The `-u` or `--url` option is specifically for URLs.

## How it Works

When you run the command, OpenAPIServiceGenerator parses your OpenAPI specification. Based on the options you provide, it then generates corresponding service code files that you can easily integrate into your front-end project. The tool handles the mapping of API endpoints, parameters, and responses into callable functions or classes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a new Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

version : 1.0.0

---

[npm-image]: https://img.shields.io/npm/v/swag-gen.svg
[npm-url]: https://npmjs.org/package/swag-gen
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE.md
```
