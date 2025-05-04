import React from 'react';
import MetricsCards from './MetricsCards';
import CustomerAvatars from './CustomerAvatars';
import RevenueChart from './RevenueChart';
import Overview from './Overview';
import PopularProducts from './PopularProducts';
import ActivityFeed from './ActivityFeed';
import { 
  metricCards, 
  users, 
  revenueData, 
  products, 
  overviewItems, 
  activityItems 
} from '../../utils/mock-data';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Overview</h2>
      
      {/* Metrics Cards Section */}
      <MetricsCards metrics={metricCards} />
      
      {/* Customer Avatars Section */}
      <CustomerAvatars customers={users} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <RevenueChart 
            data={revenueData} 
            title="Product sales" 
            value="$256k" 
            prefix=""
            change={8.2}
          />
        </div>
        
        {/* Popular Products */}
        <div>
          <PopularProducts products={products.slice(0, 3)} />
        </div>
      </div>
      
      {/* Overview Section */}
      <Overview items={overviewItems} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Activity Feed */}
        <ActivityFeed activities={activityItems} />
        
        {/* Refund Requests - Placeholder */}
        <div className="mt-4 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">Refund requests</h3>
              <div className="text-sm text-gray-500">
                <a href="#" className="text-blue-600 hover:text-blue-800">See all</a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 text-center">No pending refund requests at the moment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;