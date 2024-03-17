/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Beasiswa" AS ENUM ('akademik', 'non_akademik');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Belum_daftar', 'Pending', 'Diterima', 'Ditolak');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "nilai" (
    "id" SERIAL NOT NULL,
    "nim" INTEGER NOT NULL,
    "ipk" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mahasiswa" (
    "id" SERIAL NOT NULL,
    "id_nilai" INTEGER NOT NULL,
    "nama_depan" TEXT NOT NULL,
    "nama_belakang" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "beasiswa" "Beasiswa" NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "id_mahasiswa" INTEGER NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nilai_nim_key" ON "nilai"("nim");

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_id_nilai_fkey" FOREIGN KEY ("id_nilai") REFERENCES "nilai"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_id_mahasiswa_fkey" FOREIGN KEY ("id_mahasiswa") REFERENCES "mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
