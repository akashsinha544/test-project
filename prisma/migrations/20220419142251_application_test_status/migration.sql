/*
  Warnings:

  - Added the required column `test_status` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `application` ADD COLUMN `test_status` VARCHAR(255) NOT NULL;
