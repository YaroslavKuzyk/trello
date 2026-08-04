export type ValidationErrors = Record<string, string[]>

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

    get isCsrfMismatch(): boolean {
        return this.status === 419
    }

    fieldError(field: string): string | undefined {
        return this.errors[field]?.[0]
    }
}
