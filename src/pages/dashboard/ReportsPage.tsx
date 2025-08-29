import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Filter,
  Search,
  Eye,
  Calendar,
  BarChart3,
  TrendingUp,
  Clock,
  X,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Chart from "../../components/dashboard/Chart";

interface SimulationReport {
  id: string;
  name: string;
  date: string;
  efficiency: number;
  costSavings: number;
  duration: string;
  status: "completed" | "in-progress" | "failed";
  parameters: {
    productionRate: number;
    workforceAllocation: number;
    machineUptime: number;
  };
}

const reports: SimulationReport[] = [
  {
    id: "sim-001",
    name: "Q4 Production Optimization",
    date: "2025-01-15",
    efficiency: 94,
    costSavings: 325000,
    duration: "8 months",
    status: "completed",
    parameters: {
      productionRate: 180,
      workforceAllocation: 85,
      machineUptime: 94,
    },
  },
  {
    id: "sim-002",
    name: "Hybrid Automation Analysis",
    date: "2025-01-12",
    efficiency: 91,
    costSavings: 285000,
    duration: "10 months",
    status: "completed",
    parameters: {
      productionRate: 165,
      workforceAllocation: 80,
      machineUptime: 91,
    },
  },
  {
    id: "sim-003",
    name: "Energy Efficiency Study",
    date: "2025-01-10",
    efficiency: 88,
    costSavings: 195000,
    duration: "6 months",
    status: "in-progress",
    parameters: {
      productionRate: 155,
      workforceAllocation: 75,
      machineUptime: 88,
    },
  },
  {
    id: "sim-004",
    name: "Supply Chain Optimization",
    date: "2025-01-08",
    efficiency: 82,
    costSavings: 145000,
    duration: "4 months",
    status: "failed",
    parameters: {
      productionRate: 145,
      workforceAllocation: 70,
      machineUptime: 82,
    },
  },
];

