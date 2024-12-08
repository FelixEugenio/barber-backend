export interface ICreateProfessionalDto {
    name: string;
    avatar?: string;
    specialty: string;
    available: boolean;
}

export interface IUpdateProfessionalDto {
    name?: string;
    avatar?: string;
    specialty?: string;
    available?: boolean;
}

export interface IProfessionalResponseDto {
    id: string;
    avatar?: string;
    specialty: string;
    available: boolean;
}