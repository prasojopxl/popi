/*
  Warnings:

  - You are about to drop the column `imageId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_imageId_fkey`;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `imageId`;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
