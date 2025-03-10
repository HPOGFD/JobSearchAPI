import AboutMe from '../components/AboutmeComponent';

const PortfolioPage = () => {
  return (
    <>
      <div className="text-light bg-dark p-5">
        <h1>Welcome to My Portfolio</h1>
      </div>
      <div className="container mt-4">
        <AboutMe />
      </div>
    </>
  );
};

export default PortfolioPage;