
# Swag-Gen

[![NPM Version][npm-image]][npm-url]

**Smart OpenAPI to Frontend Service Code Generator**

## Overview

Swag-Gen is a powerful CLI tool that automatically generates frontend service code from OpenAPI specifications. It creates a complete, production-ready service layer with built-in session management, multiple storage adapters, and flexible HTTP client support.

## Key Features

### 🚀 Advanced Capabilities

- **Complete Project Structure** - Generates a fully organized project with proper separation of concerns
- **Intelligent Session Management** - Automatic handling of cookies, tokens, and authentication state
- **Cross-Platform Support** - Works seamlessly with React Native, Expo, and Next.js
- **Flexible Storage Layer** - Supports Cookie, LocalStorage, and AsyncStorage (for Expo)
- **Dual HTTP Clients** - Choose between Fetch API or Axios
- **Full TypeScript Support** - Complete type safety with intelligent autocomplete

### ⚡ Premium Features

- **Auto-generated Service Harmony** - Perfect integration between all layers of your application
- **Next.js Special Modules** - Built-in support for SSR, ISR, and middleware
- **Error Handling & Retry Logic** - Production-ready error management
- **Request Caching** - Built-in performance optimization

## Installation

Install globally using npm or yarn:

**npm:**
```bash
npm install @abolfask/swag-gen -g
```

**yarn:**
```bash
yarn global add @abolfask/swag-gen
```

## Usage

Basic command structure:

```bash
swag-gen [options]
```

### CLI Options

| Option | Description |
|--------|-------------|
| `-i, --input <path/url>` | OpenAPI file path or URL |
| `-t, --ts, --typescript` | Generate TypeScript code with full type definitions |
| `-a, --axios` | Use Axios instead of Fetch API |
| `-u, --url <url>` | Direct URL specification |

### Usage Examples

**1. Generate JavaScript services from local file:**
```bash
swag-gen --input ./openapi.json
```

**2. Generate TypeScript services from URL:**
```bash
swag-gen --url https://api.example.com/openapi.json --typescript
```

**3. Generate with Axios and cookie management for Expo:**
```bash
swag-gen -i ./swagger.yaml -a
```

**4. Generate complete Next.js project with TypeScript:**
```bash
swag-gen --url https://api.site.com/openapi.json --ts --axios
```

## Generated Output Structure

After execution, you'll get:

```
services/
├── network.js/.ts    # Core HTTP client and request handling
├── apiClient.js/.ts  # Generated API services
├── cookie.js/.ts     # Session storage modules (Cookie/LocalStorage/AsyncStorage)

```

## Use Cases

### 🔹 React Native / Expo
Automatic AsyncStorage and cookie management - no more token storage headaches

### 🔹 Next.js
Full server and client support with automatic request header management

### 🔹 Vanilla JS/TS Projects
Lightweight, reusable services for any frontend project

## How It Works

1. **Parse & Validate** - Reads and validates your OpenAPI specification
2. **Generate Core** - Creates the main HTTP client and request handlers
3. **Generate Services** - Produces service functions/classes for each endpoint
4. **Integrate Storage** - Implements the session storage layer
5. **Output** - Writes all generated files to disk

## Why Swag-Gen?

- ✅ **90% Less Boilerplate** - Run one command instead of writing repetitive code
- ✅ **No Vendor Lock-in** - Switch between Fetch and Axios anytime
- ✅ **Professional Auth Management** - Supports multiple storage methods out of the box
- ✅ **Type Safe** - Full TypeScript support with compile-time error checking
- ✅ **Extensible** - Easy to add custom modules and adapters

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License - see [LICENSE.md](LICENSE.md)

---

**Built with ❤️ for the developer community**

[npm-image]: https://img.shields.io/npm/v/swag-gen.svg
[npm-url]: https://npmjs.org/package/swag-gen
```