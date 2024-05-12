-- AlterTable
ALTER TABLE "DislikedProblems" ALTER COLUMN "userId" SET DEFAULT '',
ALTER COLUMN "questionInfoId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "LikedProblems" ALTER COLUMN "userId" SET DEFAULT '',
ALTER COLUMN "questionInfoId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "SolvedProblems" ALTER COLUMN "userId" SET DEFAULT '',
ALTER COLUMN "questionInfoId" SET DEFAULT '';

-- AlterTable
ALTER TABLE "StarredProblems" ALTER COLUMN "userId" SET DEFAULT '',
ALTER COLUMN "questionInfoId" SET DEFAULT '';
