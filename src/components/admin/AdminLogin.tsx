import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, LogIn, ArrowLeft, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { soundFX } from '../../utils/soundFX';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, toggleAdmin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    setLoading(true);
    setErrorMsg(null);

    const res = await loginAdmin(email, password);
    setLoading(false);

    if (res.success) {
      soundFX.playSwoosh();
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 relative font-sans">
      {/* Dynamic Mesh Blob Background */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 border border-white/10 shadow-2xl relative z-10 space-y-6"
      >
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink p-[1px] shadow-glow-purple">
            <div className="w-full h-full bg-[#0B1026] rounded-[15px] flex items-center justify-center text-accent-cyan">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Admin Authentication</h2>
            <p className="text-xs text-slate-400 mt-1">Provide secure credentials to enter the portfolio cockpit</p>
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-slate-300">ADMINISTRATOR EMAIL</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@developer.io"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-slate-300">PASSWORD</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold text-sm tracking-wide shadow-glow-purple hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In Securely</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Cancel Action */}
        <div className="pt-2 border-t border-white/10 flex justify-center">
          <button
            onClick={toggleAdmin}
            onMouseEnter={() => soundFX.playHover()}
            className="flex items-center gap-2 text-xs font-semibold text-accent-cyan hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
