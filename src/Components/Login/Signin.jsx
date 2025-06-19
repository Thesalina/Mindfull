import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../Firebase'; // ✅ Update path if needed

export default function Signin() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  // Email/Password Signup
  

  // Google Signup
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google user signed in:", user);
      alert(`Welcome, ${user.displayName || "Google User"}!`);
      navigate('/'); // Redirect to home page after successful signup
    } catch (error) {
      console.error("Google Sign-in Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-white font-sans">
      <div className="bg-mint text-emerald-600 rounded-3xl shadow-xl max-w-md w-full p-5">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-poppins font-bold text-emerald-600">Mindfull</h1>
          <p className="text-emerald-600 mt-2">Create your account</p>
        </div>

        <form  className="space-y-6" noValidate>
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-emerald-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              required
              placeholder="abc xyz"
              value={fullname}
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
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 bg-white rounded-2xl text-emerald-600 focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-emerald-600">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-mint-light text-mint focus:ring-mint"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
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
          <a href="/login" className="text-emerald-600 font-semibold hover:underline">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
}
