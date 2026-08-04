import type { ILoginPayload, IRegisterPayload, IUser } from "@/features/auth/types"
import { apiFetch } from "@/lib/api"

export const authApi = {
    register: (body: IRegisterPayload) => apiFetch<IUser>("/auth/register", { method: "POST", body }),
    login: (body: ILoginPayload) => apiFetch<IUser>("/auth/login", { method: "POST", body }),
    logout: () => apiFetch<void>("/auth/logout", { method: "POST" }),
    me: () => apiFetch<IUser>("/auth/me"),
}