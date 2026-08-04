import type { QueryClient } from "@tanstack/react-query"
import { setSessionExpiredHandler } from "@/lib/api/queryClient"
import { AUTH_QUERY_KEYS } from "@/features/auth/constants"
import { replaceSession } from "@/features/auth/cache"

export function installSessionExpiryHandler(queryClient: QueryClient): void {
    setSessionExpiredHandler(() => {
        if (queryClient.getQueryData([AUTH_QUERY_KEYS.me]) === null) return

        replaceSession(queryClient, null)
    })
}
