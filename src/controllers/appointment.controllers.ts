import { Request,Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { isValidDate } from "../helpers/validation/is-valid-date";
import { sendAppointmentConfirmationEmail } from "../utils/mail/send.mail.messages";
import { sendCancelAppointmentEmail } from "../utils/mail/send.mail.messages";

const appointmentService = new AppointmentService();

export class AppointmentController {
    async create(req: Request, res: Response) {

        const { userId, professionalId, scheduleAt, serviceId } = req.body;
       
        const appointment = await appointmentService.create({ userId, professionalId, scheduleAt, serviceId });

        const formattedDate = new Date(appointment.scheduleAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        await sendAppointmentConfirmationEmail(appointment.userEmail, appointment.userName, formattedDate);

        return res.status(201).json(appointment);
    }

    async cancel(req: Request, res: Response) {
        const { id } = req.params;
        const appointment = await appointmentService.cancel(id);

        const formattedDate = new Date(appointment.scheduleAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        await sendCancelAppointmentEmail(appointment.userEmail, appointment.userName, formattedDate);
        
        return res.status(200).json(appointment);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const appointment = await appointmentService.delete(id);
        return res.status(204).json(appointment);
    }

    async update(req:Request,res:Response){

        const id = req.params.id;
        const { scheduleAt } = req.body;

        if(!isValidDate(scheduleAt)) {
            return res.status(400).json({ message: "Data de agendamento inválida" });
        }

        const appointment = await appointmentService.update(id,scheduleAt);

        return res.status(200).json(appointment);

    }

    async getOne(req:Request,res:Response){

        const id = req.params.id;

        const appointment = await appointmentService.getOne(id);

        return res.status(200).json(appointment);
    }

    async getAll(req:Request,res:Response){

        const appointments = await appointmentService.getAll();

        return res.status(200).json(appointments);

    }

}