import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface RefundRequest {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  amount: string;
  product: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export const RefundRequests = () => {
  const requests: RefundRequest[] = [
    {
      id: 1,
      user: {
        name: "Emma Davis",
        avatar: "/api/placeholder/200/200"
      },
      amount: "$78.50",
      product: "Premium Plan Subscription",
      status: 'pending',
      date: "Today"
    },
    {
      id: 2,
      user: {
        name: "Alex Johnson",
        avatar: "/api/placeholder/200/200"
      },
      amount: "$125.00",
      product: "Annual Membership",
      status: 'approved',
      date: "Yesterday"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'approved': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'rejected': return 'bg-red-100 text-red-800 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <div className="flex justify-between items-center px-6 pt-6 pb-4">
        <div>
          <h3 className="text-lg font-semibold">Refund requests</h3>
          <p className="text-sm text-gray-500">Recent customer refunds</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-blue-600 hover:text-blue-700"
        >
          View all
          <ChevronRight className="ml-1 w-4 h-4" />
        </Button>
      </div>
      
      <div className="px-6 py-4">
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Avatar className="h-10 w-10">
                <AvatarImage src={request.user.avatar} alt={request.user.name} />
                <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="font-medium text-sm">{request.user.name}</p>
                  <Badge className={`${getStatusColor(request.status)} font-normal`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="text-xs text-gray-500">
                    {request.product} - {request.amount}
                  </p>
                  <p className="text-xs text-gray-500">{request.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};