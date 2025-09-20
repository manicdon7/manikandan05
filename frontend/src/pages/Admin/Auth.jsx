import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [formData, setFormData] = useState({
    admin: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://manikandan05-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful! Redirecting...');
        localStorage.setItem('authenticated', 'true');
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      } else {
        toast.error(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Admin Portal</h1>
          <p className="text-gray-400">Secure access to portfolio management</p>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="admin" className="block text-white font-medium mb-2">
                Admin Username
              </label>
              <input
                type="text"
                id="admin"
                name="admin"
                value={formData.admin}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary py-3 text-lg font-semibold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                <span className="shine-text">Sign In</span>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <p className="text-orange-300 text-sm">
                Secure admin access protected by authentication
              </p>
            </div>
          </div>
        </div>

        {/* Back to Portfolio */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
        toastStyle={{
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
          border: '1px solid #FF4900'
        }}
      />
    </div>
  );
};

export default Auth;