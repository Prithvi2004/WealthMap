import React from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  User,
  Building,
  Bell,
  Lock,
  CreditCard,
  Users,
  Database,
  Mail,
  Shield,
  Smartphone,
} from "lucide-react";

const SettingsPage = () => {
  const { theme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div
            className={`
            p-6 rounded-xl
            ${
              theme === "dark"
                ? "bg-[#171b29]/70 border border-indigo-900/30"
                : "bg-white border border-gray-100 shadow-sm"
            }
          `}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div
                className={`
                p-3 rounded-full
                ${theme === "dark" ? "bg-indigo-900/30" : "bg-indigo-50"}
              `}
              >
                <User
                  size={24}
                  className={
                    theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                  }
                />
              </div>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-gray-400">Administrator</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                className={`
                w-full p-3 rounded-lg text-left flex items-center space-x-3
                ${
                  theme === "dark"
                    ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                    : "bg-gray-50 hover:bg-gray-100"
                }
              `}
              >
                <User size={18} />
                <span>Profile</span>
              </button>
              <button
                className={`
                w-full p-3 rounded-lg text-left flex items-center space-x-3
                ${
                  theme === "dark"
                    ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                    : "bg-gray-50 hover:bg-gray-100"
                }
              `}
              >
                <Building size={18} />
                <span>Company</span>
              </button>
              <button
                className={`
                w-full p-3 rounded-lg text-left flex items-center space-x-3
                ${
                  theme === "dark"
                    ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                    : "bg-gray-50 hover:bg-gray-100"
                }
              `}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              <button
                className={`
                w-full p-3 rounded-lg text-left flex items-center space-x-3
                ${
                  theme === "dark"
                    ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                    : "bg-gray-50 hover:bg-gray-100"
                }
              `}
              >
                <Lock size={18} />
                <span>Security</span>
              </button>
              <button
                className={`
                w-full p-3 rounded-lg text-left flex items-center space-x-3
                ${
                  theme === "dark"
                    ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                    : "bg-gray-50 hover:bg-gray-100"
                }
              `}
              >
                <CreditCard size={18} />
                <span>Billing</span>
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div
            className={`
            p-6 rounded-xl
            ${
              theme === "dark"
                ? "bg-[#171b29]/70 border border-indigo-900/30"
                : "bg-white border border-gray-100 shadow-sm"
            }
          `}
          >
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className={`
                    w-full p-2 rounded-lg border
                    ${
                      theme === "dark"
                        ? "bg-[#0A1128]/50 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900"
                    }
                  `}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@company.com"
                  className={`
                    w-full p-2 rounded-lg border
                    ${
                      theme === "dark"
                        ? "bg-[#0A1128]/50 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900"
                    }
                  `}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  defaultValue="admin"
                  className={`
                    w-full p-2 rounded-lg border
                    ${
                      theme === "dark"
                        ? "bg-[#0A1128]/50 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900"
                    }
                  `}
                >
                  <option value="admin">Administrator</option>
                  <option value="user">User</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
          </div>

          <div
            className={`
            p-6 rounded-xl
            ${
              theme === "dark"
                ? "bg-[#171b29]/70 border border-indigo-900/30"
                : "bg-white border border-gray-100 shadow-sm"
            }
          `}
          >
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-opacity-50 border border-yellow-500/20">
                <div className="flex items-center space-x-3">
                  <Shield size={20} className="text-yellow-500" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <button
                  className={`
                  px-4 py-2 rounded-lg
                  ${
                    theme === "dark"
                      ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                      : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                  }
                `}
                >
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-opacity-50 border border-green-500/20">
                <div className="flex items-center space-x-3">
                  <Smartphone size={20} className="text-green-500" />
                  <div>
                    <p className="font-medium">Mobile App Access</p>
                    <p className="text-sm text-gray-400">
                      Manage mobile device access
                    </p>
                  </div>
                </div>
                <button
                  className={`
                  px-4 py-2 rounded-lg
                  ${
                    theme === "dark"
                      ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }
                `}
                >
                  Configure
                </button>
              </div>
            </div>
          </div>

          <div
            className={`
            p-6 rounded-xl
            ${
              theme === "dark"
                ? "bg-[#171b29]/70 border border-indigo-900/30"
                : "bg-white border border-gray-100 shadow-sm"
            }
          `}
          >
            <h2 className="text-xl font-semibold mb-4">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail size={20} />
                  <span>Email Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div
                    className={`
                    w-11 h-6 rounded-full peer 
                    ${
                      theme === "dark"
                        ? "bg-gray-700 peer-checked:bg-[#00E6FF]"
                        : "bg-gray-200 peer-checked:bg-indigo-600"
                    }
                    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                    dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute 
                    after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                  `}
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users size={20} />
                  <span>Team Mentions</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div
                    className={`
                    w-11 h-6 rounded-full peer 
                    ${
                      theme === "dark"
                        ? "bg-gray-700 peer-checked:bg-[#00E6FF]"
                        : "bg-gray-200 peer-checked:bg-indigo-600"
                    }
                    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                    dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute 
                    after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                  `}
                  ></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database size={20} />
                  <span>Data Updates</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div
                    className={`
                    w-11 h-6 rounded-full peer 
                    ${
                      theme === "dark"
                        ? "bg-gray-700 peer-checked:bg-[#00E6FF]"
                        : "bg-gray-200 peer-checked:bg-indigo-600"
                    }
                    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                    dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute 
                    after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                  `}
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
