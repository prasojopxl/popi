/*
  Warnings:

  - You are about to drop the column `productId` on the `product_categories` table. All the data in the column will be lost.
  - Added the required column `discount_percentage` to the `product_promos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_price` to the `product_promos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promo_code` to the `product_promos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product_categories` DROP FOREIGN KEY `product_categories_productId_fkey`;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `product_varian_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product_categories` DROP COLUMN `productId`;

-- AlterTable
ALTER TABLE `product_promos` ADD COLUMN `discount_percentage` INTEGER NOT NULL,
    ADD COLUMN `discount_price` INTEGER NOT NULL,
    ADD COLUMN `promo_code` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `product_category_products` (
    `product_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    INDEX `category_id`(`category_id`),
    PRIMARY KEY (`product_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_product_varian_id_fkey` FOREIGN KEY (`product_varian_id`) REFERENCES `product_variants`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_category_products` ADD CONSTRAINT `product_category_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products`(`_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `product_category_products` ADD CONSTRAINT `product_category_products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `product_categories`(`_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
