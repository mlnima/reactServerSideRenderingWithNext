'use client';
import { FC, useEffect } from 'react';
import viewPost from '@lib/actions/database/posts/viewPost';

interface IProps {
  _id?: string;
}

const ViewPostClient: FC<IProps> = ({ _id }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && _id) {
      const run = async () => {
        try {
          await viewPost(_id);
        } catch (error) {
          console.error('Failed to view post:', error);
        }
      };

      run();
    }
  }, [_id]); // This will re-run when _id changes

  return null;
};

export default ViewPostClient;

// 'use client';
// import { FC, useEffect, useRef } from 'react';
// import viewPost from '@lib/actions/database/posts/viewPost';
//
// interface IProps {
//   _id?: string;
// }
//
// const ViewPostClient: FC<IProps> = ({ _id }) => {
//   const hasViewed = useRef(false);
//
//   useEffect(() => {
//     if (typeof window !== 'undefined' && _id && !hasViewed.current) {
//       hasViewed.current = true;
//
//       const run = async () => {
//         try {
//           await viewPost(_id);
//         } catch (error) {
//           console.error('Failed to view post:', error);
//         }
//       };
//
//       run();
//     }
//   }, [_id]);
//
//   return null;
// };
//
// export default ViewPostClient;