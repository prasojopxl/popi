/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_categoryId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `categoryId`;

-- CreateTable
CREATE TABLE `_product_categoriesToproducts` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_product_categoriesToproducts_AB_unique`(`A`, `B`),
    INDEX `_product_categoriesToproducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_product_categoriesToproducts` ADD CONSTRAINT `_product_categoriesToproducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `product_categories`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_product_categoriesToproducts` ADD CONSTRAINT `_product_categoriesToproducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `products`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
