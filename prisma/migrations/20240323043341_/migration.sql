/*
  Warnings:

  - Added the required column `questionInfoId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `QuestionInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "questionInfoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionInfo" ADD COLUMN     "topicId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- AddForeignKey
ALTER TABLE "QuestionInfo" ADD CONSTRAINT "QuestionInfo_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionInfoId_fkey" FOREIGN KEY ("questionInfoId") REFERENCES "QuestionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
