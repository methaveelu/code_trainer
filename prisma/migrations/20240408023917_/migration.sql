/*
  Warnings:

  - You are about to drop the column `dislikedProblems` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `likedProblems` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `solvedProblems` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `starredProblems` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionInfo" ADD COLUMN     "solved" INTEGER DEFAULT 0,
ADD COLUMN     "starred" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dislikedProblems",
DROP COLUMN "likedProblems",
DROP COLUMN "solvedProblems",
DROP COLUMN "starredProblems";

-- CreateTable
CREATE TABLE "LikedProblems" (
    "userId" TEXT NOT NULL,
    "questionInfoId" TEXT NOT NULL,

    CONSTRAINT "LikedProblems_pkey" PRIMARY KEY ("userId","questionInfoId")
);

-- CreateTable
CREATE TABLE "DislikedProblems" (
    "userId" TEXT NOT NULL,
    "questionInfoId" TEXT NOT NULL,

    CONSTRAINT "DislikedProblems_pkey" PRIMARY KEY ("userId","questionInfoId")
);

-- CreateTable
CREATE TABLE "StarredProblems" (
    "userId" TEXT NOT NULL,
    "questionInfoId" TEXT NOT NULL,

    CONSTRAINT "StarredProblems_pkey" PRIMARY KEY ("userId","questionInfoId")
);

-- CreateTable
CREATE TABLE "SolvedProblems" (
    "userId" TEXT NOT NULL,
    "questionInfoId" TEXT NOT NULL,

    CONSTRAINT "SolvedProblems_pkey" PRIMARY KEY ("userId","questionInfoId")
);

-- AddForeignKey
ALTER TABLE "LikedProblems" ADD CONSTRAINT "LikedProblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedProblems" ADD CONSTRAINT "LikedProblems_questionInfoId_fkey" FOREIGN KEY ("questionInfoId") REFERENCES "QuestionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikedProblems" ADD CONSTRAINT "DislikedProblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikedProblems" ADD CONSTRAINT "DislikedProblems_questionInfoId_fkey" FOREIGN KEY ("questionInfoId") REFERENCES "QuestionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarredProblems" ADD CONSTRAINT "StarredProblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarredProblems" ADD CONSTRAINT "StarredProblems_questionInfoId_fkey" FOREIGN KEY ("questionInfoId") REFERENCES "QuestionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolvedProblems" ADD CONSTRAINT "SolvedProblems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolvedProblems" ADD CONSTRAINT "SolvedProblems_questionInfoId_fkey" FOREIGN KEY ("questionInfoId") REFERENCES "QuestionInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
