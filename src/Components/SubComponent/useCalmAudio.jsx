import { useEffect, useRef } from "react";

export default function useCalmAudio(isMuted) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/calmmusic.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    const enableAudio = () => {
      if (!isMuted) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("click", enableAudio, { once: true });

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);
}
