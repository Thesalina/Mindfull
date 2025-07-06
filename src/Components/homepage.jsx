// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/BG.png'; // Replace with the path to your image

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div
        className="relative h-[90vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="absolute inset-0 bg-emerald-900 bg-opacity-40" />
        
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins drop-shadow-md">
            Welcome to Mindfull
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Your safe space for mental clarity and balance 💚
          </p>
          <Link
            to="/checkin"
            className="mt-8 inline-block bg-white text-emerald-700 px-6 py-3 rounded-full font-medium shadow hover:bg-emerald-100 transition"
          >
            Take a Mental Health Check-In
          </Link>
        </div>
      </div>

      {/* Footer Placeholder */}
      <footer className="bg-mint-light py-4 text-center text-emerald-600 font-medium">
        © {new Date().getFullYear()} Mindfull. All rights reserved.
      </footer>
    </div>
  );
}
