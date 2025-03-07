import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchJobs from './pages/SearchJobs';  // Updated component name
import SavedJobs from './pages/SavedJobs';  // Updated component name

// Define the routes for the jobs-related app
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchJobs />  // Component for searching jobs
      },
      {
        path: '/saved',
        element: <SavedJobs />  // Component for viewing saved jobs
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
