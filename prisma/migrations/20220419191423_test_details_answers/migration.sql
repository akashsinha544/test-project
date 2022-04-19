/*
  Warnings:

  - Added the required column `answers` to the `test_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `test_details` ADD COLUMN `answers` VARCHAR(255) NOT NULL;
