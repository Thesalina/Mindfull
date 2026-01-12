import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiEdit3, FiHeart } from 'react-icons/fi';

const moods = [
  { label: 'Excellent', color: 'bg-emerald-400', shadow: 'shadow-emerald-500/40', icon: '🤩', message: 'Keep shining! Today is your day!' },
  { label: 'Good', color: 'bg-sky-400', shadow: 'shadow-sky-500/40', icon: '😊', message: 'Glad to hear that! Keep the good vibes going.' },
  { label: 'Okay', color: 'bg-amber-400', shadow: 'shadow-amber-500/40', icon: '😐', message: 'It’s okay to have neutral days. You’re doing fine.' },
  { label: 'Down', color: 'bg-orange-400', shadow: 'shadow-orange-500/40', icon: '😔', message: 'Take it easy today. You’re not alone.' },
  { label: 'Struggling', color: 'bg-rose-400', shadow: 'shadow-rose-500/40', icon: '💔', message: 'We’re here for you. Don’t hesitate to reach out for support.' },
];

export default function MentalHealthCheckIn() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [darkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const navigate = useNavigate();

  const currentMood = moods.find((m) => m.label === selectedMood);

  const handleSubmit = async () => {
    // Here you would typically save to Firebase/Backend
    setSubmitted(true);
    setTimeout(() => {
      navigate('/home');
    }, 4000); 
  };

  const bgStyle = darkMode 
    ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" 
    : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)";

  return (
    <div className={`min-h-screen p-6 transition-colors duration-500 flex items-center justify-center ${darkMode ? 'text-slate-200' : 'text-slate-800'}`} style={{ background: bgStyle }}>
      
      {/* Background Blobs */}
      <div className={`fixed top-1/4 -left-20 w-80 h-80 rounded-full filter blur-[100px] opacity-20 ${darkMode ? 'bg-emerald-600' : 'bg-emerald-300'}`}></div>

      <div className="max-w-xl w-full relative z-10">
        {!submitted ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="text-center">
              <h1 className="text-4xl font-bold mb-3 tracking-tight">How are you, <span className="text-emerald-500">really?</span></h1>
              <p className="opacity-60 text-lg">Checking in with yourself is a form of self-love.</p>
            </header>

            {/* Mood Grid */}
            <div className="grid gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`group flex items-center justify-between px-6 py-5 rounded-3xl border transition-all duration-300 ${
                    selectedMood === mood.label 
                      ? `${mood.color} text-white shadow-xl ${mood.shadow} scale-[1.02] border-transparent` 
                      : darkMode 
                        ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/60' 
                        : 'bg-white/60 border-white/20 hover:bg-white shadow-sm'
                  }`}
                >
                  <span className="flex items-center gap-4 text-xl font-bold">
                    <span className={`text-3xl transition-transform duration-500 ${selectedMood === mood.label ? 'scale-125' : 'group-hover:scale-110'}`}>
                      {mood.icon}
                    </span>
                    {mood.label}
                  </span>
                  {selectedMood === mood.label && <FiCheckCircle className="text-2xl animate-bounce" />}
                </button>
              ))}
            </div>

            {/* Reflection Note */}
            {selectedMood && (
              <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-2 px-2 text-sm font-bold uppercase tracking-widest opacity-50">
                  <FiEdit3 /> <span>Add a reflection (optional)</span>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's contributing to your mood today?"
                  rows={4}
                  className={`w-full p-5 rounded-3xl border transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none shadow-inner ${
                    darkMode 
                    ? "bg-slate-900/50 border-slate-700 text-white placeholder-slate-500" 
                    : "bg-white/80 border-slate-200 text-slate-800 placeholder-slate-400"
                  }`}
                />

                <button
                  onClick={handleSubmit}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-5 rounded-3xl shadow-lg shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
                >
                  <FiHeart /> Complete Check-In
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Success State */
          <div className="text-center space-y-6 animate-in zoom-in fade-in duration-500">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500 text-white text-5xl shadow-2xl shadow-emerald-500/50 animate-bounce">
              {currentMood?.icon}
            </div>
            <div className="space-y-2">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {currentMood?.message}
              </h2>
              <p className="opacity-60">Your reflection has been saved in your journey.</p>
            </div>
            
            <div className="pt-8">
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div className="h-full bg-emerald-500 animate-[progress_4s_linear]" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs mt-3 font-bold uppercase tracking-widest opacity-30">Redirecting to home...</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}