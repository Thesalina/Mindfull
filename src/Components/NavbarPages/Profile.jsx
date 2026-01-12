import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2, FiTarget } from "react-icons/fi";

// ----- UI Atoms -----
const Card = ({ children, className = "" }) => (
  <div className={`backdrop-blur-md rounded-2xl shadow-sm border transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => <div className={`p-5 ${className}`}>{children}</div>;

const Switch = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${checked ? "bg-emerald-500" : "bg-slate-300"}`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-0"}`}></div>
  </button>
);

const moodEmojiMap = { 1: "😢", 2: "😞", 3: "😐", 4: "🙂", 5: "😊", 6: "😁", 7: "🤩" };
const moodDescriptionMap = { 1: "Very Low", 2: "Low", 3: "Neutral", 4: "Okay", 5: "Good", 6: "Great", 7: "Excellent" };

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

// ----- Main Page -----
export default function MoodJournal() {
  const [journalEntries, setJournalEntries] = useState(() => JSON.parse(localStorage.getItem("journalEntries")) || []);
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem("goals")) || [
    { id: 1, text: "💧 Drink 2L Water", enabled: true },
    { id: 2, text: "🧘 10-Min Breathing", enabled: false },
  ]);

  const [mood, setMood] = useState(4);
  const [content, setContent] = useState("");
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [newGoalText, setNewGoalText] = useState("");

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [journalEntries, goals]);

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      mood,
      content,
    };
    setJournalEntries([entry, ...journalEntries]);
    setContent("");
    setMood(4);
  };

  const toggleGoal = (id) => setGoals(goals.map(g => g.id === id ? { ...g, enabled: !g.enabled } : g));
  const deleteGoal = (id) => setGoals(goals.filter(g => g.id !== id));
  const addGoal = () => {
    if (!newGoalText.trim()) return;
    setGoals([...goals, { id: Date.now(), text: newGoalText, enabled: false }]);
    setNewGoalText("");
    setIsGoalModalOpen(false);
  };
  const deleteEntry = (id) => setJournalEntries(journalEntries.filter(e => e.id !== id));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-emerald-100 to-emerald-300">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* --- Mood + Journal Form --- */}
        <Card className="bg-white/50 border-white/20 shadow-sm">
          <CardContent>
            <h2 className="text-xl font-bold text-emerald-700 mb-4">How are you feeling today?</h2>
            <div className="flex space-x-2 mb-4">
              {[1,2,3,4,5,6,7].map(v => (
                <button key={v} onClick={() => setMood(v)} className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition ${
                  mood === v ? "bg-emerald-500/20 border-2 border-emerald-500" : "bg-emerald-100"
                }`}>
                  {moodEmojiMap[v]}
                </button>
              ))}
            </div>
            <form onSubmit={handleAddEntry} className="space-y-3">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write about your day..."
                className="w-full p-3 rounded-2xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none"
                rows={4}
              />
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl transition">
                Add Entry
              </button>
            </form>
          </CardContent>
        </Card>

        {/* --- Daily Intentions --- */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-700">
              <FiTarget /> Daily Intentions
            </h2>
            <button onClick={() => setIsGoalModalOpen(true)} className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white p-2 rounded-full transition">
              <FiPlus size={20} />
            </button>
          </div>
          <div className="space-y-3">
            {goals.map(goal => (
              <div key={goal.id} className="flex justify-between items-center p-4 rounded-2xl bg-white/50 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-4">
                  <Switch checked={goal.enabled} onChange={() => toggleGoal(goal.id)} />
                  <span className={`${goal.enabled ? "opacity-100 font-medium" : "opacity-40 line-through"}`}>{goal.text}</span>
                </div>
                <button onClick={() => deleteGoal(goal.id)} className="text-rose-400 hover:text-rose-600 transition">
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --- Journal History --- */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-emerald-700">Recent Reflections</h2>
          {journalEntries.length === 0 && (
            <div className="text-center py-10 opacity-40 border-2 border-dashed border-white/20 rounded-3xl">
              <p className="italic">Your reflections will appear here.</p>
            </div>
          )}
          {journalEntries.map(entry => (
            <Card key={entry.id} className="bg-white/70 border-white/30 shadow-sm">
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-full">{entry.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{moodEmojiMap[entry.mood]}</span>
                    <button onClick={() => deleteEntry(entry.id)} className="text-rose-400 hover:bg-rose-500/10 p-2 rounded-xl transition">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="leading-relaxed opacity-90">{entry.content}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>

      {/* --- Modal for Adding Intentions --- */}
      <Modal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} title="Add New Intention">
        <div className="space-y-4">
          <input
            autoFocus
            type="text"
            placeholder="e.g. Meditate 5 mins"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            className="w-full p-3 rounded-2xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none"
          />
          <button onClick={addGoal} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl transition">
            Add Intention
          </button>
        </div>
      </Modal>
    </div>
  );
}
