/*
  # Add Sold Status to Artworks
  
  This migration adds the ability to mark artworks as sold.
  
  1. Changes to Tables
    - `artworks` table
      - Add `is_sold` (boolean) - Indicates if artwork has been sold
      - Default value: false (artwork is available)
  
  2. Purpose
    - Allow admin to mark artworks as sold/available
    - Display sold status to visitors on the website
    - Helps manage inventory and inform potential buyers
*/

-- Add is_sold column to artworks table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'artworks' AND column_name = 'is_sold'
  ) THEN
    ALTER TABLE public.artworks ADD COLUMN is_sold BOOLEAN NOT NULL DEFAULT false;
  END IF;
END $$;