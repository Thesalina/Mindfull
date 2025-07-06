import React, { useState } from 'react';
import axios from 'axios';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });

      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-mint-light to-white font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10">
        <h2 className="text-2xl font-bold text-center text-emerald-500 mb-6">Forgot Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-2xl"
            placeholder="you@example.com"
          />
          <button
            type="submit"
            className="w-full bg-mint text-emerald-500 font-semibold py-3 rounded-2xl"
          >
            Send Reset Email
          </button>
        </form>
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}