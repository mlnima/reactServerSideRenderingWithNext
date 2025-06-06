'use client';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownZA } from '@fortawesome/free-solid-svg-icons/faArrowDownZA';
import './AlphabeticalNumericalRangeLinksWidget.scss';
import { usePathname, useSearchParams } from 'next/navigation';
import { faArrowUpZA } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import AlphabeticalNumericalRangeItem
  from '@components/widgets/widgets/AlphabeticalNumericalRangeLinksWidget/AlphabeticalNumericalRangeItem';
import { faEraser } from '@fortawesome/free-solid-svg-icons/faEraser';

const AlphabeticalNumericalRangeLinksWidget: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startWith = useMemo(() => searchParams.get('startWith') || '', [pathname, searchParams]) as string;
  const [isOpen, setIsOpen] = useState(false);

  const range = useMemo(() => {
    return ((pathname.includes('/actors') ? '' : '#') + 'abcdefghijklmnopqrstuvwxyz').split('');
  }, []);

  return (
    <div className={'lettersWrapper'}>
      <div className="rangeControls">
        {!!startWith && (
          <Link
            key={'all'}
            href={pathname}
            style={{
              pointerEvents: 'auto',
              display: isOpen ? 'flex' : 'none',
            }}
            className={`rangeActiveItem btn btn-dark`}
          >
            <FontAwesomeIcon icon={faEraser} style={{ width: 20, height: 20 }} />
          </Link>
        )}

        <button
          className={'rangeItemOpenBtn btn btn-primary mobileOnly'}
          aria-label={'show filters'}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faArrowUpZA} style={{ width: 20, height: 20 }} />
          ) : (
            <FontAwesomeIcon icon={faArrowDownZA} style={{ width: 20, height: 20 }} />
          )}
        </button>
      </div>

      <div className={'lettersItems'} style={{ justifyContent: isOpen ? 'center' : 'flex-start' }}>
        {range.map(letter => {
          return (
            <AlphabeticalNumericalRangeItem
              key={uuidv4()}
              letter={letter}
              isOpen={isOpen}
              pathname={pathname}
              startWith={startWith}
            />
          );
        })}
      </div>
    </div>
  );
};
export default AlphabeticalNumericalRangeLinksWidget;
