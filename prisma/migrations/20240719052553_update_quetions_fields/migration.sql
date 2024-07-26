-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "emoji" TEXT,
ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "Trivia" ADD COLUMN     "curiosities" JSONB[];
