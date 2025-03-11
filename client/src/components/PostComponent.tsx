import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Post } from '../interfaces/PostInterface';

interface PostComponentProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostComponent: React.FC<PostComponentProps> = ({ posts, setPosts }) => {
  const [postText, setPostText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postText.trim()) {
      setError('Post cannot be empty');
      return;
    }

    // Get user profile data from Auth
    const userProfile = Auth.getProfile();
    
    // Create new post object
    const newPost: Post = {
      id: Date.now(), // simple ID generation
      text: postText,
      author: userProfile?.data?.username || 'Anonymous User',
      timestamp: new Date().toISOString(),
      likes: 0,
      authorId: userProfile?.data?._id || undefined,
      edited: false
    };

    // Add new post to posts array
    setPosts([newPost, ...posts]);
    setPostText('');
    setError('');
    setSuccess('Post added successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 } 
          : post
      )
    );
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mb-4">
      {Auth.loggedIn() ? (
        <>
          <Card className="mb-4 bg-dark text-light border-primary">
            <Card.Body>
              <h4 className="text-primary mb-3">What's on your mind?</h4>
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Post
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <h4 className="text-primary mb-3">Recent Posts</h4>
          {posts.length > 0 ? (
            posts.map(post => (
              <Card key={post.id} className="mb-3 bg-dark text-light border-secondary">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-subtitle text-primary">{post.author}</h5>
                    <small className="text-muted">
                      {formatDate(post.timestamp)}
                      {post.edited && 
                        <span className="ms-2">(edited)</span>
                      }
                    </small>
                  </div>
                  <Card.Text>{post.text}</Card.Text>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleLike(post.id)}
                  >
                    <i className="bi bi-hand-thumbs-up"></i> Like ({post.likes})
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card className="bg-dark text-light border-secondary">
              <Card.Body>
                <Card.Text className="text-center">No posts yet. Be the first to share!</Card.Text>
              </Card.Body>
            </Card>
          )}
        </>
      ) : (
        <Card className="bg-dark text-light border-danger">
          <Card.Body className="text-center">
            <Card.Title className="text-danger">Login Required</Card.Title>
            <Card.Text>Please login or sign up to view and create posts.</Card.Text>
            <Button variant="primary" onClick={() => window.scrollTo(0, 0)}>
              Go to Login
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default PostComponent;