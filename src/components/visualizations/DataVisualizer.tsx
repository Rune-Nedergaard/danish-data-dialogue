
import React from 'react';
import { Visualization } from '@/types';
import { BarChart, LineChart, PieChart, DenmarkMap } from './charts';

interface DataVisualizerProps {
  visualization: Visualization;
  isExpanded?: boolean;
}

const DataVisualizer: React.FC<DataVisualizerProps> = ({ visualization, isExpanded = false }) => {
  // Render different chart types based on the visualization type
  const renderVisualization = () => {
    switch (visualization.type) {
      case 'bar':
        return <BarChart data={visualization.data} />;
      case 'line':
        return <LineChart data={visualization.data} />;
      case 'pie':
        return <PieChart data={visualization.data} />;
      case 'map':
        return <DenmarkMap data={visualization.data} />;
      default:
        return <div className="flex items-center justify-center h-full">Unsupported visualization type</div>;
    }
  };

  return (
    <div className={`w-full h-full ${isExpanded ? 'expanded-visualization' : ''}`}>
      {renderVisualization()}
    </div>
  );
};

export default DataVisualizer;
