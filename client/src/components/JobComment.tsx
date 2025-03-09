// JobComment.tsx
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';
import { Job } from '../models/Job';

interface JobCommentProps {
  job: Job;
  refetchJobs: () => void;
}

const JobComment: React.FC<JobCommentProps> = ({ job, refetchJobs }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(job.comment || '');
  const [addComment, { loading, error }] = useMutation(ADD_COMMENT);

  useEffect(() => {
    setCommentText(job.comment || '');
  }, [job.comment]);

  const handleSaveComment = async () => {
    try {
      const { data } = await addComment({
        variables: { jobId: job.jobId, comment: commentText },
      });
      console.log('Comment data received:', JSON.stringify(data, null, 2));
      await refetchJobs(); // Sync with User.savedJobs
      setIsEditing(false);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">Job Notes</h5>
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
              {job.comment ? 'Edit Notes' : 'Add Notes'}
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
                disabled={loading || !commentText.trim()}
              >
                {loading ? 'Saving...' : 'Save Notes'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCommentText(job.comment || '');
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
            {error && (
              <div className="alert alert-danger mt-3">
                Error saving notes: {error.message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobComment;