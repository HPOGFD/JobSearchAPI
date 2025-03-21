import { Schema, model } from 'mongoose';
const jobSchema = new Schema({
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
    },
    status: {
        type: String,
        enum: ['Applied', 'Researching', 'On Hold'],
        default: 'Researching',
    },
});
const Job = model('Job', jobSchema);
// Export both the model and the schema
export { jobSchema };
export default Job;
