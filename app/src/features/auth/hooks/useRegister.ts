import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { IRegisterPayload, IUser } from "@/features/auth/types"
import { authApi } from "@/features/auth/api"
import type { ApiError } from "@/lib/api"

export const useRegister = () => {
    const queryClient = useQueryClient()

    return useMutation<IUser, ApiError, IRegisterPayload>({
        mutationFn: authApi.register,
        onSuccess: (user) => {
            queryClient.setQueryData(["me"], user)
        },
    })
}