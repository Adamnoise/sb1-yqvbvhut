import React from 'react';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Tooltip } from '@heroui/react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts';
import { LineChart, Line } from 'recharts';

const data = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 80 },
  { name: 'Wed', value: 30 },
  { name: 'Thu', value: 60 },
  { name: 'Fri', value: 45 },
  { name: 'Sat', value: 25 },
  { name: 'Sun', value: 40 },
];

export const ProductViews = () => {
  // Use custom hook for chart state management
  const { 
    chartType, 
    showLabels, 
    toggleChartType, 
    toggleLabels 
  } = useChartControls();
  
  // Memoize the chart component to prevent unnecessary re-renders
  const chartComponent = React.useMemo(() => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "bar" ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#A3AED0' }}
              dy={10}
            />
            <YAxis 
              hide={!showLabels}
              domain={[0, 'dataMax + 20']}
              tick={{ fontSize: 10, fill: '#A3AED0' }}
            />
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              stroke="#E9EDF7" 
            />
            <RechartsTooltip
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)',
                padding: '12px 16px'
              }}
              labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
            />
            <Bar 
              dataKey="value" 
              fill="#4318FF" 
              radius={[8, 8, 0, 0]}
              barSize={20}
              label={showLabels ? {
                position: 'top',
                fill: '#A3AED0',
                fontSize: 10
              } : false}
            />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#A3AED0' }}
              dy={10}
            />
            <YAxis 
              hide={!showLabels}
              domain={[0, 'dataMax + 20']}
              tick={{ fontSize: 10, fill: '#A3AED0' }}
            />
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3" 
              stroke="#E9EDF7" 
            />
            <RechartsTooltip
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)',
                padding: '12px 16px'
              }}
              labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4318FF" 
              strokeWidth={3}
              dot={{ r: 4, fill: "#4318FF" }}
              activeDot={{ r: 6, fill: "#4318FF" }}
              label={showLabels ? {
                position: 'top',
                fill: '#A3AED0',
                fontSize: 10
              } : false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    );
  }, [chartType, showLabels]);
  
  return (
    <div className="h-60">
      {chartComponent}
    </div>
  );
};

// Extract components for better organization
const ChartControls = ({ 
  chartType, 
  showLabels, 
  onToggleChartType, 
  onToggleLabels 
}: { 
  chartType: string; 
  showLabels: boolean;
  onToggleChartType: () => void;
  onToggleLabels: () => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Toggle chart type">
        <Button 
          isIconOnly 
          variant="light" 
          radius="full"
          onPress={onToggleChartType}
        >
          <Icon 
            icon={chartType === "bar" ? "lucide:bar-chart" : "lucide:line-chart"} 
            className="w-4 h-4 text-default-500" 
          />
        </Button>
      </Tooltip>
      <Tooltip content="Toggle value labels">
        <Button 
          isIconOnly 
          variant="light" 
          radius="full"
          onPress={onToggleLabels}
        >
          <Icon 
            icon={showLabels ? "lucide:eye" : "lucide:eye-off"} 
            className="w-4 h-4 text-default-500" 
          />
        </Button>
      </Tooltip>
      <Tooltip content="More options">
        <Button isIconOnly variant="light" radius="full">
          <Icon icon="lucide:more-horizontal" className="w-4 h-4 text-default-500" />
        </Button>
      </Tooltip>
    </div>
  );
};

// Custom hook for chart controls
function useChartControls() {
  const [chartType, setChartType] = React.useState("bar");
  const [showLabels, setShowLabels] = React.useState(false);
  
  const toggleChartType = React.useCallback(() => {
    setChartType(prev => prev === "bar" ? "line" : "bar");
  }, []);
  
  const toggleLabels = React.useCallback(() => {
    setShowLabels(prev => !prev);
  }, []);
  
  return {
    chartType,
    showLabels,
    toggleChartType,
    toggleLabels
  };
}

// Replace the Button component with HeroUI Button
import { Button } from '@heroui/react';

// Add missing import
import { addToast } from '@heroui/react';