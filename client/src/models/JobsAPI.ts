export interface JobInfo {
  jobTitle: string;
  organizationName: string;
  locationName: string;
  minimumRange: number;
}

export interface Job {
  jobId: string;
  jobInfo: JobInfo;
}
