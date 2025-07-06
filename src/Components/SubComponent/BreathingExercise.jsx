import { useEffect, useState } from 'react';
import { FiVolumeX, FiVolume2 } from 'react-icons/fi'; // Speaker icons

export default function BreathingExercise({ onBack }) {
  const [phase, setPhase] = useState('Inhale');
  const [isMuted, setIsMuted] = useState(false);
  const [audio] = useState(() => new Audio('/sounds/calmmusic.mp3'));

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.5;
    audio.muted = isMuted;

    const enableAudio = () => {
      if (!isMuted) {
        audio.play().catch((err) => console.warn('Audio play error:', err));
      }
    };

    document.addEventListener('click', enableAudio, { once: true });

    // Breathing cycle loop
    const phases = ['Inhale', 'Hold', 'Exhale'];
    const durations = [4000, 4000, 4000];
    let i = 0;
    const loop = () => {
      setPhase(phases[i]);
      setTimeout(() => {
        i = (i + 1) % phases.length;
        loop();
      }, durations[i]);
    };
    loop();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMuted]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.muted = newMuted;
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-6 text-emerald-700">{phase}</h2>
      <div className="w-40 h-40 rounded-full bg-green-300 mx-auto animate-breathe shadow-lg" />

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          onClick={onBack}
        >
          Back
        </button>

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center gap-2"
          onClick={toggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      </div>
    </div>
  );
}
