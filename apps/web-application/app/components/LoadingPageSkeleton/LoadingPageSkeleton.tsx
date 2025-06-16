'use client';
import { FC, PropsWithChildren } from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import '@components/cards/CardsRenderer/cardsRenderer.scss'
import './LoadingPageSkeleton.scss'
interface IProps {
}


const Box = ({children}: PropsWithChildren<unknown>) => {
  return (
    <div className={'loadingPageSkeletonBox'} >
      {children}
    </div>
  );
}

const LoadingPageSkeleton: FC<IProps> = ({}) => {
  return <div id={'content'} className={`page-no-sidebar loadingPageSkeleton`}>
    <Box>
      <Skeleton
                highlightColor={'var(--tertiary-background-color,#2b2b2b)'}
                baseColor='var(--secondary-background-color,#000)'
                line-height={1}
                className={'loadingPageSkeletonBoxInnerItemContent'}
                duration={.5}
                count={20} />
    </Box>

  </div>
};
export default LoadingPageSkeleton
