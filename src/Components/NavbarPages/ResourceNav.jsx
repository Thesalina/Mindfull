import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiPlay, FiClock, FiSearch, FiMic, FiLayers } from 'react-icons/fi';

const ResourceNav = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('articles');
  // Logic kept for consistency, though we are using a fixed theme style for this specific bg request
  const [darkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const resource = await fetch("https://mindfull-backend-gf19.onrender.com/api/resources");
        const data = await resource.json();
        setResources(data);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const groupedResources = {
    articles: resources.filter(r => r.type === 'article' || r.type === 'infographic'),
    media: resources.filter(r => r.type === 'video' || r.type === 'podcast')
  };

  const filteredResources = (groupedResources[activeTab] || []).filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <FiBook />;
      case 'infographic': return <FiLayers />;
      case 'video': return <FiPlay />;
      case 'podcast': return <FiMic />;
      default: return <FiBook />;
    }
  };

  return (
    /* Updated Background to match your MoodJournal and SelfCareToolkit */
    <div className="min-h-screen p-6 bg-gradient-to-tr from-emerald-100 to-emerald-300 transition-colors duration-500 text-slate-800">
      
      <main className="max-w-6xl mx-auto relative z-10">
        <header className="mb-10">
          <h2 className="text-4xl font-bold mb-2 text-emerald-900">
            Mental Health Library
          </h2>
          <p className="text-emerald-800 opacity-80 text-lg">Curated tools and knowledge for your well-being.</p>
        </header>

        {/* Search Bar - Stylized for Emerald Background */}
        <div className="relative mb-8 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-emerald-600 transition-colors group-focus-within:scale-110" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 rounded-2xl border border-emerald-200 bg-white/80 backdrop-blur-md transition-all shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-emerald-400 text-emerald-900"
            placeholder="Search by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tab Navigation - Stylized for Emerald Background */}
        <div className="flex space-x-2 mb-8 p-1.5 bg-emerald-900/10 rounded-2xl w-fit backdrop-blur-sm">
          {['articles', 'media'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center px-6 py-2.5 font-bold text-sm rounded-xl transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'text-emerald-700 hover:text-emerald-900 hover:bg-white/30'
              }`}
            >
              {tab === 'articles' ? <FiBook className="mr-2" /> : <FiPlay className="mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-3xl animate-pulse bg-white/40 border border-white/20"></div>
            ))
          ) : (
            filteredResources.map(resource => (
              <div 
                key={resource._id} 
                className="group flex flex-col rounded-3xl border border-white/40 bg-white/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/80"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                      {resource.category}
                    </span>
                    <span className="text-xs text-emerald-600/60 flex items-center font-medium">
                      <FiClock className="mr-1" />
                      {resource.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 leading-tight text-emerald-900 group-hover:text-emerald-700 transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-sm text-emerald-800/70 mb-6 line-clamp-3 flex-grow">
                    {resource.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-emerald-900/10">
                    <span className="inline-flex items-center text-xs font-bold text-emerald-700 opacity-60 uppercase tracking-tighter">
                      <span className="mr-2 text-lg">{getTypeIcon(resource.type)}</span>
                      {resource.type}
                    </span>
                    <button
                      onClick={() => navigate(`/resources/${resource._id}`)}
                      className="px-5 py-2 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all active:scale-95 shadow-md shadow-emerald-200"
                    >
                      {resource.type === 'video' ? 'Watch Now' : resource.type === 'podcast' ? 'Listen Now' : 'Read Article'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredResources.length === 0 && (
          <div className="text-center py-20 bg-white/30 backdrop-blur-md rounded-3xl border-2 border-dashed border-emerald-900/20">
            <div className="text-5xl mb-4 opacity-20">🔍</div>
            <h3 className="text-xl font-bold text-emerald-900/60">No resources found</h3>
            <p className="text-emerald-800/40">Try searching for something else or switch tabs.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResourceNav;