import { useEffect, useState } from "react";
import { FiVolume2, FiVolumeX, FiPlay, FiPause, FiArrowLeft, FiRotateCcw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useCalmAudio from "../SubComponent/useCalmAudio";

export default function MeditationTimer({ minutes, onBack }) {
  const totalSeconds = minutes * 60;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useCalmAudio(isMuted);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [running, seconds]);

  // Calculate SVG Progress
  const percentage = (seconds / totalSeconds) * 100;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-teal-950 to-slate-900 text-white p-6">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <motion.button 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <FiArrowLeft /> Back to Home
      </motion.button>

      {/* Main Timer Circle */}
      <div className="relative flex items-center justify-center">
        <svg className="w-72 h-72 transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="144" cy="144" r={radius}
            stroke="currentColor" strokeWidth="4"
            fill="transparent" className="text-white/5"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="144" cy="144" r={radius}
            stroke="currentColor" strokeWidth="4"
            fill="transparent" className="text-emerald-500"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "linear" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Time Text */}
        <div className="absolute flex flex-col items-center">
          <motion.span 
            key={seconds}
            initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
            className="text-6xl font-light tracking-tight tabular-nums"
          >
            {formatTime()}
          </motion.span>
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-400/60 mt-2">
            Remaining
          </span>
        </div>
      </div>

      {/* Controls Container */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-16 flex items-center gap-8 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full shadow-2xl"
      >
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 rounded-full transition-all ${isMuted ? 'text-rose-400' : 'text-slate-400 hover:text-white'}`}
        >
          {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
        </button>

        <button
          onClick={() => setRunning(!running)}
          className="w-16 h-16 flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          {running ? <FiPause size={28} /> : <FiPlay size={28} className="ml-1" />}
        </button>

        <button
          onClick={() => setSeconds(totalSeconds)}
          className="p-3 text-slate-400 hover:text-white transition-colors"
        >
          <FiRotateCcw size={24} />
        </button>
      </motion.div>

      {/* Encouragement Text */}
      <AnimatePresence mode="wait">
        {!running && seconds > 0 && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mt-8 text-slate-400 italic"
          >
            Take a deep breath and continue...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}