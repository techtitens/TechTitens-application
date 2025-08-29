import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, TrendingUp, Activity, DollarSign, Clock, BarChart3, Eye } from 'lucide-react';
import { Chart } from '../../components/dashboard/Chart';
import { KPICard } from '../../components/dashboard/KPICard';

export const KPIsPage: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [kpiView, setKpiView] = useState<'predicted' | 'optimized' | 'actual'>('actual');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const timeframes = [
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' }
  ];

  const kpiData = {
    predicted: {
      efficiency: { current: 85, target: 95, change: +3.2 },
      costSavings: { current: 245000, target: 320000, change: +12.8 },
      resourceUtilization: { current: 72, target: 85, change: +8.5 },
      uptime: { current: 92.1, target: 99.5, change: +2.1 }
    },
    optimized: {
      efficiency: { current: 94, target: 95, change: +8.7 },
      costSavings: { current: 315000, target: 320000, change: +28.5 },
      resourceUtilization: { current: 88, target: 85, change: +22.2 },
      uptime: { current: 97.8, target: 99.5, change: +6.3 }
    },
    actual: {
      efficiency: { current: 87, target: 95, change: +5.2 },
      costSavings: { current: 285000, target: 320000, change: +18.5 },
      resourceUtilization: { current: 78, target: 85, change: +8.3 },
      uptime: { current: 94.8, target: 99.5, change: -1.2 }
    }
  };

  const chartData = {
    predicted: [
      { month: 'Jan', efficiency: 80, cost: 220, utilization: 68, uptime: 89 },
      { month: 'Feb', efficiency: 82, cost: 235, utilization: 70, uptime: 91 },
      { month: 'Mar', efficiency: 81, cost: 230, utilization: 69, uptime: 90 },
      { month: 'Apr', efficiency: 84, cost: 240, utilization: 71, uptime: 92 },
      { month: 'May', efficiency: 85, cost: 245, utilization: 72, uptime: 92 },
      { month: 'Jun', efficiency: 85, cost: 245, utilization: 72, uptime: 92 }
    ],
    optimized: [
      { month: 'Jan', efficiency: 88, cost: 280, utilization: 82, uptime: 95 },
      { month: 'Feb', efficiency: 90, cost: 290, utilization: 84, uptime: 96 },
      { month: 'Mar', efficiency: 91, cost: 295, utilization: 85, uptime: 96 },
      { month: 'Apr', efficiency: 93, cost: 305, utilization: 87, uptime: 97 },
      { month: 'May', efficiency: 94, cost: 310, utilization: 88, uptime: 98 },
      { month: 'Jun', efficiency: 94, cost: 315, utilization: 88, uptime: 98 }
    ],
    actual: [
      { month: 'Jan', efficiency: 82, cost: 245, utilization: 70, uptime: 92 },
      { month: 'Feb', efficiency: 85, cost: 265, utilization: 74, uptime: 94 },
      { month: 'Mar', efficiency: 83, cost: 255, utilization: 72, uptime: 92 },
      { month: 'Apr', efficiency: 88, cost: 275, utilization: 76, uptime: 95 },
      { month: 'May', efficiency: 87, cost: 285, utilization: 78, uptime: 95 },
      { month: 'Jun', efficiency: 87, cost: 285, utilization: 78, uptime: 95 }
    ]
  };

  const currentData = kpiData[kpiView];
  const currentChartData = chartData[kpiView];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">KPI Overview</h1>
          <p className="text-slate-600">Monitor production efficiency, cost savings, and resource utilization</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeframes.map(timeframe => (
              <option key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* KPI View Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg border border-slate-200 p-1 flex">
          {(['predicted', 'optimized', 'actual'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setKpiView(view)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                kpiView === view
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span className="capitalize">{view} KPIs</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onMouseEnter={() => setHoveredCard('efficiency')}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative"
        >
          <KPICard
            title="Production Efficiency"
            value={currentData.efficiency.current}
            target={currentData.efficiency.target}
            change={currentData.efficiency.change}
            trend={currentData.efficiency.change > 0 ? 'up' : 'down'}
            suffix="%"
            icon={Activity}
          />
          {hoveredCard === 'efficiency' && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800 text-white rounded-lg shadow-lg z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="font-semibold mb-2">Production Efficiency Details</h4>
              <div className="text-sm space-y-1">
                <p>• Manufacturing line performance: 92%</p>
                <p>• Quality control efficiency: 89%</p>
                <p>• Overall equipment effectiveness: 85%</p>
                <p>• Waste reduction: 15% improvement</p>
              </div>
            </motion.div>
          )}
        </div>

        <div
          onMouseEnter={() => setHoveredCard('cost')}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative"
        >
          <KPICard
            title="Cost Savings"
            value={`$${(currentData.costSavings.current / 1000).toFixed(0)}K`}
            target={`$${(currentData.costSavings.target / 1000).toFixed(0)}K`}
            change={currentData.costSavings.change}
            trend={currentData.costSavings.change > 0 ? 'up' : 'down'}
            icon={DollarSign}
          />
          {hoveredCard === 'cost' && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800 text-white rounded-lg shadow-lg z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="font-semibold mb-2">Cost Savings Breakdown</h4>
              <div className="text-sm space-y-1">
                <p>• Energy optimization: $85K</p>
                <p>• Reduced downtime: $120K</p>
                <p>• Material efficiency: $50K</p>
                <p>• Labor optimization: $30K</p>
              </div>
            </motion.div>
          )}
        </div>

        <div
          onMouseEnter={() => setHoveredCard('resource')}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative"
        >
          <KPICard
            title="Resource Utilization"
            value={currentData.resourceUtilization.current}
            target={currentData.resourceUtilization.target}
            change={currentData.resourceUtilization.change}
            trend={currentData.resourceUtilization.change > 0 ? 'up' : 'down'}
            suffix="%"
            icon={BarChart3}
          />
          {hoveredCard === 'resource' && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800 text-white rounded-lg shadow-lg z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="font-semibold mb-2">Resource Utilization Details</h4>
              <div className="text-sm space-y-1">
                <p>• Machine capacity: 82%</p>
                <p>• Workforce efficiency: 76%</p>
                <p>• Material usage: 91%</p>
                <p>• Energy consumption: 73%</p>
              </div>
            </motion.div>
          )}
        </div>

        <div
          onMouseEnter={() => setHoveredCard('uptime')}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative"
        >
          <KPICard
            title="System Uptime"
            value={currentData.uptime.current}
            target={currentData.uptime.target}
            change={currentData.uptime.change}
            trend={currentData.uptime.change > 0 ? 'up' : 'down'}
            suffix="%"
            icon={Clock}
          />
          {hoveredCard === 'uptime' && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-slate-800 text-white rounded-lg shadow-lg z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="font-semibold mb-2">System Uptime Analysis</h4>
              <div className="text-sm space-y-1">
                <p>• Planned maintenance: 2.1%</p>
                <p>• Unplanned downtime: 1.8%</p>
                <p>• System failures: 0.8%</p>
                <p>• Network issues: 0.5%</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Efficiency Trends</h3>
          <Chart 
            data={currentChartData} 
            dataKey="efficiency" 
            color="#3b82f6"
            height={250}
          />
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Cost Performance</h3>
          <Chart 
            data={currentChartData} 
            dataKey="cost" 
            type="bar"
            color="#10b981"
            height={250}
          />
        </motion.div>
      </div>

      {/* Department Performance Breakdown */}
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Department Performance Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              name: 'Manufacturing', 
              efficiency: kpiView === 'optimized' ? 96 : kpiView === 'predicted' ? 88 : 94, 
              target: 96, 
              color: 'blue',
              details: ['Line A: 98%', 'Line B: 92%', 'Line C: 96%']
            },
            { 
              name: 'Quality Control', 
              efficiency: kpiView === 'optimized' ? 94 : kpiView === 'predicted' ? 85 : 88, 
              target: 92, 
              color: 'green',
              details: ['Inspection: 91%', 'Testing: 89%', 'Validation: 94%']
            },
            { 
              name: 'Supply Chain', 
              efficiency: kpiView === 'optimized' ? 89 : kpiView === 'predicted' ? 72 : 76, 
              target: 85, 
              color: 'orange',
              details: ['Procurement: 82%', 'Logistics: 74%', 'Inventory: 89%']
            }
          ].map((dept, index) => (
            <motion.div 
              key={dept.name} 
              className="text-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <h4 className="font-semibold text-slate-900 mb-4">{dept.name}</h4>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke={dept.color === 'blue' ? '#3b82f6' : dept.color === 'green' ? '#10b981' : '#f97316'}
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${(dept.efficiency / 100) * 251.2} 251.2`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-slate-900">{dept.efficiency}%</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">Target: {dept.target}%</p>
              <div className="space-y-1">
                {dept.details.map((detail, i) => (
                  <p key={i} className="text-xs text-slate-500">{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Metrics Table */}
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Detailed Performance Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 text-slate-700 font-medium">Metric</th>
                <th className="text-center py-3 text-slate-700 font-medium">Current</th>
                <th className="text-center py-3 text-slate-700 font-medium">Target</th>
                <th className="text-center py-3 text-slate-700 font-medium">Change</th>
                <th className="text-center py-3 text-slate-700 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Production Efficiency', current: currentData.efficiency.current, target: currentData.efficiency.target, change: currentData.efficiency.change, unit: '%' },
                { name: 'Cost Savings', current: currentData.costSavings.current / 1000, target: currentData.costSavings.target / 1000, change: currentData.costSavings.change, unit: 'K' },
                { name: 'Resource Utilization', current: currentData.resourceUtilization.current, target: currentData.resourceUtilization.target, change: currentData.resourceUtilization.change, unit: '%' },
                { name: 'System Uptime', current: currentData.uptime.current, target: currentData.uptime.target, change: currentData.uptime.change, unit: '%' }
              ].map((metric, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-slate-900 font-medium">{metric.name}</td>
                  <td className="text-center py-4 text-slate-800">{metric.current}{metric.unit}</td>
                  <td className="text-center py-4 text-slate-600">{metric.target}{metric.unit}</td>
                  <td className="text-center py-4">
                    <span className={`font-medium ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      metric.current >= metric.target 
                        ? 'bg-green-100 text-green-700' 
                        : metric.current >= metric.target * 0.9 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.current >= metric.target ? 'On Target' : 
                       metric.current >= metric.target * 0.9 ? 'Near Target' : 'Below Target'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};