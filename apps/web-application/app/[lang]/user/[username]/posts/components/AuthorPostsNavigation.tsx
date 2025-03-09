'use client';
import React, { FC, SetStateAction } from 'react';
import Link from 'next/link'
import { usePathname, useParams, useSearchParams } from 'next/navigation'
import { useAppSelector } from '@store/hooks';
import { IInitialUserPageData } from '@repo/typescript-types';
import './AuthorPostsNavigation.scss'

interface IProps {
  dictionary: {
    [key: string]: string;
  };
  // setPostStatusToFetch: React.Dispatch<SetStateAction<string>>;
  // userRole: string;
  initialUserPageData: IInitialUserPageData
}


//*****************NEED ROUTING FIX
const AuthorPostsNavigation: FC<IProps> = ({
                                             // setPostStatusToFetch,
                                             dictionary,
                                             // userRole,
                                             initialUserPageData
                                           }) => {
  const pathname = usePathname()
  // const params = useParams<{ username: string }>()
  // const searchParams = useSearchParams()
  const { userData, loggedIn } = useAppSelector(({ user }) => user);


  return (
    <div className={'profilePostsNavigation'}>
      <div className={'profilePostsNavigationItems'}>
        {(loggedIn && initialUserPageData._id === userData._id || userData.role === 'administrator') ?
          <>
            <Link href={`${pathname}/posts?status=published`} className={'btn btn-transparent'}>
              {dictionary?.['Published'] || 'Published'}
            </Link>

            <Link href={`${pathname}/posts?status=pending`} className={'btn btn-transparent'}>
              {dictionary?.['Pending'] || 'Pending'}
            </Link>
            {userData.role === 'administrator' && (
              <>


                <Link href={`${pathname}/posts?status=draft`} className={'btn btn-transparent'}>
                  {dictionary?.['Draft'] || 'Draft'}
                </Link>
                <Link href={`${pathname}/posts?status=trash`} className={'btn btn-transparent'}>
                  {dictionary?.['Trash'] || 'Trash'}
                </Link>
              </>
            )}
          </>:
          <Link href={`${pathname}/posts`} className={'btn btn-transparent'}>
            {dictionary?.['All Posts'] || 'All Posts'}
          </Link>
        }

      </div>


    </div>
  );

};
export default AuthorPostsNavigation;

//
// <button
//   className={'btn btn-transparent'}
//   onClick={() => setPostStatusToFetch('published')}
// >
//   {dictionary?.['Published'] || 'Published'}
// </button>
// <button
//   className={'btn btn-transparent'}
//   onClick={() => setPostStatusToFetch('pending')}
// >
//   {dictionary?.['Pending'] || 'Pending'}
// </button>

// <button
//   className={'btn btn-transparent'}
//   onClick={() => setPostStatusToFetch('draft')}
// >
//   {dictionary?.['Draft'] || 'Draft'}
// </button>
// <button
//   className={'btn btn-transparent'}
//   onClick={() => setPostStatusToFetch('trash')}
// >
//   {dictionary?.['Trash'] || 'Trash'}
// </button>