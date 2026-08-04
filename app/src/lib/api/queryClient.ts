import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"
import { ApiError } from "./errors"

type SessionExpiredHandler = (error: ApiError) => void

let onSessionExpired: SessionExpiredHandler = () => {}

export function setSessionExpiredHandler(handler: SessionExpiredHandler): void {
    onSessionExpired = handler
}

const handleError = (error: unknown): void => {
    if (error instanceof ApiError && (error.isUnauthenticated || error.isCsrfMismatch)) {
        onSessionExpired(error)
    }
}

export const queryClient = new QueryClient({
    queryCache: new QueryCache({ onError: handleError }),
    mutationCache: new MutationCache({ onError: handleError }),
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                if (error instanceof ApiError && error.status < 500) return false
                return failureCount < 2
            },
            staleTime: 5 * 60 * 1000,
        },
        mutations: {
            retry: false,
        },
    },
})
