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
exports.AppointmentService = void 0;
const is_valid_date_1 = require("../helpers/validation/is-valid-date");
const appointment_repository_1 = require("../repositories/appointment.repository");
const error_types_1 = require("../utils/error/error.types");
class AppointmentService {
    constructor() {
        this.appointmentRepository = new appointment_repository_1.AppointmentRepository();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const scheduleAt = new Date(data.scheduleAt);
            if (!(0, is_valid_date_1.isValidDate)(scheduleAt)) {
                throw new error_types_1.ConflictError("Data de agendamento inválida");
            }
            if (scheduleAt.getHours() < 8 || scheduleAt.getHours() > 18) {
                throw new error_types_1.ConflictError("Agendamento deve estar entre 8h e 17h");
            }
            if (scheduleAt < new Date()) {
                throw new error_types_1.ConflictError("Agendamento não pode ser no passado");
            }
            const appointments = yield this.appointmentRepository.findByScheduleAt(scheduleAt);
            if (appointments.length > 0) {
                throw new error_types_1.ConflictError("Agendamento ja cadastrado para esse horario");
            }
            const appointment = yield this.appointmentRepository.create(data);
            return appointment;
        });
    }
    cancel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAppointmentById = yield this.appointmentRepository.findById(id);
            if (!findAppointmentById) {
                throw new error_types_1.ConflictError("Agendamento nao encontrado");
            }
            const appointment = yield this.appointmentRepository.cancel(id);
            return appointment;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAppointmentById = yield this.appointmentRepository.findById(id);
            if (!findAppointmentById) {
                throw new error_types_1.ConflictError("Agendamento nao encontrado");
            }
            const appointment = yield this.appointmentRepository.delete(id);
            return appointment;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAppointmentById = yield this.appointmentRepository.findById(id);
            if (!findAppointmentById) {
                throw new error_types_1.ConflictError("Agendamento nao encontrado");
            }
            const appointment = yield this.appointmentRepository.getOne(id);
            return appointment;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield this.appointmentRepository.findAll();
            return appointments;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAppointmentById = yield this.appointmentRepository.findById(id);
            if (!findAppointmentById) {
                throw new error_types_1.ConflictError("Agendamento nao encontrado");
            }
            const appointment = yield this.appointmentRepository.update(id, data);
            return appointment;
        });
    }
}
exports.AppointmentService = AppointmentService;
