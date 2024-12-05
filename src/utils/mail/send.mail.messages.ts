import { transporter } from "../../config/email.config";
import { 
    BLOCK_USER_EMAIL_TEMPLATE, 
    WELCOME_EMAIL_TEMPLATE,
    CANCEL_APPOINTMENT_EMAIL_TEMPLATE,
    APPOINTMENT_CONFIRMATION_EMAIL_TEMPLATE,
    UNBLOCK_USER_EMAIL_TEMPLATE 
} from "./email.templates";

// Função para enviar e-mail de conta bloqueada
async function sendBlockedAccountEmail(email: string, name: string) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Conta Bloqueada",
        html: BLOCK_USER_EMAIL_TEMPLATE(name),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }
}

// Função para enviar e-mail de cancelamento de agendamento
async function sendCancelAppointmentEmail(email: string, name: string, appointmentDate: string) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Agendamento Cancelado!",
        html: CANCEL_APPOINTMENT_EMAIL_TEMPLATE(name, appointmentDate),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }
}

// Função para enviar e-mail de confirmação de agendamento
async function sendAppointmentConfirmationEmail(email: string, name: string, appointmentDate: string) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Agendamento Confirmado!",
        html: APPOINTMENT_CONFIRMATION_EMAIL_TEMPLATE(name, appointmentDate),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }
}

// Função para enviar e-mail de conta desbloqueada
async function sendUnBlockedAccountEmail(email: string, name: string) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Conta Desbloqueada!",
        html: UNBLOCK_USER_EMAIL_TEMPLATE(name),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }
}

// Função para enviar e-mail de boas-vindas
async function sendWelcomeEmail(email: string, name: string) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Bem-vindo a nossa Plataforma!",
        html: WELCOME_EMAIL_TEMPLATE(name),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email enviado com sucesso:", info.response);
    } catch (error) {
        console.error("Erro ao enviar o email:", error);
    }
}

// Exportar as funções
export { 
    sendBlockedAccountEmail,
    sendCancelAppointmentEmail,
    sendUnBlockedAccountEmail,
    sendWelcomeEmail,
    sendAppointmentConfirmationEmail 
};
