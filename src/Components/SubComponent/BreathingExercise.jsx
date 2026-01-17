import { useEffect, useState } from "react";
import { FiVolume2, FiVolumeX, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useCalmAudio from "../SubComponent/useCalmAudio";

export default function BreathingExercise({ onBack }) {
  const phases = [
    { text: "Inhale", scale: 1.6, glow: "rgba(52,211,153,0.6)" },
    { text: "Hold", scale: 1.6, glow: "rgba(20,184,166,0.6)" },
    { text: "Exhale", scale: 1.1, glow: "rgba(96,165,250,0.6)" },
  ];

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useCalmAudio(isMuted);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = phases[phaseIndex];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-white overflow-hidden">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition"
      >
        <FiArrowLeft size={20} />
        <span className="text-sm tracking-wide">Exit</span>
      </button>

      {/* Breathing Area */}
      <div className="relative flex items-center justify-center w-[22rem] h-[22rem]">

        {/* Ambient Glow */}
        <motion.div
          animate={{ scale: current.scale }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute w-72 h-72 rounded-full blur-[90px] opacity-40"
          style={{ background: current.glow }}
        />

        {/* Main Circle */}
        <motion.div
          animate={{ scale: current.scale }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="relative w-48 h-48 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.6)]"
        />

        {/* Phase Text */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={current.text}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute text-4xl font-light tracking-[0.3em] uppercase text-white/90"
          >
            {current.text}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="mt-20 flex items-center gap-6 px-8 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full hover:bg-white/10 transition"
        >
          {isMuted ? (
            <FiVolumeX size={22} className="text-rose-400" />
          ) : (
            <FiVolume2 size={22} className="text-emerald-400" />
          )}
        </button>

        <div className="h-5 w-px bg-white/20" />

        <span className="text-xs tracking-widest uppercase text-white/60">
          Deep Breathing
        </span>
      </div>
    </div>
  );
}
