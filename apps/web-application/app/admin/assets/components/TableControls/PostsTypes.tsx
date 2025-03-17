'use client';
import React from 'react';
import styled from 'styled-components';
import { postTypes } from '@repo/data-structures';
import { convertVariableNameToName, createQueryString, removeQueryParam } from '@repo/utils';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';


const PostsTypesStyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;

    p {
        width: 100px;
        white-space: nowrap;
        margin: 0 0.25rem;
    }
`;

const PostsTypes = () => {
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onFormatChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      router.push(pathname + '?' + createQueryString([
        { name: 'postType', value: e.target.value },
        { name: 'page', value: '1' },
      ], searchParams), { scroll: false });
    } else {
      router.push(pathname + '?' + removeQueryParam('postType', searchParams), { scroll: false });
    }
  };

  return (
    <PostsTypesStyledDiv className="assetControlItem">
      <p>Type:</p>
      <select
        className={'primarySelect'}
        onChange={e => onFormatChangeHandler(e)}
        value={searchParams.get('postType') || ''}
      >
        <option value="">Select</option>
        {postTypes.map((postType: string) => (
          <option key={postType} value={postType}>
            {convertVariableNameToName(postType)}
          </option>
        ))}
      </select>
    </PostsTypesStyledDiv>
  );
};

export default PostsTypes;
