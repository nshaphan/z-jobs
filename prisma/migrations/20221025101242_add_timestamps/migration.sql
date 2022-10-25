/*
  Warnings:

  - You are about to drop the column `github` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `linkedIn` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "github",
DROP COLUMN "linkedIn",
DROP COLUMN "portfolio",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT E'PENDING';
