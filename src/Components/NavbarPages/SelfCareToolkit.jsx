import React, { useEffect, useState } from "react";
import { FiX, FiPlus, FiTrash2, FiActivity } from "react-icons/fi";
import BreathingExercise from "../SubComponent/BreathingExercise";
import MeditationTimer from "../SubComponent/MeditationTimer";

/* ---------- UI ATOMS ---------- */
const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`backdrop-blur-md rounded-2xl shadow-sm border transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-5">{children}</div>;

/* ---------- MODAL ---------- */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-emerald-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
export default function SelfCareToolkit() {
  const [activeTool, setActiveTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customTools, setCustomTools] = useState(() => {
    const saved = localStorage.getItem("customTools");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newMinutes, setNewMinutes] = useState(5);

  /* ---------- Persist ---------- */
  useEffect(() => {
    localStorage.setItem("customTools", JSON.stringify(customTools));
  }, [customTools]);

  /* ---------- Add Custom Exercise ---------- */
  const addExercise = () => {
    if (!newTitle.trim()) return;

    setCustomTools([
      ...customTools,
      {
        id: Date.now(),
        title: newTitle,
        description: newDesc || "Wellness session",
        minutes: newMinutes,
      },
    ]);

    setNewTitle("");
    setNewDesc("");
    setNewMinutes(5);
    setIsModalOpen(false);
  };

  const removeTool = (id) =>
    setCustomTools(customTools.filter((t) => t.id !== id));

  /* ---------- ACTIVE SESSION ---------- */
  if (activeTool) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-tr from-emerald-100 to-emerald-300">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTool(null)}
            className="mb-4 font-bold text-emerald-700"
          >
            ← Back to Toolkit
          </button>

          <Card className="bg-white/90 shadow-xl">
            {activeTool.type === "breathing" && (
              <BreathingExercise onBack={() => setActiveTool(null)} />
            )}

            {activeTool.type === "meditation" && (
              <MeditationTimer
                minutes={activeTool.minutes}
                title={activeTool.title}
                onBack={() => setActiveTool(null)}
              />
            )}
          </Card>
        </div>
      </div>
    );
  }

  /* ---------- TOOLKIT GRID ---------- */
  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-emerald-100 to-emerald-300">
      <div className="max-w-4xl mx-auto space-y-8">

        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-emerald-900">
              Self-Care Toolkit
            </h1>
            <p className="text-emerald-700">Your personal calm space</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
          >
            <FiPlus /> Add Exercise
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Breathing */}
          <Card
            className="bg-white/70 cursor-pointer"
            onClick={() => setActiveTool({ type: "breathing" })}
          >
            <CardContent>
              <div className="text-4xl mb-4">🌬️</div>
              <h3 className="text-xl font-bold text-emerald-800">
                Box Breathing
              </h3>
            </CardContent>
          </Card>

          {/* Default Meditation */}
          <Card
            className="bg-white/70 cursor-pointer"
            onClick={() =>
              setActiveTool({
                type: "meditation",
                title: "Quick Meditation",
                minutes: 5,
              })
            }
          >
            <CardContent>
              <div className="text-4xl mb-4">🧘</div>
              <h3 className="text-xl font-bold text-emerald-800">
                Quick Meditation
              </h3>
              <p className="text-sm">5 minutes</p>
            </CardContent>
          </Card>

          {/* Custom Exercises */}
          {customTools.map((tool) => (
            <Card
              key={tool.id}
              className="bg-white/80 relative cursor-pointer"
              onClick={() =>
                setActiveTool({
                  type: "meditation",
                  title: tool.title,
                  minutes: tool.minutes,
                })
              }
            >
              <CardContent>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTool(tool.id);
                  }}
                  className="absolute top-4 right-4 text-rose-400"
                >
                  <FiTrash2 />
                </button>

                <div className="text-3xl mb-3">✨</div>
                <h3 className="text-xl font-bold">{tool.title}</h3>
                <p className="text-sm">{tool.minutes} minutes</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {customTools.length === 0 && (
          <div className="text-center py-12 opacity-60 border-dashed border-2 rounded-3xl">
            <FiActivity className="mx-auto text-4xl mb-2" />
            <p>Add your own wellness routines</p>
          </div>
        )}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Custom Exercise"
      >
        <div className="space-y-4">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Exercise name"
            className="w-full p-3 border rounded"
          />

          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description"
            className="w-full p-3 border rounded"
          />

          <input
            type="number"
            min="1"
            value={newMinutes}
            onChange={(e) => setNewMinutes(Number(e.target.value))}
            placeholder="Minutes"
            className="w-full p-3 border rounded"
          />

          <button
            onClick={addExercise}
            className="w-full bg-emerald-600 text-white py-3 rounded font-bold"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
