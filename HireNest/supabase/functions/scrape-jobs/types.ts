export interface Job {
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  posted_date: Date;
  source: 'LinkedIn' | 'Naukri' | 'Indeed';
  external_id: string;
  salary?: string;
  requirements?: string[];
}