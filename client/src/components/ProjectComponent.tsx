

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink: string;
  liveLink?: string;
  featured: boolean;
}

const PortfolioProjects = () => {
  const projects: Project[] = [
    {
      id: 'job-search',
      title: 'Job Search Platform',
      description: 'A full-stack application that allows users to search for jobs, save them, and add notes to track application progress.',
      technologies: ['React', 'TypeScript', 'GraphQL', 'MongoDB', 'Node.js', 'Express', 'Bootstrap'],
      image: '/api/placeholder/600/400',
      githubLink: 'https://github.com/yourusername/job-search',
      liveLink: 'https://your-job-search-app.com',
      featured: true
    },
    {
      id: 'project-2',
      title: 'Google Books Search API',
      description: 'A full-stack MERN application integrating Google Books API with GraphQL and MongoDB.',
      technologies: ['React', 'CSS', 'Firebase', 'GraphQL', 'MongoDB', 'Node.js', 'Express'],
      image: '/api/placeholder/600/400',
      githubLink: 'https://github.com/yourusername/project-2',
      liveLink: 'https://project-3-demo.com',
      featured: false
    },
    {
      id: 'project-3',
      title: 'Social Network API',
      description: 'A social network API built with Express.js, MongoDB, and TypeScript, providing CRUD operations for thoughts, reactions, and friends.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
      image: '/api/placeholder/600/400',
      githubLink: 'https://github.com/yourusername/project-3',
      liveLink: 'https://project-3-demo.com',
      featured: false
    }
,
{
    id: 'project-3',
    title: 'Social Network API',
    description: 'A social network API built with Express.js, MongoDB, and TypeScript, providing CRUD operations for thoughts, reactions, and friends.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
    image: '/api/placeholder/600/400',
    githubLink: 'https://github.com/yourusername/project-3',
    liveLink: 'https://project-3-demo.com',
    featured: false
  }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section className="my-5">
      <div className="card bg-dark text-light">
        <div className="card-header bg-transparent text-light">
          <h2 className="mb-0">My Projects</h2>
        </div>
        <div className="card-body">
          {featuredProjects.length > 0 && (
            <>
              <h3 className="mb-4">Featured Projects</h3>
              <div className="row">
                {featuredProjects.map(project => (
                  <div key={project.id} className="col-12 mb-5">
                    <div className="card h-100 shadow bg-secondary text-light">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="img-fluid rounded-start h-100" 
                            style={{ objectFit: 'cover' }} 
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h4 className="card-title">{project.title}</h4>
                            <p className="card-text">{project.description}</p>
                            <div className="mb-3">
                              {project.technologies.map((tech, index) => (
                                <span key={index} className="badge bg-light text-dark me-2 mb-2">{tech}</span>
                              ))}
                            </div>
                            <div className="d-flex">
                              <a href={project.githubLink} className="btn btn-light me-2" target="_blank" rel="noopener noreferrer">
                                GitHub Repo
                              </a>
                              {project.liveLink && (
                                <a href={project.liveLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                  Live Demo
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="mb-4 mt-4">Other Projects</h3>
          <div className="row">
            {otherProjects.map(project => (
              <div key={project.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow bg-secondary text-light">
                  <img 
                    src={project.image}
                    alt={project.title} 
                    className="card-img-top" 
                    height="200"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                    <div className="mb-3">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="badge bg-light text-dark me-2 mb-2">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="card-footer bg-dark">
                    <div className="d-flex">
                      <a href={project.githubLink} className="btn btn-light me-2" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                      {project.liveLink && (
                        <a href={project.liveLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioProjects;
