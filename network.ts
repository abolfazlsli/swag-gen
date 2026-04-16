
import { getCookie } from "./cookie"; // your cookie file
import { FetchType } from "./types"

export const network = async <T = any> (
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
    data: any = {},
    onProgress?: (present: number) => void
): Promise<FetchType<T>> => {
    const token = await getCookie("token");
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

    if (onProgress) {
        return new Promise<FetchType<T>>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/json");
            }
            if (token) {
                xhr.setRequestHeader("Authorization", `Bearer ${token}`);
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
                ...(token ? { Authorization: `Bearer ${token}` } : {})
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


