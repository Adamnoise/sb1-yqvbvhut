import React from 'react';
import { Product } from '../../types';
import Card from '../ui/Card';

interface PopularProductsProps {
  products: Product[];
}

const PopularProducts: React.FC<PopularProductsProps> = ({ products }) => {
  return (
    <Card 
      title="Popular products" 
      action={<a href="#" className="text-blue-600 hover:text-blue-800">See all</a>}
      className="mt-4"
    >
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">${product.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500">{product.sales} sales</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PopularProducts;