// src/pages/SelfCareToolkit.jsx
export default function SelfCareToolkit() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-emerald-600 mb-8">Self-Care Toolkit</h1>

      {/* Breathing Exercises Section */}
      <div className="mb-10 text-emerald-600 ">
        <h2 className="text-xl font-semibold text-emerald-600 mb-4">Breathing Exercises</h2>
        <div className="mb-6 p-4 border  bg-mint-light rounded-lg">
          <h3 className="font-bold mb-2">Deep Breathing</h3>
          <p className="text-black mb-3">A simple exercise to calm your mind and body.</p>
          <button 
            className="px-4 py-2 bg-mint-dark text-white rounded "
            onClick={() => alert("Starting Deep Breathing")}
          >
            Start
          </button>
        </div>
      </div>

      {/* Meditation Timers Section */}
      <div>
        <h2 className="text-xl  text-emerald-600 font-semibold mb-4">Meditation Timers</h2>
        
        {/* 5-Minute Meditation */}
        <div className="mb-6 p-4 bg-mint-light text-emerald-600 border rounded-lg">
          <h3 className="font-bold  mb-2">5-Minute Meditation</h3>
          <p className="text-black  mb-3">Quick meditation to center yourself.</p>
          <button 
            className="px-4 py-2 bg-mint-dark text-white rounded "
            onClick={() => alert("Starting 5-Minute Meditation")}
          >
            Start
          </button>
        </div>

        {/* 10-Minute Meditation */}
        <div className="mb-6 p-4  bg-mint-light border rounded-lg">
          <h3 className="font-bold text-emerald-600 mb-2">10-Minute Meditation</h3>
          <p className="text-black mb-3">Longer meditation for deeper relaxation.</p>
          <button 
            className="px-4 py-2 bg-mint-dark text-white rounded"
            onClick={() => alert("Starting 10-Minute Meditation")}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
}