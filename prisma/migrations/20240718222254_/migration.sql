/*
  Warnings:

  - Added the required column `category` to the `Trivia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Trivia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trivia" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "difficulty" TEXT NOT NULL;
