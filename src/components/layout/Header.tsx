import React from 'react';
import { Menu, X, Bell, User, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <header className={`
      sticky top-0 z-30 flex items-center justify-between h-16 px-4 
      ${theme === 'dark' 
        ? 'bg-[#0A1128]/80 text-white border-b border-indigo-900/30' 
        : 'bg-white/80 text-gray-900 border-b border-gray-200/50'} 
      backdrop-blur-md transition-colors duration-300
    `}>
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className={`
            p-2 rounded-lg mr-2 transition-colors duration-200
            ${theme === 'dark'
              ? 'hover:bg-indigo-900/30 text-indigo-300'
              : 'hover:bg-gray-200 text-gray-700'}
          `}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center">
          <span className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="text-[#00E6FF] font-bold">Wealth</span>
            <span>Map</span>
          </span>
        </div>
      </div>

      <div className={`
        absolute left-1/2 transform -translate-x-1/2 
        ${searchOpen ? 'w-1/2' : 'w-auto'}
        transition-all duration-300 ease-in-out
        hidden md:block
      `}>
        {searchOpen ? (
          <div className={`
            flex items-center relative rounded-full 
            ${theme === 'dark' ? 'bg-[#171b29] text-white' : 'bg-gray-100 text-gray-900'}
            py-1 px-4 w-full
          `}>
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search for properties, owners, or addresses..."
              className={`
                bg-transparent border-none outline-none px-3 py-1 w-full
                ${theme === 'dark' ? 'placeholder:text-gray-500' : 'placeholder:text-gray-400'}
              `}
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className={`
                p-1 rounded-full
                ${theme === 'dark' ? 'hover:bg-indigo-900/30' : 'hover:bg-gray-200'}
              `}
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className={`
              p-2 rounded-full
              ${theme === 'dark' 
                ? 'hover:bg-indigo-900/30 text-indigo-300' 
                : 'hover:bg-gray-200 text-gray-700'}
            `}
          >
            <Search size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className={`
            p-2 rounded-full transition-colors duration-200
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-indigo-300' 
              : 'hover:bg-gray-200 text-gray-700'}
          `}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          className={`
            p-2 rounded-full transition-colors duration-200
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-indigo-300' 
              : 'hover:bg-gray-200 text-gray-700'}
          `}
        >
          <Bell size={20} />
        </button>
        <div className="relative">
          <button
            className={`
              p-2 rounded-full transition-colors duration-200
              ${theme === 'dark' 
                ? 'hover:bg-indigo-900/30 text-indigo-300' 
                : 'hover:bg-gray-200 text-gray-700'}
            `}
            onClick={onLogout}
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;