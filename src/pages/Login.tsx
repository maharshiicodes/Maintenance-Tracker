import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // SIMULATED AUTH LOGIC (Replace with actual backend later)
    setTimeout(() => {
      // Logic from your notes: "If email not found then throw error 'Account not exist'"
      if (formData.email !== "admin@gearguard.com") {
        setError("Account not exist"); 
        setLoading(false);
        return;
      }

      // Logic from your notes: "Password does not match throw an error msg 'Invalid Password'"
      if (formData.password !== "Admin@123") {
        setError("Invalid Password");
        setLoading(false);
        return;
      }

      // Success
      console.log('Success login');
      navigate('/'); // Go to Dashboard
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black backdrop-blur-md border border-slate-700 rounded-3xl p-10 shadow-2xl"
      >
        <h2 className="text-3xl font-light text-center text-slate-100 mb-10 tracking-wider">Login Page</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Email Input - Underlined Style */}
          <div className="space-y-2">
            <label className="text-slate-300 text-sm ml-1">Email id</label>
            <input 
              type="email" 
              required
              className="w-full bg-transparent border-b border-slate-600 focus:border-cyan-400 px-2 py-2 text-slate-100 outline-none transition-colors"
              placeholder="Enter your email"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-slate-300 text-sm ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="w-full bg-transparent border-b border-slate-600 focus:border-cyan-400 px-2 py-2 text-slate-100 outline-none transition-colors pr-10"
                placeholder="Enter password"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-slate-500 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message Display */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          {/* Sign In Button */}
          <div className="pt-6">
            <button 
              disabled={loading}
              className="w-full border border-slate-600 text-slate-200 py-3 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-2 text-sm text-cyan-500/80 mt-6">
            <Link to="#" className="hover:text-cyan-400 hover:underline">Forget Password ?</Link>
            <span className="text-slate-600">|</span>
            <Link to="/signup" className="hover:text-cyan-400 hover:underline">Sign Up</Link>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Login;