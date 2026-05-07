/*
  Warnings:

  - Added the required column `orderStatus` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `orderStatus` ENUM('inProgress', 'completed', 'cancelled') NOT NULL;
