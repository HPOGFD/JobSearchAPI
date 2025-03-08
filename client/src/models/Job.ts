export interface Job {
  jobId: string;
  jobTitle: string;
  companyName: string;   // Changed from 'organizationName'
  locationName: string;
  salary: string;
  description: string;   // Added 'description'
  link: string;          // Added 'link'
}
