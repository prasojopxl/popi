-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_userId_fkey`;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;
