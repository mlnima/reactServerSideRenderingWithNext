import React, { FC, SetStateAction } from 'react';

interface IProps {
  dictionary: {
    [key: string]: string;
  };
  setPostStatusToFetch: React.Dispatch<SetStateAction<string>>;
  userRole: string;
}

const AuthorPostsNavigation: FC<IProps> = ({
  setPostStatusToFetch,
  dictionary,
  userRole,
}) => {
  return (
    <div className={'profilePostsNavigation'}>
      <button
        className={'btn btn-transparent'}
        onClick={() => setPostStatusToFetch('published')}
      >
        {dictionary?.['Published'] || 'Published'}
      </button>
      <button
        className={'btn btn-transparent'}
        onClick={() => setPostStatusToFetch('pending')}
      >
        {dictionary?.['Pending'] || 'Pending'}
      </button>
      {userRole === 'administrator' && (
        <>
          <button
            className={'btn btn-transparent'}
            onClick={() => setPostStatusToFetch('draft')}
          >
            {dictionary?.['Draft'] || 'Draft'}
          </button>
          <button
            className={'btn btn-transparent'}
            onClick={() => setPostStatusToFetch('trash')}
          >
            {dictionary?.['Trash'] || 'Trash'}
          </button>
        </>
      )}
    </div>
  );
};
export default AuthorPostsNavigation;
