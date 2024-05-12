-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "userId" TEXT DEFAULT 'nil user';

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
