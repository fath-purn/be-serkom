/*
  Warnings:

  - You are about to drop the column `id_nilai` on the `mahasiswa` table. All the data in the column will be lost.
  - Added the required column `nim` to the `mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "mahasiswa" DROP CONSTRAINT "mahasiswa_id_nilai_fkey";

-- AlterTable
ALTER TABLE "mahasiswa" DROP COLUMN "id_nilai",
ADD COLUMN     "nim" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_nim_fkey" FOREIGN KEY ("nim") REFERENCES "nilai"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
