import { IAppointmentResponse, ICreateAppointment ,IAppointmentCreateAndCancelResponseDto} from "../dtos/appointment.dto";
import { isValidDate } from "../helpers/validation/is-valid-date";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { ConflictError } from "../utils/error/error.types";

export class AppointmentService {

    private appointmentRepository: AppointmentRepository;

    constructor(){
        this.appointmentRepository = new AppointmentRepository();
    }

    async create(data:ICreateAppointment):Promise<IAppointmentCreateAndCancelResponseDto> {

        const scheduleAt = new Date(data.scheduleAt);

        if(!isValidDate(scheduleAt)){
            throw new ConflictError("Data de agendamento inválida");
        }

       if(scheduleAt.getHours() < 8 || scheduleAt.getHours() > 18){
            throw new ConflictError("Agendamento deve estar entre 8h e 17h");
        }

       if(scheduleAt < new Date()){
            throw new ConflictError("Agendamento não pode ser no passado");
        }

        const appointments = await this.appointmentRepository.findByScheduleAt(scheduleAt);

        if(appointments.length > 0){
            throw new ConflictError("Agendamento ja cadastrado para esse horario");
        }

        const appointment = await this.appointmentRepository.create(data);

        return appointment;
    }

    async cancel(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {

        const findAppointmentById = await this.appointmentRepository.findById(id);

        if(!findAppointmentById){
            throw new ConflictError("Agendamento nao encontrado");
        }

        const appointment = await this.appointmentRepository.cancel(id);

        return appointment;

    }

    async delete(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {

        const findAppointmentById = await this.appointmentRepository.findById(id);

        if(!findAppointmentById){
            throw new ConflictError("Agendamento nao encontrado");
        }

        const appointment = await this.appointmentRepository.delete(id);

        return appointment;

    }

    async getOne(id:string):Promise<IAppointmentCreateAndCancelResponseDto> {

        const findAppointmentById = await this.appointmentRepository.findById(id);

        if(!findAppointmentById){
            throw new ConflictError("Agendamento nao encontrado");
        }

        const appointment = await this.appointmentRepository.getOne(id);

        return appointment;

    }

    async getAll():Promise<IAppointmentResponse[]> {

        const appointments = await this.appointmentRepository.findAll();

        return appointments;

    }

    async update(id:string,data:IAppointmentResponse):Promise<IAppointmentResponse> {

        const findAppointmentById = await this.appointmentRepository.findById(id);

        if(!findAppointmentById){
            throw new ConflictError("Agendamento nao encontrado");
        }

        const appointment = await this.appointmentRepository.update(id,data);

        return appointment;

    }
}    