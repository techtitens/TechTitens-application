import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search operations, KPIs, or scenarios..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 px-3 py-2 bg-slate-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900">{user?.email?.split('@')[0] || 'User'}</p>
              <p className="text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};