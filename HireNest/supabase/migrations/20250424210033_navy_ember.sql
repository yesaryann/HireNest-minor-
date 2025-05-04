/*
  # Create jobs and sources tables

  1. New Tables
    - `job_sources`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `location` (text)
      - `salary` (text)
      - `description` (text)
      - `requirements` (text[])
      - `url` (text, unique)
      - `source_id` (uuid, foreign key)
      - `external_id` (text)
      - `posted_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `last_scraped` (timestamp)
      - `is_active` (boolean)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
    - Add policies for service role to manage data
*/

-- Create job_sources table
CREATE TABLE IF NOT EXISTS job_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  salary text,
  description text,
  requirements text[],
  url text UNIQUE NOT NULL,
  source_id uuid REFERENCES job_sources(id),
  external_id text,
  posted_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_scraped timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  
  CONSTRAINT fk_source
    FOREIGN KEY(source_id)
    REFERENCES job_sources(id)
    ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE job_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policies for job_sources
CREATE POLICY "Allow public read access to job_sources"
  ON job_sources
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow service role to manage job_sources"
  ON job_sources
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for jobs
CREATE POLICY "Allow public read access to active jobs"
  ON jobs
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow service role to manage jobs"
  ON jobs
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert default sources
INSERT INTO job_sources (name, url) VALUES
  ('LinkedIn', 'https://www.linkedin.com/jobs'),
  ('Naukri', 'https://www.naukri.com'),
  ('Indeed', 'https://www.indeed.com')
ON CONFLICT (name) DO NOTHING;