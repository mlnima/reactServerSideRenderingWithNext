'use client';
import { FC, useState, useEffect, memo } from 'react';
import parse from 'html-react-parser';
import './Advertise.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonRenderer from '@components/Skeletons/SkeletonRenderer';

interface AdvertisePropTypes {
    uniqueData: {
        adCode: string;
    };
}

const Advertise: FC<AdvertisePropTypes> = ({ uniqueData }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [adCodeData, setAdCodeData] = useState<null | string>(null);

    useEffect(() => {
        setLoading(true);
        setAdCodeData(null);
        setAdCode();
    }, [pathname, searchParams]);

    const setAdCode = () => {
        if (!!uniqueData?.adCode) {
            setTimeout(() => {
                setAdCodeData(uniqueData?.adCode);
                setLoading(false);
            }, 500);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    if (loading)
        return (
            <div className={'advertiseWrapper'}>
                <SkeletonRenderer height={102} width={300} count={1} />
            </div>
        );

    return <div className={'advertiseWrapper'}>{!!adCodeData && parse(adCodeData)}</div>;
};
export default memo(Advertise);
