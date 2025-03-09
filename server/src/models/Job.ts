import { Schema, model, type Document } from 'mongoose';

export interface JobDocument extends Document {
  jobId: string;
  jobTitle: string;
  companyName: string;
  locationName: string;
  salary: string;
  description: string;
  link: string;
  comment?: string;
}

const jobSchema = new Schema<JobDocument>({
  jobId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  locationName: {
    type: String
  },
  salary: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  comment: {
    type: String
  }
});

const Job = model<JobDocument>('Job', jobSchema);

// Export both the model and the schema
export { jobSchema };
export default Job;