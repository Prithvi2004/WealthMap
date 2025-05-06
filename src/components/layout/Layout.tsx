import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onViewChange: (view: 'dashboard' | 'map' | 'property' | 'analysis') => void;
  currentView: string;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onViewChange, 
  currentView,
  onLogout
}) => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#0A1128] text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Header 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen}
        onLogout={onLogout}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          onViewChange={onViewChange}
          currentView={currentView}
        />
        <main 
          className={`flex-1 overflow-auto p-4 transition-all duration-300 ease-in-out
            ${theme === 'dark' ? 'bg-[#0A1128]' : 'bg-gray-50'}
            ${sidebarOpen ? 'ml-64' : 'ml-0 md:ml-16'}`}
        >
          <div className={`
            ${theme === 'dark' 
              ? 'bg-[#171b29]/60 text-white' 
              : 'bg-white/80 text-gray-900'} 
            backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg h-full
            border ${theme === 'dark' ? 'border-indigo-900/30' : 'border-gray-200/50'}
          `}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;