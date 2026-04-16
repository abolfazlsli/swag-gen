
const SwaggerParser = require("@apidevtools/swagger-parser");
const state = require("./datas")
const fs = require('fs');
const netoworkSource = require("./surces/network")
const types = require("./surces/types")

const handlers ={
     "-i" : {
        service :(val) => setDir(val) ,
    } ,
     "--input" : {
        service :(val) => setDir(val) ,
    } ,
     "-t" : {
        service :() => setUseTypeScript() ,
    } ,
     "--ts" : {
        service :() => setUseTypeScript() ,
    } ,
     "--typescript" : {
        service :() => setUseTypeScript() ,
    } ,
     "-a" : {
        service :() => setUseAxios() ,
    } ,
     "--axios" : {
        service :() => setUseAxios() ,
    } ,
    "-u" : {
        service : (val) => setUrl(val)
    } ,
    "--url" : {
        service : (val) => setUrl(val)
    } ,
    
};


// utils

const setUseAxios = () => {
  state.useAxios = true;
};

const setUseTypeScript = () => {
  state.useTypeScript = true;
};

const setUrl = (value) => {
  state.url = value;
};

const setDir = (value) => {
  state.dir = value;
};

async function parserSwagger (input) {
    return await SwaggerParser.dereference(input)
}


function extractEndpoints(api) {
  const endpoints = [];

  for (const path in api.paths) {
    for (const method in api.paths[path]) {
      const route = api.paths[path][method];
      endpoints.push({
        method,
        path,
        summary: route.summary,
        description: route.description,
        operationId: route.operationId ,
        parameters: route.parameters,
        requestBody : route.requestBody?.content['application/json']?.schema?.properties ?? null
      });
    }
  }

  return endpoints;
}



function generateTypeFromProperties(properties) {
  if (!properties) return "any";
  
  const fields = Object.entries(properties).map(([key, value]) => {
    const type = value.type === 'integer' ? 'number' : value.type || 'any';
    return `${key}: ${type === "array" && "number | string" || type}`;
  }).join('; ');
  
  return `{ ${fields} }`;
}


function parseRawCLI(argv) {
  const flags = [];

  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith("-")) {
      flags.push(
        {
            flag : argv[i] ,
            value :  argv[i + 1] && !argv[i + 1].startsWith("-") ? argv[i + 1] : true
        }
      )
    }
  }

  return flags;
}


const handleGenerate = async () => {
    if (!state.url && !state.dir) {
        help()
        return;
    }
    if (state.url && state.dir) {
        console.log(`error we cant use dir and url switch in the same time`);
        return;
    }
    const apis = await parserSwagger(state.url || state.dir)
    console.log("Extracting endpoints...");

    const endpoints = extractEndpoints(apis);
    // console.log("Options:", state.useAxios, state.useTypeScript, state.url, state.dir)
    let codeoutput = `
import {network} from "./network"
    `
    endpoints.map(endpoint => {
        const requestBodyType = endpoint.requestBody 
        ? generateTypeFromProperties(endpoint.requestBody) 
        : "any";
            console.log(endpoint.path , endpoint.method ,requestBodyType)
            const endpointgenerated = `
export const ${endpoint.operationId} = (${
                endpoint.path.includes("{") 
                ? (state.useTypeScript ? `${endpoint.path.split("{")[1].replaceAll("}" , "")}: string` : endpoint.path.split("{")[1].replaceAll("}" , "")) 
                : (["post", "put", "patch"].includes(endpoint.method.toLowerCase()) 
                    ? (state.useTypeScript ? `data: ${requestBodyType}` : "data") 
                    : "")
            }) =>
        network(\`${endpoint.path.replaceAll("{" , "${")}\` , "${endpoint.method.toUpperCase()}" ${["post", "put", "patch"].includes(endpoint.method.toLowerCase()) && requestBodyType != "any" ? ",data" : ""})
                 
                 `;
                    codeoutput += endpointgenerated
            })
            codeGenerator(codeoutput)
}


const help = () => {
    console.log(`
    -i, --input <path/url>: Specifies the path to your OpenAPI file or the URL of the OpenAPI specification.
    -t, --ts, --typescript: Use this flag to generate TypeScript code.
    -a, --axios: Use this flag to generate service code that utilizes the Axios library for HTTP requests.
    -u, --url <url>: An alternative way to specify the URL of your OpenAPI specification.
    `)
}


const codeGenerator = (services) => {
    if (!state.url && !state.dir) {
        help()
        return;
    }
    if (state.url && state.dir) {
        console.log(`error we cant use dir and url switch in the same time`);
        return;
    }
  const format = state.useTypeScript && "ts" || "js"
  state.useTypeScript && fs.writeFileSync(`types.ts` , types.TsFetchType,"utf-8")
  fs.writeFileSync(`network.${format}` , state.useAxios ?
     (state.useTypeScript && netoworkSource.TsNetworkAxios || netoworkSource.JsNetworkAxios) 
     :(state.useTypeScript && netoworkSource.TsNetworkFetch || netoworkSource.JsNetworkFetch)  , 'utf-8')
  fs.writeFileSync(`apiClient.${format}`, services, 'utf-8');
  fs.writeFileSync(`cookie.${format}` , "" , "utf-8")
  fs.writeFileSync(`apiCustom.${format}` , `
    // place to write your custom APIs endpoints
    ` , "utf-8")

}

module.exports = {
    handlers , parseRawCLI , extractEndpoints , parserSwagger , setUseAxios , setUseTypeScript , setUrl , setDir ,handleGenerate
}