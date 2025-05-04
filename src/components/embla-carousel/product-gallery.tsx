import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { ProductCard } from './ProductCard';

export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Audio',
    price: '$129.99',
    image: '/images/headphones.jpg',
  },
  {
    id: '2',
    name: 'Smartwatch Pro',
    category: 'Wearables',
    price: '$249.99',
    image: '/images/smartwatch.jpg',
  },
  {
    id: '3',
    name: 'Drone X200',
    category: 'Gadgets',
    price: '$999.99',
    image: '/images/drone.jpg',
  },
];

export const ProductGallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', updateIndex);
    updateIndex();

    return () => {
      emblaApi?.off('select', updateIndex);
    };
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Card className="border-none shadow-card">
      <CardHeader className="px-6 pt-6 pb-0 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Featured Products</h3>
          <p className="text-sm text-default-500">Our top selling items</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            radius="full"
            onPress={scrollPrev}
            isDisabled={selectedIndex === 0}
            aria-label="Previous"
          >
            <Icon icon="lucide:chevron-left" className="w-4 h-4" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            radius="full"
            onPress={scrollNext}
            isDisabled={selectedIndex === scrollSnaps.length - 1}
            aria-label="Next"
          >
            <Icon icon="lucide:chevron-right" className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardBody className="px-6 pb-6 pt-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 gap-1">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              size="sm"
              isIconOnly
              variant={selectedIndex === index ? 'solid' : 'light'}
              color={selectedIndex === index ? 'primary' : 'default'}
              className="min-w-6 w-6 h-2 p-0 rounded-full"
              onPress={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
