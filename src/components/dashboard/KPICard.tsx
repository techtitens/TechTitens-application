import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface KPICardProps {
  title: string;
  value: string | number;
  target?: string | number;
  change: number;
  trend: 'up' | 'down';
  suffix?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  target, 
  change, 
  trend, 
  suffix = '',
  icon: Icon 
}) => {
  const isPositive = trend === 'up';
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, shadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-slate-400" />}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-end space-x-2">
          <p className="text-3xl font-bold text-slate-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
            <span className="text-lg text-slate-600">{suffix}</span>
          </p>
        </div>
        
        {target && (
          <p className="text-sm text-slate-500">
            Target: {typeof target === 'number' ? target.toLocaleString() : target}{suffix}
          </p>
        )}
        
        <div className="flex items-center space-x-1">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-slate-500">vs last month</span>
        </div>
      </div>
    </motion.div>
  );
};