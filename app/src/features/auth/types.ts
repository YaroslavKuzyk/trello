export interface IUser {
    name: string
    email: string
    id: number
    created_at: string
}

export interface IAuthResponse {
    user: IUser
    token: string
}

export interface IRegisterPayload {
    name: string
    email: string
    password: string
}

export interface ILoginPayload {
    email: string
    password: string
}

