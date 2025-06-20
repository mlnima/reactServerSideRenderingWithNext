import React, { FC } from 'react';
import { IMeta } from '@repo/typescript-types';
import Link from 'next/link';
import { capitalizeFirstLetter, convertMetasTypeToSingular, groupingArrayOfMetas } from '@repo/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './MetasRenderer.scss';

interface MetasRendererPropTypes {
  metaData: IMeta[] | undefined;
  metaType: string;
  locale: string;
  startWith?: string;
  grouping?: boolean;
}

const MetasRenderer: FC<MetasRendererPropTypes> = (
  {
    metaType,
    metaData,
    locale,
    startWith,
    grouping,
  }) => {

  if (!metaData) return null;

  const typePath = convertMetasTypeToSingular(metaType);

  if (grouping) {
    const groupMetas = groupingArrayOfMetas(metaData, 'name');
    return (
      <div className={`metaRenderer`}>
        <div className={'lettersContainer '}>
          {Object.keys(groupMetas || [])
            .sort((a, b) => (a > b ? 1 : -1))
            .map(group => {
              return (
                <article className={'groupWrapper'} key={group}>
                  <div className={'groupWrapperHeader'}>
                                        <span className={'letter'}>
                                            {group === '0'
                                              ? '#'
                                              : capitalizeFirstLetter(group)}
                                        </span>

                  </div>
                  <div className={'items '}>
                    {groupMetas[group].map((meta: IMeta) => {

                      const name = capitalizeFirstLetter(
                        meta?.translations?.[locale]
                          ?.name ?? meta.name,
                      );
                      return (
                        <Link
                          className={`metaWidgetItem btn`}
                          key={meta._id}
                          href={`/${typePath}/${meta._id}`}
                          title={name}>
                          <span>{name}</span>
                          <span>{meta?.count || 0}</span>
                        </Link>
                      );
                    })}
                    {!startWith && (
                      <Link
                        href={`/${metaType}?startWith=${group === '0' ? 'other' : group}`}
                        aria-label={metaType}
                        title={`all the ${metaType} starts with ${group}`}
                      >
                                                <span className={`view-all`}>
                                                    <FontAwesomeIcon
                                                      icon={faCaretDown}
                                                      style={{
                                                        width: 28,
                                                        height: 20,
                                                      }}
                                                    />
                                                </span>
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className={`metaRenderer`}>
        <div className={'lettersContainer '}>
          <div className={'groupWrapper'}>
            <div className={'items '}>
              {metaData?.map(meta => {
                const name = capitalizeFirstLetter(
                  meta?.translations?.[locale]?.name ??
                  meta.name,
                );
                return (
                  <Link
                    className={`metaWidgetItem btn`}
                    key={meta._id}
                    href={`/${typePath}/${meta._id}`}
                    title={name}
                  >
                    <span className={'metaWidgetItemName'}>{name}</span>
                    <span className={'metaWidgetItemCount'}>{meta?.count || 0}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default MetasRenderer;
