import React from 'react';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Tooltip } from '@heroui/react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts';
import { Spinner } from '@heroui/react';
import { addToast } from '@heroui/react';

const data = [
  { name: 'Mon', value: 50 },
  { name: 'Tue', value: 30 },
  { name: 'Wed', value: 70 },
  { name: 'Thu', value: 40 },
  { name: 'Fri', value: 60 },
  { name: 'Sat', value: 45 },
  { name: 'Sun', value: 80 },
];

export const ChampionshipChart = () => {
  // Add export functionality
  const handleExport = React.useCallback(() => {
    // In a real app, this would generate and download a CSV/PDF
    addToast({
      title: "Export successful",
      description: "Report has been downloaded as CSV",
      color: "success",
    });
  }, []);

  // Use reducer for complex state management
  const [state, dispatch] = React.useReducer(
    (state: ChartState, action: ChartAction) => {
      switch (action.type) {
        case 'SET_TIME_RANGE':
          return { ...state, timeRange: action.payload, isLoading: true };
        case 'SET_DATA':
          return { ...state, chartData: action.payload, isLoading: false };
        case 'TOGGLE_LOADING':
          return { ...state, isLoading: action.payload };
        default:
          return state;
      }
    },
    {
      chartData: data,
      isLoading: false,
      timeRange: "week"
    }
  );
  
  // Simulate data loading when time range changes
  const updateTimeRange = React.useCallback((range: string) => {
    dispatch({ type: 'SET_TIME_RANGE', payload: range });
    
    // Simulate API call
    setTimeout(() => {
      // Generate different data based on selected range
      const newData = data.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 100) + 20
      }));
      
      dispatch({ type: 'SET_DATA', payload: newData });
    }, 800);
  }, []);
  
  // Memoize the chart component to prevent unnecessary re-renders
  const chartComponent = React.useMemo(() => {
    if (state.isLoading) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <Spinner color="primary" label="Loading data..." />
        </div>
      );
    }
    
    // Empty state when no data
    if (state.chartData.length === 0) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="bg-default-100 rounded-full p-4 mb-4">
            <Icon icon="lucide:bar-chart-off" className="w-8 h-8 text-default-400" />
          </div>
          <p className="text-lg font-medium mb-1">No data available</p>
          <p className="text-sm text-default-500">Try changing your filters or time range</p>
        </div>
      );
    }
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={state.chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4318FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4318FF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#A3AED0' }}
            dy={10}
          />
          <YAxis 
            hide={false} // Show Y-axis for better readability
            domain={[0, 'dataMax + 20']}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#A3AED0' }}
            width={30}
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
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#4318FF" 
            strokeWidth={3}
            fill="url(#colorGradient)" 
            activeDot={{ r: 8, strokeWidth: 0, fill: '#4318FF' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }, [state.chartData, state.isLoading]);
  
  return (
    <div className="h-80">
      {chartComponent}
    </div>
  );
};

// Extract components for better organization
const TimeRangeSelector = ({ 
  timeRange, 
  onChange 
}: { 
  timeRange: string; 
  onChange: (range: string) => void 
}) => {
  return (
    <div className="flex rounded-full overflow-hidden border border-default-200">
      <Button 
        size="sm" 
        variant={timeRange === "week" ? "flat" : "light"} 
        color={timeRange === "week" ? "primary" : "default"}
        onPress={() => onChange("week")}
        className="rounded-none"
      >
        Week
      </Button>
      <Button 
        size="sm" 
        variant={timeRange === "month" ? "flat" : "light"} 
        color={timeRange === "month" ? "primary" : "default"}
        onPress={() => onChange("month")}
        className="rounded-none"
      >
        Month
      </Button>
      <Button 
        size="sm" 
        variant={timeRange === "year" ? "flat" : "light"} 
        color={timeRange === "year" ? "primary" : "default"}
        onPress={() => onChange("year")}
        className="rounded-none"
      >
        Year
      </Button>
    </div>
  );
};

// Add TypeScript interfaces
interface ChartState {
  chartData: Array<{name: string; value: number}>;
  isLoading: boolean;
  timeRange: string;
}

type ChartAction = 
  | { type: 'SET_TIME_RANGE'; payload: string }
  | { type: 'SET_DATA'; payload: Array<{name: string; value: number}> }
  | { type: 'TOGGLE_LOADING'; payload: boolean };

function Button({ isIconOnly, variant, radius, children }: any) {
  return (
    <button className={`
      ${isIconOnly ? 'p-2' : 'px-4 py-2'} 
      ${variant === 'light' ? 'hover:bg-default-100' : ''} 
      ${radius === 'full' ? 'rounded-full' : 'rounded-md'}
      transition-colors
    `}>
      {children}
    </button>
  );
}