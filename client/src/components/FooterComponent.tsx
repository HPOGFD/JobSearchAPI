import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-danger mb-3">Harry Oyarvide</h5>
            <p className="mb-0">Full Stack Developer</p>
            <p className="small text-muted">Passionate about creating responsive, user-focused web applications</p>
          </div>
          
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-danger mb-3">Connect</h5>
            <div className="d-flex flex-column">
              <a href="poyarvide87@gmail.com" className="text-light text-decoration-none mb-2">
                <i className="bi bi-envelope me-2"></i>Email me
                </a>
              <a href="https://github.com/HPOGFD" className="text-light text-decoration-none mb-2" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github me-2"></i>GitHub
              </a>
              <a href="https://www.linkedin.com/in/harry-p-oyarvide-25a1585a/" className="text-light text-decoration-none" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin me-2"></i>LinkedIn
              </a>
            </div>
          </div>
          
          <div className="col-md-4">
            <h5 className="text-danger mb-3">Quick Links</h5>
            <div className="d-flex flex-column">
              <a href="/" className="text-light text-decoration-none mb-2">About Me</a>
              <a href="/projects" className="text-light text-decoration-none mb-2">Projects</a>
              <a href="/jobs" className="text-light text-decoration-none mb-2">Search Jobs</a>
              <a href="/resume.pdf" className="text-light text-decoration-none" target="_blank" rel="noopener noreferrer">Resume</a>
            </div>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" />
        
        <div className="row">
          <div className="col-md-6 mb-2 mb-md-0">
            <p className="mb-0 small">© {currentYear} Harry Oyarvide. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 small text-muted">Built with React, Bootstrap, and TypeScript</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
