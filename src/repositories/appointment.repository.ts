import { ICreateAppointment, IAppointmentResponse, IAppointmentCreateAndCancelResponseDto } from "../dtos/appointment.dto";
import { prisma } from "./user.repository";

export class AppointmentRepository{

    async create(data: ICreateAppointment): Promise<IAppointmentCreateAndCancelResponseDto>{
        const appointment = await prisma.appointment.create({
            data: {
                userId: data.userId,
                professionalId: data.professionalId,
                scheduleAt: data.scheduleAt,
                serviceId: data.serviceId,
                qrCodeUrl: data.qrCodeUrl,
                status: "PENDING"
            },
            select: {
                id: true,
                userId: true,
                professionalId: true,
                scheduleAt: true,
                status: true,
                serviceId: true,
                qrCodeUrl: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                service:{
                    select:{
                        name: true,
                        price: true,
                        duration: true
                    }
                },
                professional: {
                    select: {
                        name: true,
                    }
                }
            },
            
        })
        return {
            id: appointment.id,
            userId: appointment.userId,
            professionalId: appointment.professionalId,
            scheduleAt: appointment.scheduleAt,
            status: appointment.status,
            serviceId: appointment.serviceId,
            userName: appointment.user.name,
            userEmail: appointment.user.email,
            serviceName: appointment.service.name,
            servicePrice: appointment.service.price,
            serviceDuration: appointment.service.duration,
            professionalName: appointment.professional.name,
            qrCodeUrl: appointment.qrCodeUrl
        };
    }

    async update(id:string,data:IAppointmentResponse):Promise<IAppointmentResponse>  {

        const appointment = await prisma.appointment.update({    
            where: { id:id },
            data:{
                userId: data.userId,
                professionalId: data.professionalId,
                scheduleAt: data.scheduleAt,
                serviceId: data.serviceId,
                qrCodeUrl: data.qrCodeUrl
                
            },
            select: {
                id: true,
                userId: true,
                professionalId: true,
                scheduleAt: true,
                status: true,
                qrCodeUrl: true,
                serviceId: true,
                user: {
                    select: {
                        name: true,
                    }
                },
                service:{
                    select:{
                        name: true,
                        price: true,
                        duration: true
                    }
                },
                professional: {
                    select: {
                        name: true,
                    }
                }
            },
        });
        return appointment;
    }

    async findById(id:string):Promise<IAppointmentResponse> {
        const appointment = await prisma.appointment.findFirst({
            where: { id: id },
            select: {
                id: true,
                userId: true,
                professionalId: true,
                scheduleAt: true,
                status: true,
                qrCodeUrl: true,
                serviceId: true,
                user: {
                    select: {
                        name: true,
                    }
                },
                service: {
                    select: {
                        name: true,
                        price: true,
                        duration: true
                    }
                },
                professional: {
                    select: {
                        name: true,
                    }
                }
            },
        });
        return appointment;
  }

  async delete(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {
    const appointment = await prisma.appointment.delete({
        where: { id:id },
        select: {
            id: true,
            userId: true,
            professionalId: true,
            scheduleAt: true,
            status: true,
            serviceId: true,
            user: {
                select: {
                    name: true,
                    email: true
                    
                }
            },
            service: {
                select: {
                    name: true,
                    price: true,
                    duration: true
                }
            },
            professional: {
                select: {
                    name: true,
                }
            }
        },
    });
    return {
        id: appointment.id,
        userId: appointment.userId,
        professionalId: appointment.professionalId,
        scheduleAt: appointment.scheduleAt,
        status: appointment.status,
        serviceId: appointment.serviceId,
        userName: appointment.user.name,
        serviceName: appointment.service.name,
        servicePrice: appointment.service.price,
        serviceDuration: appointment.service.duration,
        professionalName: appointment.professional.name,
        userEmail: appointment.user.email
    };
}

        async cancel(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {
            const appointment = await prisma.appointment.update({
                where: { id:id },
                data: {
                    status: "CANCELED"
                },select: {
                    id: true,
                    userId: true,
                    professionalId: true,
                    scheduleAt: true,
                    status: true,
                    serviceId: true,
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    service: {
                        select: {
                            name: true,
                            price: true,
                            duration: true
                        }
                    },
                    professional: {
                        select: {
                            name: true,
                        }
                    }
                }
            });
            return {
                id: appointment.id,
                userId: appointment.userId,
                professionalId: appointment.professionalId,
                scheduleAt: appointment.scheduleAt,
                status: appointment.status,
                serviceId: appointment.serviceId,
                userName: appointment.user.name,
                userEmail: appointment.user.email,
                serviceName: appointment.service.name,
                servicePrice: appointment.service.price,
                serviceDuration: appointment.service.duration,
                professionalName: appointment.professional.name
            };
        }

        async findAll():Promise<IAppointmentResponse[]> {
            const appointments = await prisma.appointment.findMany({
                select: {
                    id: true,
                    userId: true,
                    professionalId: true,
                    scheduleAt: true,
                    status: true,
                    qrCodeUrl: true,
                    serviceId: true,
                    user: {
                        select: {
                            name: true,
                        }
                    },
                    service: {
                        select: {
                            name: true,
                            price: true,
                            duration: true
                        }
                    },
                    professional: {
                        select: {
                            name: true,
                        }
                    }
                },
            });
            return appointments;
        }

        async findByScheduleAt(scheduleAt:Date):Promise<IAppointmentResponse[]> {
            const appointments = await prisma.appointment.findMany({
                where: { scheduleAt: scheduleAt },
                select: {
                    id: true,
                    userId: true,
                    professionalId: true,
                    scheduleAt: true,
                    status: true,
                    qrCodeUrl: true,
                    serviceId: true,
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    service: {
                        select: {
                            name: true,
                            price: true,
                            duration: true
                        }
                    },
                    professional: {
                        select: {
                            name: true,
                        }
                    }
                },
            });
            return appointments;
        }

        async getOne(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {
            const appointment = await prisma.appointment.findFirst({
                where: { id: id },
                select: {
                    id: true,
                    userId: true,
                    professionalId: true,
                    scheduleAt: true,
                    status: true,
                    qrCodeUrl: true,
                    serviceId: true,
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    },
                    service: {
                        select: {
                            name: true,
                            price: true,
                            duration: true
                        }
                    },
                    professional: {
                        select: {
                            name: true,
                        }
                    }
                },
            });
            return {
                id: appointment.id,
                userId: appointment.userId,
                professionalId: appointment.professionalId,
                scheduleAt: appointment.scheduleAt,
                status: appointment.status,
                serviceId: appointment.serviceId,
                userName: appointment.user.name,
                serviceName: appointment.service.name,
                servicePrice: appointment.service.price,
                serviceDuration: appointment.service.duration,
                professionalName: appointment.professional.name,
                userEmail: appointment.user.email,
                qrCodeUrl: appointment.qrCodeUrl
            };
    }
}