import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import {
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../Firebase';
import { useAuth } from '../Login/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginBackendUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mindfull-backend-gf19.onrender.com', {
        email,
        password,
      });

      const { user, token } = response.data;
      loginBackendUser(user, token);

      alert('Login successful!');
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed!');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Google login successful!');
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="min-h-screen dark:bg-slate-dark flex items-center justify-center px-6 font-sans"
      style={{
        background: 'linear-gradient(135deg, #A7F3D0 0%, #F0FDF4 100%)'
      }}
    >
      <div className="bg-white text-emerald-600 rounded-3xl shadow-xl max-w-md w-full p-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-poppins font-bold text-emerald-600">Mindfull</h1>
          <p className="text-emerald-600 mt-2">Welcome back! Please login to your account.</p>
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
              className="w-full px-4 py-3 border border-slate-300 bg-white rounded-2xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-mint transition"
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
                className="w-full px-4 py-3 pr-12 border border-slate-300 bg-white rounded-2xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-mint transition"
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

          <div className="flex justify-center items-center text-sm">
            <a href="/forgotpassword" className="hover:text-emerald-600 font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-mint text-emerald-600 font-semibold py-3 rounded-2xl hover:bg-emerald-100 transition shadow-md"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-8 text-sm">
          <hr className="flex-grow border-t border-mint" />
          <span className="mx-4">or continue with</span>
          <hr className="flex-grow border-t border-mint" />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 flex items-center bg-white justify-center gap-2 border border-slate-300 rounded-2xl py-3 hover:shadow-md transition"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span className="text-emerald-600 font-medium">Google</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm">
          Don’t have an account?{' '}
          <a
            href="/signin"
            className="text-emerald-600 font-semibold hover:underline"
          >
            signin here
          </a>
        </p>
      </div>
    </div>
  );
}
