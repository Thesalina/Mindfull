import { useEffect, useState } from 'react';
import { FiVolumeX, FiVolume2 } from 'react-icons/fi'; // Install: react-icons

export default function MeditationTimer({ minutes, onBack }) {
  const [seconds, setSeconds] = useState(minutes * 60);
  const [running, setRunning] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [audio] = useState(() => new Audio('/sounds/calmmusic.mp3'));

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;
    audio.muted = isMuted;

    const enableAudio = () => {
      if (!isMuted) {
        audio.play().catch((err) => console.warn('Audio play error:', err));
      }
    };

    document.addEventListener('click', enableAudio, { once: true });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isMuted]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRunning(false);
          audio.muted = true; // Auto-mute at end
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    audio.muted = newMute;
  };

  const formatTime = () => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="text-center mt-16">
      <h2 className="text-2xl font-bold mb-4">Meditation Timer</h2>
      <div className="text-5xl bg-green-100 p-6 rounded font-mono">{formatTime()}</div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setRunning(!running)}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
        >
          {running ? 'Pause' : 'Resume'}
        </button>

        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Back
        </button>

        <button
          onClick={toggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center gap-2"
        >
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
      </div>
    </div>
  );
}
