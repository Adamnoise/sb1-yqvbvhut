import React, { Suspense, useState } from 'react';
import { Sidebar } from './components/sidebar';
import { Header } from './components/header';
import { MainLayout } from './components/main-layout';
import { useMediaQuery } from './hooks/use-media-query';
// Import our new DynamicIcon component instead of the generic Icon
import { DynamicIcon } from './components/dynamic-icon';

// Lazy load feature components
const StatCards = React.lazy(() => import('./components/stat-cards'));
const CampaignList = React.lazy(() => import('./components/campaign-list'));
const RevenueChart = React.lazy(() => import('./components/nivo-charts/revenue-chart'));
const SalesDistribution = React.lazy(() => import('./components/nivo-charts/sales-distribution'));
const AdvancedCampaignTable = React.lazy(() => import('./components/tanstack-table/advanced-campaign-table'));
const CampaignForm = React.lazy(() => import('./components/react-hook-form/campaign-form'));
const ProductGallery = React.lazy(() => import('./components/embla-carousel/product-gallery'));
const TaskBoard = React.lazy(() => import('./components/react-beautiful-dnd/task-board'));
const WeeklyRevenueChart = React.lazy(() => import('./components/weekly-revenue-chart'));
const FeaturedProducts = React.lazy(() => import('./components/featured-products'));
const DashboardWelcome = React.lazy(() => import('./components/dashboard-welcome'));
const DashboardTabs = React.lazy(() => import('./components/dashboard-tabs'));
const ActivityTimeline = React.lazy(() => import('./components/activity-timeline'));
const RevenueOverview = React.lazy(() => import('./components/revenue-overview'));
const CustomerAvatars = React.lazy(() => import('./components/customer-avatars'));
const CommentsSection = React.lazy(() => import('./components/comments-section'));
const OverviewMetrics = React.lazy(() => import('./components/overview-metrics'));
const RefundRequests = React.lazy(() => import('./components/refund-requests'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Navigation tab configuration
const TAB_CONFIG = [
  { key: 'dashboard', label: 'Dashboard', icon: 'layoutDashboard' },  // Updated to match Lucide naming
  { key: 'campaigns', label: 'Campaigns', icon: 'megaphone' },
  { key: 'products', label: 'Products', icon: 'shoppingBag' },  // Updated to match Lucide naming
  { key: 'tasks', label: 'Tasks', icon: 'checkSquare' }, // Updated to match Lucide naming
];

type TabKey = 'dashboard' | 'campaigns' | 'products' | 'tasks';

interface TabsViewProps {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
}

const TabsView = ({ activeTab, onTabChange }: TabsViewProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex space-x-6 overflow-x-auto">
        {TAB_CONFIG.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onTabChange(key as TabKey)}
            className={`
              flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm
              ${activeTab === key 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}
            `}
            aria-current={activeTab === key ? 'page' : undefined}
          >
            {/* Use our new DynamicIcon component */}
            <DynamicIcon name={icon} className="w-4 h-4" size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const DashboardView = () => (
  <div className="space-y-6">
    <Suspense fallback={<LoadingFallback />}>
      <DashboardWelcome />
    </Suspense>
    
    <Suspense fallback={<LoadingFallback />}>
      <StatCards />
    </Suspense>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Suspense fallback={<LoadingFallback />}>
          <CustomerAvatars />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <RevenueOverview />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <CommentsSection />
        </Suspense>
      </div>
      <div className="space-y-6">
        <Suspense fallback={<LoadingFallback />}>
          <FeaturedProducts />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <OverviewMetrics />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <RefundRequests />
        </Suspense>
      </div>
    </div>
  </div>
);

const CampaignsView = () => (
  <div className="mt-6 grid grid-cols-1 gap-6">
    <Suspense fallback={<LoadingFallback />}>
      <AdvancedCampaignTable />
    </Suspense>
    <Suspense fallback={<LoadingFallback />}>
      <CampaignForm />
    </Suspense>
  </div>
);

const ProductsView = () => (
  <div className="mt-6">
    <Suspense fallback={<LoadingFallback />}>
      <ProductGallery />
    </Suspense>
  </div>
);

const TasksView = () => (
  <div className="mt-6">
    <Suspense fallback={<LoadingFallback />}>
      <TaskBoard />
    </Suspense>
  </div>
);

export default function App() {
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <Header />
        <main className="flex-1 p-6 md:p-8">
          <TabsView activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="mt-6">
            <Suspense fallback={<LoadingFallback />}>
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'campaigns' && <CampaignsView />}
              {activeTab === 'products' && <ProductsView />}
              {activeTab === 'tasks' && <TasksView />}
            </Suspense>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}