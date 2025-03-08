import { AuthenticationError } from 'apollo-server-errors';
import User from '../models/User.js';
import { signToken } from '../middleware/Auth.js'; // Import signToken instead of authMiddleware
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
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedJobs: jobInput } }, // Updated from savedBooks to savedJobs
            { new: true, runValidators: true }).exec();
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        },
        deleteJob: async (_, { jobId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            return await User.findByIdAndUpdate(context.user._id, { $pull: { savedJobs: { jobId } } }, // Updated from savedBooks to savedJobs
            { new: true });
        },
    },
};
export default resolvers;
