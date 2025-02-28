
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface PieChartProps {
  data: any;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Transform the data if it's in the format we expect
  const chartData = data.labels && data.datasets && data.datasets[0]
    ? data.labels.map((label: string, index: number) => ({
        name: label,
        value: data.datasets[0].data[index]
      }))
    : [];
  
  // Colors from the dataset or fallback to default
  const colors = data.datasets && data.datasets[0] && data.datasets[0].backgroundColor
    ? data.datasets[0].backgroundColor
    : ['#C8102E', '#0EA5E9', '#8B5CF6', '#10B981', '#F59E0B', '#6B7280', '#EC4899'];

  // Style configuration
  const tooltipStyle = {
    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
    border: `1px solid ${isDarkMode ? '#334155' : '#E2E8F0'}`,
    borderRadius: '0.375rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          isAnimationActive={true}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {chartData.map((entry: any, index: number) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={tooltipStyle}
          formatter={(value: number) => [`${value}`, 'Value']}
        />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
