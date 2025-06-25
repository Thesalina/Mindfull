import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Hero from './Components/Hero.jsx';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login/Login.jsx';
import Footer from './Components/Footer.jsx';
import Layout from './Components/Layout.jsx';
//import Homepage from './Components/Homepage.jsx';
import Signin from './Components/Login/Signin.jsx';
import ForgotPassword from './Components/Login/ForgotPassword.jsx';
import Profile from './Components/NavbarPages/Profile.jsx';
import TakeMentalHealthCheckIn from './Components/NavbarPages/TakeMentalHealthCheckIN.jsx';
import ResourceNav from './Components/NavbarPages/ResourceNav.jsx';
import SelfCareToolkit from './Components/NavbarPages/selfcareToolkit.jsx';
import { AuthProvider } from './Components/Login/AuthContext.jsx';
import Articaldetail from './Components/Resourcearticles/Articaldetail.jsx';
//import resource from '../backend/Models/resource.js';
import ProtectedRoute from './Components/Login/ProtectRoute.jsx';
import { ThemeProvider } from './Components/ThemeContext.jsx';

// Define router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signin /> },
      { path: '/forgotpassword', element: <ForgotPassword /> },

      // 🔐 PROTECTED ROUTES
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Hero />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/checkin',
        element: (
          <ProtectedRoute>
            <TakeMentalHealthCheckIn />
          </ProtectedRoute>
        ),
      },
      {
        path: '/resources',
        element: (
          <ProtectedRoute>
            <ResourceNav />
          </ProtectedRoute>
        ),
      },
      {
        path: '/resources/:id',
        element: (
          <ProtectedRoute>
            <Articaldetail />
          </ProtectedRoute>
        ),
      },
      {
        path: '/selfcaretoolkit',
        element: (
          <ProtectedRoute>
            <SelfCareToolkit />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
// Render the entire app inside AuthProvider
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
      
        <RouterProvider router={router} />
      </ThemeProvider>
      
    </AuthProvider>
  </React.StrictMode>
);
