import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from "./pages/ErrorPage"
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import ThankYou from './pages/ThankYou';
import Users from './pages/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/thankyou',
        element: <ThankYou />,
      },
      {
        path: '/users',
        element: <Users />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
