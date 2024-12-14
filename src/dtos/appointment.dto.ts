export interface ICreateAppointment {
    professionalId: string;
    userId: string;
    scheduleAt: Date;
    serviceId: string;
    qrCodeUrl?: string;
}

export interface IAppointmentResponse {
    id?: string;
    userId?: string;
    professionalId?: string;
    scheduleAt?: Date;
    status?: string;
    serviceId?: string;
    qrCodeUrl?: string;
}

export interface IAppointmentCreateAndCancelResponseDto {
    id: string;
    scheduleAt: Date;
    userId: string;
    professionalId: string;
    serviceId: string;
    status?: string;
    userName: string;
    userEmail: string;
    serviceName: string;
    servicePrice: number;
    serviceDuration: number;
    professionalName: string;
    qrCodeUrl?: string;
}
