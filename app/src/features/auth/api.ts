import type { IAuthResponse, ILoginPayload, IRegisterPayload, IUser } from "@/features/auth/types"
import { apiFetch } from "@/lib/api"

export const authApi = {
    register: (body: IRegisterPayload) => apiFetch<IAuthResponse>("/auth/register", { method: "POST", body }),
    login: (body: ILoginPayload) => apiFetch<IAuthResponse>("/auth/login", { method: "POST", body }),
    logout: () => apiFetch<void>("/auth/logout", { method: "POST" }),
    me: () => apiFetch<IUser>("/auth/me"),
}