import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase';
import { useAuth } from '../Login/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginBackendUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://mindfull-backend-gf19.onrender.com/api/auth/login',
        { email, password }
      );

      const { user, token } = response.data;
      loginBackendUser(user, token);
      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Something didn’t work. Take a breath and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError('');
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 font-sans relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-mint to-emerald-50 opacity-90"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-mint rounded-full blur-3xl opacity-30"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-xl text-emerald-600 rounded-3xl shadow-2xl max-w-md w-full p-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-poppins font-bold">Mindfull</h1>
          <p className="mt-2 text-sm">
            Welcome back. Take a breath — you’re in the right place.
          </p>
        </div>

        <form className="space-y-6" noValidate onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-slate-300 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint transition"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-emerald-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="flex justify-center text-sm">
            <Link
              to="/forgotpassword"
              className="hover:text-emerald-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mint text-emerald-700 font-semibold py-3 rounded-2xl hover:bg-emerald-100 transition shadow-md disabled:opacity-60"
          >
            {loading ? 'Signing you in…' : 'Log In'}
          </button>
        </form>

        <div className="flex items-center my-8 text-sm">
          <hr className="flex-grow border-t border-mint" />
          <span className="mx-4">or continue with</span>
          <hr className="flex-grow border-t border-mint" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-slate-300 rounded-2xl py-3 hover:shadow-md transition disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          <span className="font-medium">Continue with Google</span>
        </button>

        <p className="mt-10 text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/signin" className="font-semibold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
