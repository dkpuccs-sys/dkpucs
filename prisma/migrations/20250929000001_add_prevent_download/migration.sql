-- Add preventDownload column to Syllabus, QuestionPaper, Textbook, and LabManual tables
ALTER TABLE "Syllabus" ADD COLUMN "preventDownload" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "QuestionPaper" ADD COLUMN "preventDownload" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Textbook" ADD COLUMN "preventDownload" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "LabManual" ADD COLUMN "preventDownload" BOOLEAN NOT NULL DEFAULT false;
