
import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface LineChartProps {
  data: any;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Transform the data if it's in the format we expect
  const chartData = data.labels && data.datasets 
    ? data.labels.map((label: string, index: number) => {
        const dataPoint: any = { name: label };
        
        data.datasets.forEach((dataset: any, datasetIndex: number) => {
          dataPoint[dataset.label || `Value ${datasetIndex + 1}`] = dataset.data[index];
        });
        
        return dataPoint;
      })
    : [];
  
  // Create lines for each dataset
  const lines = data.datasets ? data.datasets.map((dataset: any, index: number) => (
    <Line
      key={index}
      type="monotone"
      dataKey={dataset.label || `Value ${index + 1}`}
      stroke={dataset.borderColor || `#${((1 << 24) * Math.random() | 0).toString(16)}`}
      activeDot={{ r: 6 }}
      strokeWidth={2}
      dot={{ strokeWidth: 2 }}
      isAnimationActive={true}
    />
  )) : [];

  // Style configuration
  const axisTextColor = isDarkMode ? '#CBD5E1' : '#64748B';
  const gridColor = isDarkMode ? '#334155' : '#E2E8F0';
  const tooltipStyle = {
    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
    border: `1px solid ${isDarkMode ? '#334155' : '#E2E8F0'}`,
    borderRadius: '0.375rem', // rounded-md
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: axisTextColor }} 
          tickLine={{ stroke: axisTextColor }}
          axisLine={{ stroke: gridColor }}
          angle={chartData.length > 10 ? -45 : 0}
          textAnchor={chartData.length > 10 ? 'end' : 'middle'}
          height={60}
        />
        <YAxis 
          tick={{ fill: axisTextColor }} 
          tickLine={{ stroke: axisTextColor }}
          axisLine={{ stroke: gridColor }}
        />
        <Tooltip 
          contentStyle={tooltipStyle}
          cursor={{ stroke: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)', strokeWidth: 1 }}
        />
        <Legend wrapperStyle={{ paddingTop: 10 }} />
        {lines}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
