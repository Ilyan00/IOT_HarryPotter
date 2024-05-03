/*
  Warnings:

  - You are about to drop the column `nom` on the `card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `card` DROP COLUMN `nom`,
    ADD COLUMN `actor` VARCHAR(191) NULL,
    ADD COLUMN `img` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL;
