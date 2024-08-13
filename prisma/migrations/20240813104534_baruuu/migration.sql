/*
  Warnings:

  - You are about to drop the `product_category_products` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `product_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `product_category_products` DROP FOREIGN KEY `product_category_products_ibfk_1`;

-- DropForeignKey
ALTER TABLE `product_category_products` DROP FOREIGN KEY `product_category_products_ibfk_2`;

-- AlterTable
ALTER TABLE `product_categories` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `status` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `categoryId` VARCHAR(191) NULL,
    MODIFY `rate_count` INTEGER NULL;

-- DropTable
DROP TABLE `product_category_products`;

-- CreateIndex
CREATE UNIQUE INDEX `categories_title_key` ON `categories`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `product_categories_title_key` ON `product_categories`(`title`);

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `product_categories`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;
