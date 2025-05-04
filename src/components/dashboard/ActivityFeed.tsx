import React from 'react';
import { ActivityItem } from '../../types';
import Card from '../ui/Card';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <Card 
      title="Comments" 
      action={<a href="#" className="text-blue-600 hover:text-blue-800">See all</a>}
      className="mt-4"
    >
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex items-start">
              <img 
                src={activity.user.avatar} 
                alt={activity.user.name}
                className="w-8 h-8 rounded-full mr-3 flex-shrink-0" 
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{activity.user.name}</h4>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
                {activity.message && (
                  <p className="text-sm text-gray-700 mt-1">{activity.message}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityFeed;