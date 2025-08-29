import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Zap, 
  BarChart3, 
  Target, 
  FileText,
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: LayoutGrid, label: 'Overview', path: '/dashboard' },
    { icon: Zap, label: 'AI Simulations', path: '/dashboard/simulations' },
    { icon: BarChart3, label: 'KPI Monitoring', path: '/dashboard/kpis' },
    { icon: Target, label: 'Scenarios', path: '/dashboard/scenarios' },
    { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <motion.div 
      className={`bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">TechTitans</h1>
            </motion.div>
          )}
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all group ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  {!isCollapsed && (
                    <motion.span 
                      className="font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all w-full group"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-white" />
          {!isCollapsed && (
            <motion.span 
              className="font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Sign Out
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
};