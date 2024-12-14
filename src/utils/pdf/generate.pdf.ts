import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import axios from "axios";

// Função principal para gerar o PDF de agendamento
export default async function generateAppointmentPDF(appointmentId: string, qrCodeUrl: string, appointmentData: any) {
    const doc = new PDFDocument({
        size: "A4",
        margin: 50
    });

    // Caminho onde o PDF será gerado
    const pdfPath = path.join(__dirname, `../../tmp`, `${appointmentId}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Adicionando título no topo da página
    doc.fontSize(20).fillColor('#2C3E50').text('Confirmação de Agendamento', {
        align: 'center',
        underline: true
    }).moveDown(2);

    // Adicionando os dados do agendamento ao PDF com estilização
    doc.fontSize(14).fillColor('#34495E').text(`Cliente: ${appointmentData.userName}`, { width: 500, align: 'left' })
        .moveDown()
        .text(`Profissional: ${appointmentData.professionalName}`, { width: 500, align: 'left' })
        .moveDown()
        .text(`Serviço: ${appointmentData.serviceName}`, { width: 500, align: 'left' })
        .moveDown()
        .text(`Data e Hora: ${appointmentData.scheduleAt}`, { width: 500, align: 'left' })
        .moveDown()
        .text(`Status: ${appointmentData.status}`, { width: 500, align: 'left' })
        .moveDown(2);

    // Criando uma linha para separar a seção de dados do QR Code
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#16A085').lineWidth(2).stroke();

    // Inserindo uma breve descrição sobre o QR Code
    doc.moveDown().fontSize(14).fillColor('#7F8C8D').text('Aqui está o seu QR Code para acessar os detalhes do seu agendamento:', { align: 'center' })
        .moveDown();

    // Baixar o QR Code e inserir no PDF
    try {
        const response = await axios.get(qrCodeUrl, { responseType: 'arraybuffer' });
        const qrCodeBuffer = Buffer.from(response.data);

        // Tamanho da caixa que vai conter o QR Code
        const qrCodeBoxX = 150;
        const qrCodeBoxY = doc.y + 10; // Coloca o QR Code um pouco abaixo do texto
        const qrCodeBoxWidth = 200;
        const qrCodeBoxHeight = 200;

        // Criando o contorno verde onde o QR Code será inserido
        doc.strokeColor('#16A085')
            .lineWidth(2)
            .rect(qrCodeBoxX - 5, qrCodeBoxY - 5, qrCodeBoxWidth + 10, qrCodeBoxHeight + 10) // Ajuste de borda
            .stroke();

        // Adicionando o QR Code dentro da caixa verde
        doc.image(qrCodeBuffer, qrCodeBoxX, qrCodeBoxY, { width: qrCodeBoxWidth, height: qrCodeBoxHeight });

    } catch (error) {
        console.error('Erro ao baixar o QR Code:', error);
        doc.text('Erro ao carregar o QR Code', { align: 'center' });
    }

    // Linha de separação após o QR Code
    doc.moveTo(50, doc.y + 160).lineTo(550, doc.y + 160).strokeColor('#16A085').lineWidth(2).stroke();

    // Adicionando o rodapé com informações adicionais
    const pageHeight = doc.page.height;
    const marginBottom = 50;  // Distância da margem inferior
    const footerHeight = 60;  // Distância que o rodapé ocupa no final

    // Ajustando a posição do rodapé para que ele apareça sempre no final da página
    doc.moveTo(50, pageHeight - marginBottom - footerHeight)
        .fontSize(12)
        .fillColor('#95A5A6')
        .text('Caso tenha dúvidas, entre em contato com nossa equipe de suporte.', { align: 'center' })
        .moveDown()
        .text('Visite nosso site para mais informações: www.suaplataforma.com', { align: 'center' });

    // Finalizando o PDF
    doc.end();

    return new Promise<string>((resolve, reject) => {
        writeStream.on('finish', () => {
            resolve(pdfPath); // Retorna o caminho do arquivo gerado
        });

        writeStream.on('error', reject);
    });
};
