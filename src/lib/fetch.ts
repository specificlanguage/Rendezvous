import { FIREBASE_AUTH } from "./firebase.ts";

async function updateOptions(options: RequestInit) {
    const update: RequestInit = { ...options };

    if (FIREBASE_AUTH.currentUser) {
        await FIREBASE_AUTH.currentUser.getIdToken().then((token) => {
            update.headers = {
                ...(update.headers ?? {}),
                Authorization: `Bearer ${token}`,
            };
        });
        update.credentials = "include";
    }

    update.headers = {
        ...update.headers,
        "Content-Type": "application/json",
    };

    return update;
}

/**
 * Wrapper call for fetch to add on Authorization and Content-Type headers
 * @param path - The relative URL for the API call -- must start with "/"
 * @param options - Additional HTTP options
 */

export async function fetcher(path: string, options?: RequestInit) {
    const backendURL = import.meta.env.VITE_BACKEND_URL ?? "";
    const fetchOptions = await updateOptions(options ?? {});

    const resp = await fetch(backendURL + path, fetchOptions);
    return {
        status: resp.status,
        body: await resp.json(),
    };
}
