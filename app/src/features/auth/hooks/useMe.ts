import { useQuery } from "@tanstack/react-query"
import { authApi } from "../api"
import { ApiError } from "@/lib/api"
import { AUTH_QUERY_KEYS } from "@/features/auth/constants"
import type { IUser } from "@/features/auth/types"

export const useMe = () => useQuery<IUser | null, ApiError>({
    queryKey: [AUTH_QUERY_KEYS.me],
    queryFn: async () => {
        try {
            return await authApi.me()
        } catch (error) {
            if (error instanceof ApiError && error.isUnauthenticated) return null
            throw error
        }
    },
})
