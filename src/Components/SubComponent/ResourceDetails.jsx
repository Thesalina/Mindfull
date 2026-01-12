import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

export default function ResourceDetail() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      const res = await fetch(`https://mindfull-backend-gf19.onrender.com/api/resources/${id}`);
      const data = await res.json();
      setResource(data);
    };

    fetchResource();
  }, [id]);

  if (!resource) return <p>Loading...</p>;

  return (
    <section className="p-6 bg-white dark:bg-slate-800 text-emerald-800 dark:text-white">
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center text-emerald-600">
        <FiArrowLeft className="mr-1" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
      <p className="mb-4 text-sm">{resource.category} • {resource.duration}</p>

      {/* Show the full content from DB */}
      {resource.content ? (
        <div dangerouslySetInnerHTML={{ __html: resource.content }} />
      ) : (
        <a href={resource.url} className="text-emerald-600 underline">View Original</a>
      )}
    </section>
  );
}
