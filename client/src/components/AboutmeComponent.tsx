

const AboutMe = () => {
  return (
    <section className="my-5">
      <div className="card border-primary">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">About Me</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0 text-center">
              {/* Replace with your actual profile image */}
              <img 
                src="images/pictureMe.JPG" 
                alt="Developer Profile" 
                className="img-fluid rounded-circle border border-primary" 
                style={{ maxWidth: '200px' }}
              />
              <div className="mt-3">
                <a href="https://github.com/HPOGFD" className="btn btn-outline-dark me-2" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-github"></i> GitHub
                </a>
                <a href="https://www.linkedin.com/in/harry-p-oyarvide-25a1585a/" className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-linkedin"></i> LinkedIn
                </a>
              </div>
            </div>
            <div className="col-md-8">
              <h3>Full Stack Developer</h3>
              <p className="lead">Passionate about creating responsive, user-focused web applications with modern technologies.</p>
              <p>
              Hi there! 👋 My name is Harry Oyarvide, a sales application engineer with a passion for back-end development and AWS cloud computing. My background in electrical engineering, combined with growing skills in JavaScript, Node, SQL, and React, fuels my love for problem-solving. Outside of tech, I enjoy hiking with my family and our dog, Xena, and I'm a huge F1 enthusiast 🏎️. 
              I'm on a mission to merge my engineering mindset with cutting-edge tech to create impactful solutions. Let's collaborate and build something amazing! 🚀
              </p>
              <h4 className="mt-4">Technical Skills</h4>
              <div className="d-flex flex-wrap">
                <span className="badge bg-primary me-2 mb-2 p-2">React</span>
                <span className="badge bg-primary me-2 mb-2 p-2">JavaScript</span>
                <span className="badge bg-primary me-2 mb-2 p-2">TypeScript</span>
                <span className="badge bg-primary me-2 mb-2 p-2">Node.js</span>
                <span className="badge bg-primary me-2 mb-2 p-2">Express</span>
                <span className="badge bg-primary me-2 mb-2 p-2">GraphQL</span>
                <span className="badge bg-primary me-2 mb-2 p-2">MongoDB</span>
                <span className="badge bg-primary me-2 mb-2 p-2">Bootstrap</span>
                <span className="badge bg-primary me-2 mb-2 p-2">Responsive Design</span>
                {/* Add more skills as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;