import React from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Home,
  Map,
  Building,
  Users,
  BarChart3,
  FileText,
  Settings,
  Share2,
  HelpCircle,
  LogOut,
  Database,
  UserCog2,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onViewChange: (view: "dashboard" | "map" | "property" | "analysis") => void;
  currentView: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onViewChange,
  currentView,
}) => {
  const { theme } = useTheme();

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", view: "dashboard" },
    { icon: <Map size={20} />, label: "Property Map", view: "map" },
    { icon: <Building size={20} />, label: "Properties", view: "properties" },
    { icon: <Users size={20} />, label: "Owners", view: "owners" },
    { icon: <BarChart3 size={20} />, label: "Analysis", view: "analysis" },
    { icon: <Database size={20} />, label: "Data Export", view: "export" },
    { icon: <Share2 size={20} />, label: "Sharing", view: "sharing" },
    { icon: <FileText size={20} />, label: "Reports", view: "reports" },
    { icon: <UserCog2 size={20} />, label: "Panel", view: "admin" },
  ];

  const bottomMenuItems = [
    { icon: <Settings size={20} />, label: "Settings", view: "settings" },
    { icon: <HelpCircle size={20} />, label: "Help", view: "help" },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-20 pt-16 
        transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } 
        transition-transform duration-300 ease-in-out
        ${
          theme === "dark"
            ? "bg-[#171b29]/80 text-white border-r border-indigo-900/30"
            : "bg-white text-gray-700 border-r border-gray-200/50"
        } 
        backdrop-blur-md
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <div className="flex flex-col justify-between h-full overflow-y-auto no-scrollbar">
        <nav className="space-y-1 p-2">
          {menuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onViewChange(item.view as any)}
              className={`
                flex items-center w-full p-3 rounded-lg transition-colors duration-200
                ${
                  currentView === item.view
                    ? theme === "dark"
                      ? "bg-indigo-900/50 text-[#00E6FF]"
                      : "bg-indigo-50 text-indigo-700"
                    : theme === "dark"
                    ? "hover:bg-indigo-900/20 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && <span className="ml-3 truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-2">
          {bottomMenuItems.map((item) => (
            <button
              key={item.view}
              onClick={() => onViewChange(item.view as any)}
              className={`
                flex items-center w-full p-3 rounded-lg transition-colors duration-200
                ${
                  currentView === item.view
                    ? theme === "dark"
                      ? "bg-indigo-900/50 text-[#00E6FF]"
                      : "bg-indigo-50 text-indigo-700"
                    : theme === "dark"
                    ? "hover:bg-indigo-900/20 text-gray-300"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && <span className="ml-3 truncate">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
