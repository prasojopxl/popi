-- CreateTable
CREATE TABLE `tags` (
    `_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_productsTotags` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_productsTotags_AB_unique`(`A`, `B`),
    INDEX `_productsTotags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_productsTotags` ADD CONSTRAINT `_productsTotags_A_fkey` FOREIGN KEY (`A`) REFERENCES `products`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_productsTotags` ADD CONSTRAINT `_productsTotags_B_fkey` FOREIGN KEY (`B`) REFERENCES `tags`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
