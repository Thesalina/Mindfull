// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../Firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handles email/password login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Google login successful!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

   return (
    <div className="min-h-screen flex items-center justify-center px-6  bg-white text-emerald-600 font-sans">
      <div className="bg-mint  text-emerald-600 rounded-3xl shadow-xl max-w-md w-full p-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-poppins font-bold text-emerald-600">Mindfull</h1>
          <p className="text-emerald-600 mt-2">Welcome back! Please login to your account.</p>
        </div>

        <form  className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm  bg-mint  font-medium text-emerald-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300  bg-white rounded-2xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium bg-mint text-emerald-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border bg-white border-slate-300 rounded-2xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-emerald-600">
            <label className="flex items-center bg-mint space-x-2">
              <input type="checkbox" className="rounded border-mint-light   text-mint focus:ring-mint" />
              <span>Remember me</span>
            </label>
            <a href="/forgotpassword" className="hover:text-emerald-600 font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-emerald-600 font-semibold py-3 rounded-2xl hover:bg-mint transition duration-200 shadow-md hover:shadow-lg"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-8 text-emerald-600 text-sm">
          <hr className="flex-grow border-t border-mint" />
          <span className="mx-4">or continue with</span>
          <hr className="flex-grow border-t border-mint" />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 flex items-center bg-white justify-center gap-2 border border-slate-300 rounded-2xl py-3 hover:shadow-md transition"
            aria-label="Continue with Google"
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

        <p className="mt-10 text-center text-emerald-600 text-sm">
          Don’t have an account?{' '}
          <a href="/signup" className="text-emerald-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
} 