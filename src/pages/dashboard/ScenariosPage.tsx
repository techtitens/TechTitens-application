import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare as Compare, Star, Clock, DollarSign, Zap, CheckCircle, AlertTriangle, Copy, Edit3, Trash2 } from 'lucide-react';
import { Chart } from '../../components/dashboard/Chart';
import { toast } from 'react-hot-toast';

interface Scenario {
  id: number;
  name: string;
  efficiency: number;
  cost: number;
  timeline: string;
  status: 'baseline' | 'recommended' | 'alternative' | 'future';
  description: string;
  parameters: {
    productionRate: number;
    workforceAllocation: number;
    machineUptime: number;
    automation: number;
  };
}

export const ScenariosPage: React.FC = () => {
  const [selectedScenarios, setSelectedScenarios] = useState<number[]>([1, 2]);
  const [compareMode, setCompareMode] = useState(false);
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: 1,
      name: 'Current Operations',
      efficiency: 87,
      cost: 285000,
      timeline: '12 months',
      status: 'baseline',
      description: 'Current operational state without optimizations',
      parameters: { productionRate: 150, workforceAllocation: 75, machineUptime: 87, automation: 45 }
    },
    {
      id: 2,
      name: 'AI-Optimized Workflow',
      efficiency: 94,
      cost: 325000,
      timeline: '8 months',
      status: 'recommended',
      description: 'AI-driven process optimization with automated scheduling',
      parameters: { productionRate: 180, workforceAllocation: 85, machineUptime: 94, automation: 75 }
    },
    {
      id: 3,
      name: 'Hybrid Automation',
      efficiency: 91,
      cost: 305000,
      timeline: '10 months',
      status: 'alternative',
      description: 'Partial automation with human oversight',
      parameters: { productionRate: 165, workforceAllocation: 80, machineUptime: 91, automation: 60 }
    },
    {
      id: 4,
      name: 'Full Automation',
      efficiency: 96,
      cost: 380000,
      timeline: '6 months',
      status: 'future',
      description: 'Complete process automation with AI monitoring',
      parameters: { productionRate: 200, workforceAllocation: 90, machineUptime: 96, automation: 95 }
    }
  ]);

  const toggleScenario = (id: number) => {
    if (selectedScenarios.includes(id)) {
      setSelectedScenarios(selectedScenarios.filter(s => s !== id));
    } else if (selectedScenarios.length < 3) {
      setSelectedScenarios([...selectedScenarios, id]);
    } else {
      toast.error('Maximum 3 scenarios can be compared at once');
    }
  };

  const duplicateScenario = (scenario: Scenario) => {
    const newScenario = {
      ...scenario,
      id: Math.max(...scenarios.map(s => s.id)) + 1,
      name: `${scenario.name} (Copy)`,
      status: 'alternative' as const
    };
    setScenarios([...scenarios, newScenario]);
    toast.success('Scenario duplicated successfully');
  };

  const deleteScenario = (id: number) => {
    if (scenarios.length <= 2) {
      toast.error('Cannot delete - minimum 2 scenarios required');
      return;
    }
    setScenarios(scenarios.filter(s => s.id !== id));
    setSelectedScenarios(selectedScenarios.filter(s => s !== id));
    toast.success('Scenario deleted');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'baseline': return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'recommended': return 'bg-green-100 text-green-700 border-green-300';
      case 'alternative': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'future': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recommended': return <Star className="w-4 h-4" />;
      case 'baseline': return <CheckCircle className="w-4 h-4" />;
      case 'future': return <Zap className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const comparisonChartData = selectedScenarios.map(id => {
    const scenario = scenarios.find(s => s.id === id);
    return {
      name: scenario?.name.split(' ')[0] || '',
      efficiency: scenario?.efficiency || 0,
      cost: scenario?.cost ? scenario.cost / 1000 : 0,
      roi: scenario ? ((scenario.efficiency - 87) * 2.5) : 0
    };
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scenario Comparison</h1>
          <p className="text-slate-600">Compare optimization strategies and analyze performance outcomes</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              compareMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Compare className="w-4 h-4" />
            <span>Compare Mode</span>
          </button>
        </div>
      </div>

      {/* Comparison View */}
      {compareMode && selectedScenarios.length > 1 && (
        <motion.div 
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-6">Side-by-Side Comparison</h3>
          
          {/* Comparison Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="text-left py-3 text-blue-800 font-medium">Scenario</th>
                  <th className="text-center py-3 text-blue-800 font-medium">Efficiency</th>
                  <th className="text-center py-3 text-blue-800 font-medium">Investment</th>
                  <th className="text-center py-3 text-blue-800 font-medium">Timeline</th>
                  <th className="text-center py-3 text-blue-800 font-medium">ROI</th>
                </tr>
              </thead>
              <tbody>
                {scenarios
                  .filter(scenario => selectedScenarios.includes(scenario.id))
                  .map(scenario => (
                    <tr key={scenario.id} className="border-b border-blue-100">
                      <td className="py-3 text-blue-900 font-medium">{scenario.name}</td>
                      <td className="text-center py-3 text-blue-800">{scenario.efficiency}%</td>
                      <td className="text-center py-3 text-blue-800">${(scenario.cost / 1000).toFixed(0)}K</td>
                      <td className="text-center py-3 text-blue-800">{scenario.timeline}</td>
                      <td className="text-center py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                          +{((scenario.efficiency - 87) * 2.5).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Side-by-Side Bar Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-3">Performance Metrics</h4>
              <Chart 
                data={comparisonChartData} 
                dataKey="efficiency" 
                type="bar"
                color="#3b82f6"
                height={200}
              />
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-3">ROI Comparison</h4>
              <Chart 
                data={comparisonChartData} 
                dataKey="roi" 
                type="bar"
                color="#10b981"
                height={200}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              selectedScenarios.includes(scenario.id) 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">{scenario.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(scenario.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(scenario.status)}
                      <span className="capitalize">{scenario.status}</span>
                    </div>
                  </span>
                </div>
              </div>

              <p className="text-slate-600 mb-6">{scenario.description}</p>

              {/* Parameter Summary */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-slate-50 rounded">
                  <div className="text-sm font-medium text-slate-900">{scenario.parameters.productionRate}</div>
                  <div className="text-xs text-slate-500">Production Rate</div>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <div className="text-sm font-medium text-slate-900">{scenario.parameters.workforceAllocation}%</div>
                  <div className="text-xs text-slate-500">Workforce</div>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <div className="text-sm font-medium text-slate-900">{scenario.parameters.machineUptime}%</div>
                  <div className="text-xs text-slate-500">Uptime</div>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded">
                  <div className="text-sm font-medium text-slate-900">{scenario.parameters.automation}%</div>
                  <div className="text-xs text-slate-500">Automation</div>
                </div>
              </div>

              {/* KPI Outcomes */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-slate-900">{scenario.efficiency}%</div>
                  <div className="text-xs text-slate-500">Efficiency</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-slate-900">${(scenario.cost / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-slate-500">Investment</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-slate-900">{scenario.timeline}</div>
                  <div className="text-xs text-slate-500">Timeline</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleScenario(scenario.id)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      selectedScenarios.includes(scenario.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {selectedScenarios.includes(scenario.id) ? 'Selected' : 'Select'}
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => duplicateScenario(scenario)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
                    title="Duplicate scenario"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded transition-all"
                    title="Edit scenario"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {scenario.status !== 'baseline' && (
                    <button
                      onClick={() => deleteScenario(scenario.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                      title="Delete scenario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3 text-sm text-slate-600">
                Potential ROI: <span className="font-semibold text-green-600">
                  +{((scenario.efficiency - 87) * 2.5).toFixed(1)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Comparison Chart */}
      {selectedScenarios.length > 1 && (
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Comparison Chart</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Efficiency Comparison</h4>
              <Chart 
                data={comparisonChartData} 
                dataKey="efficiency" 
                type="bar"
                color="#3b82f6"
                height={200}
              />
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Investment vs ROI</h4>
              <Chart 
                data={comparisonChartData} 
                dataKey="roi" 
                type="bar"
                color="#10b981"
                height={200}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Implementation Roadmap */}
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Implementation Roadmap</h3>
        <div className="space-y-4">
          {[
            { phase: 'Phase 1: Assessment & Planning', duration: '2-4 weeks', status: 'completed', progress: 100 },
            { phase: 'Phase 2: Infrastructure Setup', duration: '4-6 weeks', status: 'in-progress', progress: 65 },
            { phase: 'Phase 3: AI Integration', duration: '6-8 weeks', status: 'pending', progress: 0 },
            { phase: 'Phase 4: Testing & Optimization', duration: '3-4 weeks', status: 'pending', progress: 0 },
            { phase: 'Phase 5: Full Deployment', duration: '2-3 weeks', status: 'pending', progress: 0 }
          ].map((phase, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className={`w-4 h-4 rounded-full ${
                phase.status === 'completed' ? 'bg-green-500' :
                phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-300'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-slate-900">{phase.phase}</div>
                  <div className="text-sm text-slate-600">{phase.duration}</div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      phase.status === 'completed' ? 'bg-green-500' :
                      phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-300'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {phase.progress}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};