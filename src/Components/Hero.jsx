import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/BG.png'; // Replace with your image

export default function Hero() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [recentEntries, setRecentEntries] = useState([]);

  const quotes = [
    { text: "You don’t have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
    { text: "Mental health is not a destination, but a process.", author: "Noam Shpancer" },
    { text: "Self-care is how you take your power back.", author: "Lalah Delia" },
    { text: "This too shall pass.", author: "Persian Proverb" },
    { text: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
    { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "It is not the mountain we conquer, but ourselves.", author: "Sir Edmund Hillary" },
    { text: "The only way out is through.", author: "Robert Frost" },
    { text: "Sometimes the most productive thing you can do is relax.", author: "Mark Black" },
    { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
    { text: "You are enough just as you are.", author: "Meghan Markle" },
    { text: "The feeling that any task is a nuisance will soon disappear if it is done in mindfulness.", author: "Thich Nhat Hanh" },
    { text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
    { text: "Healing takes time, and asking for help is a courageous step.", author: "Unknown" }
  ];

  useEffect(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);

    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setRecentEntries(storedEntries.slice(0, 2));
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center px-6 py-12 font-sans overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      {/* Welcome Header */}
      <div className="max-w-3xl text-center space-y-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-white drop-shadow-lg">
          Welcome, Preety Soul 💚
        </h1>
        <p className="text-lg md:text-xl text-white/90">
          Take a moment for your mind. Your well-being matters.
        </p>

        <button
          onClick={() => navigate('/checkin')}
          className="mt-6 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          🧠 Take a Mental Health Check-In
        </button>
      </div>

      {/* Quote */}
      <div className="relative z-10 bg-white/70 backdrop-blur-lg border border-white/30 p-6 rounded-2xl mt-12 max-w-xl text-center shadow-lg">
        <p className="italic text-emerald-700">“{quote.text}”</p>
        <span className="block mt-2 text-sm text-emerald-600">– {quote.author}</span>
      </div>

      {/* Encouragement Tips */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 max-w-4xl w-full">
        <div className="bg-emerald-100/70 p-5 rounded-2xl text-center shadow text-emerald-700">
          🌿 Take 5 minutes to breathe deeply and reset.
        </div>
        <div className="bg-indigo-100/70 p-5 rounded-2xl text-center shadow text-emerald-700">
          🤝 Remember to talk to someone you trust today.
        </div>
      </div>

      {/* Recent Reflections */}
      <div className="relative z-10 mt-12 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Reflections</h2>
        <div className="space-y-3">
          {recentEntries.length === 0 ? (
            <p className="text-sm text-white/80">No reflections yet. Try writing your first journal entry!</p>
          ) : (
            recentEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-mint-light/80 p-4 rounded-2xl shadow text-sm text-emerald-700"
              >
                📝 “{entry.content}” <span className="text-emerald-600">– {entry.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
