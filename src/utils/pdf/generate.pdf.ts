import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import axios from "axios";

export default async function generateAppointmentPDF(appointmentId: string, qrCodeUrl: string, appointmentData: any) {
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    const pdfPath = path.join(__dirname, `../../tmp`, `${appointmentId}.pdf`);
    
    // Garantir que o diretório de saída exista
    const tempDir = path.join(__dirname, `../../tmp`);
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Adicionando o cabeçalho com os dados do agendamento
    doc.fontSize(18).fillColor('#4CAF50').text('Detalhes do Agendamento', { align: 'center' })
        .moveDown(2)
        .fontSize(14).fillColor('#000000')
        .text(`Cliente: ${appointmentData.userName}`, { width: 500, align: 'left' })
        .moveDown()
        .text(`Profissional: ${appointmentData.professionalName}`, { width: 500, align: 'left' })
        .moveDown()
        .text(`Serviço: ${appointmentData.serviceName}`, { width: 500, align: 'left' })
        .moveDown()
        .text(`Data e Hora: ${appointmentData.scheduleAt}`, { width: 500, align: 'left' })
        .moveDown()
        .text(`Status: ${appointmentData.status}`, { width: 500, align: 'left' })
        .moveDown(2);

    // Separação com uma linha verde
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#4CAF50').lineWidth(2).stroke();
    doc.moveDown(2);

    // QR Code com explicação
    doc.fontSize(14).fillColor('#000000')
        .text('Aqui está o seu QR Code para acessar os detalhes do seu agendamento:', { align: 'center' })
        .moveDown();

    try {
        // Baixar o QR Code como um buffer
        const response = await axios.get(qrCodeUrl, { responseType: 'arraybuffer' });
        const qrCodeBuffer = Buffer.from(response.data);

        // Centralizar o QR Code e criar uma caixa arredondada ao redor
        const qrCodeX = (doc.page.width - 150) / 2;  // Centralizado
        const qrCodeY = doc.page.height - 150 - 50; // Posicionar o QR Code perto do final da página (50px de margem)
        const qrCodeWidth = 150;
        const qrCodeHeight = 150;

        // Caixa arredondada com sombra suave ao redor do QR Code
        doc.save()
            .rect(qrCodeX - 5, qrCodeY - 5, qrCodeWidth + 10, qrCodeHeight + 10)
            .fillAndStroke('#f5f5f5', '#4CAF50')  // Cor de fundo suave com borda verde
            .lineWidth(2)
            .stroke()
            .restore();

        // Adicionar o QR Code na posição calculada
        doc.image(qrCodeBuffer, qrCodeX, qrCodeY, { width: qrCodeWidth, height: qrCodeHeight });
    } catch (error) {
        console.error('Erro ao baixar o QR Code:', error);
        doc.text('Erro ao carregar o QR Code', { align: 'center' });
    }

    // Linha de separação logo abaixo do QR Code
    doc.moveTo(50, doc.y + 160).lineTo(550, doc.y + 160).strokeColor('#4CAF50').lineWidth(2).stroke();
    doc.moveDown(2);

    // Rodapé com informações adicionais
    doc.fontSize(12).fillColor('#000000')
        .text('Caso tenha dúvidas, entre em contato com nossa equipe de suporte.', { align: 'center' })
        .moveDown()
        .text('Visite nosso site para mais informações: www.suaplataforma.com', { align: 'center' });

    // Finalizar o PDF
    doc.end();

    // Retornar o caminho do arquivo PDF gerado
    return new Promise<string>((resolve, reject) => {
        writeStream.on('finish', () => {
            resolve(pdfPath); // Retorna o caminho do arquivo gerado
        });

        writeStream.on('error', reject);
    });
};
