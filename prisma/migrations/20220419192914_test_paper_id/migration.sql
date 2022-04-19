/*
  Warnings:

  - You are about to drop the column `test_id` on the `test_details` table. All the data in the column will be lost.
  - Added the required column `test_paper_id` to the `test_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `test_details` DROP COLUMN `test_id`,
    ADD COLUMN `test_paper_id` INTEGER NOT NULL;
