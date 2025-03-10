const AboutMe = () => {
    return (
      <section className="my-5">
        <div className="container-fluid p-0">
          <div className="card bg-dark text-white border-0 w-100 rounded-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-4 mb-md-0 text-center">
                  <img 
                    src="images/pictureMe.JPG" 
                    alt="Developer Profile" 
                    className="img-fluid rounded-circle border border-light" 
                    style={{ maxWidth: '200px' }}
                  />
                  <div className="mt-3">
                    <a href="https://github.com/HPOGFD" className="btn btn-outline-light me-2" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-github"></i> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/harry-p-oyarvide-25a1585a/" className="btn btn-outline-light" target="_blank" rel="noopener noreferrer">
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
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">React</span>
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">JavaScript</span>
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">TypeScript</span>
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">Node.js</span>
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">Express</span>
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">GraphQL</span>
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">MongoDB</span>
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">Bootstrap</span>
                    <span className="badge bg-light text-dark me-2 mb-2 p-2">Responsive Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutMe;
  