import { createContext } from 'react';

export interface CarouselContextData {
  currentPage: number;
  pagesMapper: Record<string, string[]>;
}

export const CarouselContext = createContext<CarouselContextData>(
  {} as CarouselContextData,
);
