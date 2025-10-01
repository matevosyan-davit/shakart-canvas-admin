/*
  # Add Multi-Language Support
  
  This migration adds support for three languages: English (en), Armenian (am), and Russian (ru).
  
  1. Changes to Tables
    - `artworks`
      - Added language columns for title and description in Armenian and Russian
      - Original columns store English content
      - `language` field tracks the default language
    
    - `exhibitions`
      - Added language columns for title, description, location, and theme
      - Supports English, Armenian, and Russian translations
    
    - `media`
      - Added language columns for title and media_name
      - Supports English, Armenian, and Russian translations
  
  2. New Columns
    - All tables get a `language` column (default: 'en')
    - Language-specific columns follow pattern: `field_name_am` and `field_name_ru`
    - English content remains in original columns (title, description, etc.)
  
  3. Purpose
    - Enables the admin panel to manage content in multiple languages
    - Allows visitors to view the portfolio in their preferred language
*/

-- Add language support to artworks table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artworks' AND column_name = 'language') THEN
    ALTER TABLE artworks 
    ADD COLUMN language VARCHAR(2) DEFAULT 'en',
    ADD COLUMN title_am TEXT,
    ADD COLUMN title_ru TEXT,
    ADD COLUMN description_am TEXT,
    ADD COLUMN description_ru TEXT;
  END IF;
END $$;

-- Add language support to exhibitions table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exhibitions' AND column_name = 'language') THEN
    ALTER TABLE exhibitions 
    ADD COLUMN language VARCHAR(2) DEFAULT 'en',
    ADD COLUMN title_am TEXT,
    ADD COLUMN title_ru TEXT,
    ADD COLUMN description_am TEXT,
    ADD COLUMN description_ru TEXT,
    ADD COLUMN location_am TEXT,
    ADD COLUMN location_ru TEXT,
    ADD COLUMN theme_am TEXT,
    ADD COLUMN theme_ru TEXT;
  END IF;
END $$;

-- Add language support to media table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'media' AND column_name = 'language') THEN
    ALTER TABLE media 
    ADD COLUMN language VARCHAR(2) DEFAULT 'en',
    ADD COLUMN title_am TEXT,
    ADD COLUMN title_ru TEXT,
    ADD COLUMN media_name_am TEXT,
    ADD COLUMN media_name_ru TEXT;
  END IF;
END $$;