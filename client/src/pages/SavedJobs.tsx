import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';  // Assuming this query returns the user and saved jobs
import { DELETE_JOB } from '../utils/mutations';  // Assuming DELETE_JOB mutation exists in your project
import { Job } from '../models/Job';  // Define your Job model

const SavedJobs = () => {
  const { loading, data, refetch, error } = useQuery(GET_ME);
  const [deleteJob, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_JOB);

  const userData = data?.me || {};

  const handleDeleteJob = async (jobId: string) => {
    try {
      const { data } = await deleteJob({
        variables: { jobId }
      });

      if (!data) {
        throw new Error('Something went wrong!');
      }

      // Refetch the user's data to update the UI
      refetch();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error loading user data: {error.message}</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <h1>Viewing saved jobs!</h1>
      </div>
      <div>
        <h2>
          {userData.savedJobs?.length
            ? `Viewing ${userData.savedJobs.length} saved ${
                userData.savedJobs.length === 1 ? 'job' : 'jobs'
              }:`
            : 'You have no saved jobs!'}
        </h2>
        <div>
          {userData.savedJobs?.map((job: Job) => (
            <div key={job.jobId}>
              <h3>{job.jobTitle}</h3>
              <p>Company: {job.companyName}</p>  {/* Updated to 'companyName' */}
              <p>Location: {job.locationName}</p>
              <p>Salary: {job.salary}</p>
              <p>{job.description ? job.description : 'No description available'}</p>
              <a href={job.link} target="_blank" rel="noopener noreferrer">
                View Full Job Posting
              </a>
              <br />
              <button onClick={() => handleDeleteJob(job.jobId)} disabled={deleteLoading}>
                {deleteLoading ? 'Deleting...' : 'Delete this Job!'}
              </button>
              {deleteError && <p style={{ color: 'red' }}>Error: {deleteError.message}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedJobs;
