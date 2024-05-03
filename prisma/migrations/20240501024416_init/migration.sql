/*
  Warnings:

  - You are about to drop the column `userId` on the `card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `Card_userId_fkey`;

-- AlterTable
ALTER TABLE `card` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `_CardToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CardToUser_AB_unique`(`A`, `B`),
    INDEX `_CardToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CardToUser` ADD CONSTRAINT `_CardToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CardToUser` ADD CONSTRAINT `_CardToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
