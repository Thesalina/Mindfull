import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Hero from './Components/Hero.jsx';
import Navbar from './Components/Navbar.jsx';
import Login from './Components/Login/Login.jsx';
import Footer from './Components/Footer.jsx';
import Layout from './Components/Layout.jsx';
import homepage from './Components/homepage.jsx';
import Signin from './Components/Login/Signin.jsx';
import ForgotPassword from './Components/Login/ForgotPassword.jsx';
import Profile from './Components/NavbarPages/Profile.jsx';
import TakeMentalHealthCheckIn from './Components/NavbarPages/TakeMentalHealthCheckIN.jsx';
import ResourceNav from './Components/NavbarPages/ResourceNav.jsx';

import { AuthProvider } from './Components/Login/AuthContext.jsx';
import Articaldetail from './Components/SubComponent/Articaldetail.jsx';

import ProtectedRoute from './Components/Login/ProtectRoute.jsx';
import { ThemeProvider } from './Components/ThemeContext.jsx';
//import Splash from './Components/Splash.jsx'; // Import the Splash component

// Define router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // ✅ Default route for "/"
      { 
        index: true, 
        element: (
          <ProtectedRoute>
            <Hero />
          </ProtectedRoute>
        ) 
      },

      // Public routes
      { path: '/signin', element: <Signin /> },
      { path: '/login', element: <Login /> },
      { path: '/forgotpassword', element: <ForgotPassword /> },

      // Protected routes
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
