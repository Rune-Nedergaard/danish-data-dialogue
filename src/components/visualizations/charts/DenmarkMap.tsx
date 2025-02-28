
import React from 'react';
import { useTheme } from '@/hooks/use-theme';

interface DenmarkMapProps {
  data: any;
}

// This is a simplified map component that renders a placeholder
// In a real application, you would use a proper mapping library
// like react-simple-maps, leaflet, or d3-geo to render a real map
const DenmarkMap: React.FC<DenmarkMapProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Extract the region data
  const regions = data.regions || [];
  
  // Find the min and max values for the color scale
  const values = regions.map((region: any) => region.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  
  // Function to get a color along a gradient based on a value
  const getColor = (value: number) => {
    // Use a simple linear gradient from light blue to dark blue
    const ratio = (value - minValue) / (maxValue - minValue);
    
    // Create color components
    const r = Math.round(12 + ratio * (200 - 12)); // From light to dark red
    const g = Math.round(16 + ratio * (16 - 16)); // Always 16
    const b = Math.round(46 + ratio * (46 - 46)); // Always 46
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-center mb-4">
        <p className="text-sm text-danish-gray-500 dark:text-danish-gray-400">
          Denmark Map Visualization
        </p>
        <p className="text-xs italic text-danish-gray-400 dark:text-danish-gray-500">
          (Map data would be rendered with a proper mapping library)
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {regions.map((region: any) => (
          <div 
            key={region.id} 
            className="p-3 rounded-lg flex flex-col items-center justify-center border"
            style={{ backgroundColor: getColor(region.value), borderColor: isDarkMode ? '#334155' : '#E2E8F0' }}
          >
            <div className="font-medium text-white">{region.name}</div>
            <div className="text-sm text-white opacity-90">{region.value}%</div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center w-full">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: getColor(minValue) }}></div>
          <span className="text-xs mx-1 text-danish-gray-600 dark:text-danish-gray-400">{minValue}%</span>
        </div>
        <div className="w-20 h-2 mx-2 rounded-sm bg-gradient-to-r from-[rgb(12,16,46)] to-[rgb(200,16,46)]"></div>
        <div className="flex items-center">
          <span className="text-xs mx-1 text-danish-gray-600 dark:text-danish-gray-400">{maxValue}%</span>
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: getColor(maxValue) }}></div>
        </div>
      </div>
    </div>
  );
};

export default DenmarkMap;
