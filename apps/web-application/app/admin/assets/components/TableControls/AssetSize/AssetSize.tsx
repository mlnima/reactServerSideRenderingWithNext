'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { createQueryString } from '@repo/utils';
import './AssetSize.scss';

interface IProps {
  contentPerPage?: number;
}

const AssetSize: React.FC<IProps> = ({ contentPerPage = 20 }) => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentSize, setCurrentSize] = useState<number>(20);
  const range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000];

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
    const size = querySize ? parseInt(querySize) : contentPerPage;
    setCurrentSize(size);
  }, [searchParams, contentPerPage]);

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
