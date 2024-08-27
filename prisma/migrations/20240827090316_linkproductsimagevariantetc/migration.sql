/*
  Warnings:

  - You are about to drop the column `productId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `product_varian_id` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_variants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_productId_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_product_varian_id_fkey`;

-- DropForeignKey
ALTER TABLE `product_variants` DROP FOREIGN KEY `product_variants_productId_fkey`;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `productId`,
    DROP COLUMN `product_varian_id`;

-- AlterTable
ALTER TABLE `product_categories` ADD COLUMN `imageId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product_variants` DROP COLUMN `productId`;

-- CreateTable
CREATE TABLE `_imagesToproducts` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_imagesToproducts_AB_unique`(`A`, `B`),
    INDEX `_imagesToproducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_product_variantsToproducts` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_product_variantsToproducts_AB_unique`(`A`, `B`),
    INDEX `_product_variantsToproducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_categories` ADD CONSTRAINT `product_categories_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `images`(`_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_imagesToproducts` ADD CONSTRAINT `_imagesToproducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `images`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_imagesToproducts` ADD CONSTRAINT `_imagesToproducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `products`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_product_variantsToproducts` ADD CONSTRAINT `_product_variantsToproducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `product_variants`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_product_variantsToproducts` ADD CONSTRAINT `_product_variantsToproducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `products`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
