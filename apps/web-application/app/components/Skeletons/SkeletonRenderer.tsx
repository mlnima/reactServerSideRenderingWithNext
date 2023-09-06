'use client';
import Skeleton from "react-loading-skeleton";
import {PropsWithChildren} from "react";
import "react-loading-skeleton/dist/skeleton.css";

const Box = ({children}: PropsWithChildren<unknown>) => {
    return (
        <div style={{
                display: 'block',
                lineHeight: 1,
                margin:0,
                padding:0,
            }}>

            {children}
        </div>
    );
}

import {FC} from "react";

interface IProps {
    height:number,
    width:number,
    count:number,
}

const SkeletonRenderer: FC<IProps> = ({width,height,count=1}) => {
    return <Skeleton wrapper={Box}
                     highlightColor={'var(--secondary-background-color,#2b2b2b)'}
                     baseColor='var(--primary-background-color,#000)'
                     line-height={1}
                     style={{
                         margin:0,
                         padding:0,
                         lineHeight: 1,
                     }}
                     height={height}
                     width={width}
                     count={count} />
};

export default SkeletonRenderer;
