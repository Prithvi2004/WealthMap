import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Users,
  Shield,
  CheckCircle,
  BarChart2,
  Globe,
  UserPlus,
  Key,
  Image,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define Props
interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState<"login" | "register">("login");
  const [registerType, setRegisterType] = useState<"company" | "employee">(
    "company"
  );

  // Login Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Company Registration
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [dataAccess, setDataAccess] = useState("all");

  // Employee Registration
  const [fullName, setFullName] = useState("");
  const [empPassword, setEmpPassword] = useState("");
  const [empShowPassword, setEmpShowPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [tosAccepted, setTosAccepted] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    inApp: true,
    sms: false,
  });
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    if (email && password) {
      // Trigger parent App's login handler
      onLogin();
    }
  };

  return (
    <div
      className={`min-h-screen flex overflow-hidden transition-colors duration-700 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-indigo-950 text-white"
      }`}
    >
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[80%] h-[70%] bg-[#5643CC]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[80%] h-[70%] bg-[#00E6FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-20"
        aria-label="Toggle theme"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      {/* Container for Swapping Panels */}
      <div className="w-full flex overflow-hidden relative min-h-screen">
        {/* Left Side - Conditional Content or Form */}
        <motion.div
          key={view === "login" ? "content-left" : "form-left"}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full md:w-1/2 flex items-center justify-center p-8 z-10"
        >
          <AnimatePresence mode="wait">
            {view === "login" ? (
              // Content Panel (Left when login)
              <motion.div
                key="content-login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6 w-full max-w-md mx-auto"
              >
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E6FF] to-[#5643CC]">
                  Welcome to Wealth Map Pro
                </h1>
                <p className="text-indigo-200">
                  Unlock exclusive access to property intelligence, net worth
                  analysis, and secure data collaboration.
                </p>
                <FeatureCard
                  icon={<BarChart2 />}
                  title="Real-Time Analytics"
                  description="Track wealth trends and market insights."
                />
                <FeatureCard
                  icon={<Globe />}
                  title="Global Property Insights"
                  description="Explore ownership patterns worldwide."
                />
                <FeatureCard
                  icon={<Shield />}
                  title="Secure Access"
                  description="Role-based permissions & MFA protection."
                />
                <DashboardStats />
              </motion.div>
            ) : (
              // Register Form (Left when register)
              <motion.form
                key="form-register"
                onSubmit={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6 w-full max-w-md mx-auto"
              >
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E6FF] to-[#5643CC]">
                  {registerType === "company"
                    ? "Create Your Company Account"
                    : "Employee Onboarding"}
                </h2>
                {/* Tabs inside Register */}
                <div className="flex gap-4 mb-6">
                  <TabButton
                    active={registerType === "company"}
                    onClick={() => setRegisterType("company")}
                  >
                    <Building2 size={18} /> Company
                  </TabButton>
                  <TabButton
                    active={registerType === "employee"}
                    onClick={() => setRegisterType("employee")}
                  >
                    <Users size={18} /> Employee
                  </TabButton>
                </div>
                {/* Register Form Fields */}
                {registerType === "company" && (
                  <>
                    <InputField
                      label="Company Name"
                      value={companyName}
                      onChange={setCompanyName}
                      placeholder="Your Company Inc."
                    />
                    <InputField
                      label="Email Domain"
                      value={companyEmail}
                      onChange={setCompanyEmail}
                      placeholder="admin@yourcompany.com"
                    />
                    <PasswordField
                      label="Create Password"
                      value={empPassword}
                      show={empShowPassword}
                      onToggle={() => setEmpShowPassword(!empShowPassword)}
                      onChange={setEmpPassword}
                      hasIcon
                    />
                    <InputField
                      label="Address"
                      value={companyAddress}
                      onChange={setCompanyAddress}
                      placeholder="123 Main St, City"
                    />
                    <SelectField
                      label="Data Access Level"
                      value={dataAccess}
                      onChange={setDataAccess}
                      options={[
                        "All Properties",
                        "Region Only",
                        "Custom Access",
                      ]}
                    />
                  </>
                )}
                {registerType === "employee" && (
                  <>
                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 bg-white/5 flex items-center justify-center">
                        {avatar ? (
                          <img
                            src={avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image size={24} className="text-indigo-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="cursor-pointer px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition"
                      >
                        Upload Photo
                      </label>
                    </div>
                    <InputField
                      label="Full Name"
                      value={fullName}
                      onChange={setFullName}
                      placeholder="Jane Doe"
                    />
                    <InputField
                      label="Email Address"
                      value="jane.doe@company.com"
                      onChange={() => {}}
                      placeholder="jane.doe@company.com"
                      readOnly
                    />
                    <PasswordField
                      label="Create Password"
                      value={empPassword}
                      show={empShowPassword}
                      onToggle={() => setEmpShowPassword(!empShowPassword)}
                      onChange={setEmpPassword}
                      hasIcon
                    />
                    <PasswordStrengthMeter password={empPassword} />
                    <CheckboxField
                      label="Enable Two-Factor Authentication"
                      checked={mfaEnabled}
                      onChange={() => setMfaEnabled(!mfaEnabled)}
                      icon={<Shield size={18} />}
                    />
                    <NotificationPreferences
                      prefs={notificationPrefs}
                      onChange={setNotificationPrefs}
                    />
                    <CheckboxField
                      label="I accept the Terms of Service and Privacy Policy"
                      checked={tosAccepted}
                      onChange={() => setTosAccepted(!tosAccepted)}
                    />
                  </>
                )}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#5643CC] to-[#00E6FF] text-white font-semibold rounded-lg shadow-lg transform transition-all hover:from-[#6753dc] hover:to-[#1aebff]"
                >
                  {registerType === "company"
                    ? "Register Company"
                    : "Complete Onboarding"}
                </button>
                <p className="text-center text-sm text-indigo-300 mt-4">
                  Already have an account?{" "}
                  <button
                    onClick={() => setView("login")}
                    className="font-medium text-[#00E6FF] hover:text-[#1aebff] transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Side - Conditional Content or Form */}
        <motion.div
          key={view === "login" ? "form-right" : "content-right"}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full md:w-1/2 flex items-center justify-center p-8 z-10"
        >
          <AnimatePresence mode="wait">
            {view === "login" ? (
              // Login Form (Right when login)
              <motion.form
                key="form-login"
                onSubmit={handleLoginSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6 w-full max-w-md mx-auto"
              >
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E6FF] to-[#5643CC]">
                  Welcome Back
                </h2>
                <p className="text-indigo-300">
                  Log in to explore property ownership data and net worth
                  insights.
                </p>
                <EmailInput value={email} onChange={setEmail} />
                <PasswordField
                  label="Password"
                  value={password}
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                  onChange={setPassword}
                  hasIcon
                />
                <RememberForgot />
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#5643CC] to-[#00E6FF] text-white font-semibold rounded-lg shadow-lg transform transition-all hover:from-[#6753dc] hover:to-[#1aebff]"
                >
                  Sign In
                </button>
                <p className="text-center text-sm text-indigo-300 mt-4">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setView("register")}
                    className="font-medium text-[#00E6FF] hover:text-[#1aebff] transition-colors"
                  >
                    Register Now
                  </button>
                </p>
              </motion.form>
            ) : (
              // Content Panel (Right when register)
              <motion.div
                key="content-register"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6 w-full max-w-md mx-auto"
              >
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E6FF] to-[#5643CC]">
                  Join Your Organization
                </h1>
                <p className="text-indigo-200">
                  Register to start exploring U.S. property ownership, wealth
                  insights, and team collaboration tools.
                </p>
                <FeatureCard
                  icon={<UserPlus />}
                  title="Team Collaboration"
                  description="Invite colleagues and manage access levels."
                />
                <FeatureCard
                  icon={<Key />}
                  title="Secure Login"
                  description="Protect your account with biometric authentication."
                />
                <FeatureCard
                  icon={<Lock />}
                  title="Encrypted Data"
                  description="Enterprise-grade security for sensitive information."
                />
                <DashboardStats />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// Reusable Components
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
      active
        ? "bg-gradient-to-r from-[#5643CC] to-[#00E6FF] text-white"
        : "bg-white/10 text-indigo-200 hover:bg-white/20"
    }`}
  >
    {children}
  </button>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 text-indigo-200 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
    <div className="mt-1 text-[#00E6FF]">{icon}</div>
    <div>
      <strong>{title}</strong>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  </div>
);

const EmailInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div className="relative group">
    <Mail size={18} className="absolute left-3 top-3 text-indigo-400" />
    <input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="you@company.com"
      className="w-full pl-10 pr-3 py-3 border border-white/10 bg-white/5 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-[#00E6FF]/50 outline-none"
      required
    />
  </div>
);

const RememberForgot = () => (
  <div className="flex justify-between text-sm">
    <label className="flex items-center text-indigo-200 cursor-pointer">
      <input
        type="checkbox"
        className="mr-2 h-4 w-4 rounded border-white/20 bg-white/5 text-[#00E6FF]"
      />
      Remember me
    </label>
    <a href="#" className="text-indigo-300 hover:text-[#00E6FF]">
      Forgot Password?
    </a>
  </div>
);

const PasswordStrengthMeter: React.FC<{ password: string }> = ({
  password,
}) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length > 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const strength = getStrength();

  return (
    <div className="space-y-1">
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            strength <= 1
              ? "bg-red-500"
              : strength === 2
              ? "bg-yellow-500"
              : strength === 3
              ? "bg-blue-500"
              : "bg-green-500"
          }`}
          style={{ width: `${(strength / 4) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs text-indigo-400">
        {strength === 0
          ? "Weak"
          : strength === 1
          ? "Fair"
          : strength === 2
          ? "Good"
          : strength === 3
          ? "Strong"
          : "Excellent"}
      </p>
    </div>
  );
};

interface NotificationPreferencesProps {
  prefs: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
  onChange: (prefs: { email: boolean; inApp: boolean; sms: boolean }) => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  prefs,
  onChange,
}) => (
  <div className="border border-white/10 p-4 rounded-lg bg-white/5">
    <h4 className="text-white font-medium mb-3">Notification Preferences</h4>
    <div className="space-y-2">
      <CheckboxField
        label="Email Notifications"
        checked={prefs.email}
        onChange={() => onChange({ ...prefs, email: !prefs.email })}
      />
      <CheckboxField
        label="In-App Notifications"
        checked={prefs.inApp}
        onChange={() => onChange({ ...prefs, inApp: !prefs.inApp })}
      />
      <CheckboxField
        label="SMS Alerts"
        checked={prefs.sms}
        onChange={() => onChange({ ...prefs, sms: !prefs.sms })}
      />
    </div>
  </div>
);

const CheckboxField: React.FC<{
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ReactNode;
}> = ({ label, checked, onChange, icon = null }) => (
  <label className="flex items-center gap-2 text-indigo-200 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="rounded border-white/20 bg-white/5 text-[#00E6FF]"
    />
    {icon && <span className="inline mr-1">{icon}</span>}
    <span>{label}</span>
  </label>
);

const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  readOnly?: boolean;
}> = ({ label, value, onChange, placeholder, readOnly = false }) => (
  <div>
    <label className="block text-sm font-medium text-indigo-200 mb-1">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-[#00E6FF]/50 outline-none"
      required
    />
  </div>
);

const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-indigo-200 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
    >
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const PasswordField: React.FC<{
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
  hasIcon?: boolean;
}> = ({ label, value, show, onToggle, onChange, hasIcon = false }) => (
  <div className="relative group">
    {hasIcon && (
      <Lock
        size={18}
        className="absolute left-3 top-1/2 -translate-y-0.1 text-indigo-400"
      />
    )}
    <label className="block text-sm font-medium text-indigo-200 mb-1">
      {label}
    </label>
    <input
      type={show ? "text" : "password"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="••••••••••••"
      className={`w-full pl-10 pr-10 py-3 border border-white/10 bg-white/5 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-[#00E6FF]/50 outline-none`}
      required
    />
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-9 text-indigo-300"
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);

const DashboardStats = () => (
  <div className="mt-8 bg-white/5 p-4 rounded-lg border border-white/10">
    <h3 className="text-white font-semibold mb-2">Sample Dashboard</h3>
    <div className="grid grid-cols-3 gap-3 text-xs text-indigo-200">
      <StatCard value="12,450" label="Properties" />
      <StatCard value="$8.4M" label="Avg. Net Worth" />
      <StatCard value="1,230" label="Active Users" />
    </div>
  </div>
);

const StatCard: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div className="bg-white/10 p-2 rounded text-center">
    <div className="text-[#00E6FF] font-bold">{value}</div>
    <div>{label}</div>
  </div>
);

export default LoginPage;
