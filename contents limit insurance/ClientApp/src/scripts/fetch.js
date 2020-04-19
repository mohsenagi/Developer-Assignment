
const baseUrl = "";

export async function fetchJson(route, method = "POST", body = {}) {
    const init = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        // // defaults:
        // mode: "cors",
        // cache: "default",
        // credentials: "same-origin",
        // redirect: "follow",
        // referrer: "client"
    };
    if (method === "POST" || method === "PUT") {
        init.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(baseUrl + route, init);
        return await response.json();
    } catch (error) {
        const message = `/${route}: ${method} error: ${error}`
        throw new Error(message);
    }
}