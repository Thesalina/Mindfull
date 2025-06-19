import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ResourceCard from '../ResourseCard/ResourseCard';
//import { useNavigate } from 'react-router-dom';
export default function Articledetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/resources/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("Failed to fetch article:", err);
      } finally {
        setLoading(false);
      }
    };
    if (!id) {
      console.error("No article ID provided");
      setLoading(false);
      return;
    } // const navigate = useNavigate();
    
    fetchArticle();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-emerald-600">Loading...</p>;
  if (!article) return <p className="text-center mt-10 text-red-500">Article not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">{article.title}</h1>
      <p className="text-emerald-600 mb-4">{article.description}</p>
      <p>
  Read more at: <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">{article.url}</a>
</p>
<button
        onClick={() => navigate('/resources')}
        className="mt-6 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        Back to Resources
      </button>
    </div>
    
  );

}
