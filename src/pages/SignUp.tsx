import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  const validatePassword = (pwd: string) => {
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

   
    if (!validatePassword(formData.password)) {
      setError("Password must contain: Upper, Lower, Special char & > 8 chars.");
      setLoading(false);
      return;
    }

    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // SIMULATED DB CHECK
    setTimeout(() => {
      // Mock Duplicate Check
      if (formData.email === "existing@user.com") {
        setError("Email Id should not be a duplicate in database");
        setLoading(false);
      } else {
        console.log("Creating portal user:", formData);
        // Notes: "Land to SignUp page and only portal user create" -> Redirect to Login after success
        navigate('/login');
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-black backdrop-blur-md border border-slate-700 rounded-3xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-light text-center text-slate-100 mb-8 tracking-wider">Sign up page</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name */}
          <div className="space-y-2">
            <label className="text-slate-300 text-sm ml-1">Name</label>
            <input 
              type="text" required
              className="w-full bg-transparent border-b border-slate-600 focus:border-cyan-400 px-2 py-2 text-slate-100 outline-none transition-colors"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-slate-300 text-sm ml-1">Email id</label>
            <input 
              type="email" required
              className="w-full bg-transparent border-b border-slate-600 focus:border-cyan-400 px-2 py-2 text-slate-100 outline-none transition-colors"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-slate-300 text-sm ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} required
                className="w-full bg-transparent border-b border-slate-600 focus:border-cyan-400 px-2 py-2 text-slate-100 outline-none transition-colors pr-10"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 text-slate-500 hover:text-cyan-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Example: Pass@1234
            </div>
          </div>

          {/* Re-enter Password */}
          <div className="space-y-2">
            <label className="text-slate-300 text-sm ml-1">Re-Enter password</label>
            <input 
              type="password" required
              className="w-full bg-transparent border-b border-slate-600 focus:border-cyan-400 px-2 py-2 text-slate-100 outline-none transition-colors"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
              <AlertCircle size={16} className="mt-0.5 min-w-[16px]" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              disabled={loading}
              className="w-full border border-slate-600 text-slate-200 py-3 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Creating User..." : "Sign Up"}
            </button>
          </div>

          <div className="text-center mt-4">
             <Link to="/login" className="text-sm text-slate-500 hover:text-cyan-400">Back to Login</Link>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Signup;