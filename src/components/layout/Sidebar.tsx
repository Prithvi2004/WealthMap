import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
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
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  currentPath,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/" },
    { icon: <Map size={20} />, label: "Property Map", path: "/map" },
    { icon: <Building size={20} />, label: "Properties", path: "/properties" },
    { icon: <Users size={20} />, label: "Owners", path: "/owners" },
    { icon: <BarChart3 size={20} />, label: "Analysis", path: "/analysis" },
    { icon: <Database size={20} />, label: "Data Export", path: "/export" },
    { icon: <Share2 size={20} />, label: "Sharing", path: "/sharing" },
    { icon: <FileText size={20} />, label: "Reports", path: "/reports" },
    { icon: <UserCog2 size={20} />, label: "Panel", path: "/admin" },
  ];

  const bottomMenuItems = [
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle size={20} />, label: "Help", path: "/help" },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-20 pt-16 
        transform ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } 
        transition-transform duration-300 ease-in-out
        ${theme === "dark"
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
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center w-full p-3 rounded-lg transition-colors duration-200
                ${currentPath === item.path
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
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-2">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center w-full p-3 rounded-lg transition-colors duration-200
                ${currentPath === item.path
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
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
