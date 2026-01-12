import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2, FiActivity, FiWind } from "react-icons/fi";
import BreathingExercise from '../SubComponent/BreathingExercise';
import MeditationTimer from '../SubComponent/MeditationTimer';

// ----- UI Atoms -----
const Card = ({ children, className = "" }) => (
  <div className={`backdrop-blur-md rounded-2xl shadow-sm border transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => <div className={`p-5 ${className}`}>{children}</div>;

// ----- Modal -----
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 border border-white/20">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-emerald-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition">
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default function SelfCareToolkit() {
  const [activeTool, setActiveTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customTools, setCustomTools] = useState(() => JSON.parse(localStorage.getItem("customTools")) || []);
  
  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("customTools", JSON.stringify(customTools));
  }, [customTools]);

  const addExercise = () => {
    if (!newTitle.trim()) return;
    const newTool = {
      id: Date.now(),
      title: newTitle,
      description: newDesc || "Manual practice session.",
      icon: "✨"
    };
    setCustomTools([...customTools, newTool]);
    setNewTitle("");
    setNewDesc("");
    setIsModalOpen(false);
  };

  const removeTool = (id) => setCustomTools(customTools.filter(t => t.id !== id));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-emerald-100 to-emerald-300">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-emerald-900 mb-2">Self-Care Toolkit</h1>
            <p className="text-emerald-700 opacity-80">Your personalized sanctuary for wellness.</p>
          </div>
          {!activeTool && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <FiPlus /> Add Exercise
            </button>
          )}
        </header>

        {/* --- Active View Logic --- */}
        {activeTool ? (
          <div className="space-y-6">
            <button 
              onClick={() => setActiveTool(null)}
              className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-2 transition"
            >
              ← Back to Toolkit
            </button>
            <Card className="bg-white/80 border-white/40 shadow-xl overflow-hidden">
              {activeTool.type === 'breathing' ? (
                <BreathingExercise onBack={() => setActiveTool(null)} />
              ) : (
                <MeditationTimer minutes={activeTool.minutes || 5} onBack={() => setActiveTool(null)} />
              )}
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Standard Tools */}
            <Card className="bg-white/50 border-white/20 hover:bg-white/60 cursor-pointer group" onClick={() => setActiveTool({ type: 'breathing' })}>
              <CardContent className="flex flex-col h-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🌬️</div>
                <h3 className="text-xl font-bold text-emerald-800">Box Breathing</h3>
                <p className="text-emerald-700 text-sm opacity-80 flex-grow">A 4-4-4-4 technique to reset your nervous system.</p>
                <span className="mt-4 text-emerald-600 font-bold group-hover:underline">Start Session →</span>
              </CardContent>
            </Card>

            <Card className="bg-white/50 border-white/20 hover:bg-white/60 cursor-pointer group" onClick={() => setActiveTool({ type: 'meditation', minutes: 5 })}>
              <CardContent>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧘</div>
                <h3 className="text-xl font-bold text-emerald-800">Quick Meditation</h3>
                <p className="text-emerald-700 text-sm opacity-80">5 minutes of mindfulness to clear your thoughts.</p>
                <span className="mt-4 text-emerald-600 font-bold group-hover:underline">Start Session →</span>
              </CardContent>
            </Card>

            {/* Custom Manual Tools */}
            {customTools.map(tool => (
              <Card key={tool.id} className="bg-white/70 border-white/30 group relative">
                <CardContent>
                  <button 
                    onClick={() => removeTool(tool.id)}
                    className="absolute top-4 right-4 text-rose-400 opacity-0 group-hover:opacity-100 transition p-2 hover:bg-rose-50 rounded-xl"
                  >
                    <FiTrash2 />
                  </button>
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <h3 className="text-xl font-bold text-emerald-800">{tool.title}</h3>
                  <p className="text-emerald-700 text-sm opacity-80 mt-1">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* --- Empty State --- */}
        {!activeTool && customTools.length === 0 && (
          <div className="text-center py-12 opacity-50 border-2 border-dashed border-emerald-400 rounded-3xl">
            <FiActivity className="mx-auto text-4xl mb-2 text-emerald-600" />
            <p className="italic text-emerald-900">Add your own custom wellness routines here.</p>
          </div>
        )}
      </div>

      {/* --- Add Exercise Modal --- */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Custom Exercise">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-emerald-600 mb-1 block">Exercise Name</label>
            <input
              type="text"
              placeholder="e.g. Morning Yoga Stretch"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 rounded-2xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-emerald-600 mb-1 block">Description</label>
            <textarea
              placeholder="What are the steps for this practice?"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full p-3 rounded-2xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none"
              rows={3}
            />
          </div>
          <button 
            onClick={addExercise}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl transition shadow-lg shadow-emerald-200"
          >
            Save to Toolkit
          </button>
        </div>
      </Modal>
    </div>
  );
}