/*
  Warnings:

  - The `solved` column on the `QuestionInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "QuestionInfo" DROP COLUMN "solved",
ADD COLUMN     "solved" BOOLEAN DEFAULT false;
