import { ApiError } from "./errors"
import { ensureCsrfCookie, readXsrfCookie } from "./csrf"

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api"

export type ApiFetchOptions = Omit<RequestInit, "body"> & { body?: unknown }

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
    const { body, headers, ...init } = options
    const isFormData = body instanceof FormData
    const method = (init.method ?? "GET").toUpperCase()

    const needsCsrf = method !== "GET" && method !== "HEAD"
    if (needsCsrf) await ensureCsrfCookie()
    const xsrfToken = needsCsrf ? readXsrfCookie() : null

    const response = await fetch(`${BASE_URL}${path}`, {
        ...init,
        credentials: "include",
        body: body === undefined || isFormData ? (body as BodyInit | undefined) : JSON.stringify(body),
        headers: {
            Accept: "application/json",
            ...(body !== undefined && !isFormData ? { "Content-Type": "application/json" } : {}),
            ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {}),
            ...headers,
        },
    })

    if (!response.ok) throw await ApiError.from(response)

    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        return undefined as T
    }

    return (await response.json()) as T
}
