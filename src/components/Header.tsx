import { Sun, User } from 'lucide-react';
import panelLeftIcon from '../assets/panel-left.svg';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header = ({ isSidebarOpen, onToggleSidebar }: HeaderProps) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-8 h-14 flex items-center justify-between transition-all duration-300 ${
      isSidebarOpen ? 'ml-72' : 'ml-20'
    }`}>
      {/* Left side - Hamburger menu */}
      <button 
        onClick={onToggleSidebar}
        className="p-1.5 hover:bg-gray-100 rounded transition-colors"
      >
        <img src={panelLeftIcon} alt="Toggle sidebar" className="w-4 h-4" />
      </button>

      {/* Right side - Theme toggle and profile */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Sun size={16} className="text-gray-900" />
        </button>
        <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
          <User size={20} className="text-white" />
        </button>
      </div>
    </header>
  );
};
