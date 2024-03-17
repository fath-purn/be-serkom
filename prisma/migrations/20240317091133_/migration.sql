/*
  Warnings:

  - You are about to drop the `mahasiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nilai` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mahasiswa" DROP CONSTRAINT "mahasiswa_id_nilai_fkey";

-- DropTable
DROP TABLE "mahasiswa";

-- DropTable
DROP TABLE "nilai";

-- DropEnum
DROP TYPE "Beasiswa";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
