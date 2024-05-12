/*
  Warnings:

  - You are about to drop the column `questionId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `localQuesId` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `dislikes` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `localQuestion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `questionInfoId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Added the required column `constraints` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handlerFunction` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemStatement` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starterCode` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starterFunctionName` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_localQuesId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropIndex
DROP INDEX "Question_title_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "questionId",
ADD COLUMN     "questionInfoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Example" DROP COLUMN "localQuesId",
ADD COLUMN     "questionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "category",
DROP COLUMN "difficulty",
DROP COLUMN "dislikes",
DROP COLUMN "likes",
DROP COLUMN "link",
DROP COLUMN "userId",
DROP COLUMN "videoId",
ADD COLUMN     "constraints" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "handlerFunction" TEXT NOT NULL,
ADD COLUMN     "problemStatement" TEXT NOT NULL,
ADD COLUMN     "starterCode" TEXT NOT NULL,
ADD COLUMN     "starterFunctionName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "localQuestion";

-- CreateTable
CREATE TABLE "QuestionInfo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "videoId" TEXT,
    "link" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QuestionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionInfo_title_key" ON "QuestionInfo"("title");

-- AddForeignKey
ALTER TABLE "QuestionInfo" ADD CONSTRAINT "QuestionInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_questionInfoId_fkey" FOREIGN KEY ("questionInfoId") REFERENCES "QuestionInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
