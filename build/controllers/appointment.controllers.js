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
exports.AppointmentController = void 0;
const appointment_service_1 = require("../services/appointment.service");
const is_valid_date_1 = require("../helpers/validation/is-valid-date");
const send_mail_messages_1 = require("../utils/mail/send.mail.messages");
const send_mail_messages_2 = require("../utils/mail/send.mail.messages");
const server_1 = require("../server");
const cloudinary_1 = require("../utils/cloudinary/cloudinary");
const appointmentService = new appointment_service_1.AppointmentService();
class AppointmentController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, professionalId, scheduleAt, serviceId } = req.body;
                const appointment = yield appointmentService.create({ userId, professionalId, scheduleAt, serviceId });
                const qrCodeUrl = yield (0, cloudinary_1.generateAndUploadQrCodeToCloudinary)(appointment.id);
                const formattedDate = new Date(appointment.scheduleAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                yield (0, send_mail_messages_1.sendAppointmentConfirmationEmail)(appointment.userEmail, appointment.userName, formattedDate, qrCodeUrl);
                server_1.io.emit('new-appointment', {
                    message: 'Novo agendamento criado',
                    appointment: {
                        id: appointment.id,
                        userId: appointment.userId,
                        professionalId: appointment.professionalId,
                        scheduleAt: appointment.scheduleAt,
                        status: appointment.status,
                        serviceId: appointment.serviceId
                    }
                });
                return res.status(201).json(appointment);
            }
            catch (err) {
                next(err);
            }
        });
    }
    cancel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const appointment = yield appointmentService.cancel(id);
                const formattedDate = new Date(appointment.scheduleAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                yield (0, send_mail_messages_2.sendCancelAppointmentEmail)(appointment.userEmail, appointment.userName, formattedDate);
                server_1.io.emit('cancel-appointment', {
                    message: 'Agendamento cancelado',
                    appointment: {
                        id: appointment.id,
                        userId: appointment.userId,
                        professionalId: appointment.professionalId,
                        scheduleAt: appointment.scheduleAt,
                        status: appointment.status,
                        serviceId: appointment.serviceId
                    }
                });
                return res.status(200).json(appointment);
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const appointment = yield appointmentService.delete(id);
                return res.status(204).json(appointment);
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { scheduleAt } = req.body;
                if (!(0, is_valid_date_1.isValidDate)(scheduleAt)) {
                    return res.status(400).json({ message: "Data de agendamento inválida" });
                }
                const appointment = yield appointmentService.update(id, scheduleAt);
                return res.status(200).json(appointment);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const appointment = yield appointmentService.getOne(id);
                return res.status(200).json(appointment);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const appointments = yield appointmentService.getAll();
                return res.status(200).json(appointments);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.AppointmentController = AppointmentController;
