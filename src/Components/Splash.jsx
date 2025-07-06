import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import Quotecarausal from '../Components/QuoteCarausal';
import background from '../assets/background.png'; 

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/layout'); //
    }, 5000); // 5 seconds


    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* Content */}
      <div className="z-10 w-full px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins tracking-wide">
          Welcome to Mindfull
        </h1>

        {/* Quote Carousel */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl h-[80px] overflow-hidden">
         
          </div>
        </div>

        <p className="mt-8 text-white opacity-70 text-sm">
          Taking you to your calm space... 💚
        </p>
      </div>
    </div>
  );
}
