import React from 'react';
import { Card, CardBody, CardHeader, Button, Image } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export const FeaturedProducts = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$149.99",
      image: "https://img.heroui.chat/image/ai?w=200&h=200&u=1"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$299.99",
      image: "https://img.heroui.chat/image/ai?w=200&h=200&u=2"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: "$79.99",
      image: "https://img.heroui.chat/image/ai?w=200&h=200&u=3"
    }
  ];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex justify-between items-center px-6">
        <div>
          <h3 className="text-lg font-semibold">Popular Products</h3>
          <p className="text-sm text-default-500">Top selling items</p>
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
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <Image
                src={product.image}
                alt={product.name}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-sm text-default-500">{product.price}</p>
              </div>
              <Button 
                isIconOnly 
                variant="light" 
                size="sm"
                className="text-default-500"
              >
                <Icon icon="lucide:more-vertical" className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};