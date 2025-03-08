import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_JOB } from '../utils/mutations';
import Auth from '../utils/auth';



// Define Job interface based on the Adzuna API response
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
  const [loading, setLoading] = useState(false); // State for loading
  const [saveJob] = useMutation(SAVE_JOB, {
    onError: (err) => console.error('Error saving job:', err),
  });

  // Handle form submit for job search
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchInput) {
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch(
        `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${import.meta.env.VITE_ADZUNA_APP_ID}&app_key=${import.meta.env.VITE_ADZUNA_APP_KEY}&query=${searchInput}`,
      );
      
      if (!response.ok) {
        throw new Error('Something went wrong with the API request');
      }

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
      console.error('Error searching for jobs:', err);
      alert('There was an error with the job search. Please try again later.');
    } finally {
      setLoading(false); // Set loading state to false after the request is done
    }
  };

  // Handle saving a job
  const handleSaveJob = async (jobId: string) => {
    // Check if user is logged in
    if (!Auth.loggedIn()) {
      alert('You need to be logged in to save jobs!');
      return;
    }

    const jobToSave = searchedJobs.find((job) => job.jobId === jobId);
    if (!jobToSave) {
      console.error('Job not found');
      return;
    }

    // Create jobInput object that matches the GraphQL schema
    const jobInput = {
      jobId: jobToSave.jobId,
      jobTitle: jobToSave.jobTitle,
      organizationName: jobToSave.companyName,
      locationName: jobToSave.locationName,
      salary: jobToSave.salary
    };

    try {
      const { data } = await saveJob({
        variables: { jobInput },
      });

      if (!data) {
        throw new Error('Something went wrong!');
      }

      console.log('Job saved successfully:', data);
    } catch (err) {
      console.error('Error saving job:', err);
      alert('There was an error saving the job. Please try again.');
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <h1>Search for Jobs</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <div className="col-12 col-md-8">
              <input
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                className="form-control form-control-lg"
                placeholder="Search for a job"
              />
            </div>
            <div className="col-12 col-md-4">
              <button type="submit" className="btn btn-lg btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Submit Search'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="container mt-4">
        <h2 className="text-center mb-4">
          {searchedJobs.length
            ? `Viewing ${searchedJobs.length} results:`
            : 'Search for a job to begin'}
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
                    <p className="description-text">{job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <a href={job.link} className="btn btn-info" target="_blank" rel="noopener noreferrer">
                      View Full Posting
                    </a>
                    {Auth.loggedIn() && (
                      <button 
                        onClick={() => handleSaveJob(job.jobId)} 
                        className="btn btn-success"
                      >
                        Save Job
                      </button>
                    )}
                  </div>
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
