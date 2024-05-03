/*
  Warnings:

  - You are about to drop the `_cardtouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_cardtouser` DROP FOREIGN KEY `_CardToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cardtouser` DROP FOREIGN KEY `_CardToUser_B_fkey`;

-- AlterTable
ALTER TABLE `card` ADD COLUMN `userId` INTEGER NULL;

-- DropTable
DROP TABLE `_cardtouser`;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
