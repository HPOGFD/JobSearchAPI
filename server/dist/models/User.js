import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
// Import schema from Job.js
import { jobSchema } from './Job.js';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    // Set savedJobs to be an array of job schemas
    savedJobs: [jobSchema],
}, {
    toJSON: {
        virtuals: true,
    },
});
// Hash user password before saving
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
// Virtual field for job count
userSchema.virtual('jobCount').get(function () {
    return this.savedJobs.length;
});
const User = model('User', userSchema);
export default User;
