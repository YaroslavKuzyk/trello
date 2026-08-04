import { ApiError } from "./errors"

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api"

export type ApiFetchOptions = Omit<RequestInit, "body"> & { body?: unknown }

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
    const { body, headers, ...init } = options
    const isFormData = body instanceof FormData

    const response = await fetch(`${BASE_URL}${path}`, {
        ...init,
        body: body === undefined || isFormData ? (body as BodyInit | undefined) : JSON.stringify(body),
        headers: {
            Accept: "application/json",
            ...(body !== undefined && !isFormData ? { "Content-Type": "application/json" } : {}),
            ...headers,
        },
        credentials: "include",
        "X-CSRF-TOKEN": readXsrfCookie(),
    })

    if (!response.ok) throw await ApiError.from(response)

    // 204 from logout, and any other body-less success.
    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        return undefined as T
    }

    return (await response.json()) as T
}
