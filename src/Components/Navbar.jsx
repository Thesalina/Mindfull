import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/Login/AuthContext.jsx'; // ✅ Ensure this path matches your updated AuthContext file
import { useTheme } from '../Components/ThemeContext.jsx';

export default function Navbar() {
  const { currentUser, logout } = useAuth(); // ✅ Use combined logout and currentUser
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Unified logout: handles Firebase + backend
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-mint-light shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/home" className="flex items-center">
          <img
            src="https://images.pexels.com/photos/32415639/pexels-photo-32415639.png"
            className="mr-3 h-12"
            alt="Mindfull Logo"
          />
          <span className="text-2xl font-extrabold text-emerald-600">Mindfull</span>
        </Link>
       
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          
          <NavLink to="/home" className={({ isActive }) => isActive ? 'text-emerald-600' : 'hover:text-emerald-500'}>
            Home
          </NavLink>
          <NavLink to="/selfcaretoolkit" className={({ isActive }) => isActive ? 'text-emerald-600' : 'hover:text-emerald-500'}>
            Self-Care Toolkit
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-emerald-600' : 'hover:text-emerald-500'}>
            Profile
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => isActive ? 'text-emerald-600' : 'hover:text-emerald-500'}>
            Resources
          </NavLink>
        </div>
        
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="bg-mint dark:bg-mint px-5 py-2 rounded-full">
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-mint-dark text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-mint text-black px-4 py-2 rounded-full hover:bg-cyan-500 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-mint text-black px-4 py-2 rounded-full hover:bg-cyan-500 transition"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
