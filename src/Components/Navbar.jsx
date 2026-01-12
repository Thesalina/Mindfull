import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Components/Login/AuthContext.jsx';
import { useTheme } from '../Components/ThemeContext.jsx';

export default function Navbar() {
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const hideThemeToggle = ['/login', '/signin', '/forgotpassword'].includes(location.pathname);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) return null;

  return (
    <nav className="bg-mint-light shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <img
            src="https://images.pexels.com/photos/32415639/pexels-photo-32415639.png"
            className="h-12"
            alt="Mindfull Logo"
          />
          <span className="text-2xl font-extrabold text-emerald-600">Mindfull</span>
        </Link>

        {/* Navigation Links */}
        {currentUser && (
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {['home', 'selfcaretoolkit', 'profile', 'resources'].map((page) => (
              <NavLink
                key={page}
                to={`/${page}`}
                className={({ isActive }) =>
                  isActive
                    ? 'text-emerald-600 font-semibold'
                    : 'hover:text-emerald-500 transition-colors duration-200'
                }
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </NavLink>
            ))}
          </div>
        )}

       

          {/* Auth Buttons */}
          {currentUser ? (
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="bg-mint-dark text-white px-4 py-2 rounded-full hover:bg-red-600 transition hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="bg-mint text-black px-4 py-2 rounded-full hover:bg-cyan-500 transition hover:scale-105"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-mint text-black px-4 py-2 rounded-full hover:bg-cyan-500 transition hover:scale-105"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      
    </nav>
  );
}
