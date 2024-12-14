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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateAppointmentPDF;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generateAppointmentPDF(appointmentId, qrCodeUrl, appointmentData) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = new pdfkit_1.default({ size: "A4", margin: 50 });
        const pdfPath = path_1.default.join(__dirname, `../../tmp`, `${appointmentId}.pdf`);
        const writeStream = fs_1.default.createWriteStream(pdfPath);
        doc.pipe(writeStream);
        doc.image('path_to_your_logo.png', 50, 50, { width: 100 }) // Logo da sua empresa
            .fontSize(25).text('Agendamento Confirmado', 200, 50, { align: 'center' })
            .moveDown(1);
        doc.fontSize(14).text(`Cliente: ${appointmentData.userName}`, { width: 500, align: 'left' })
            .moveDown()
            .text(`Profissional: ${appointmentData.professionalName}`, { width: 500, align: 'left' })
            .moveDown()
            .text(`Serviço: ${appointmentData.serviceName}`, { width: 500, align: 'left' })
            .moveDown()
            .text(`Data e Hora: ${appointmentData.scheduleAt}`, { width: 500, align: 'left' })
            .moveDown()
            .text(`Status: ${appointmentData.status}`, { width: 500, align: 'left' })
            .moveDown(2);
        // QR Code com explicação
        doc.fontSize(14).text('Aqui está o seu QR Code para acessar os detalhes do seu agendamento:', { align: 'center' })
            .moveDown();
        // Adicionar o QR Code
        doc.image(qrCodeUrl, 200, doc.y, { width: 150, align: 'center' });
        // Linha de separação
        doc.moveTo(50, doc.y + 160).lineTo(550, doc.y + 160).strokeColor('#4CAF50').lineWidth(2).stroke();
        // Rodapé com informações adicionais
        doc.moveDown(2).fontSize(12).text('Caso tenha dúvidas, entre em contato com nossa equipe de suporte.', { align: 'center' })
            .moveDown()
            .text('Visite nosso site para mais informações: www.suaplataforma.com', { align: 'center' });
        // Finalizar o PDF
        doc.end();
        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                resolve(pdfPath); // Retorna o caminho do arquivo gerado
            });
            writeStream.on('error', reject);
        });
    });
}
;
