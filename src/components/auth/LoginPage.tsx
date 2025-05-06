import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [useMfa, setUseMfa] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [view, setView] = useState<'login' | 'register'>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useMfa && !mfaCode) {
      // If MFA is enabled but no code is provided, 
      // this would normally trigger sending an MFA code
      setUseMfa(true);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1128] via-[#1f2b4e] to-[#350a5f] p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] w-[80%] h-[70%] bg-[#5643CC]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[80%] h-[70%] bg-[#00E6FF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            <span className="text-[#00E6FF]">Wealth</span>
            <span>Map</span>
          </h1>
          <p className="mt-2 text-indigo-200">Property Intelligence Platform</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8">
            <div className="flex mb-6">
              <button
                className={`flex-1 py-2 text-center ${
                  view === 'login' 
                    ? 'text-white border-b-2 border-[#00E6FF]' 
                    : 'text-indigo-300 hover:text-white'
                }`}
                onClick={() => setView('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 text-center ${
                  view === 'register' 
                    ? 'text-white border-b-2 border-[#00E6FF]' 
                    : 'text-indigo-300 hover:text-white'
                }`}
                onClick={() => setView('register')}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-indigo-300" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-white/20 bg-white/5 rounded-lg 
                                text-white placeholder-indigo-300 backdrop-blur-sm
                                focus:ring-2 focus:ring-[#00E6FF]/50 focus:border-transparent"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-indigo-200 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-indigo-300" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-2.5 border border-white/20 bg-white/5 rounded-lg 
                                text-white placeholder-indigo-300 backdrop-blur-sm
                                focus:ring-2 focus:ring-[#00E6FF]/50 focus:border-transparent"
                      placeholder="••••••••••••"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-indigo-300 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {useMfa && (
                  <div>
                    <label htmlFor="mfa-code" className="block text-sm font-medium text-indigo-200 mb-1">
                      Authentication Code
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Shield size={18} className="text-indigo-300" />
                      </div>
                      <input
                        id="mfa-code"
                        type="text"
                        value={mfaCode}
                        onChange={(e) => setMfaCode(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-white/20 bg-white/5 rounded-lg 
                                  text-white placeholder-indigo-300 backdrop-blur-sm
                                  focus:ring-2 focus:ring-[#00E6FF]/50 focus:border-transparent"
                        placeholder="Enter 6-digit code"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    id="use-mfa"
                    type="checkbox"
                    checked={useMfa}
                    onChange={() => setUseMfa(!useMfa)}
                    className="h-4 w-4 text-[#00E6FF] bg-white/5 border-white/20 rounded 
                              focus:ring-[#00E6FF]/50 focus:ring-offset-0"
                  />
                  <label htmlFor="use-mfa" className="ml-2 block text-sm text-indigo-200">
                    Use two-factor authentication
                  </label>
                </div>

                {view === 'login' && (
                  <div className="text-right">
                    <a href="#" className="text-sm text-indigo-300 hover:text-[#00E6FF]">
                      Forgot your password?
                    </a>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#5643CC] to-[#00E6FF] 
                              text-white font-semibold rounded-lg shadow-lg
                              hover:from-[#6753dc] hover:to-[#1aebff]
                              focus:outline-none focus:ring-2 focus:ring-[#00E6FF]"
                  >
                    {view === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-indigo-300">
              <p>
                {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setView(view === 'login' ? 'register' : 'login')}
                  className="font-medium text-[#00E6FF] hover:text-[#1aebff]"
                >
                  {view === 'login' ? 'Register' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-indigo-300">
          &copy; 2025 Wealth Map. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;