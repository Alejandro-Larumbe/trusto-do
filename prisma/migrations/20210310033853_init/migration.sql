-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "taskId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "listId" DROP NOT NULL;
