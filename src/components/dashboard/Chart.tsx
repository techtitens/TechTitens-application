import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ChartProps {
  data: any[];
  type?: 'line' | 'bar';
  dataKey: string;
  color?: string;
  height?: number;
}

export const Chart: React.FC<ChartProps> = ({ 
  data, 
  type = 'line', 
  dataKey, 
  color = '#3b82f6',
  height = 300 
}) => {
  const ChartComponent = type === 'line' ? LineChart : BarChart;
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ChartComponent data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="month" 
          stroke="#64748b"
          fontSize={12}
        />
        <YAxis 
          stroke="#64748b"
          fontSize={12}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff'
          }}
        />
        {type === 'line' ? (
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={3}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
          />
        ) : (
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
        )}
      </ChartComponent>
    </ResponsiveContainer>
  );
};