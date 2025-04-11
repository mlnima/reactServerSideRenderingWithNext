import React, { FC } from 'react';
import { IContentSettings, IMeta } from '@repo/typescript-types';
import Pagination from '@components/Pagination/Pagination';
import ActorsCardsRenderer from '@components/cards/CardsRenderer/ActorsCardsRenderer/ActorsCardsRenderer';

interface IProps {
  renderPagination: boolean,
  metas: IMeta[],
  totalCount: number,
  currentPage: number,
  locale: string
  dictionary: {
    [key: string]: string
  }
  contentSettings?: IContentSettings;
}

const ActorsPageContentRenderer: FC<IProps> =
  ({
     metas,
     renderPagination,
     totalCount,
     currentPage,
     locale,
     dictionary,
     contentSettings,
   }) => {
    return (
      <>
        <div className={'actorsContainer'}>
          <ActorsCardsRenderer metas={metas} locale={locale} dictionary={dictionary} />
        </div>
        {renderPagination && <Pagination totalCount={totalCount}
                                         currentPage={currentPage}
                                         contentPerPage={contentSettings?.contentPerPage} />}
      </>
    );
  };
export default ActorsPageContentRenderer;