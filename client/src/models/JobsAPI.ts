export interface JobInfo {
  jobTitle: string;
  companyName: string;
  locationName: string;
  minimumRange: number;
}

export interface Job {
  jobId: string;
  jobInfo: JobInfo;
  link: string;        // Added required field
  description: string; // Added required field
}