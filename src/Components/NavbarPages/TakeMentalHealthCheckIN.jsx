import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { db } from './firebase'; // Optional: if using Firebase
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const moods = [
  {
    label: 'Excellent',
    color: 'from-green-300 to-green-500',
    icon: '⭐',
    message: 'Keep shining! Today is your day!',
  },
  {
    label: 'Good',
    color: 'from-sky-300 to-sky-500',
    icon: '😊',
    message: 'Glad to hear that! Keep the good vibes going.',
  },
  {
    label: 'Okay',
    color: 'from-yellow-300 to-yellow-500',
    icon: '😐',
    message: 'It’s okay to have neutral days. You’re doing fine.',
  },
  {
    label: 'Down',
    color: 'from-orange-300 to-orange-500',
    icon: '😔',
    message: 'Take it easy today. You’re not alone.',
  },
  {
    label: 'Struggling',
    color: 'from-rose-300 to-rose-500',
    icon: '💔',
    message: 'We’re here for you. Don’t hesitate to reach out for support.',
  },
];

export default function MentalHealthCheckIn() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
const navigate = useNavigate();


  const currentMood = moods.find((m) => m.label === selectedMood);

  const handleSubmit = async () => {
    setSubmitted(true);
      setTimeout(() => {
    navigate('/home');
  }, 5000); // waits 2 seconds before redirecting
  
  };

  return (
    <section className="min-h-screen bg-white text-emerald-600 p-6 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">🧠 Take a Mental Health Check-In</h1>

        {!submitted ? (
          <>
            <p className="text-lg">How are you feeling today?</p>
            <div className="flex flex-col gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl bg-gradient-to-r ${mood.color}
                    text-white shadow-md transition-all hover:scale-105 ${
                      selectedMood === mood.label ? 'ring-2 ring-white/50' : ''
                    }`}
                >
                  <span className="flex items-center gap-3 text-lg">
                    <span className="text-2xl">{mood.icon}</span>
                    {mood.label}
                  </span>
                  {selectedMood === mood.label && <span className="text-xl animate-pulse">✔</span>}
                </button>
              ))}
            </div>

            {/* Optional Note Input */}
            {selectedMood && (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Anything you'd like to share?"
                rows={3}
                className="w-full mt-6 p-4 rounded-xl bg-mint backdrop-blur-md  text-emerald-600 border border-white/20 placeholder-emarald-600 resize-none"
              />
            )}

            {/* Submit Button */}
            {selectedMood && (
              <button
                onClick={handleSubmit}
                className="mt-4 bg-mint-light text-emerald-900 font-bold px-6 py-3 rounded-xl hover:scale-105 transition"
              >
                ✅ Submit Check-In
              </button>
            )}
          </>
        ) : (
          <>
            <p className="text-xl font-semibold text-emerald-300">
              {currentMood?.message || "Thanks for checking in!"}
            </p>
            <p className="text-sm mt-2 text-white/70">Your check-in has been saved.</p>
          </>
        )}
      </div>
    </section>
  );
}
