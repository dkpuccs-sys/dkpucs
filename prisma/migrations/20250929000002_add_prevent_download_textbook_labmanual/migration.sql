-- Add preventDownload to Textbook
ALTER TABLE "Textbook" ADD COLUMN IF NOT EXISTS "preventDownload" BOOLEAN NOT NULL DEFAULT false;

-- Add preventDownload to LabManual
ALTER TABLE "LabManual" ADD COLUMN IF NOT EXISTS "preventDownload" BOOLEAN NOT NULL DEFAULT false;
