import { Schema, type Document } from 'mongoose';

export interface JobDocument extends Document {
  jobId: string;
  jobTitle: string;
  companyName: string;
  locationName: string;
  salary: string;
  description: string;
  link: string;
}

const jobSchema = new Schema<JobDocument>({
  jobId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  locationName: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export default jobSchema;
