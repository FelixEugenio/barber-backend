import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Limpar todas as tabelas
    await prisma.appointment.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.service.deleteMany();
    await prisma.professional.deleteMany();
    await prisma.user.deleteMany();
    
    console.log("Banco de dados limpo com sucesso!");
  } catch (error) {
    console.error("Erro ao limpar o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
