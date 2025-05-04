import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Card, CardBody, CardHeader, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

// Sample data for the pie chart
const salesData = [
  { id: "Electronics", label: "Electronics", value: 35 },
  { id: "Clothing", label: "Clothing", value: 25 },
  { id: "Home", label: "Home", value: 20 },
  { id: "Beauty", label: "Beauty", value: 15 },
  { id: "Other", label: "Other", value: 5 }
];

const total = salesData.reduce((sum, item) => sum + item.value, 0);

export const SalesDistribution = () => {
  return (
    <Card className="border-none shadow-card">
      <CardHeader className="px-6 pt-6 pb-0">
        <div>
          <h3 className="text-xl font-semibold">Sales Distribution</h3>
          <p className="text-sm text-default-500">By product category</p>
        </div>
        <Tooltip content="This chart shows the proportion of sales by category.">
          <Icon icon="lucide:info" className="text-default-400 w-4 h-4 cursor-pointer" />
        </Tooltip>
      </CardHeader>

      <CardBody className="h-80">
        <motion.div 
          className="h-full w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsivePie
            data={salesData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            arcLabel={d => `${((d.value / total) * 100).toFixed(1)}%`}
            colors={{ scheme: 'nivo' }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]}
          />
        </motion.div>
      </CardBody>
    </Card>
  );
};
