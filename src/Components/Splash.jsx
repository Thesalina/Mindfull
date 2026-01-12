import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.png'; 

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/layout');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden animate-fadeIn"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 animate-fadeInSlow z-0" />

      {/* Content */}
      <div className="z-10 w-full px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins tracking-wide animate-slideUp">
          Welcome to Mindfull
        </h1>

        {/* Quote Carousel Placeholder */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl h-[80px] overflow-hidden">
            {/* Quotes can fade or slide here */}
          </div>
        </div>

        <p className="mt-8 text-white opacity-70 text-sm animate-fadeIn">
          Taking you to your calm space... 💚
        </p>
      </div>
    </div>
  );
}
