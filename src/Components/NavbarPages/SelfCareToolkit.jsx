import { useState } from 'react';
import BreathingExercise from '../SubComponent/BreathingExercise';
import MeditationTimer from '../SubComponent/MeditationTimer';

export default function SelfCareToolkit() {
  const [activeTool, setActiveTool] = useState(null); // breathing | med5 | med10

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-600 mb-8">Self-Care Toolkit</h1>

      {/* If nothing active, show main cards */}
      {!activeTool && (
        <>
          {/* Breathing Exercises */}
          <div className="mb-10 text-emerald-600">
            <h2 className="text-xl font-semibold mb-4">Breathing Exercises</h2>
            <div className="mb-6 p-4 border bg-mint-light rounded-lg">
              <h3 className="font-bold mb-2">Deep Breathing</h3>
              <p className="text-black mb-3">A simple exercise to calm your mind and body.</p>
              <button
                className="px-4 py-2 bg-mint-dark text-white rounded"
                onClick={() => setActiveTool('breathing')}
              >
                Start
              </button>
            </div>
          </div>

          {/* Meditation Timers */}
          <div>
            <h2 className="text-xl text-emerald-600 font-semibold mb-4">Meditation Timers</h2>

            {/* 5-Minute */}
            <div className="mb-6 p-4 bg-mint-light border rounded-lg">
              <h3 className="font-bold text-emerald-500 mb-2">5-Minute Meditation</h3>
              <p className="text-black mb-3">Quick meditation to center yourself.</p>
              <button
                className="px-4 py-2 bg-mint-dark text-white rounded"
                onClick={() => setActiveTool('med5')}
              >
                Start
              </button>
            </div>

            {/* 10-Minute */}
            <div className="mb-6 p-4 bg-mint-light border rounded-lg">
              <h3 className="font-bold text-emerald-600 mb-2">10-Minute Meditation</h3>
              <p className="text-black mb-3">Longer meditation for deeper relaxation.</p>
              <button
                className="px-4 py-2 bg-mint-dark text-white rounded"
                onClick={() => setActiveTool('med10')}
              >
                Start
              </button>
            </div>
          </div>
        </>
      )}

      {/* Active Tool Components */}
      {activeTool === 'breathing' && <BreathingExercise onBack={() => setActiveTool(null)} />}
      {activeTool === 'med5' && <MeditationTimer minutes={5} onBack={() => setActiveTool(null)} />}
      {activeTool === 'med10' && <MeditationTimer minutes={10} onBack={() => setActiveTool(null)} />}
    </div>
  );
}
