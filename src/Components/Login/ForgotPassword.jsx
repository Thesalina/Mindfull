import React, { useState } from 'react';
//import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
//import app from '../../firebase'; // adjust this path based on your project structure

//const auth = getAuth(app);

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      //await sendPasswordResetEmail(auth, email);
      setMessage('✅ Password reset email sent! Check your inbox.');
    } catch (err) {
      setError('❌ Failed to send reset email. Make sure the email is registered.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-mint-light to-white font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Forgot Password</h2>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-mint text-slate-900 font-semibold py-3 rounded-2xl hover:bg-mint-dark transition duration-200 shadow-md hover:shadow-lg"
          >
            Send Reset Email
          </button>
        </form>

        {message && <p className="text-green-600 text-sm mt-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <p className="mt-6 text-center text-sm text-slate-500">
          <a href="/login" className="text-mint font-medium hover:underline">Back to Login</a>
        </p>
      </div>
    </div>
  );
}
