export interface ICreateUserDto {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    phoneNumber: string;
}

export interface IUpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    phoneNumber?: string;
}

export interface ILoginUserDto {
    email: string;
    password: string;
}

export interface IUserResponseDto {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phoneNumber: string;
}

export interface IPayloadDto {
    sub: string;  // O ID do usuário
    role: string;
}