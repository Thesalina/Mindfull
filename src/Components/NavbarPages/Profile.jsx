
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Helper Data
const generateMockData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    date: day,
    mood: Math.floor(Math.random() * 5) + 2,
    stress: Math.floor(Math.random() * 8) + 1,
  }));
};

const moodEmojiMap = {
  1: "😢",
  2: "😞",
  3: "😐",
  4: "🙂",
  5: "😊",
  6: "😁",
  7: "🤩",
};

const moodDescriptionMap = {
  1: "Very Low",
  2: "Low",
  3: "Neutral",
  4: "Okay",
  5: "Good",
  6: "Great",
  7: "Excellent",
};

// Reusable Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-mint hover:bg-mint-dark text-white px-4 py-2 rounded-lg transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Switch = ({ checked, onChange, className = "" }) => (
  <button
    onClick={onChange}
    className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
      checked ? "bg-mint" : "bg-mint/30"
    } ${className}`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
        checked ? "translate-x-4" : "translate-x-0"
      }`}
    ></div>
  </button>
);

const MoodIndicator = ({ mood }) => (
  <div className="flex items-center">
    <span className="text-2xl mr-2">{moodEmojiMap[mood] || "😐"}</span>
    <span className="text-emerald-600">
      {moodDescriptionMap[mood] || "Neutral"}
    </span>
  </div>
);

// Tabs
const Tabs = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) &&
        (child.type === TabsList || child.type === TabsContent)
          ? React.cloneElement(child, { activeTab, setActiveTab })
          : child
      )}
    </div>
  );
};

const TabsList = ({ children, activeTab, setActiveTab, className = "" }) => (
  <div className={`flex gap-4 border-b pb-2 ${className}`}>
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, { activeTab, setActiveTab })
        : child
    )}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => {
  const isActive = activeTab === value;
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition ${
        isActive
          ? "bg-mint/20 text-mint border-b-2 border-mint"
          : "text-mint/60 hover:text-mint"
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, activeTab, children, className = "" }) => {
  if (activeTab !== value) return null;
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

// Journal Form
const JournalForm = ({ onAddEntry }) => {
  const [mood, setMood] = useState(4);
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      mood,
      content,
    };

    onAddEntry(newEntry);
    setContent("");
    setMood(4);
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <h3 className="font-semibold mb-2 text-emerald-600">Add New Journal Entry</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-emerald-600 mb-1">
              How are you feeling today?
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMood(value)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    mood === value
                      ? "bg-mint/20 border-2 border-mint"
                      : "bg-mint/10"
                  }`}
                >
                  {moodEmojiMap[value]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-emerald-600 mb-1">
              Journal Entry
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-mint/30 rounded-md focus:ring-mint focus:border-mint"
              rows={3}
              placeholder="Write about your day..."
            />
          </div>

          <Button type="submit">Add Entry</Button>
        </form>
      </CardContent>
    </Card>
  );
};

// MAIN COMPONENT
export default function Profile() {
  const [chartData, setChartData] = useState([]);
  const [journalEntries, setJournalEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("journalEntries")) || [];
  });
  const [goals, setGoals] = useState(() => {
    return JSON.parse(localStorage.getItem("goals")) || [
      { id: 1, text: "💧 Drink 2L Water", enabled: true },
      { id: 2, text: "🧘 10-Min Breathing", enabled: false },
    ];
  });
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });
  const [showStress, setShowStress] = useState(false);

  const todaysMood = Math.floor(Math.random() * 3) + 4;
  const lastCheckIn = Math.floor(Math.random() * 3) + 1;

  useEffect(() => {
    setChartData(generateMockData());
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleAddEntry = (newEntry) => {
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const handleDeleteEntry = (id) => {
    setJournalEntries(journalEntries.filter((entry) => entry.id !== id));
  };

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, enabled: !goal.enabled } : goal
      )
    );
  };

  const addNewGoal = () => {
    const goal = prompt("Enter your new goal:");
    if (goal && goal.trim()) {
      setGoals([...goals, { id: Date.now(), text: goal, enabled: false }]);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`p-6 max-w-5xl mx-auto space-y-6 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-mint/90 text-emerald-600" : "bg-mint/5 text-emerald-800"
      }`}
    >
      {/* Header */}
      <div className="ml-auto flex items-center gap-2">
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </div>

      {/* Mood / Stress + Last Checkin */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <p className="text-sm text-emerald-600">Today's Mood</p>
            <MoodIndicator mood={todaysMood} />
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-emerald-600">Weekly Mood Trend</p>
              <div className="flex gap-2">
                <button
                  className={`text-xs px-3 py-1 rounded ${
                    !showStress
                      ? "bg-mint/20 text-emerald-600"
                      : "bg-mint/10 text-mint/60"
                  }`}
                  onClick={() => setShowStress(false)}
                >
                  Mood
                </button>
                <button
                  className={`text-xs px-3 py-1 rounded ${
                    showStress
                      ? "bg-mint/20 text-emerald-600"
                      : "bg-mint/10 text-mint/60"
                  }`}
                  onClick={() => setShowStress(true)}
                >
                  Stress
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f7ef" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, showStress ? 10 : 7]} />
                <Tooltip
                  formatter={(value) => {
                    if (!showStress)
                      return [moodDescriptionMap[value] || value, "Mood"];
                    else return [value, "Stress"];
                  }}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                {!showStress && (
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#2dd4bf"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                  />
                )}
                {showStress && (
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="#f87171"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-sm text-emerald-600">Last Check-In</p>
            <h3 className="text-xl font-semibold text-emerald-600">
              {lastCheckIn === 1 ? "Yesterday" : `${lastCheckIn} days ago`}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Journal and Goals */}
      <Tabs defaultValue="journal">
        <TabsList>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="journal">
          <JournalForm onAddEntry={handleAddEntry} />
          <div className="space-y-3">
            {journalEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-emerald-600">{entry.date}</p>
                    <div className="flex items-center space-x-2">
                      <MoodIndicator mood={entry.mood} />
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold ml-4"
                        aria-label="Delete journal entry"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-2">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals">
          <ul className="space-y-2">
            {goals.map((goal) => (
              <li
                key={goal.id}
                className="flex justify-between items-center bg-mint/10 p-3 rounded-xl"
              >
                <span className="text-emerald-600">{goal.text}</span>
                <Switch
                  checked={goal.enabled}
                  onChange={() => toggleGoal(goal.id)}
                />
              </li>
            ))}
            <li className="mt-4">
              <Button className="w-full" onClick={addNewGoal}>
                + Add New Goal
              </Button>
            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
