'use client';
import React from 'react';
import { postTypes } from '@repo/data-structures';
import { convertVariableNameToName, createQueryString, removeQueryParam } from '@repo/utils/dist/src';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import './PostsByTypes.scss';

const PostsByTypes = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onFormatChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      router.push(
        pathname +
          '?' +
          createQueryString(
            [
              { name: 'postType', value: e.target.value },
              { name: 'page', value: '1' },
            ],
            searchParams,
          ),
        { scroll: false },
      );
    } else {
      router.push(pathname + '?' + removeQueryParam('postType', searchParams), { scroll: false });
    }
  };

  return (
    <div id={'PostsByTypes'} className="assetControlItem">
      <p>Type:</p>
      <select className={'primarySelect'} onChange={(e) => onFormatChangeHandler(e)} value={searchParams.get('postType') || ''}>
        <option value="">Select</option>
        {postTypes.map((postType: string) => (
          <option key={postType} value={postType}>
            {convertVariableNameToName(postType)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PostsByTypes;
