import type { QueryClient } from "@tanstack/react-query"
import type { IUser } from "@/features/auth/types"
import { AUTH_QUERY_KEYS } from "@/features/auth/constants"

export function replaceSession(queryClient: QueryClient, user: IUser | null): void {
    queryClient.setQueryData([AUTH_QUERY_KEYS.me], user)
    queryClient.removeQueries({
        predicate: (query) => query.queryKey[0] !== AUTH_QUERY_KEYS.me,
    })
}
