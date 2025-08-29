import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Download, FileText, BarChart3, Settings, Zap } from 'lucide-react';
import { Chart } from '../../components/dashboard/Chart';
import { toast } from 'react-hot-toast';

export const SimulationsPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [parameters, setParameters] = useState({
    productionRate: 150,
    workforceAllocation: 75,
    machineUptime: 87,
    qualityThreshold: 95,
    energyEfficiency: 68,
    maintenanceFrequency: 30
  });

  const [results, setResults] = useState({
    predictedEfficiency: 87,
    optimizedEfficiency: 94,
    costSavings: 285000,
    resourceUtilization: 78
  });

  const simulationData = [
    { time: '0h', predicted: 87, optimized: 87, actual: 85 },
    { time: '2h', predicted: 88, optimized: 91, actual: 89 },
    { time: '4h', predicted: 87, optimized: 93, actual: 91 },
    { time: '6h', predicted: 89, optimized: 94, actual: 92 },
    { time: '8h', predicted: 88, optimized: 95, actual: 94 },
    { time: '10h', predicted: 90, optimized: 96, actual: 95 },
    { time: '12h', predicted: 89, optimized: 97, actual: 96 }
  ];

  const handleParameterChange = (param: string, value: number) => {
    setParameters(prev => ({ ...prev, [param]: value }));
  };

  const runSimulation = async () => {
    setIsRunning(true);
    setSimulationComplete(false);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Calculate optimized results based on parameters
    const optimizedEfficiency = Math.min(98, 70 + (parameters.productionRate / 10) + (parameters.workforceAllocation / 5) + (parameters.machineUptime / 10));
    const costSavings = parameters.productionRate * 1500 + parameters.workforceAllocation * 800;
    
    setResults({
      predictedEfficiency: parameters.machineUptime,
      optimizedEfficiency: Math.round(optimizedEfficiency),
      costSavings,
      resourceUtilization: Math.round((parameters.workforceAllocation + parameters.machineUptime) / 2)
    });
    
    setIsRunning(false);
    setSimulationComplete(true);
    toast.success('Simulation completed successfully!');
  };

  const resetParameters = () => {
    setParameters({
      productionRate: 150,
      workforceAllocation: 75,
      machineUptime: 87,
      qualityThreshold: 95,
      energyEfficiency: 68,
      maintenanceFrequency: 30
    });
    setSimulationComplete(false);
    toast.success('Parameters reset to default values');
  };

  const exportResults = (format: 'pdf' | 'csv') => {
    toast.success(`Simulation results exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Simulation Panel</h1>
          <p className="text-slate-600">Configure parameters and run AI-powered operational simulations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => exportResults('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button 
            onClick={() => exportResults('csv')}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameter Control Panel */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Simulation Parameters</h3>
            <Settings className="w-5 h-5 text-slate-400" />
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Production Rate (units/hour)
              </label>
              <input
                type="range"
                min="100"
                max="250"
                value={parameters.productionRate}
                onChange={(e) => handleParameterChange('productionRate', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>100</span>
                <span className="font-medium text-blue-600">{parameters.productionRate}</span>
                <span>250</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Workforce Allocation (%)
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={parameters.workforceAllocation}
                onChange={(e) => handleParameterChange('workforceAllocation', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>50%</span>
                <span className="font-medium text-blue-600">{parameters.workforceAllocation}%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Machine Uptime (%)
              </label>
              <input
                type="range"
                min="70"
                max="99"
                value={parameters.machineUptime}
                onChange={(e) => handleParameterChange('machineUptime', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>70%</span>
                <span className="font-medium text-blue-600">{parameters.machineUptime}%</span>
                <span>99%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quality Threshold (%)
              </label>
              <input
                type="range"
                min="85"
                max="99"
                value={parameters.qualityThreshold}
                onChange={(e) => handleParameterChange('qualityThreshold', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>85%</span>
                <span className="font-medium text-blue-600">{parameters.qualityThreshold}%</span>
                <span>99%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Energy Efficiency (%)
              </label>
              <input
                type="range"
                min="40"
                max="90"
                value={parameters.energyEfficiency}
                onChange={(e) => handleParameterChange('energyEfficiency', Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>40%</span>
                <span className="font-medium text-blue-600">{parameters.energyEfficiency}%</span>
                <span>90%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Maintenance Frequency (days)
              </label>
              <input
                type="number"
                min="7"
                max="90"
                value={parameters.maintenanceFrequency}
                onChange={(e) => handleParameterChange('maintenanceFrequency', Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  isRunning 
                    ? 'bg-blue-400 text-white cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Running Simulation...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Run AI Simulation</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={resetParameters}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Parameters</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Display */}
        <div className="lg:col-span-2 space-y-6">
          {/* Simulation Results Chart */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Simulation Results</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  <span className="text-sm text-slate-600">Predicted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">AI Optimized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">Actual</span>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <Chart 
                data={simulationData} 
                dataKey="optimized" 
                color="#3b82f6"
                height={320}
              />
            </div>
          </motion.div>

          {/* KPI Results */}
          {simulationComplete && (
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">AI Optimization Results</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{results.optimizedEfficiency}%</div>
                  <div className="text-sm text-slate-600">Optimized Efficiency</div>
                  <div className="text-xs text-green-600 mt-1">
                    +{results.optimizedEfficiency - results.predictedEfficiency}% improvement
                  </div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">${(results.costSavings / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-slate-600">Monthly Savings</div>
                  <div className="text-xs text-green-600 mt-1">+18.5% vs baseline</div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{results.resourceUtilization}%</div>
                  <div className="text-sm text-slate-600">Resource Usage</div>
                  <div className="text-xs text-green-600 mt-1">+12% optimization</div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-orange-600 mb-1">6.2</div>
                  <div className="text-sm text-slate-600">ROI Multiplier</div>
                  <div className="text-xs text-green-600 mt-1">620% return</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Parameter Summary */}
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Configuration</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(parameters).map(([key, value]) => (
            <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-900">
                {typeof value === 'number' && key.includes('Rate') ? value : 
                 typeof value === 'number' && key.includes('%') ? `${value}%` :
                 typeof value === 'number' && key.includes('Frequency') ? `${value}d` :
                 `${value}${key.includes('Allocation') || key.includes('Uptime') || key.includes('Threshold') || key.includes('Efficiency') ? '%' : ''}`}
              </div>
              <div className="text-xs text-slate-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};