import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import axios from "axios";

export default async function generateAppointmentPDF(appointmentId: string, qrCodeUrl: string, appointmentData: any) {
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    const pdfPath = path.join(__dirname, `../../tmp`, `${appointmentId}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Adicionando os dados do agendamento ao PDF
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

    // Linha de separação (posicionando mais para cima para dar espaço para o QR code)
    doc.moveTo(50, doc.y + 40).lineTo(550, doc.y + 40).strokeColor('#4CAF50').lineWidth(2).stroke();

    // Rodapé com informações adicionais
    doc.moveDown(2).fontSize(12).text('Caso tenha dúvidas, entre em contato com nossa equipe de suporte.', { align: 'center' })
        .moveDown()
        .text('Visite nosso site para mais informações: www.suaplataforma.com', { align: 'center' });

    // Calcular a posição do QR Code para colocá-lo no final da página
    const pageHeight = doc.page.height;
    const marginBottom = 50;  // Margem inferior
    const footerHeight = 60;  // Altura que o rodapé ocupa
    const qrCodeHeight = 150; // Altura do QR Code
    const qrCodeWidth = 150;  // Largura do QR Code

    // Posição final do QR Code
    const qrCodeY = pageHeight - marginBottom - footerHeight - qrCodeHeight - 20;  // Deixa um espaço de 20px do rodapé

    // QR Code com explicação
    doc.moveDown(2).fontSize(14).text('Aqui está o seu QR Code para acessar os detalhes do seu agendamento:', { align: 'center' })
        .moveDown();

    try {
        // Baixar a imagem do QR Code como um buffer
        const response = await axios.get(qrCodeUrl, { responseType: 'arraybuffer' });
        const qrCodeBuffer = Buffer.from(response.data);

        // Adicionar o QR Code no PDF na posição calculada
        const qrCodeX = (doc.page.width - qrCodeWidth) / 2; // Centralizar horizontalmente
        doc.image(qrCodeBuffer, qrCodeX, qrCodeY, { width: qrCodeWidth, height: qrCodeHeight });
    } catch (error) {
        console.error('Erro ao baixar o QR Code:', error);
        doc.text('Erro ao carregar o QR Code', { align: 'center' });
    }

    // Finalizar o PDF
    doc.end();

    return new Promise<string>((resolve, reject) => {
        writeStream.on('finish', () => {
            resolve(pdfPath); // Retorna o caminho do arquivo gerado
        });

        writeStream.on('error', reject);
    });
};
