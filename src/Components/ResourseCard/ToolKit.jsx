// src/ResourceCard/ToolKit.jsx
import { FiClock } from 'react-icons/fi';

export default function ToolKit({ title, subtitle, image, duration, onClick }) {
  return (
    <div 
      className="flex items-center p-4 mb-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <FiClock className="mr-1" />
        {duration} min
      </div>
    </div>
  );
}