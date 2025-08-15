import Link from 'next/link';
import React, { FC } from 'react';
import { capitalizeFirstLetter } from '@repo/utils/dist/src';
import './CardTitle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

interface CardTitlePropTypes {
  title: string | undefined;
  url?: string | undefined;
  targetLink?: string;
  useIcon?: boolean;
  useLink?: boolean;
}

const CardTitle: FC<CardTitlePropTypes> = ({ title, url, targetLink, useLink = true, useIcon = false }) => {
  if (!title) return null;
  return (
    <h2
      className={'cardTitle'}
      style={{
        display: useIcon ? 'flex' : 'initial',
        alignItems: useIcon ? 'center' : 'initial',
        justifyContent: useIcon ? 'space-between' : 'initial',
      }}
    >
      {useLink ? (
        <Link href={url || '#'} title={title} target={targetLink || '_self'}>
          {capitalizeFirstLetter(title)}
        </Link>
      ) : (
        capitalizeFirstLetter(title)
      )}
      {useIcon && <FontAwesomeIcon className={'rating-icon'} icon={faArrowUpRightFromSquare} />}
    </h2>
  );
};
export default CardTitle;
