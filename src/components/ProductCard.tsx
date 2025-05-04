import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Product } from './ProductGallery';

interface Props {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: Props) => (
  <motion.div
    className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 first:pl-0"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <div className="bg-content2 rounded-xl overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="text-xs text-default-500 mb-1">{product.category}</div>
        <h4 className="font-medium mb-1">{product.name}</h4>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">{product.price}</span>
          <Button size="sm" color="primary" variant="flat" isIconOnly radius="full" aria-label="Add to cart">
            <Icon icon="lucide:shopping-cart" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);
