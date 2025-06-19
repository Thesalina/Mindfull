import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Hero from './Components/Hero.jsx';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login/Login.jsx';
import Footer from './Components/Footer.jsx';
import Layout from './Components/Layout.jsx';
import Homepage from './Components/Homepage.jsx';
import Signin from './Components/Login/Signin.jsx';
import ForgotPassword from './Components/Login/ForgotPassword.jsx';
import Profile from './Components/NavbarPages/Profile.jsx';
import TakeMentalHealthCheckIn from './Components/NavbarPages/TakeMentalHealthCheckIN.jsx';
import ResourceNav from './Components/NavbarPages/ResourceNav.jsx';
import SelfCareToolkit from './Components/NavbarPages/selfcareToolkit.jsx';
import { AuthProvider } from './Components/Login/AuthContext.jsx';
import Articaldetail from './Components/Resourcearticles/Articaldetail.jsx';
//import resource from '../backend/Models/resource.js';

// Define router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/home', element: <Hero /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signin /> },
      { path: '/forgotpassword', element: <ForgotPassword /> },
      { path: '/profile', element: <Profile /> },
      { path: '/checkin', element: <TakeMentalHealthCheckIn /> },
      { path: '/resources', element: <ResourceNav /> },
      { path: '/selfcaretoolkit', element: <SelfCareToolkit /> },
      { path: '/resources/:id', element: <Articaldetail /> },
     

    ]
  }
]);

// Render the entire app inside AuthProvider
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
