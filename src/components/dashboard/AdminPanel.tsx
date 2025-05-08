import React, { useState } from "react";
import {
  Mail,
  Lock,
  UserPlus,
  Settings,
  Shield,
  Users,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<"company" | "employee">("company");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [tosAccepted, setTosAccepted] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    inApp: true,
    sms: false,
  });

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    logoUrl: "",
    address: "",
    dataAccess: "all",
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "admin",
      active: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "viewer",
      active: true,
    },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "viewer",
  });

  const handleRegisterCompany = (e) => {
    e.preventDefault();
    alert(`Company ${formData.companyName} registered successfully!`);
  };

  const handleInviteEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email) return;
    const nextId = employees.length + 1;
    setEmployees([...employees, { ...newEmployee, id: nextId, active: true }]);
    setNewEmployee({ name: "", email: "", role: "viewer" });
    alert(`Invitation sent to ${newEmployee.email}`);
  };

  const handleRevokeAccess = (id) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, active: false } : emp
    );
    setEmployees(updated);
  };

  const handleOnboardSubmit = (e) => {
    e.preventDefault();
    if (!tosAccepted) {
      alert("Please accept the terms of service.");
      return;
    }
    alert("Account created successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1128] via-[#1f2b4e] to-[#350a5f] p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[80%] h-[70%] bg-[#5643CC]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[80%] h-[70%] bg-[#00E6FF]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl w-full relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 space-y-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E6FF] to-[#5643CC]">
            Company Administration & Employee Onboarding
          </h2>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("company")}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === "company"
                  ? "bg-gradient-to-r from-[#5643CC] to-[#00E6FF] text-white"
                  : "bg-white/10 text-indigo-200 hover:bg-white/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings size={18} />
                <span>Company</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("employee")}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === "employee"
                  ? "bg-gradient-to-r from-[#5643CC] to-[#00E6FF] text-white"
                  : "bg-white/10 text-indigo-200 hover:bg-white/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>Employee</span>
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {/* Company Tab */}
            {activeTab === "company" && (
              <div className="space-y-6">
                <form onSubmit={handleRegisterCompany}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-[#00E6FF]/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Email Domain
                      </label>
                      <input
                        type="email"
                        value={formData.companyEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyEmail: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-[#00E6FF]/50"
                        placeholder="company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Logo URL
                      </label>
                      <input
                        type="url"
                        value={formData.logoUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, logoUrl: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-[#00E6FF]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-[#00E6FF]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Data Access
                      </label>
                      <select
                        value={formData.dataAccess}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dataAccess: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-[#00E6FF]/50"
                      >
                        <option value="all">All Properties</option>
                        <option value="region">Region Only</option>
                        <option value="custom">Custom Access</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-[#5643CC] to-[#00E6FF] text-white rounded-lg hover:from-[#6753dc] hover:to-[#1aebff]"
                    >
                      Register Company
                    </button>
                  </div>
                </form>

                {/* Employee Management */}
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Manage Employees
                  </h3>
                  <form onSubmit={handleInviteEmployee} className="mb-6">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Employee Name"
                        value={newEmployee.name}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            name: e.target.value,
                          })
                        }
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-indigo-400"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={newEmployee.email}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            email: e.target.value,
                          })
                        }
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-indigo-400"
                      />
                      <select
                        value={newEmployee.role}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            role: e.target.value,
                          })
                        }
                        className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                      >
                        <option value="viewer">Viewer</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#00E6FF] text-white rounded-lg hover:bg-[#1aebff]"
                      >
                        <UserPlus size={18} />
                      </button>
                    </div>
                  </form>

                  <table className="w-full text-left text-indigo-200">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {employees.map((emp) => (
                        <tr key={emp.id}>
                          <td className="py-3">{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>
                            <select
                              value={emp.role}
                              className="bg-white/5 border border-white/20 rounded px-2 py-1 text-sm"
                            >
                              <option value="viewer">Viewer</option>
                              <option value="editor">Editor</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td>
                            {emp.active ? (
                              <span className="text-green-400 flex items-center gap-1">
                                <CheckCircle size={14} /> Active
                              </span>
                            ) : (
                              <span className="text-red-400">Revoked</span>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => handleRevokeAccess(emp.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Employee Tab */}
            {activeTab === "employee" && (
              <form onSubmit={handleOnboardSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                      placeholder="jane.doe@company.com"
                      readOnly
                      defaultValue="jane.doe@company.com"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                      Create Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                      placeholder="••••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-indigo-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* MFA */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={mfaEnabled}
                    onChange={() => setMfaEnabled(!mfaEnabled)}
                    className="rounded border-white/20 bg-white/5 text-[#00E6FF] focus:ring-[#00E6FF]"
                  />
                  <Shield size={18} className="inline mr-2 text-indigo-300" />
                  <span className="text-indigo-200">
                    Enable Two-Factor Authentication
                  </span>
                </div>

                {/* TOS */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tosAccepted}
                    onChange={() => setTosAccepted(!tosAccepted)}
                    className="rounded border-white/20 bg-white/5 text-[#00E6FF] focus:ring-[#00E6FF]"
                  />
                  <span className="text-indigo-200">
                    I accept the Terms of Service and Privacy Policy
                  </span>
                </div>

                {/* Notifications */}
                <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                  <h4 className="text-white font-medium mb-3">
                    Notification Preferences
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-indigo-200">
                      <input
                        type="checkbox"
                        checked={notificationPrefs.email}
                        onChange={() =>
                          setNotificationPrefs({
                            ...notificationPrefs,
                            email: !notificationPrefs.email,
                          })
                        }
                        className="rounded border-white/20 bg-white/5 text-[#00E6FF]"
                      />
                      Email Notifications
                    </label>
                    <label className="flex items-center gap-2 text-indigo-200">
                      <input
                        type="checkbox"
                        checked={notificationPrefs.inApp}
                        onChange={() =>
                          setNotificationPrefs({
                            ...notificationPrefs,
                            inApp: !notificationPrefs.inApp,
                          })
                        }
                        className="rounded border-white/20 bg-white/5 text-[#00E6FF]"
                      />
                      In-App Notifications
                    </label>
                    <label className="flex items-center gap-2 text-indigo-200">
                      <input
                        type="checkbox"
                        checked={notificationPrefs.sms}
                        onChange={() =>
                          setNotificationPrefs({
                            ...notificationPrefs,
                            sms: !notificationPrefs.sms,
                          })
                        }
                        className="rounded border-white/20 bg-white/5 text-[#00E6FF]"
                      />
                      SMS Alerts
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-[#5643CC] to-[#00E6FF] text-white rounded-lg hover:from-[#6753dc] hover:to-[#1aebff]"
                  >
                    Complete Onboarding
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
