/**
 * Deskripsi: Inisialisasi PrismaClient untuk berinteraksi dengan database menggunakan Prisma ORM.
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

const { PrismaClient } = require('@prisma/client');

// Inisialisasi PrismaClient
const prisma = new PrismaClient();

module.exports = prisma;
