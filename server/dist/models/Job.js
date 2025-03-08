import { Schema } from 'mongoose';
const jobSchema = new Schema({
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