export const ReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "efficiency" | "cost">("date");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "in-progress" | "failed"
  >("all");
  const [selectedReport, setSelectedReport] = useState<SimulationReport | null>(
    null
  );
  const [chartView, setChartView] = useState<
    "efficiency" | "cost" | "parameters"
  >("efficiency");

  const filteredReports = useMemo(() => {
    return reports
      .filter(
        (report) =>
          (filterStatus === "all" || report.status === filterStatus) &&
          report.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case "efficiency":
            return b.efficiency - a.efficiency;
          case "cost":
            return b.costSavings - a.costSavings;
          default:
            return 0;
        }
      });
  }, [searchTerm, sortBy, filterStatus]);

  const handleDownload = (report: SimulationReport) => {
    toast.success(`Downloading report: ${report.name}`);
    // Implement actual download functionality
  };

  const chartData = useMemo(() => {
    switch (chartView) {
      case "efficiency":
        return {
          labels: filteredReports.map((r) => r.name),
          datasets: [
            {
              label: "Efficiency (%)",
              data: filteredReports.map((r) => r.efficiency),
              backgroundColor: "#3b82f6",
            },
          ],
        };
      case "cost":
        return {
          labels: filteredReports.map((r) => r.name),
          datasets: [
            {
              label: "Cost Savings ($)",
              data: filteredReports.map((r) => r.costSavings),
              backgroundColor: "#10b981",
            },
          ],
        };
      case "parameters":
        return {
          labels: filteredReports.map((r) => r.name),
          datasets: [
            {
              label: "Production Rate",
              data: filteredReports.map((r) => r.parameters.productionRate),
              backgroundColor: "#6366f1",
            },
            {
              label: "Workforce Allocation",
              data: filteredReports.map(
                (r) => r.parameters.workforceAllocation
              ),
              backgroundColor: "#f59e0b",
            },
            {
              label: "Machine Uptime",
              data: filteredReports.map((r) => r.parameters.machineUptime),
              backgroundColor: "#ef4444",
            },
          ],
        };
    }
  }, [chartView, filteredReports]);

  const exportReport = (format: "pdf" | "csv" | "excel") => {
    toast.success(`Reports exported as ${format.toUpperCase()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const summaryStats = {
    totalSimulations: reports.length,
    completedSimulations: reports.filter((r) => r.status === "completed")
      .length,
    averageEfficiency: Math.round(
      reports.reduce((acc, r) => acc + r.efficiency, 0) / reports.length
    ),
    totalSavings: reports.reduce((acc, r) => acc + r.costSavings, 0),
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>
            Reports & Insights
          </h1>
          <p className='text-slate-600'>
            View past simulations and export detailed reports
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <button
            onClick={() => exportReport("pdf")}
            className='flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all'
          >
            <FileText className='w-4 h-4' />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => exportReport("excel")}
            className='flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all'
          >
            <Download className='w-4 h-4' />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <motion.div
          className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className='flex items-center justify-between mb-2'>
            <BarChart3 className='w-8 h-8 text-blue-500' />
            <span className='text-2xl font-bold text-slate-900'>
              {summaryStats.totalSimulations}
            </span>
          </div>
          <p className='text-sm text-slate-600'>Total Simulations</p>
        </motion.div>

        <motion.div
          className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className='flex items-center justify-between mb-2'>
            <CheckCircle className='w-8 h-8 text-green-500' />
            <span className='text-2xl font-bold text-slate-900'>
              {summaryStats.completedSimulations}
            </span>
          </div>
          <p className='text-sm text-slate-600'>Completed</p>
        </motion.div>

        <motion.div
          className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className='flex items-center justify-between mb-2'>
            <TrendingUp className='w-8 h-8 text-purple-500' />
            <span className='text-2xl font-bold text-slate-900'>
              {summaryStats.averageEfficiency}%
            </span>
          </div>
          <p className='text-sm text-slate-600'>Avg Efficiency</p>
        </motion.div>

        <motion.div
          className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className='flex items-center justify-between mb-2'>
            <DollarSign className='w-8 h-8 text-green-500' />
            <span className='text-2xl font-bold text-slate-900'>
              ${(summaryStats.totalSavings / 1000000).toFixed(1)}M
            </span>
          </div>
          <p className='text-sm text-slate-600'>Total Savings</p>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className='bg-white rounded-lg shadow-sm border border-slate-200 p-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Search reports...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64'
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className='px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='all'>All Status</option>
              <option value='completed'>Completed</option>
              <option value='in-progress'>In Progress</option>
              <option value='failed'>Failed</option>
            </select>
          </div>

          <div className='flex items-center space-x-3'>
            <span className='text-sm text-slate-600'>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className='px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='date'>Date</option>
              <option value='efficiency'>Efficiency</option>
              <option value='cost'>Cost Savings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <motion.div
        className='bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='text-left py-4 px-6 text-slate-700 font-medium'>
                  Simulation Name
                </th>
                <th className='text-center py-4 px-6 text-slate-700 font-medium'>
                  Date
                </th>
                <th className='text-center py-4 px-6 text-slate-700 font-medium'>
                  Efficiency
                </th>
                <th className='text-center py-4 px-6 text-slate-700 font-medium'>
                  Cost Savings
                </th>
                <th className='text-center py-4 px-6 text-slate-700 font-medium'>
                  Duration
                </th>
                <th className='text-center py-4 px-6 text-slate-700 font-medium'>
                  Status
                </th>
                <th className='text-center py-4 px-6 text-slate-700 font-medium'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  className='border-b border-slate-100 hover:bg-slate-50 transition-colors'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className='py-4 px-6'>
                    <div>
                      <div className='font-medium text-slate-900'>
                        {report.name}
                      </div>
                      <div className='text-sm text-slate-500'>
                        ID: {report.id}
                      </div>
                    </div>
                  </td>
                  <td className='text-center py-4 px-6 text-slate-700'>
                    {new Date(report.date).toLocaleDateString()}
                  </td>
                  <td className='text-center py-4 px-6'>
                    <span className='font-semibold text-slate-900'>
                      {report.efficiency}%
                    </span>
                  </td>
                  <td className='text-center py-4 px-6'>
                    <span className='font-semibold text-green-600'>
                      ${(report.costSavings / 1000).toFixed(0)}K
                    </span>
                  </td>
                  <td className='text-center py-4 px-6 text-slate-700'>
                    {report.duration}
                  </td>
                  <td className='text-center py-4 px-6'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className='text-center py-4 px-6'>
                    <button
                      onClick={() => setSelectedReport(report)}
                      className='flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-all mx-auto'
                    >
                      <Eye className='w-4 h-4' />
                      <span className='text-sm'>View</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      {selectedReport && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedReport(null)}
        >
          <motion.div
            className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='p-6 border-b border-slate-200'>
              <div className='flex items-center justify-between'>
                <h3 className='text-xl font-semibold text-slate-900'>
                  {selectedReport.name}
                </h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className='text-slate-400 hover:text-slate-600 text-2xl'
                >
                  ×
                </button>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              {/* Report Overview */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='text-center p-4 bg-blue-50 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {selectedReport.efficiency}%
                  </div>
                  <div className='text-sm text-slate-600'>Efficiency</div>
                </div>
                <div className='text-center p-4 bg-green-50 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600'>
                    ${(selectedReport.costSavings / 1000).toFixed(0)}K
                  </div>
                  <div className='text-sm text-slate-600'>Savings</div>
                </div>
                <div className='text-center p-4 bg-purple-50 rounded-lg'>
                  <div className='text-2xl font-bold text-purple-600'>
                    {selectedReport.duration}
                  </div>
                  <div className='text-sm text-slate-600'>Duration</div>
                </div>
                <div className='text-center p-4 bg-orange-50 rounded-lg'>
                  <div className='text-2xl font-bold text-orange-600'>
                    {((selectedReport.efficiency - 87) * 2.5).toFixed(1)}%
                  </div>
                  <div className='text-sm text-slate-600'>ROI</div>
                </div>
              </div>

              {/* Parameters Used */}
              <div>
                <h4 className='font-semibold text-slate-900 mb-3'>
                  Simulation Parameters
                </h4>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='p-3 bg-slate-50 rounded-lg'>
                    <div className='text-lg font-bold text-slate-900'>
                      {selectedReport.parameters.productionRate}
                    </div>
                    <div className='text-sm text-slate-600'>
                      Production Rate
                    </div>
                  </div>
                  <div className='p-3 bg-slate-50 rounded-lg'>
                    <div className='text-lg font-bold text-slate-900'>
                      {selectedReport.parameters.workforceAllocation}%
                    </div>
                    <div className='text-sm text-slate-600'>Workforce</div>
                  </div>
                  <div className='p-3 bg-slate-50 rounded-lg'>
                    <div className='text-lg font-bold text-slate-900'>
                      {selectedReport.parameters.machineUptime}%
                    </div>
                    <div className='text-sm text-slate-600'>Machine Uptime</div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div>
                <h4 className='font-semibold text-slate-900 mb-3'>
                  Key Insights
                </h4>
                <div className='space-y-3'>
                  <div className='flex items-start space-x-3 p-3 bg-blue-50 rounded-lg'>
                    <TrendingUp className='w-5 h-5 text-blue-600 mt-0.5' />
                    <div>
                      <div className='font-medium text-blue-900'>
                        Efficiency Improvement
                      </div>
                      <div className='text-sm text-blue-700'>
                        {selectedReport.efficiency > 90
                          ? "Excellent performance with significant optimization potential"
                          : selectedReport.efficiency > 85
                          ? "Good performance with room for improvement"
                          : "Performance below target - requires immediate attention"}
                      </div>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3 p-3 bg-green-50 rounded-lg'>
                    <DollarSign className='w-5 h-5 text-green-600 mt-0.5' />
                    <div>
                      <div className='font-medium text-green-900'>
                        Cost Impact
                      </div>
                      <div className='text-sm text-green-700'>
                        Projected annual savings of $
                        {((selectedReport.costSavings * 12) / 1000000).toFixed(
                          1
                        )}
                        M with {selectedReport.duration} implementation
                      </div>
                    </div>
                  </div>

                  <div className='flex items-start space-x-3 p-3 bg-purple-50 rounded-lg'>
                    <Clock className='w-5 h-5 text-purple-600 mt-0.5' />
                    <div>
                      <div className='font-medium text-purple-900'>
                        Implementation Timeline
                      </div>
                      <div className='text-sm text-purple-700'>
                        Estimated {selectedReport.duration} for full deployment
                        with phased rollout approach
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex items-center justify-end space-x-3 pt-4 border-t border-slate-200'>
                <button
                  onClick={() => exportReport("pdf")}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all'
                >
                  Export Report
                </button>
                <button
                  onClick={() => setSelectedReport(null)}
                  className='px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all'
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
