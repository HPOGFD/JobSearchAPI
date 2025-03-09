import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_JOB } from '../utils/mutations';
import { Job } from '../models/Job';
import JobComment from '../components/JobComment'; // Import the new component

const SavedJobs = () => {
  const { loading, data, refetch, error } = useQuery(GET_ME);
  const [deleteJob, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_JOB);

  const userData = data?.me || {};

  const handleDeleteJob = async (jobId: string) => {
    try {
      const { data } = await deleteJob({ variables: { jobId } });
      if (!data) throw new Error('Something went wrong!');
      refetch();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading user data: {error.message}</h2>;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <h1>Viewing saved jobs!</h1>
      </div>
      <div className="container">
        <h2>
          {userData.savedJobs?.length
            ? `Viewing ${userData.savedJobs.length} saved ${
                userData.savedJobs.length === 1 ? 'job' : 'jobs'
              }:`
            : 'You have no saved jobs!'}
        </h2>
        <div className="row">
          {userData.savedJobs?.map((job: Job) => (
            <div key={job.jobId} className="mb-4">
              <div className="row">
                {/* Job Card - Now takes 8 columns */}
                <div className="col-md-8">
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
                      
                      <div className="d-flex justify-content-between flex-wrap">
                        <a
                          href={job.link || '#'}
                          className="btn btn-info me-2 mb-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Full Posting
                        </a>
                        <button
                          onClick={() => handleDeleteJob(job.jobId)}
                          disabled={deleteLoading}
                          className="btn btn-danger mb-2"
                        >
                          {deleteLoading ? 'Deleting...' : 'Delete this Job!'}
                        </button>
                      </div>
                      {deleteError && <p style={{ color: 'red' }}>Error: {deleteError.message}</p>}
                    </div>
                  </div>
                </div>
                
                {/* Comment Component - Takes 4 columns */}
                <div className="col-md-4">
                  <JobComment job={job} refetchJobs={refetch} />
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