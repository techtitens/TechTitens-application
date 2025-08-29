import React from 'react';
import { KPICard } from '../../components/dashboard/KPICard';
import { Chart } from '../../components/dashboard/Chart';
import { kpiData, chartData, realTimeMetrics, alerts } from '../../data/dummyData';
import { 
  Activity, 
  DollarSign, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Play,
  Pause
} from 'lucide-react';
import { motion } from 'framer-motion';

export const OverviewPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Operations Overview</h1>
          <p className="text-slate-600">Monitor your industrial operations in real-time</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Monitoring</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Efficiency Rate"
          value={kpiData.efficiency.current}
          target={kpiData.efficiency.target}
          change={kpiData.efficiency.change}
          trend={kpiData.efficiency.trend}
          suffix="%"
          icon={Activity}
        />
        <KPICard
          title="Productivity Index"
          value={kpiData.productivity.current}
          target={kpiData.productivity.target}
          change={kpiData.productivity.change}
          trend={kpiData.productivity.trend}
          icon={TrendingUp}
        />
        <KPICard
          title="Cost Savings"
          value={`$${(kpiData.costSavings.current / 1000).toFixed(0)}K`}
          target={`$${(kpiData.costSavings.target / 1000).toFixed(0)}K`}
          change={kpiData.costSavings.change}
          trend={kpiData.costSavings.trend}
          icon={DollarSign}
        />
        <KPICard
          title="System Uptime"
          value={kpiData.uptime.current}
          target={kpiData.uptime.target}
          change={kpiData.uptime.change}
          trend={kpiData.uptime.trend}
          suffix="%"
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <motion.div 
          className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Trends</h3>
          <Chart 
            data={chartData} 
            dataKey="efficiency" 
            color="#3b82f6"
            height={250}
          />
        </motion.div>

        {/* Real-time Metrics */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Real-time Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Active Processes</span>
              <span className="text-lg font-bold text-slate-900">{realTimeMetrics.activeProcesses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Queued Jobs</span>
              <span className="text-lg font-bold text-slate-900">{realTimeMetrics.queuedJobs}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Avg Wait Time</span>
              <span className="text-lg font-bold text-slate-900">{realTimeMetrics.averageWaitTime}min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Throughput</span>
              <span className="text-lg font-bold text-slate-900">{realTimeMetrics.throughput}/hr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Error Rate</span>
              <span className="text-lg font-bold text-red-600">{realTimeMetrics.errorRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Resource Usage</span>
              <span className="text-lg font-bold text-slate-900">{realTimeMetrics.resourceUtilization}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alerts & Notifications */}
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const getIcon = () => {
              switch (alert.type) {
                case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
                case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
                default: return <Info className="w-5 h-5 text-blue-500" />;
              }
            };

            const getBgColor = () => {
              switch (alert.type) {
                case 'warning': return 'bg-yellow-50 border-yellow-200';
                case 'success': return 'bg-green-50 border-green-200';
                default: return 'bg-blue-50 border-blue-200';
              }
            };

            return (
              <div key={alert.id} className={`p-4 rounded-lg border ${getBgColor()}`}>
                <div className="flex items-start space-x-3">
                  {getIcon()}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};