import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-gradient-to-tr from-emerald-100 to-emerald-300">
      
      {/* Navbar stays at the top */}
      <Navbar />
      
      {/* The 'flex-grow' ensures that the main content takes up 
          all available space, pushing the footer to the bottom.
      */}
      <main className="flex-grow relative overflow-hidden">
        
        {/* Optional: Subtle background "blur blobs" to add depth across all pages */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full filter blur-3xl pointer-events-none"></div>

        {/* This is where Login, Profile, and Resources will render */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}