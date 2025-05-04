// New file for Nivo chart implementation
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Card, CardBody, CardHeader, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';

// Sample data for the chart
const revenueData = [
  {
    id: "revenue",
    color: "hsl(240, 70%, 50%)",
    data: [
      { x: "Jan", y: 45 },
      { x: "Feb", y: 63 },
      { x: "Mar", y: 58 },
      { x: "Apr", y: 75 },
      { x: "May", y: 90 },
      { x: "Jun", y: 85 },
      { x: "Jul", y: 92 },
      { x: "Aug", y: 110 },
      { x: "Sep", y: 105 },
      { x: "Oct", y: 120 },
      { x: "Nov", y: 95 },
      { x: "Dec", y: 130 },
    ]
  }
];

export const RevenueChart = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [timeRange, setTimeRange] = React.useState('year');
  
  const handleTimeRangeChange = (range: string) => {
    setIsLoading(true);
    setTimeRange(range);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <Card className="border-none shadow-card">
      <CardHeader className="px-6 pt-6 pb-0">
        <div>
          <h3 className="text-xl font-semibold">Weekly Revenue</h3>
          <p className="text-sm text-default-500">Performance over time</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full overflow-hidden border border-default-200">
            <Button 
              size="sm" 
              variant={timeRange === "week" ? "flat" : "light"} 
              color={timeRange === "week" ? "primary" : "default"}
              onPress={() => handleTimeRangeChange("week")}
              className="rounded-none"
            >
              Week
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === "month" ? "flat" : "light"} 
              color={timeRange === "month" ? "primary" : "default"}
              onPress={() => handleTimeRangeChange("month")}
              className="rounded-none"
            >
              Month
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === "year" ? "flat" : "light"} 
              color={timeRange === "year" ? "primary" : "default"}
              onPress={() => handleTimeRangeChange("year")}
              className="rounded-none"
            >
              Year
            </Button>
          </div>
          <Button 
            size="sm" 
            variant="flat" 
            color="primary" 
            radius="full"
            startContent={<Icon icon="lucide:download" className="w-4 h-4" />}
          >
            Download
          </Button>
        </div>
      </CardHeader>
      <CardBody className="h-80">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Spinner color="primary" label="Loading data..." />
          </div>
        ) : (
          <motion.div 
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveLine
              data={revenueData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
              }}
              curve="cardinal"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendOffset: 36,
                legendPosition: 'middle'
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Revenue ($k)',
                legendOffset: -40,
                legendPosition: 'middle'
              }}
              colors={{ scheme: 'category10' }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
              theme={{
                tooltip: {
                  container: {
                    background: '#ffffff',
                    fontSize: 12,
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    padding: '8px 12px',
                  }
                }
              }}
            />
          </motion.div>
        )}
      </CardBody>
    </Card>
  );
};