import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../Firebase'; 
import axios from 'axios';

export default function Signin() {
  const [name, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
  // Email/Password Signup
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://mindfull-backend-gf19.onrender.com', {
  name,
  email,
  password,
});

      alert("Signup successful");
      navigate('/login');
    } catch (err) {
  console.error("Signup Error:", err);
  alert(err.response?.data?.error || "Signup failed");
}

  };


  // Google Signup
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user signed in:", user);
      alert(`Welcome, ${user.displayName || "Google User"}!`);
      navigate('/home'); // Redirect to home page after successful signup
    } catch (error) {
      console.error("Google Sign-in Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex dark:bg-slate-dark items-center justify-center px-5 bg-gradient-to-br from-mint-light to-white font-sans">
      <div className=" text-emerald-600 bg-white rounded-3xl shadow-xl max-w-md w-full p-5">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-poppins font-bold text-emerald-600">Mindfull</h1>
          <p className="text-emerald-600 mt-2">Create your account</p>
        </div>

        <form  className="space-y-6 " noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-emerald-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="abc xyz"
              value={name}
              onChange={(e) => setFullname(e.target.value)} 
              className="w-full px-4 py-3 border border-slate-300 bg-white rounded-2xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 bg-white rounded-2xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-600 mb-1">
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
    className="w-full px-4 py-3 pr-12 border bg-white border-slate-300 rounded-2xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition"
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

          <div className="flex justify-between items-center text-sm text-emerald-600">
            <label className="flex items-center space-x-2">
             
            </label>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-white text-emerald-600 font-semibold py-3 rounded-2xl hover:bg-mint transition duration-200 shadow-md hover:shadow-lg"
          >
            Sign Up
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
            onClick={handleGoogleSignup}
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
          Already have an account?{' '}
          <a href="login" className="text-emerald-600 font-semibold hover:underline">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
}
