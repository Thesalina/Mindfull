// Replace all indigo and gray color classes with mint equivalents

// 1. Replace all "bg-indigo-100", "text-indigo-600", "border-indigo-500", "text-indigo-700", "bg-indigo-600", "focus:ring-indigo-500", "focus:border-indigo-500", etc. with "bg-mint", "text-mint", "border-mint", etc.
// 2. Replace all "bg-gray-50", "bg-gray-100", "bg-gray-200", "bg-gray-300", "bg-gray-900", "text-gray-500", "text-gray-700", "border-gray-100", "border-gray-300", "text-muted-foreground" with mint or neutral classes as appropriate.

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// Enhanced with more realistic data
const generateMockData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(day => ({
    date: day,
    mood: Math.floor(Math.random() * 5) + 2, // Mood between 2-7
    stress: Math.floor(Math.random() * 8) + 1, // Stress level 1-8
  }));
};

// Mood emoji mapping
const moodEmojiMap = {
  1: "😢",
  2: "😞",
  3: "😐",
  4: "🙂",
  5: "😊",
  6: "😁",
  7: "🤩"
};

// Mood description mapping
const moodDescriptionMap = {
  1: "Very Low",
  2: "Low",
  3: "Neutral",
  4: "Okay",
  5: "Good",
  6: "Great",
  7: "Excellent"
};

// --- UI Components ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-md ${className}`}>
    {children}
  </div>
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

const Tabs = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, child =>
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
    {React.Children.map(children, child =>
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
    <span className="text-emerald-600">{moodDescriptionMap[mood] || "Neutral"}</span>
  </div>
);

const JournalForm = ({ onAddEntry }) => {
  const [mood, setMood] = useState(4);
  const [content, setContent] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      mood,
      content
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
              {[1, 2, 3, 4, 5, 6, 7].map(value => (
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
            <label 
              htmlFor="journalEntry" 
              className="block text-sm font-medium text-emerald-600 mb-1"
            >
              Journal Entry
            </label>
            <textarea
              id="journalEntry"
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

// --- Main Profile Component ---
export default function Profile() {
  const [chartData, setChartData] = useState([]);
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: "Mar 2, 2025",
      mood: 3,
      content: "Felt anxious about exams but practiced mindfulness."
    },
    {
      id: 2,
      date: "Mar 1, 2025",
      mood: 4,
      content: "Went for a walk and listened to music."
    }
  ]);
  
  const [goals, setGoals] = useState([
    { id: 1, text: "💧 Drink 2L Water", enabled: true },
    { id: 2, text: "🧘 10-Min Breathing", enabled: false },
    { id: 3, text: "📱 Talk to a friend", enabled: false }
  ]);
  
  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize chart data
  useEffect(() => {
    setChartData(generateMockData());
  }, []);
  
  // Calculate today's mood (random for demo)
  const todaysMood = Math.floor(Math.random() * 3) + 4; // Between 4-6
  
  // Calculate last check-in time
  const lastCheckIn = Math.floor(Math.random() * 3) + 1; // 1-3 days ago
  
  const handleAddEntry = (newEntry) => {
    setJournalEntries([
      { 
        id: Date.now(), 
        ...newEntry 
      },
      ...journalEntries
    ]);
  };
  
  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, enabled: !goal.enabled } : goal
    ));
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would persist to localStorage
  };

  return (
    <div className={`p-6 max-w-5xl mx-auto space-y-6 min-h-screen ${darkMode ? 'bg-mint/90 text-emerald-600' : 'bg-mint/5'}`}>
      {/* Top Section */}
      <div className="flex items-center gap-4">
        <img 
          src="/avatar-placeholder.png" 
          alt="avatar" 
          className="w-16 h-16 rounded-full border-2 border-mint" 
        />
        <div>
          <h2 className="text-2xl font-bold text-emerald-600">@mindfulGenZ</h2>
          <p className="text-sm text-emerald-600">
            Display Name • They/Them • Joined Mar 2025
          </p>
        </div>
        <Button className="ml-auto">Edit Profile</Button>
      </div>

      {/* Mood Summary */}
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
              <p className="text-sm text-emerlad-600 ">Weekly Mood Trend</p>
              <div className="flex gap-2">
                <button className="text-xs px-2 py-1 bg-mint/20 text-emerald-600 rounded">
                  Mood
                </button>
                <button className="text-xs px-2 py-1 bg-mint/10 text-mint/60 rounded">
                  Stress
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f7ef" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 7]} hide />
                <Tooltip 
                  formatter={(value) => [moodDescriptionMap[value] || value, "Mood"]}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#2dd4bf" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <p className="text-sm text-emerald-600 ">Last Check-In</p>
            <h3 className="text-xl font-semibold text-emerald-600">
              {lastCheckIn === 1 ? "Yesterday" : `${lastCheckIn} days ago`}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="journal">
        <TabsList>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="journal">
          <JournalForm onAddEntry={handleAddEntry} />
          
          <div className="space-y-3">
            {journalEntries.map(entry => (
              <Card key={entry.id}>
                <CardContent>
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-emerald-600">{entry.date}</p>
                    <MoodIndicator mood={entry.mood} />
                  </div>
                  <p className="mt-2">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals">
          <ul className="space-y-2">
            {goals.map(goal => (
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
              <Button className="w-full">
                + Add New Goal
              </Button>
            </li>
          </ul>
        </TabsContent>
        
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent>
                <h3 className="font-semibold mb-2 text-emerald-600">Mood Distribution</h3>
                <div className="space-y-2">
                  {[7, 6, 5, 4, 3, 2, 1].map(mood => (
                    <div key={mood} className="flex items-center">
                      <span className="w-8">{moodEmojiMap[mood]}</span>
                      <div className="flex-1 ml-2">
                        <div className="w-full bg-mint rounded-full h-2.5">
                          <div 
                            className="bg-mint h-2.5 rounded-full" 
                            style={{ width: `${Math.floor(Math.random() * 40) + 10}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-2 text-sm w-8 text-right text-emerald-600">
                        {Math.floor(Math.random() * 15) + 5}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <h3 className="font-semibold mb-2 text-emerald-600">Activity Completion</h3>
                <div className="space-y-4">
                  {[
                    { name: "Meditation", value: 75 },
                    { name: "Exercise", value: 60 },
                    { name: "Journaling", value: 90 },
                    { name: "Social", value: 45 }
                  ].map((activity, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-emerald-600">{activity.name}</span>
                        <span className="text-sm text-emerald-600">{activity.value}%</span>
                      </div>
                      <div className="w-full bg-mint/20 rounded-full h-2.5">
                        <div 
                          className="bg-mint h-2.5 rounded-full" 
                          style={{ width: `${activity.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center py-2 border-b border-mint/20">
                  <span className="text-emerald-600">🔒 Change Password</span>
                  <Button size="sm">Change</Button>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-mint/20">
                  <span className="text-emerald-600">🎨 Dark Mode</span>
                  <Switch 
                    checked={darkMode} 
                    onChange={toggleDarkMode} 
                  />
                </li>
                <li className="flex justify-between items-center py-2 border-b border-mint/20">
                  <span className="text-emerald-600">📩 Notification Preferences</span>
                  <Button size="sm">Configure</Button>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-red-500">🗑️ Delete My Data</span>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}