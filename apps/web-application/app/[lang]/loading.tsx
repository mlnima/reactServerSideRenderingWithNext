import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import '@components/cards/CardsRenderer/cardsRenderer.scss';
import LoadingPageSkeleton from '@components/LoadingPageSkeleton/LoadingPageSkeleton';

const loadingSkeleton = () => {
  return  <LoadingPageSkeleton />
};

export default loadingSkeleton;