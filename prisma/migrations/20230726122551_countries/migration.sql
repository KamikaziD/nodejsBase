/*
  Warnings:

  - You are about to drop the column `clubId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reminder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[club_id]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Reminder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city_name` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_name` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `club_id` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_id` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_userId_fkey";

-- DropIndex
DROP INDEX "Location_clubId_key";

-- DropIndex
DROP INDEX "Profile_userId_key";

-- DropIndex
DROP INDEX "Reminder_userId_key";

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "city_name" TEXT NOT NULL,
ADD COLUMN     "country_name" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "clubId",
ADD COLUMN     "club_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "eventId",
DROP COLUMN "userId",
ADD COLUMN     "event_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country_name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "country_name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_country_name_key" ON "City"("country_name");

-- CreateIndex
CREATE UNIQUE INDEX "City_city_name_postal_code_country_name_key" ON "City"("city_name", "postal_code", "country_name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_country_name_key" ON "Country"("country_name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_club_id_key" ON "Location"("club_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_user_id_key" ON "Reminder"("user_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_city_name_postal_code_country_name_fkey" FOREIGN KEY ("city_name", "postal_code", "country_name") REFERENCES "City"("city_name", "postal_code", "country_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_country_name_fkey" FOREIGN KEY ("country_name") REFERENCES "Country"("country_name") ON DELETE RESTRICT ON UPDATE CASCADE;
