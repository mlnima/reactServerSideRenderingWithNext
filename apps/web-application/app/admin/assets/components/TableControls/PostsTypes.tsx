"use client";

import styled from 'styled-components';
import React, { useMemo } from 'react';
import { postTypes } from '@repo/data-structures';
import { convertVariableNameToName } from '@repo/utils';
import { useRouter } from 'next/navigation';
import paramsObjectGenerator from '../paramsObjectGenerator';
import { usePathname, useSearchParams } from 'next/navigation';
import { _updateSearchParams } from '@lib/navigationTools';

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
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const query = useMemo(() => paramsObjectGenerator(searchParams), [searchParams]);

  const onFormatChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const newQuery = { ...query, postType: e.target.value };
      router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
    } else {
      const newQuery = { ...query };
      delete newQuery.postType;
      router.push(_updateSearchParams({newQuery,searchParams,pathname}), { scroll: false });
    }
  };

  return (
    <PostsTypesStyledDiv className="assetControlItem">
      <p>Type:</p>
      <select
        className={'primarySelect'}
        onChange={e => onFormatChangeHandler(e)}
        value={query?.postType || ''}
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
//
// import styled from 'styled-components';
// import React, { useMemo } from 'react';
// import { postTypes } from '@repo/data-structures';
// import { convertVariableNameToName } from '@repo/utils';
// import { useSearchParams } from 'react-router-dom';
// import paramsObjectGenerator from '../paramsObjectGenerator';
//
// const PostsTypesStyledDiv = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 200px;
//
//     p {
//         width: 100px;
//         white-space: nowrap;
//         margin: 0 0.25rem;
//     }
// `;
// const PostsTypes = () => {
//     const [search, setSearch] = useSearchParams();
//     //@ts-ignore
//     const query = useMemo(() => paramsObjectGenerator(search), [search]);
//
//     const onFormatChangeHandler = (e: React.ChangeEvent<any>) => {
//         if (e.target.value) {
//             setSearch({ ...query, postType: e.target.value });
//         } else {
//             const newQuery = { ...query };
//             delete newQuery.postType;
//             setSearch({ ...newQuery });
//         }
//     };
//
//     return (
//         <PostsTypesStyledDiv className="assetControlItem">
//             <p>Type:</p>
//             <select className={'primarySelect'} onChange={e => onFormatChangeHandler(e)} value={query?.postType}>
//                 <option value="">Select</option>
//                 {postTypes.map((postType: string) => (
//                     <option key={postType} value={postType}>
//                         {convertVariableNameToName(postType)}
//                     </option>
//                 ))}
//             </select>
//         </PostsTypesStyledDiv>
//     );
// };
// export default PostsTypes;
