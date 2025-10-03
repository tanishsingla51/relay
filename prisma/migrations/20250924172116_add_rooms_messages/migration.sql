/*
  Warnings:

  - Added the required column `roomId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "roomId" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Room" ALTER COLUMN "password" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
