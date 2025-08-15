import React, { FC } from 'react';
import { formatDistance } from 'date-fns';
import { capitalizeFirstLetter } from '@repo/utils/dist/src';

interface IProps {
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  dictionary: {
    [key: string]: string;
  };
}

const PostQuickAccessPostInformation: FC<IProps> = ({ createdAt, updatedAt, status, dictionary }) => {
  return (
    <>
      <div className={'dates'}>
        {createdAt && (
          <span title={createdAt}>
            {dictionary?.['Created At'] || 'Created At'}: {formatDistance(new Date(createdAt), new Date())}
          </span>
        )}
        {createdAt && updatedAt && (
          <span title={updatedAt}>
            {dictionary?.['Updated At'] || 'Updated At'}: {formatDistance(new Date(createdAt), new Date())}
          </span>
        )}
      </div>
      {status && (
        <h4 className="status">
          {dictionary?.['Status'] || 'Status'} : {dictionary?.[capitalizeFirstLetter(status)] || capitalizeFirstLetter(status)}
        </h4>
      )}
    </>
  );
};
export default PostQuickAccessPostInformation;
