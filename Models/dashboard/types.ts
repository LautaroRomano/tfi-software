export type Patient = {
    id: string,
    name: string,
    cuil: string,
    phone: string,
    birthDay: string,
    email: string,
}

export type User = {
    id: string,
    name: string,
    cuil: string,
    phone: string,
    birthDay: string,
    email: string,
    role: string,
    password?: string | null,
}