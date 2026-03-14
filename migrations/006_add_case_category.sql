-- Add category field to cases table
ALTER TABLE cases ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'individual';
