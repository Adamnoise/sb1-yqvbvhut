import React from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 65 },
  { month: 'Feb', revenue: 59 },
  { month: 'Mar', revenue: 80 },
  { month: 'Apr', revenue: 81 },
  { month: 'May', revenue: 56 },
  { month: 'Jun', revenue: 55 },
  { month: 'Jul', revenue: 40 },
  { month: 'Aug', revenue: 70 },
  { month: 'Sep', revenue: 90 },
  { month: 'Oct', revenue: 110 },
  { month: 'Nov', revenue: 100 },
  { month: 'Dec', revenue: 120 },
];

export const WeeklyRevenueChart = () => {
  const [timeRange, setTimeRange] = React.useState('yearly');
  
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex justify-between items-center px-6">
        <div>
          <h3 className="text-xl font-semibold">Revenue Over Time</h3>
          <p className="text-sm text-default-500">Monthly performance</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs text-default-600">This Month</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-default-300"></div>
              <span className="text-xs text-default-600">Last Month</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={timeRange === 'weekly' ? 'solid' : 'flat'} 
              color="primary" 
              size="sm"
              onPress={() => setTimeRange('weekly')}
            >
              Weekly
            </Button>
            <Button 
              variant={timeRange === 'monthly' ? 'solid' : 'flat'} 
              color="primary" 
              size="sm"
              onPress={() => setTimeRange('monthly')}
            >
              Monthly
            </Button>
            <Button 
              variant={timeRange === 'yearly' ? 'solid' : 'flat'} 
              color="primary" 
              size="sm"
              onPress={() => setTimeRange('yearly')}
            >
              Yearly
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardBody className="px-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f4" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#a1a1aa' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#a1a1aa' }}
              domain={[40, 130]}
              label={{ 
                value: 'Revenue ($k)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#a1a1aa', fontSize: 12 }
              }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '8px 12px'
              }}
              formatter={(value) => [`$${value}k`, 'Revenue']}
              labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3E7BFA"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 0, fill: "#3E7BFA" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#3E7BFA" }}
            />
            <Line
              type="monotone"
              dataKey="lastMonth"
              stroke="#d4d4d8"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 0, fill: "#d4d4d8" }}
              activeDot={{ r: 5, strokeWidth: 0, fill: "#d4d4d8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};