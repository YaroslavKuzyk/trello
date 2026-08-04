/** Laravel's validation payload: { "email": ["These credentials do not match our records."] } */
export type ValidationErrors = Record<string, string[]>

/**
 * Every non-2xx response from the API is thrown as this, so callers never have
 * to inspect a raw Response.
 */
export class ApiError extends Error {
    readonly status: number
    readonly errors: ValidationErrors

    constructor(status: number, message: string, errors: ValidationErrors = {}) {
        super(message)
        this.name = "ApiError"
        this.status = status
        this.errors = errors
    }

    static async from(response: Response): Promise<ApiError> {
        let message = response.statusText || "Request failed"
        let errors: ValidationErrors = {}

        try {
            const payload = await response.json()
            if (typeof payload?.message === "string") message = payload.message
            if (payload?.errors && typeof payload.errors === "object") errors = payload.errors
        } catch {
            // Not JSON — an HTML error page or an empty body. Keep the status text.
        }

        return new ApiError(response.status, message, errors)
    }

    get isValidation(): boolean {
        return this.status === 422
    }

    get isUnauthenticated(): boolean {
        return this.status === 401
    }

    get isRateLimited(): boolean {
        return this.status === 429
    }

    /** First message for a field, for wiring straight into a form input. */
    fieldError(field: string): string | undefined {
        return this.errors[field]?.[0]
    }
}
