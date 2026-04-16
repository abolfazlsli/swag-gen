
import { getCookie } from "./cookie"; // your cookie file

export const network = async (
    endpoint,
    method = "GET",
    data = {},
    onProgress
) => {
    const token = await getCookie("token");
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

    if (onProgress) {
        return new Promise(async (resolve, reject) => {
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
                ...(token ? { Authorization: `Bearer ${token}` } : {})
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

