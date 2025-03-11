import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PostComponent from '../components/PostComponent';
import Auth from '../utils/auth';

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('userPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Save posts to localStorage whenever posts state changes
  useEffect(() => {
    localStorage.setItem('userPosts', JSON.stringify(posts));
  }, [posts]);

  return (
    <section className="py-5" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <Container>
        <div className="card border-primary mb-5">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">Community Feed</h2>
          </div>
          <div className="card-body bg-dark text-light">
            <p className="lead">
              Welcome to the community feed! This is a space for sharing thoughts, ideas, and updates with other users.
              {!Auth.loggedIn() && " Please log in to participate."}
            </p>
          </div>
        </div>
        
        <PostComponent posts={posts} setPosts={setPosts} />
      </Container>
    </section>
  );
};

export default PostPage;