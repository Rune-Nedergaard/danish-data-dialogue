
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface BarChartProps {
  data: any;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
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
  
  // Create bars for each dataset with blue colors
  const bars = data.datasets ? data.datasets.map((dataset: any, index: number) => {
    // Use Danish blue color palette
    const blueColors = ['#0068B4', '#5A9CE6', '#8FC2FF', '#B8DCFF', '#E0F0FF'];
    const barColor = dataset.backgroundColor || blueColors[index % blueColors.length];
    
    return (
      <Bar
        key={index}
        dataKey={dataset.label || `Value ${index + 1}`}
        fill={barColor}
        isAnimationActive={true}
      />
    );
  }) : [];

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
      <RechartsBarChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: axisTextColor }} 
          tickLine={{ stroke: axisTextColor }}
          axisLine={{ stroke: gridColor }}
          angle={chartData.length > 5 ? -45 : 0}
          textAnchor={chartData.length > 5 ? 'end' : 'middle'}
          height={60}
        />
        <YAxis 
          tick={{ fill: axisTextColor }} 
          tickLine={{ stroke: axisTextColor }}
          axisLine={{ stroke: gridColor }}
        />
        <Tooltip 
          contentStyle={tooltipStyle}
          cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
        />
        <Legend wrapperStyle={{ paddingTop: 10 }} />
        {bars}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
