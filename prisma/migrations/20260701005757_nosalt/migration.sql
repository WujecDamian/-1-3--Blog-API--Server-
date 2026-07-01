/*
  Warnings:

  - You are about to drop the column `password_salt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password_salt";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
