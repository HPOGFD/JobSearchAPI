import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="text-danger mb-3">Community Hub</h5>
            <p className="small text-light">Connect with others and find job opportunities</p>
          </div>
          
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="text-danger mb-3">Quick Links</h5>
            <div className="d-flex flex-column">
              <a href="/" className="text-light text-decoration-none mb-2">Community</a>
              <a href="/jobs" className="text-light text-decoration-none mb-2">Search Jobs</a>
              <a href="/saved" className="text-light text-decoration-none">Saved Jobs</a>
            </div>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" />
        
        <div className="row">
          <div className="col-md-6 mb-2 mb-md-0">
            <p className="mb-0">
              <span className="fw-bold" style={{fontFamily: 'cursive, sans-serif'}}>Harry P. Oyarvide</span>
              <span className="small text-muted ms-2">Full Stack Developer</span>
            </p>
            <p className="mb-0 small">© {currentYear} Harry Oyarvide. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 small text-muted">Built with React, Node.js, Express & MongoDB</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;