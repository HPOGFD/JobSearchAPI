import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchJobs from './pages/SearchJobs';
import SavedJobs from './pages/SavedJobs';
import PortfolioPage from './pages/AboutmePage';
import ProjectsPage from './pages/ProjectsPage'; // Import the new ProjectsPage component
import PostPage from './pages/PostPage';

// Define the routes for the jobs-related app
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <PortfolioPage /> // Make PortfolioPage the default/home page
      },
      {
        path: '/projects',
        element: <ProjectsPage /> // Add the new Projects route
      },
      {
        path: '/posts',
        element: <PostPage /> // New Posts route
      },
      {
        path: '/jobs',
        element: <SearchJobs /> // Move job search to /jobs route
      },
      {
        path: '/saved',
        element: <SavedJobs /> // Keep saved jobs route
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}