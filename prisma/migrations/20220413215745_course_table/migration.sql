-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_instructor` VARCHAR(255) NOT NULL,
    `course_name` VARCHAR(255) NOT NULL,
    `course_video_url` VARCHAR(255) NOT NULL,
    `course_notes_url` VARCHAR(255) NOT NULL,
    `course_price` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
