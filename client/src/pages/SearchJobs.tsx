import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_JOB } from '../utils/mutations'; // Assume you have a mutation for saving jobs
import Auth from '../utils/auth';

// Define Job interface based on the USAJOBS API response
interface Job {
  jobId: string;
  jobTitle: string;
  organizationName: string;
  location: string;
  salary: string;
  description: string;
  link: string;
}

const SearchJobs = () => {
  const [searchedJobs, setSearchedJobs] = useState<Job[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const [saveJob] = useMutation(SAVE_JOB, {
    onError: (err) => console.error('Error saving job:', err),
  });

  // Handle form submit for job search
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://data.usajobs.gov/api/Search?Keyword=${searchInput}`, {
        headers: {
          'User-Agent': 'p_oyarvide@yahoo.com',
          'Authorization-Key': "LkYZ3sOnXI8PHkDE8xBvSGrgEG5ss3qlQ9uZB/CjGTE=" || '',
        },
      });
      const { SearchResult } = await response.json();
      const jobData = SearchResult?.SearchResultItems?.map((item: any) => ({
        jobId: item.MatchedObjectDescriptor.PositionID,
        jobTitle: item.MatchedObjectDescriptor.JobTitle,
        organizationName: item.MatchedObjectDescriptor.OrganizationName,
        location: item.MatchedObjectDescriptor.PositionLocation,
        salary: item.MatchedObjectDescriptor.MinimumRange,
        description: item.MatchedObjectDescriptor.PositionDescription,
        link: item.MatchedObjectDescriptor.PositionURL,
      }));

      setSearchedJobs(jobData || []);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle saving a job
  const handleSaveJob = async (jobId: string) => {
    const jobToSave = searchedJobs.find((job) => job.jobId === jobId);
    if (!jobToSave) {
      console.error('Job not found');
      return;
    }

    console.log('Job to save:', jobToSave); // Log the object before saving

    try {
      const { data } = await saveJob({
        variables: { jobInput: jobToSave }, // Pass jobToSave as jobInput
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
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search for a job"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">Submit Search</button>
        </form>
      </div>

      <div>
        <h2>
          {searchedJobs.length
            ? `Viewing ${searchedJobs.length} results:`
            : 'Search for a job to begin'}
        </h2>
        <div>
          {searchedJobs.map((job) => (
            <div key={job.jobId}>
              <h3>{job.jobTitle}</h3>
              <p>Organization: {job.organizationName}</p>
              <p>Location: {job.location}</p>
              <p>Salary: {job.salary || 'Not disclosed'}</p>
              <p>{job.description}</p>
              <a href={job.link} target="_blank" rel="noopener noreferrer">
                View Job Posting
              </a>
              {Auth.loggedIn() && (
                <button onClick={() => handleSaveJob(job.jobId)}>
                  Save this Job!
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchJobs;
