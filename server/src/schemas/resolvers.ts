import { AuthenticationError } from 'apollo-server-errors';
import User, { UserDocument } from '../models/User.js';
import { signToken } from '../middleware/Auth.js';
import { JobDocument } from '../models/Job.js';



interface Context {
  user?: UserDocument;
}

const resolvers = {
  Query: {
    getSingleUser: async (_: unknown, { id, username }: { id?: string; username?: string }) => {
      return await User.findOne({ 
        $or: [{ _id: id }, { username }] 
      });
    },

    me: async (_: unknown, __: unknown, context: Context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    createUser: async (_: unknown, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Something went wrong!');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (_: unknown, { username, email, password }: { username?: string; email?: string; password: string }) => {
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
    saveJob: async (_: unknown, { jobInput }: { jobInput: JobDocument }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      // First check if the job already exists
      const existingUser = await User.findOne({
        _id: context.user._id,
        'savedJobs.jobId': jobInput.jobId
      });
    
      if (existingUser) {
        // If job exists, remove it first to ensure clean state
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedJobs: { jobId: jobInput.jobId } } }
        );
      }
    
      // Then add the job
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedJobs: jobInput } },
        { new: true, runValidators: true }
      ).exec();
    
      if (!updatedUser) {
        throw new Error('User not found');
      }
    
      return updatedUser; 
    },

    deleteJob: async (_: unknown, { jobId }: { jobId: string }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      // Find the user first to check if the job exists
      const user = await User.findById(context.user._id);
      console.log("Before delete - User has job:", 
        user?.savedJobs.some(job => job.jobId === jobId));
    
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedJobs: { jobId: jobId } } },
        { new: true }
      );
    
      console.log("After delete - User has job:", 
        updatedUser?.savedJobs.some(job => job.jobId === jobId));
    
      return updatedUser;
    },

    updateJobStatus: async (_: unknown, { jobId, status }: { jobId: string; status: string }, context: Context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { 
              _id: context.user._id,
              "savedJobs.jobId": jobId
            },
            { 
              $set: { "savedJobs.$.status": status }
            },
            { new: true }
          );
          
          if (!updatedUser) {
            throw new Error('Job not found in user\'s saved jobs');
          }
          
          // Find the updated job to return
          const updatedJob = updatedUser.savedJobs.find(job => job.jobId === jobId);
          return updatedJob;
        } catch (err) {
          console.error('Error updating job status:', err);
          throw new Error('Failed to update job status');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // Existing addComment mutation - ensure it's similar in structure
    addComment: async (_: unknown, { jobId, comment }: { jobId: string; comment: string }, context: Context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { 
              _id: context.user._id,
              "savedJobs.jobId": jobId
            },
            { 
              $set: { "savedJobs.$.comment": comment }
            },
            { new: true }
          );
          
          if (!updatedUser) {
            throw new Error('Job not found in user\'s saved jobs');
          }
          
          // Find the updated job to return
          const updatedJob = updatedUser.savedJobs.find(job => job.jobId === jobId);
          return updatedJob;
        } catch (err) {
          console.error('Error adding comment:', err);
          throw new Error('Failed to add comment');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};
export default resolvers;
