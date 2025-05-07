import React from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Users,
  Link,
  Settings,
  Clock,
  Shield,
  Copy,
  ExternalLink,
  Mail,
} from "lucide-react";

const SharingPage = () => {
  const { theme } = useTheme();

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "Admin",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@company.com",
      role: "Editor",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.d@company.com",
      role: "Viewer",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
  ];

  const sharedLinks = [
    {
      id: 1,
      name: "Q1 Property Portfolio",
      type: "Report",
      accessLevel: "View",
      expires: "2024-04-01",
      views: 45,
    },
    {
      id: 2,
      name: "Investment Analysis",
      type: "Dashboard",
      accessLevel: "Edit",
      expires: "2024-03-25",
      views: 23,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sharing & Collaboration</h1>
        <button
          className={`
          px-4 py-2 rounded-lg flex items-center space-x-2
          ${
            theme === "dark"
              ? "bg-[#00E6FF] hover:bg-[#1aebff] text-[#0A1128]"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }
        `}
        >
          <Users size={18} />
          <span>Invite Members</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div
            className={`
            rounded-xl overflow-hidden
            ${
              theme === "dark"
                ? "bg-[#171b29]/70 border border-indigo-900/30"
                : "bg-white border border-gray-100 shadow-sm"
            }
          `}
          >
            <div className="p-4 border-b border-gray-800/20">
              <h2 className="text-lg font-semibold">Team Members</h2>
            </div>
            <div className="divide-y divide-gray-800/20">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-sm
                      ${
                        member.role === "Admin"
                          ? theme === "dark"
                            ? "bg-purple-900/30 text-purple-300"
                            : "bg-purple-100 text-purple-600"
                          : member.role === "Editor"
                          ? theme === "dark"
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-blue-100 text-blue-600"
                          : theme === "dark"
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                    >
                      {member.role}
                    </span>
                    <button
                      className={`
                      p-2 rounded-lg
                      ${
                        theme === "dark"
                          ? "hover:bg-[#0A1128]/50"
                          : "hover:bg-gray-100"
                      }
                    `}
                    >
                      <Settings size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
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
            <h2 className="text-lg font-semibold mb-4">Quick Share</h2>
            <div className="space-y-4">
              <div
                className={`
                p-4 rounded-lg
                ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
              `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Link size={18} />
                    <span className="text-sm font-medium">Share via Link</span>
                  </div>
                  <button
                    className={`
                    p-2 rounded-lg
                    ${
                      theme === "dark"
                        ? "hover:bg-[#0A1128]/70"
                        : "hover:bg-gray-200"
                    }
                  `}
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  value="https://wealthmap.com/share/abc123"
                  readOnly
                  className={`
                    w-full p-2 rounded-lg text-sm
                    ${
                      theme === "dark"
                        ? "bg-[#171b29]/70 text-gray-400"
                        : "bg-white text-gray-500"
                    }
                  `}
                />
              </div>

              <div
                className={`
                p-4 rounded-lg
                ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
              `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail size={18} />
                    <span className="text-sm font-medium">Share via Email</span>
                  </div>
                </div>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className={`
                    w-full p-2 rounded-lg text-sm mb-2
                    ${
                      theme === "dark"
                        ? "bg-[#171b29]/70 placeholder:text-gray-500"
                        : "bg-white placeholder:text-gray-400"
                    }
                  `}
                />
                <button
                  className={`
                  w-full py-2 rounded-lg text-sm font-medium
                  ${
                    theme === "dark"
                      ? "bg-[#00E6FF] hover:bg-[#1aebff] text-[#0A1128]"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }
                `}
                >
                  Send Invite
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
            <h2 className="text-lg font-semibold mb-4">Active Shares</h2>
            <div className="space-y-3">
              {sharedLinks.map((link) => (
                <div
                  key={link.id}
                  className={`
                    p-4 rounded-lg
                    ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{link.name}</h3>
                    <ExternalLink size={16} className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="space-y-1">
                      <p className="text-gray-400">Type: {link.type}</p>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-gray-400">
                          Expires: {link.expires}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`
                        px-2 py-1 rounded-full text-xs
                        ${
                          theme === "dark"
                            ? "bg-[#00E6FF]/20 text-[#00E6FF]"
                            : "bg-indigo-100 text-indigo-600"
                        }
                      `}
                      >
                        {link.accessLevel}
                      </p>
                      <p className="text-gray-400 mt-1">{link.views} views</p>
                    </div>
                  </div>
                </div>
              ))}
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
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`
                p-2 rounded-lg
                ${theme === "dark" ? "bg-indigo-900/30" : "bg-indigo-50"}
              `}
              >
                <Shield
                  size={20}
                  className={
                    theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                  }
                />
              </div>
              <h2 className="text-lg font-semibold">Security</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Password Protection</span>
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
              <div className="flex items-center justify-between">
                <span className="text-sm">Link Expiration</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharingPage;
