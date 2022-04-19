-- CreateTable
CREATE TABLE `test_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `test_id` INTEGER NOT NULL,
    `application_id` INTEGER NOT NULL,
    `system_uuid` VARCHAR(255) NOT NULL,
    `test_result` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
