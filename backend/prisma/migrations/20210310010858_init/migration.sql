/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[title]` on the table `List`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "List.title_unique" ON "List"("title");
