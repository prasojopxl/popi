-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_imageId_fkey`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
