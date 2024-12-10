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
exports.sendBlockedAccountEmail = sendBlockedAccountEmail;
exports.sendCancelAppointmentEmail = sendCancelAppointmentEmail;
exports.sendUnBlockedAccountEmail = sendUnBlockedAccountEmail;
exports.sendWelcomeEmail = sendWelcomeEmail;
exports.sendAppointmentConfirmationEmail = sendAppointmentConfirmationEmail;
const email_config_1 = require("../../config/email.config");
const email_templates_1 = require("./email.templates");
// Função para enviar e-mail de conta bloqueada
function sendBlockedAccountEmail(email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Conta Bloqueada",
            html: (0, email_templates_1.BLOCK_USER_EMAIL_TEMPLATE)(name),
        };
        try {
            const info = yield email_config_1.transporter.sendMail(mailOptions);
            console.log("Email enviado com sucesso:", info.response);
        }
        catch (error) {
            console.error("Erro ao enviar o email:", error);
        }
    });
}
// Função para enviar e-mail de cancelamento de agendamento
function sendCancelAppointmentEmail(email, name, appointmentDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Agendamento Cancelado!",
            html: (0, email_templates_1.CANCEL_APPOINTMENT_EMAIL_TEMPLATE)(name, appointmentDate),
        };
        try {
            const info = yield email_config_1.transporter.sendMail(mailOptions);
            console.log("Email enviado com sucesso:", info.response);
        }
        catch (error) {
            console.error("Erro ao enviar o email:", error);
        }
    });
}
// Função para enviar e-mail de confirmação de agendamento
function sendAppointmentConfirmationEmail(email, name, appointmentDate, qrCodeUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Agendamento Confirmado!",
            html: (0, email_templates_1.APPOINTMENT_CONFIRMATION_EMAIL_TEMPLATE)(name, appointmentDate, qrCodeUrl),
        };
        try {
            const info = yield email_config_1.transporter.sendMail(mailOptions);
            console.log("Email enviado com sucesso:", info.response);
        }
        catch (error) {
            console.error("Erro ao enviar o email:", error);
        }
    });
}
// Função para enviar e-mail de conta desbloqueada
function sendUnBlockedAccountEmail(email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Conta Desbloqueada!",
            html: (0, email_templates_1.UNBLOCK_USER_EMAIL_TEMPLATE)(name),
        };
        try {
            const info = yield email_config_1.transporter.sendMail(mailOptions);
            console.log("Email enviado com sucesso:", info.response);
        }
        catch (error) {
            console.error("Erro ao enviar o email:", error);
        }
    });
}
// Função para enviar e-mail de boas-vindas
function sendWelcomeEmail(email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Bem-vindo a nossa Plataforma!",
            html: (0, email_templates_1.WELCOME_EMAIL_TEMPLATE)(name),
        };
        try {
            const info = yield email_config_1.transporter.sendMail(mailOptions);
            console.log("Email enviado com sucesso:", info.response);
        }
        catch (error) {
            console.error("Erro ao enviar o email:", error);
        }
    });
}
