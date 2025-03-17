'use client';
import React, { useEffect, FC, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { createQueryString, removeQueryParam } from '@repo/utils';

const PostsByMetaStyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .25rem;

    p {
        margin: 0 10px;
        white-space: nowrap;
    }

    .primaryInput {
        /* width: 260px; */
    }

    .btn-navigation {
        /* margin: 0 2px; */
    }
`;

const PostsByMeta: FC = () => {
  const [metaId, setMetaId] = useState('');
  const router = useRouter(); // Use useRouter for handling query parameters
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onSearchByMetaHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (metaId && metaId?.trim()?.match(/^[0-9a-fA-F]{24}$/)) {
      router.push(pathname + '?' + createQueryString([
        { name: 'metaId', value: metaId },
        { name: 'page', value: '1' },
        { name: 'keyword', value: '' },
      ], searchParams), { scroll: false });
    }
  };

  const onDeleteMetaHandler = () => {
    if (searchParams.get('metaId')) {
      router.push(pathname + '?' + removeQueryParam(
        ['keyword', 'metaId', 'page'],
        searchParams,
      ), { scroll: false });
    }
  };

  useEffect(() => {
    const currentMetaId = searchParams.get('searchParams');
    if (currentMetaId) {
      setMetaId(currentMetaId);
    }
  }, [searchParams]);

  return (
    <PostsByMetaStyledForm className="assetControlItem" onSubmit={onSearchByMetaHandler}>
      <p>Meta:</p>
      <input
        className={'primaryInput'}
        type={'text'}
        onChange={(e) => setMetaId(e.target.value)}
        value={searchParams.get('metaId') || ''}
      />
      <button className={'btn btn-navigation'} type="submit">
        Search
      </button>
      {searchParams.get('metaId') ? (
        <span className={'btn btn-navigation'} onClick={onDeleteMetaHandler}>
          X
        </span>
      ) : null}
    </PostsByMetaStyledForm>
  );
};

export default PostsByMeta;
