/*
  Warnings:

  - Added the required column `updatedAt` to the `mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `nilai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mahasiswa" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "media" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "nilai" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
