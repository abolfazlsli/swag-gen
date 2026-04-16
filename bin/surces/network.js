const TsNetworkFetch = `
import { getCookie } from "./cookie"; // your cookie file
import { FetchType } from "./types"

export const network = async <T = any> (
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
    data: any = {},
    onProgress?: (present: number) => void
): Promise<FetchType<T>> => {
    const token = await getCookie("token");
    const url = \`\${process.env.NEXT_PUBLIC_API_URL}\${endpoint}\`;

    if (onProgress) {
        return new Promise<FetchType<T>>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/json");
            }
            if (token) {
                xhr.setRequestHeader("Authorization", \`Bearer \${token}\`);
            }

            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable && onProgress) {
                    const percent = Math.round((e.loaded * 100) / e.total);
                    onProgress(percent);
                }
            };

            xhr.onload = () => {
                try {
                    const responseData = JSON.parse(xhr.responseText) as T;
                    resolve({ success: true, data: responseData });
                } catch (e) {
                    resolve({ success: true, data: xhr.responseText as any });
                }
            };

            xhr.onerror = () => {
                resolve({
                    success: false,
                    error: xhr.status
                });
            };

            if (data instanceof FormData) {
                xhr.send(data);
            } else if (method !== "GET") {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    }
    try {
        const res = await fetch(url, {
            method,
            headers: {
                ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
                ...(token ? { Authorization: \`Bearer \${token}\` } : {})
            },
            body: method !== "GET"
                ? (data instanceof FormData ? data : JSON.stringify(data))
                : undefined
        });
        const responseData = await res.json().catch(() => null) as T | null;

        return {
            success: res.ok,
            data: responseData || undefined, 
            error: res.ok ? null : { status: res.status, statusText: res.statusText }
        };
    } catch (err: any) {
        return {
            success: false,
            error: err?.status || err?.message || "An unknown error occurred"
        };
    }
};


`

const JsNetworkFetch = `
import { getCookie } from "./cookie"; // your cookie file

export const network = async (
    endpoint,
    method = "GET",
    data = {},
    onProgress
) => {
    const token = await getCookie("token");
    const url = \`\${process.env.NEXT_PUBLIC_API_URL}\${endpoint}\`;

    if (onProgress) {
        return new Promise(async (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/json");
            }
            if (token) {
                xhr.setRequestHeader("Authorization", \`Bearer \${token}\`);
            }

            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable && onProgress) {
                    const percent = Math.round((e.loaded * 100) / e.total);
                    onProgress(percent);
                }
            };

            xhr.onload = () => {
                try {
                    const json = JSON.parse(xhr.responseText);
                    resolve({ success: true, data: json });
                } catch {
                    resolve({ success: true, data: xhr.responseText });
                }
            };

            xhr.onerror = () => {
                resolve({
                    success: false,
                    error: xhr.status
                });
            };

            xhr.send(data instanceof FormData ? data : JSON.stringify(data));
        });
    }

    try {
        const res = await fetch(url, {
            method,
            headers: {
                ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
                ...(token ? { Authorization: \`Bearer \${token}\` } : {})
            },
            body: method !== "GET"
                ? (data instanceof FormData ? data : JSON.stringify(data))
                : undefined
        });

        const json = await res.json().catch(() => null);

        return {
            success: res.ok,
            data: json,
            error: res.ok ? null : res.status
        };
    } catch (err) {
        return {
            success: false,
            error: err?.status || err?.message
        };
    }
};

`


const TsNetworkAxios = `
import axios, { AxiosRequestConfig } from "axios"
import { FetchType } from "./types"
import { getCookie } from "./cookie"

export const network = async <T = any> (
    
        endpoint : string ,
        method? : "GET" | "POST" | "PUT" | "DELETE" | "PATCH" ,
        data : any = {} ,
        onProgress? : (present : number) => void

) : Promise<FetchType<T>> => {
    const token = await getCookie("token")
    const axiosCOnfig : AxiosRequestConfig = {
        url : \`\${process.env.NEXT_PUBLIC_API_URL}\${endpoint}\` ,
        method : method ?? "GET" ,
        data : data ,
        headers : {
            "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
            ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
        },
        onUploadProgress : (progressEvent) => {
            if (progressEvent.total && onProgress) {
                const present = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                onProgress(present)
            }
        }
    }
    try{
        const requets = await axios.request<T>(axiosCOnfig)
        return {
            success : true , 
            data : requets.data
        }
    }
    catch (err : any) {
        return {
            success : false ,
            error : err.status
        }
    }
    
}
`
const JsNetworkAxios = `
import axios from "axios";
import { getCookie } from "./cookie"; // your cookie file

export const network = async (
    endpoint,
    method = "GET",
    data = {},
    onProgress
) => {
    const token = await getCookie("token");

    const axiosConfig = {
        url: \`\${process.env.NEXT_PUBLIC_API_URL}\${endpoint}\`,
        method: method,
        data: data,
        headers: {
            "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
            ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
        },
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total && onProgress) {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(percent);
            }
        }
    };

    try {
        const request = await axios.request(axiosConfig);
        return {
            success: true,
            data: request.data
        };
    } catch (err) {
        return {
            success: false,
            error: err.status || err.response?.status
        };
    }
};

`



module.exports = {TsNetworkAxios , JsNetworkAxios , TsNetworkFetch , JsNetworkFetch}