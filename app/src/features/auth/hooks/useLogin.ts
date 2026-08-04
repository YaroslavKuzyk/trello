import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ILoginPayload, IUser } from "@/features/auth/types"
import { authApi } from "@/features/auth/api"
import type { ApiError } from "@/lib/api"
import { replaceSession } from "@/features/auth/cache"

export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation<IUser, ApiError, ILoginPayload>({
        mutationFn: authApi.login,
        onSuccess: (user) => {
            replaceSession(queryClient, user)
        },
    })
}
