export interface ICreateServiceDto {
    name: string;
    description: string;
    price: number;
    duration?: number;
    img?: string;
}

export interface IUpdateServiceDto {
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
    img?: string;
}

export interface IServiceResponseDto {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    img?: string;
}