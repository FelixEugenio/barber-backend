import { IAppointmentResponse, ICreateAppointment ,IAppointmentCreateAndCancelResponseDto} from "../dtos/appointment.dto";
import { isValidDate } from "../helpers/validation/is-valid-date";
import { AppointmentRepository } from "../repositories/appointment.repository";

export class AppointmentService {

    private appointmentRepository: AppointmentRepository;

    constructor(){
        this.appointmentRepository = new AppointmentRepository();
    }

    async create(data:ICreateAppointment):Promise<IAppointmentCreateAndCancelResponseDto> {

        try{
            const scheduleAt = new Date(data.scheduleAt);

            if(!isValidDate(scheduleAt)){
                throw new Error("Data de agendamento inválida");
            }
    
           if(scheduleAt.getHours() < 8 || scheduleAt.getHours() > 18){
                throw new Error("Agendamento deve estar entre 8h e 17h");
            }
    
           if(scheduleAt < new Date()){
                throw new Error("Agendamento não pode ser no passado");
            }
    
            const appointments = await this.appointmentRepository.findByScheduleAt(scheduleAt);
    
            if(appointments.length > 0){
                throw new Error("Agendamento ja cadastrado para esse horario");
            }
    
            const appointment = await this.appointmentRepository.create(data);
    
            return appointment;

        }catch(err){
            console.log(err.message);
        }
       
    }

    async cancel(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {
        try{
            const findAppointmentById = await this.appointmentRepository.findById(id);

        if(!findAppointmentById){
            throw new Error("Agendamento nao encontrado");
        }

        const appointment = await this.appointmentRepository.cancel(id);

        return appointment;

        }catch(err){
            console.log(err.message);
        }

    }

    async delete(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {
        try{
            const findAppointmentById = await this.appointmentRepository.findById(id);

        if(!findAppointmentById){
            throw new Error("Agendamento nao encontrado");
        }

        const appointment = await this.appointmentRepository.delete(id);

        return appointment;

        }catch(err){
            console.log(err.message);
        }
    }

    async getOne(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {
        try{
            const findAppointmentById = await this.appointmentRepository.findById(id);

        if(!findAppointmentById){
            throw new Error("Agendamento nao encontrado");
        }

        const appointment = await this.appointmentRepository.getOne(id);

        return appointment;

        }catch(err){
            console.log(err.message);
        }

        

    }

    async getAll():Promise<IAppointmentResponse[]> {

        try{
            const appointments = await this.appointmentRepository.findAll();

            return appointments;
        }catch(err){
            console.log(err.message);
        }

    }

    async update(id:string,data:IAppointmentResponse):Promise<IAppointmentResponse> {
        try{
            const findAppointmentById = await this.appointmentRepository.findById(id);

            if(!findAppointmentById){
                throw new Error("Agendamento nao encontrado");
            }
    
            const appointment = await this.appointmentRepository.update(id,data);
    
            return appointment;
        }catch(err){
            console.log(err.message);
        }
    }
}    