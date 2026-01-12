import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../Firebase';

export default function Signin() {
  const [name, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('https://mindfull-backend-gf19.onrender.com/api/auth/signup', {
        name,
        email,
        password,
      });
      alert("Signup successful");
      navigate('/login');
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome, ${user.displayName || "Google User"}!`);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.message);
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
            Create your account — take a breath and join us.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="abc xyz"
              value={name}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint transition"
              autoComplete="name"
            />
          </div>

          {/* Email */}
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
              autoComplete="email"
            />
          </div>

          {/* Password */}
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
                autoComplete="new-password"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-mint text-emerald-700 font-semibold py-3 rounded-2xl hover:bg-emerald-100 transition shadow-md disabled:opacity-60"
          >
            {loading ? 'Signing you up…' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8 text-sm">
          <hr className="flex-grow border-t border-mint" />
          <span className="mx-4">or continue with</span>
          <hr className="flex-grow border-t border-mint" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
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

        {/* Login Link */}
        <p className="mt-10 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
