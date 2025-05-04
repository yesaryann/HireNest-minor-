import { createClient } from 'npm:@supabase/supabase-js@2';
import { load } from 'npm:cheerio@1.0.0-rc.12';
import { Job } from './types.ts';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function scrapeLinkedIn(): Promise<Job[]> {
  const jobs: Job[] = [];
  try {
    const response = await fetch('https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const html = await response.text();
    const $ = load(html);
    
    $('.job-search-card').each((_, element) => {
      const job: Job = {
        title: $(element).find('.job-search-card__title').text().trim(),
        company: $(element).find('.job-search-card__company-name').text().trim(),
        location: $(element).find('.job-search-card__location').text().trim(),
        url: $(element).find('a.job-search-card__link').attr('href') || '',
        description: '',
        posted_date: new Date(),
        source: 'LinkedIn',
        external_id: $(element).attr('data-id') || '',
      };
      
      if (job.title && job.company && job.url) {
        jobs.push(job);
      }
    });
  } catch (error) {
    console.error('Error scraping LinkedIn:', error);
  }
  return jobs;
}

async function scrapeNaukri(): Promise<Job[]> {
  const jobs: Job[] = [];
  try {
    const response = await fetch('https://www.naukri.com/jobapi/v3/search', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'appid': '109',
        'systemid': '109'
      }
    });
    
    const data = await response.json();
    
    if (data.jobDetails) {
      data.jobDetails.forEach((job: any) => {
        jobs.push({
          title: job.title,
          company: job.companyName,
          location: job.location.join(', '),
          url: job.jobUrl,
          description: job.jobDescription,
          posted_date: new Date(job.createdDate),
          source: 'Naukri',
          external_id: job.jobId,
        });
      });
    }
  } catch (error) {
    console.error('Error scraping Naukri:', error);
  }
  return jobs;
}

async function scrapeIndeed(): Promise<Job[]> {
  const jobs: Job[] = [];
  try {
    const response = await fetch('https://www.indeed.com/jobs', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const html = await response.text();
    const $ = load(html);
    
    $('.job_seen_beacon').each((_, element) => {
      const job: Job = {
        title: $(element).find('.jobTitle').text().trim(),
        company: $(element).find('.companyName').text().trim(),
        location: $(element).find('.companyLocation').text().trim(),
        url: 'https://www.indeed.com' + $(element).find('a').attr('href'),
        description: $(element).find('.job-snippet').text().trim(),
        posted_date: new Date(),
        source: 'Indeed',
        external_id: $(element).attr('data-jk') || '',
      };
      
      if (job.title && job.company && job.url) {
        jobs.push(job);
      }
    });
  } catch (error) {
    console.error('Error scraping Indeed:', error);
  }
  return jobs;
}

async function saveJobs(jobs: Job[]) {
  for (const job of jobs) {
    try {
      // Get source_id
      const { data: sourceData } = await supabase
        .from('job_sources')
        .select('id')
        .eq('name', job.source)
        .single();
      
      if (!sourceData?.id) continue;
      
      // Insert job
      const { error } = await supabase
        .from('jobs')
        .upsert({
          title: job.title,
          company: job.company,
          location: job.location,
          description: job.description,
          url: job.url,
          source_id: sourceData.id,
          external_id: job.external_id,
          posted_date: job.posted_date,
          last_scraped: new Date(),
        }, {
          onConflict: 'url',
        });
      
      if (error) {
        console.error('Error saving job:', error);
      }
    } catch (error) {
      console.error('Error in saveJobs:', error);
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const [linkedInJobs, naukriJobs, indeedJobs] = await Promise.all([
      scrapeLinkedIn(),
      scrapeNaukri(),
      scrapeIndeed(),
    ]);

    const allJobs = [...linkedInJobs, ...naukriJobs, ...indeedJobs];
    await saveJobs(allJobs);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Jobs scraped successfully',
        count: allJobs.length 
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    );
  }
});