import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';  // Assuming this query returns the user and saved jobs
import { DELETE_JOB } from '../utils/mutations';  // Assuming DELETE_JOB mutation exists in your project
import { Job } from '../models/Job';  // Define your Job model

const SavedJobs = () => {
  const { loading, data, refetch, error } = useQuery(GET_ME);
  const [deleteJob, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_JOB);

  const userData = data?.me || {};
  console.log('Saved Jobs:', JSON.stringify(userData.savedJobs, null, 2));

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
        <div className="row">
          {userData.savedJobs?.map((job: Job) => (
            <div key={job.jobId} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">{job.jobTitle}</h3>
                  <h4 className="card-subtitle mb-2 text-muted">{job.companyName}</h4>
                  <p className="card-text"><strong>Location:</strong> {job.locationName}</p>
                  <p className="card-text"><strong>Salary:</strong> {job.salary || 'N/A'}</p>
                  <div className="card-text mb-3">
                    <strong>Description:</strong>
                    <p className="description-text">
                      {job.description
                        ? job.description.length > 200
                          ? `${job.description.substring(0, 200)}...`
                          : job.description
                        : 'No description available'}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <a
                      href={job.link || '#'}
                      className="btn btn-info"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Full Posting
                    </a>
                    <button
                      onClick={() => handleDeleteJob(job.jobId)}
                      disabled={deleteLoading}
                      className="btn btn-danger"
                    >
                      {deleteLoading ? 'Deleting...' : 'Delete this Job!'}
                    </button>
                  </div>
                  {deleteError && <p style={{ color: 'red' }}>Error: {deleteError.message}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedJobs;
