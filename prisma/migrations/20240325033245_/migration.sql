-- AlterTable
ALTER TABLE "QuestionInfo" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "likes" DROP NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "dislikes" DROP NOT NULL,
ALTER COLUMN "dislikes" SET DEFAULT 0;