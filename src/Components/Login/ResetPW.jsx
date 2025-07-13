// File: ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';


export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://mindfull-backend-gf19.onrender.com', {
        token,
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center dark:bg-slate-dark  justify-center px-6 bg-gradient-to-br from-mint-light to-white font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10">
        <h2 className="text-2xl font-bold text-center text-emerald-500 mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-2xl"
            placeholder="Enter new password"
          />
          <button
            type="submit"
            className="w-full bg-mint text-emerald-500 font-semibold py-3 rounded-2xl"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
