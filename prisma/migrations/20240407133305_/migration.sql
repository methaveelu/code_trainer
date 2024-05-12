-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dislikedProblems" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "likedProblems" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "solvedProblems" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "starredProblems" BOOLEAN NOT NULL DEFAULT false;
