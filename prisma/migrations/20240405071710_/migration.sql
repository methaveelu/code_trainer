/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "examples" TEXT;

-- DropTable
DROP TABLE "Example";
