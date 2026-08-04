const CSRF_COOKIE_URL = import.meta.env.VITE_CSRF_COOKIE_URL ?? "/sanctum/csrf-cookie"

let inflight: Promise<void> | null = null

export function readXsrfCookie(): string | null {
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/)

    return match ? decodeURIComponent(match[1]) : null
}

export async function ensureCsrfCookie(): Promise<void> {
    if (readXsrfCookie()) return

    inflight ??= fetch(CSRF_COOKIE_URL, { credentials: "include" })
        .then(() => undefined)
        .finally(() => {
            inflight = null
        })

    await inflight
}
