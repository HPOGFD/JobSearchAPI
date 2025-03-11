import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchJobs from './pages/SearchJobs';
import SavedJobs from './pages/SavedJobs';
import PostPage from './pages/PostPage';

// Define the routes for the community-focused app
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <PostPage /> // Make PostPage the default/home page
      },
      {
        path: '/jobs',
        element: <SearchJobs />
      },
      {
        path: '/saved',
        element: <SavedJobs />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}