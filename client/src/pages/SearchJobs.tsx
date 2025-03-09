// pages/SearchJobs.tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_JOB } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';

interface Job {
  jobId: string;
  jobTitle: string;
  companyName: string;
  locationName: string;
  salary: string;
  description: string;
  link: string;
}

const SearchJobs = () => {
  const [searchedJobs, setSearchedJobs] = useState<Job[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState<{ jobId: string; message: string } | null>(null);

  const [saveJob, { loading: saveLoading }] = useMutation(SAVE_JOB, {
    onError: (err) => console.error('Mutation error:', err.message, err.graphQLErrors),
  });

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchInput) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `http://localhost:3001/api/jobs/search?query=${encodeURIComponent(searchInput)}`
      );
      if (!response.ok) throw new Error('API request failed');

      const { results } = await response.json();
      if (!results || results.length === 0) {
        setSearchedJobs([]);
        return;
      }

      const jobData = results.map((item: any) => ({
        jobId: item.id,
        jobTitle: item.title,
        companyName: item.company.display_name,
        locationName: item.location.display_name || 'Location not specified',
        salary: item.salary_min && item.salary_max ? `${item.salary_min} - ${item.salary_max}` : 'Not disclosed',
        description: item.description || 'No description available',
        link: item.redirect_url,
      }));

      setSearchedJobs(jobData);
      setSearchInput('');
    } catch (err) {
      console.error('Error searching jobs:', err);
      setError('Failed to fetch jobs. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (jobId: string) => {
    if (!Auth.loggedIn()) {
      alert('Please log in to save jobs!');
      return;
    }

    const jobToSave = searchedJobs.find((job) => job.jobId === jobId);
    if (!jobToSave) {
      console.error('Job not found');
      return;
    }

    const jobInput = {
      jobId: jobToSave.jobId,
      jobTitle: jobToSave.jobTitle,
      companyName: jobToSave.companyName,
      locationName: jobToSave.locationName,
      salary: jobToSave.salary,
      description: jobToSave.description,
      link: jobToSave.link,
    };

    console.log('Saving job with input:', jobInput);

    try {
      const { data } = await saveJob({
        variables: { jobInput },
        update: (cache, { data }) => {
          const existingUser = cache.readQuery<{ me: { savedJobs: Job[] } }>({ query: GET_ME });
          if (existingUser && data?.saveJob) {
            cache.writeQuery({
              query: GET_ME,
              data: { me: { ...existingUser.me, savedJobs: data.saveJob.savedJobs } },
            });
          }
        },
      });

      if (!data || !data.saveJob) {
        throw new Error('No data returned from saveJob mutation');
      }

      console.log('Job saved successfully:', data);
      setSaveMessage({ jobId, message: `${jobToSave.jobTitle} saved successfully!` });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      const error = err as any;
      console.error('Error saving job:', error.message, error.graphQLErrors);
      if (err instanceof Error && err.message.includes('E11000 duplicate key')) {
        setSaveMessage({ jobId, message: `${jobToSave.jobTitle} is already saved!` });
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        if (err instanceof Error) {
          alert(`Failed to save job: ${err.message}`);
        } else {
          alert('Failed to save job: An unknown error occurred.');
        }
      }
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <h1>Search for Jobs</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <div className="col-12 col-md-8 mb-2 mb-md-0">
              <input
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                className="form-control form-control-lg"
                placeholder="Search for a job (e.g., 'developer in Austin')"
              />
            </div>
            <div className="col-12 col-md-4">
              <button type="submit" className="btn btn-lg btn-primary w-100" disabled={loading}>
                {loading ? 'Searching...' : 'Submit Search'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {error && (
        <div className="container mt-3">
          <div className="alert alert-danger" role="alert">{error}</div>
        </div>
      )}

      <div className="container mt-4">
        <h2 className="text-center mb-4">
          {searchedJobs.length ? `Viewing ${searchedJobs.length} results:` : 'Search for a job to begin'}
        </h2>
        <div className="row">
          {searchedJobs.map((job) => (
            <div key={job.jobId} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">{job.jobTitle}</h3>
                  <h4 className="card-subtitle mb-2 text-muted">{job.companyName}</h4>
                  <p className="card-text"><strong>Location:</strong> {job.locationName}</p>
                  <p className="card-text"><strong>Salary:</strong> {job.salary}</p>
                  <div className="card-text mb-3">
                    <strong>Description:</strong>
                    <p className="description-text">
                      {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <a href={job.link} className="btn btn-info" target="_blank" rel="noopener noreferrer">
                      View Full Posting
                    </a>
                    {Auth.loggedIn() && (
                      <button
                        onClick={() => handleSaveJob(job.jobId)}
                        className="btn btn-success"
                        disabled={saveLoading}
                      >
                        {saveLoading ? 'Saving...' : 'Save Job'}
                      </button>
                    )}
                  </div>
                  {saveMessage && saveMessage.jobId === job.jobId && (
                    <div className="alert alert-success mt-2" role="alert">
                      {saveMessage.message}
                    </div>
                  )}
                  {!Auth.loggedIn() && (
                    <p className="text-secondary bg-light p-2">Log in to save jobs!</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchJobs;