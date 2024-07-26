/*
  Warnings:

  - Added the required column `correctMessage` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wrongMessage` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `explanation` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctMessage" TEXT NOT NULL,
ADD COLUMN     "wrongMessage" TEXT NOT NULL,
ALTER COLUMN "explanation" SET NOT NULL;
