
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiPlay, FiAlertTriangle, FiClock, FiSearch } from 'react-icons/fi';
 //import Articaldetail from '../Articaldetail.jsx';
const ResourceNav = () => {
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('articles');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resource = await fetch("http://localhost:5000/api/resources");
        const data = await resource.json();
        setResources(data);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
      }
    };

    fetchResources();
  }, []);

const groupedResources = {
  articles: resources.filter(r => r.type === 'article' || r.type === 'infographic'),
  
  media: resources.filter(r => r.type === 'video' || r.type === 'podcast'),
  myths: resources.filter(r => r.type === 'myth')   
};


  const filteredResources = groupedResources[activeTab].filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <FiBook className="mr-1" />;
      case 'infographic': return '📊';
      case 'video': return <FiPlay className="mr-1" />;
      case 'podcast': return '🎧';
      default: return <FiBook className="mr-1" />;
    }
  };

  return (
    <div className="min-h-screen  bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl shadow p-6 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-emerald-600 mb-2">Mental Health Resources</h2>
        <p className="text-emerald-600 mb-6">Explore articles, videos, and myth-busting content to support your mental health journey.</p>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-emerald-600" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-emerald-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 border-b bg-mint-light border-emerald-200 mb-6">
          {['articles', 'media', 'myths'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                activeTab === tab
                  ? 'bg-emerald-100 text-emerald-700 border-b-2 border-emerald-500'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {tab === 'articles' && <FiBook className="inline mr-2" />}
              {tab === 'media' && <FiPlay className="inline mr-2" />}
              {tab === 'myths' && <FiAlertTriangle className="inline mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map(resource => (
            <div key={resource._id} className="bg-mint-light rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {resource.category}
                  </span>
                  <span className="ml-auto text-sm text-emerald-600 flex items-center">
                    <FiClock className="mr-1" />
                    {resource.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-2">{resource.title}</h3>
                <p className="text-emerald-600 mb-4">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center text-sm text-emerald-600">
                    {getTypeIcon(resource.type)} {resource.type}
                  </span>
                  <button
                    onClick={() => navigate(`/resources/${resource._id}`)}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700"
                  >
                    {resource.type === 'video' ? 'Watch' : resource.type === 'podcast' ? 'Listen' : 'Read'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center mt-10 text-emerald-600">
            <FiSearch className="mx-auto h-6 w-6 mb-2" />
            <p>No resources found. Try a different keyword or tab.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResourceNav;