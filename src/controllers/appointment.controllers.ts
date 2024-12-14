import { Request,Response,NextFunction } from "express";
import { AppointmentService } from "../services/appointment.service";
import { isValidDate } from "../helpers/validation/is-valid-date";
import { sendAppointmentConfirmationEmail } from "../utils/mail/send.mail.messages";
import { sendCancelAppointmentEmail } from "../utils/mail/send.mail.messages";
import {io} from '../server'
import { generateAndUploadQrCodeToCloudinary } from "../utils/cloudinary/cloudinary";
import generateAppointmentPDF from "../utils/pdf/generate.pdf";

const appointmentService = new AppointmentService();

export class AppointmentController {
    async create(req: Request, res: Response,next:NextFunction) {
        try{
            const { userId, professionalId, scheduleAt, serviceId } = req.body;
       
            const appointment = await appointmentService.create({ userId, professionalId, scheduleAt, serviceId });
    
            const qrCodeUrl:string = await generateAndUploadQrCodeToCloudinary(appointment.id);

            await appointmentService.update(appointment.id, {
                qrCodeUrl
            });
    
            const formattedDate = new Date(appointment.scheduleAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            const pdfPath = await generateAppointmentPDF(appointment.id,qrCodeUrl,{
                userName: appointment.userName,
                userEmail: appointment.userEmail,
                professionalName: appointment.professionalName,
                serviceName: appointment.serviceName,
                servicePrice: appointment.servicePrice,
                serviceDuration: appointment.serviceDuration,
                scheduleAt: formattedDate
            });
    
            await sendAppointmentConfirmationEmail(appointment.userEmail, appointment.userName, formattedDate ,qrCodeUrl,pdfPath);
    
            io.emit('new-appointment', {
                message: 'Novo agendamento criado',
                appointment:{
                    id: appointment.id,
                    userId: appointment.userId,
                    professionalId: appointment.professionalId,
                    scheduleAt: appointment.scheduleAt,
                    status: appointment.status,
                    serviceId: appointment.serviceId
                }
            });
    
            return res.status(201).json(appointment);
        }catch(err){
            next(err)
        }
    }

    async cancel(req: Request, res: Response,next:NextFunction) {
        try{
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
    
            io.emit('cancel-appointment', {
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
        }catch(err){
            next(err)
        }
        
    }

    async delete(req: Request, res: Response,next:NextFunction) {
        try{
            const { id } = req.params;
            const appointment = await appointmentService.delete(id);
            return res.status(204).json(appointment);
        }catch(err){
            next(err)
        }
        
    }

    async update(req:Request,res:Response,next:NextFunction){
        try{
            const id = req.params.id;
            const { scheduleAt } = req.body;
    
            if(!isValidDate(scheduleAt)) {
                return res.status(400).json({ message: "Data de agendamento inválida" });
            }
    
            const appointment = await appointmentService.update(id,scheduleAt);
    
            return res.status(200).json(appointment);
        }catch(err){
            next(err)
        }

        

    }

    async getOne(req:Request,res:Response,next:NextFunction){
        try{
            const id = req.params.id;

            const appointment = await appointmentService.getOne(id);
    
            return res.status(200).json(appointment);
        }catch(err){
            next(err)
        }

        
    }

    async getAll(req:Request,res:Response,next:NextFunction){
        try{
            const appointments = await appointmentService.getAll();

            return res.status(200).json(appointments);
        }catch(err){
           next(err)
        }  

    }

}