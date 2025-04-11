'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { createQueryString } from '@repo/utils';
import { useAppSelector } from '@storeDashboard/hooks';
import './AssetSize.scss';

const AssetSize: React.FC = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentSize, setCurrentSize] = useState<number>(20);
  const range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000];
  const { initialSettings } = useAppSelector(({ settings }) => settings);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    setCurrentSize(parseInt(newSize));
    router.push(pathname + '?' + createQueryString([
      { name: 'size', value: newSize },
      { name: 'page', value: '1' },
    ], searchParams), { scroll: false });
  };

  useEffect(() => {
    const querySize = searchParams.get('size');
    const size = querySize ? parseInt(querySize) : initialSettings?.contentSettings?.contentPerPage || 20;
    setCurrentSize(size);
  }, [searchParams, initialSettings]);

  return (
    <div id={'AssetSize'} className={'assetControlItem'}>
      <select className={'primarySelect'} value={currentSize} onChange={onChangeHandler}>
        {range.map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>
    </div>
  );
};

export default AssetSize;
