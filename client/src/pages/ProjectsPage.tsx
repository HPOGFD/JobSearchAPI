import PortfolioProjects from '../components/ProjectComponent';

const PortfolioPage = () => {
  return (
    <>
      <div className="text-light bg-dark p-5">
        <h1>Welcome to My Portfolio</h1>
      </div>
      <div className="container mt-4">
        <PortfolioProjects />
      </div>
    </>
  );
};

export default PortfolioPage;