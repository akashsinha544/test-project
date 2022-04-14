-- CreateTable
CREATE TABLE `application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `system_uuid` VARCHAR(255) NOT NULL,
    `course_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `current_state` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
