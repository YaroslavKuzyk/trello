import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "@/features/auth/api"
import type { ApiError } from "@/lib/api"
import { AUTH_QUERY_KEYS } from "@/features/auth/constants"
import { replaceSession } from "@/features/auth/cache"

export const useLogout = () => {
    const queryClient = useQueryClient()

    return useMutation<void, ApiError, void>({
        mutationFn: authApi.logout,
        onSettled: () => {
            replaceSession(queryClient, null)
            queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEYS.me] })
        },
    })
}
