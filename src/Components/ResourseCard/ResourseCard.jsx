// src/ResourceCard/ResourceCard.jsx
   //const { useNavigate } = require("react-router-dom");
export default function ResourceCard({
  title,
  description,
  image,
  buttonLabel,
  type,
  duration,
  onClick
}) {
  const typeIcons = {
    article: "📄",
    infographic: "📊",
    video: "🎬",
    podcast: "🎧",
    audio: "🔊"
  };

  const typeColors = {
    article: "bg-blue-100 text-blue-800",
    infographic: "bg-purple-100 text-purple-800",
    video: "bg-red-100 text-red-800",
    podcast: "bg-green-100 text-green-800",
    audio: "bg-yellow-100 text-yellow-800"
  };
  

  return (
    <div className="bg-mint-light rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
        />
        <div className="absolute bottom-2 left-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${typeColors[type] || "bg-mint-light text-gray-800"}`}
          >
            {typeIcons[type] || "📄"} {type}
          </span>
        </div>
      </div>
      <div className="p-5  ">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{duration}</span>
          <button
          
                  
            onClick={onClick}

            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}