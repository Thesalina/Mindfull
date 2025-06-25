import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen  text-emerald-600 font-sans px-4 py-12 flex flex-col items-center bg-white dark:bg-slate-800 dark:text-white rounded-xl shadow p-6 transition-colors duration-300">
      {/* Welcome Header */}
      <div className="max-w-3xl text-center space-y-4">
        <h1 className="text-4xl font-bold text-emerald-600">Welcome back, [name]! 💚</h1>
        <p className="text-lg text-emerald-600">
          Take a moment for your mind. Your well-being matters.
        </p>

        <button
          onClick={() => navigate('/checkin')}
          className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 mt-6"
        >
          🧠 Take a Mental Health Check-In
        </button>
      </div>

      {/* Quote */}
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl mt-12 max-w-xl text-center shadow-sm">
        <p className="italic text-emerald-600">
          “You don’t have to control your thoughts. You just have to stop letting them control you.”
        </p>
        <span className="block mt-2 text-sm text-emerald-600">– Dan Millman</span>
      </div>

      {/* Encouragement Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 max-w-4xl w-full">
        <div className="bg-emerald-100 p-5 rounded-xl text-emerald-600 text-center shadow">
          🌿 Take 5 minutes to breathe deeply and reset.
        </div>
        <div className="bg-indigo-100 p-5 rounded-xl text-emerald-600 text-center shadow">
          🤝 Remember to talk to someone you trust today.
        </div>
      </div>

      {/* Optional: Recent Reflections Preview */}
      <div className="mt-12  w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-emerald-600">Recent Reflections</h2>
        <div className="space-y-3">
          <div className="bg-mint-light p-4 rounded-lg shadow-sm text-sm text-emerald-600">
            📝 “Felt better after journaling this morning.” <span className="text-emerald-600">– 1 day ago</span>
          </div>
          <div className="bg-mint-light p-4 rounded-lg shadow-sm text-sm text-emerald-600">
            📝 “Practiced mindfulness after lunch.” <span className="text-emerald-600">– 3 days ago</span>
          </div>
        </div>
      </div>
    </section>
  );
}
