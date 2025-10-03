-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_createrId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
