import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Daytona Dashboard</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#3A3A3A] text-white rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[#00E599] focus:border-transparent
                placeholder-gray-500"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#3A3A3A] text-white rounded-md 
                focus:outline-none focus:ring-2 focus:ring-[#00E599] focus:border-transparent
                placeholder-gray-500"
              placeholder="Enter password"
              required
            />
          </div>
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/20 text-red-500 rounded-md text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#00E599] text-black rounded hover:bg-[#00cc88] 
              font-medium transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 