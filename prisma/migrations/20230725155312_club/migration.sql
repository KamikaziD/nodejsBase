/*
  Warnings:

  - Added the required column `email` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "email" TEXT NOT NULL;
