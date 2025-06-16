import React from 'react';
// import 'react-loading-skeleton/dist/skeleton.css';
// import '@components/cards/CardsRenderer/cardsRenderer.scss';
import type { Metadata } from 'next';
import LoadingPageSkeleton from '@components/LoadingPageSkeleton/LoadingPageSkeleton';

export const metadata: Metadata = {
  title: 'Loading...',
};


const LoadingSkeleton = () => {
  return  <LoadingPageSkeleton />
};

export default LoadingSkeleton;