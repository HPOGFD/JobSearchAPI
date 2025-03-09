import { AuthenticationError } from 'apollo-server-errors';
import User from '../models/User.js';
import { signToken } from '../middleware/Auth.js';
const resolvers = {
    Query: {
        getSingleUser: async (_, { id, username }) => {
            return await User.findOne({
                $or: [{ _id: id }, { username }]
            });
        },
        me: async (_, __, context) => {
            if (context.user) {
                return await User.findById(context.user._id);
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                throw new Error('Something went wrong!');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        login: async (_, { username, email, password }) => {
            const user = await User.findOne({
                $or: [{ username }, { email }]
            });
            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        saveJob: async (_, { jobInput }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            // Find and update the user
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedJobs: jobInput } }, { new: true, runValidators: true }).exec();
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        },
        deleteJob: async (_, { jobId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            return await User.findByIdAndUpdate(context.user._id, { $pull: { savedJobs: { jobId } } }, { new: true });
        },
        addComment: async (_, { jobId, comment }, { user }) => {
            if (!user)
                throw new AuthenticationError('You need to be logged in!');
            const updatedUser = await User.findOneAndUpdate({ _id: user._id, 'savedJobs.jobId': jobId }, { $set: { 'savedJobs.$.comment': comment } }, { new: true });
            if (!updatedUser)
                throw new Error('Job not found in saved jobs');
            const updatedJob = updatedUser.savedJobs.find(job => job.jobId === jobId);
            console.log('Updated Job:', updatedJob);
            return updatedJob;
        },
    }
};
export default resolvers;
