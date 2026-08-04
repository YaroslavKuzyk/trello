const STORAGE_KEY = "auth_token"

let cached: string | null = null
let loaded = false

/**
 * The Sanctum bearer token lives here rather than in a feature store, so the
 * transport layer stays independent of any state library.
 */
export function getToken(): string | null {
    if (!loaded) {
        cached = localStorage.getItem(STORAGE_KEY)
        loaded = true
    }

    return cached
}

export function setToken(token: string | null): void {
    cached = token
    loaded = true

    if (token) {
        localStorage.setItem(STORAGE_KEY, token)
    } else {
        localStorage.removeItem(STORAGE_KEY)
    }
}
