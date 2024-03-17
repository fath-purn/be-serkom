/*
  Warnings:

  - You are about to drop the `mahasiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nilai` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mahasiswa" DROP CONSTRAINT "mahasiswa_nim_fkey";

-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_id_mahasiswa_fkey";

-- DropTable
DROP TABLE "mahasiswa";

-- DropTable
DROP TABLE "media";

-- DropTable
DROP TABLE "nilai";

-- DropEnum
DROP TYPE "Beasiswa";

-- DropEnum
DROP TYPE "Status";
