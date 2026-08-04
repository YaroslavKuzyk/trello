export interface IUser {
    name: string
    email: string
    id: number
    created_at: string
}

export interface IRegisterPayload {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface ILoginPayload {
    email: string
    password: string
}

