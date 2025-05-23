'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { createQueryString } from '@repo/utils';
import './SortAssetsBy.scss';

const SortAssetsBy = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onFormatChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname + '?' + createQueryString([
      { name: 'sort', value: e.target.value },
      { name: 'page', value: '1' },
    ], searchParams), { scroll: false });
  };

  return (
    <div id={'SortAssetsBy'} className="assetControlItem">
      <p>Sort:</p>
      <select
        className={'primarySelect'}
        onChange={e => onFormatChangeHandler(e)}
        value={searchParams.get('sort') || ''}
      >
        <option value="">Select</option>
        <option value="createdAt">Created At</option>
        <option value="-createdAt">- Created At</option>
        <option value="updatedAt">Updated At</option>
        <option value="-updatedAt">- Updated At</option>
        {searchParams.get('assetsType') === 'meta' && (
          <>
            <option value="count">Count</option>
          </>
        )}
        {searchParams.get('assetsType') === 'posts' && (
          <>
            <option value="disLikes">Dislikes</option>
          </>
        )}
        {(searchParams.get('assetsType') === 'meta' || searchParams.get('assetsType') === 'posts') && (
          <>
            <option value="likes">Likes</option>
            <option value="-likes">- Likes</option>
            <option value="views">Views</option>
            <option value="-views">- Views</option>
            <option value={searchParams.get('assetsType') === 'meta' ? 'name' : 'title'}>Alphabetical</option>
            <option value={searchParams.get('assetsType') === 'meta' ? '-name' : '-title'}>- Alphabetical</option>
          </>
        )}
      </select>
    </div>
  );
};

export default SortAssetsBy;