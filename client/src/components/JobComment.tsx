import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT, UPDATE_JOB_STATUS } from '../utils/mutations';
import { Job } from '../models/Job';

// Define job status options
type JobStatus = 'Applied' | 'Researching' | 'On Hold';

interface JobCommentProps {
  job: Job;
  refetchJobs: () => void;
}

const JobComment: React.FC<JobCommentProps> = ({ job, refetchJobs }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(job.comment || '');
  const [status, setStatus] = useState<JobStatus>(job.status as JobStatus || 'Researching');
  
  const [addComment, { loading: commentLoading, error: commentError }] = useMutation(ADD_COMMENT);
  const [updateJobStatus, { loading: statusLoading, error: statusError }] = useMutation(UPDATE_JOB_STATUS);

  const loading = commentLoading || statusLoading;
  const error = commentError || statusError;

  useEffect(() => {
    setCommentText(job.comment || '');
    setStatus(job.status as JobStatus || 'Researching');
  }, [job.comment, job.status]);

  const handleSaveComment = async () => {
    try {
      // Save the comment
      const { data: commentData } = await addComment({
        variables: { jobId: job.jobId, comment: commentText },
      });
      
      // Update the job status
      const { data: statusData } = await updateJobStatus({
        variables: { jobId: job.jobId, status },
      });
      
      console.log('Data received:', { 
        commentData: JSON.stringify(commentData, null, 2),
        statusData: JSON.stringify(statusData, null, 2)
      });
      
      await refetchJobs(); // Sync with User.savedJobs
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating job:', err);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">Job Notes</h5>
        
        {/* Status indicator always visible */}
        <div className="status-indicator mb-3">
          <span className="fw-bold me-2">Status:</span>
          {!isEditing ? (
            <span className={`badge ${getStatusBadgeClass(status)}`}>
              {status || 'Not Set'}
            </span>
          ) : (
            <select 
              className="form-select form-select-sm d-inline-block w-auto ms-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus)}
            >
              <option value="Applied">Applied for job</option>
              <option value="Researching">Researching</option>
              <option value="On Hold">On Hold</option>
            </select>
          )}
        </div>
        
        {!isEditing ? (
          <>
            <div className="mb-3">
              {job.comment ? (
                <p>{job.comment}</p>
              ) : (
                <p className="text-muted fst-italic">No notes added yet</p>
              )}
            </div>
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
              {job.comment ? 'Edit Notes & Status' : 'Add Notes & Status'}
            </button>
          </>
        ) : (
          <>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="form-control mb-3"
              placeholder="Add your notes about this job..."
              rows={6}
            />
            <div className="d-flex gap-2">
              <button
                onClick={handleSaveComment}
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCommentText(job.comment || '');
                  setStatus(job.status as JobStatus || 'Researching');
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
            {error && (
              <div className="alert alert-danger mt-3">
                Error saving: {error.message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Helper function to get the appropriate Bootstrap badge class based on status
function getStatusBadgeClass(status: string | undefined): string {
  switch (status) {
    case 'Applied':
      return 'bg-success';
    case 'Researching':
      return 'bg-primary';
    case 'On Hold':
      return 'bg-warning text-dark';
    default:
      return 'bg-secondary';
  }
}

export default JobComment;