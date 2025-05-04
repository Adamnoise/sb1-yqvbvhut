import React from 'react';
import { Avatar, AvatarGroup, Card, CardBody, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Customer {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export const CustomerAvatars = () => {
  const customers: Customer[] = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4"
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james@example.com",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5"
    }
  ];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex justify-between items-center px-6">
        <div>
          <h3 className="text-lg font-semibold">New Customers Today</h3>
          <p className="text-sm text-default-500">
            <span className="font-medium">857</span> new customers today
          </p>
        </div>
        <Button 
          variant="light" 
          color="primary" 
          size="sm"
          endContent={<Icon icon="lucide:chevron-right" className="w-4 h-4" />}
        >
          View all
        </Button>
      </CardHeader>
      
      <CardBody className="px-6 py-4">
        <div className="flex flex-wrap gap-4">
          {customers.map((customer) => (
            <div key={customer.id} className="flex flex-col items-center gap-2">
              <Avatar
                src={customer.avatar}
                size="lg"
                isBordered
                color="primary"
                className="h-16 w-16"
              />
              <div className="text-center">
                <p className="text-sm font-medium">{customer.name.split(' ')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};