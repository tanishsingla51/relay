/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Message" ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "password";
