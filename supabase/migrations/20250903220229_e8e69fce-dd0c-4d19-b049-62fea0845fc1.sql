-- Add language support to existing tables
ALTER TABLE artworks 
ADD COLUMN language VARCHAR(2) DEFAULT 'en',
ADD COLUMN title_am TEXT,
ADD COLUMN title_ru TEXT,
ADD COLUMN description_am TEXT,
ADD COLUMN description_ru TEXT;

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

ALTER TABLE media 
ADD COLUMN language VARCHAR(2) DEFAULT 'en',
ADD COLUMN title_am TEXT,
ADD COLUMN title_ru TEXT,
ADD COLUMN media_name_am TEXT,
ADD COLUMN media_name_ru TEXT;