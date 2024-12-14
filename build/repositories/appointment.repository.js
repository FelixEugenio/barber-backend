"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const user_repository_1 = require("./user.repository");
class AppointmentRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield user_repository_1.prisma.appointment.create({
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
                userEmail: appointment.user.email,
                serviceName: appointment.service.name,
                servicePrice: appointment.service.price,
                serviceDuration: appointment.service.duration,
                professionalName: appointment.professional.name,
                qrCodeUrl: appointment.qrCodeUrl
            };
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield user_repository_1.prisma.appointment.update({
                where: { id: id },
                data: {
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
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield user_repository_1.prisma.appointment.findFirst({
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
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield user_repository_1.prisma.appointment.delete({
                where: { id: id },
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
        });
    }
    cancel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield user_repository_1.prisma.appointment.update({
                where: { id: id },
                data: {
                    status: "CANCELED"
                }, select: {
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
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield user_repository_1.prisma.appointment.findMany({
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
        });
    }
    findByScheduleAt(scheduleAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield user_repository_1.prisma.appointment.findMany({
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
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield user_repository_1.prisma.appointment.findFirst({
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
        });
    }
}
exports.AppointmentRepository = AppointmentRepository;
