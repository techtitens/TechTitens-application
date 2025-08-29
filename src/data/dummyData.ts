export const kpiData = {
  efficiency: {
    current: 87,
    target: 95,
    change: +5.2,
    trend: 'up'
  },
  productivity: {
    current: 142,
    target: 160,
    change: +12.8,
    trend: 'up'
  },
  costSavings: {
    current: 285000,
    target: 320000,
    change: +18.5,
    trend: 'up'
  },
  uptime: {
    current: 94.8,
    target: 99.5,
    change: -1.2,
    trend: 'down'
  }
};

export const chartData = [
  { month: 'Jan', efficiency: 82, productivity: 128, cost: 245000 },
  { month: 'Feb', efficiency: 85, productivity: 135, cost: 265000 },
  { month: 'Mar', efficiency: 83, productivity: 131, cost: 255000 },
  { month: 'Apr', efficiency: 88, productivity: 145, cost: 275000 },
  { month: 'May', efficiency: 87, productivity: 142, cost: 285000 },
  { month: 'Jun', efficiency: 90, productivity: 148, cost: 295000 },
];

export const simulationScenarios = [
  {
    id: 1,
    name: 'Current Operations',
    efficiency: 87,
    cost: 285000,
    timeline: '12 months',
    status: 'baseline',
    description: 'Current operational state without optimizations'
  },
  {
    id: 2,
    name: 'AI-Optimized Workflow',
    efficiency: 94,
    cost: 325000,
    timeline: '8 months',
    status: 'recommended',
    description: 'AI-driven process optimization with automated scheduling'
  },
  {
    id: 3,
    name: 'Hybrid Automation',
    efficiency: 91,
    cost: 305000,
    timeline: '10 months',
    status: 'alternative',
    description: 'Partial automation with human oversight'
  },
  {
    id: 4,
    name: 'Full Automation',
    efficiency: 96,
    cost: 380000,
    timeline: '6 months',
    status: 'future',
    description: 'Complete process automation with AI monitoring'
  }
];

export const workflowData = [
  {
    id: 'workflow-1',
    name: 'Manufacturing Line A',
    efficiency: 89,
    bottlenecks: ['Quality Control', 'Material Handling'],
    suggestions: ['Implement predictive maintenance', 'Optimize material flow'],
    status: 'optimizing'
  },
  {
    id: 'workflow-2',
    name: 'Supply Chain Management',
    efficiency: 76,
    bottlenecks: ['Vendor Coordination', 'Inventory Management'],
    suggestions: ['Automate vendor communications', 'Implement just-in-time inventory'],
    status: 'needs-attention'
  },
  {
    id: 'workflow-3',
    name: 'Quality Assurance',
    efficiency: 92,
    bottlenecks: ['Manual Inspection'],
    suggestions: ['Deploy AI vision systems'],
    status: 'performing-well'
  }
];

export const realTimeMetrics = {
  activeProcesses: 24,
  queuedJobs: 8,
  averageWaitTime: 3.2,
  throughput: 156,
  errorRate: 0.8,
  resourceUtilization: 78
};

export const alerts = [
  {
    id: 1,
    type: 'warning',
    message: 'Manufacturing Line B efficiency dropped to 72%',
    timestamp: '2 minutes ago',
    priority: 'high'
  },
  {
    id: 2,
    type: 'success',
    message: 'Quality Assurance workflow optimization completed',
    timestamp: '15 minutes ago',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'info',
    message: 'Monthly performance report available for download',
    timestamp: '1 hour ago',
    priority: 'low'
  }
];