import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/BG.png';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[90vh] w-full flex items-center justify-center">
        {/* Animated Gradient Blobs */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300 rounded-full opacity-30 animate-blob"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-mint rounded-full opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-emerald-200 rounded-full opacity-25 animate-blob animation-delay-4000"></div>
        </div>

        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-mint/30 to-emerald-700/50" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins drop-shadow-lg animate-fadeIn">
            Welcome to Mindfull
          </h1>
          <p className="mt-4 text-lg md:text-xl animate-fadeIn delay-500">
            Your safe space for mental clarity and balance 💚
          </p>
          <Link
            to="/checkin"
            className="mt-8 inline-block bg-white text-emerald-700 px-6 py-3 rounded-full font-medium shadow hover:bg-emerald-100 transition animate-fadeIn delay-700"
          >
            Take a Mental Health Check-In
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-mint-light py-4 text-center text-emerald-600 font-medium">
        © {new Date().getFullYear()} Mindfull. All rights reserved.
      </footer>
    </div>
  );
}
