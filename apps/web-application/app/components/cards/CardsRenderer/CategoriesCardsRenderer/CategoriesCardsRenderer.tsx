import React, { FC } from 'react';
import { IMeta } from '@repo/typescript-types';
import './CategoriesCardsRenderer.scss';
import CategoryCard from '@components/cards/cardsComponents/CategoryCard/CategoryCard';

interface IProps {
  metas?: IMeta[];
  locale: string;
  isSidebar?: boolean;
  dictionary: {
    [key: string]: string;
  };
}

const CategoriesCardsRenderer: FC<IProps> = ({
  metas,
  locale,
  isSidebar,
  dictionary,
}) => {
  return (
    <div className={`categoriesCardsWrapper${isSidebar ? 'Sidebar' : ''} `}>
      {metas?.map((meta, index) => {
        const imagesAllowedDomainsForNextImage =
          process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || [];
        const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

        const isNextImageAllowed = meta.imageUrl
          ? imagesAllowedDomainsForNextImage?.some((domain) =>
              meta.imageUrl?.includes(domain)
            )
          : false;

        const metaUrl =
          locale === defaultLocale
            ? `/category/${meta._id}`
            : `/${locale}/category/${meta._id}`;

        return (
          <CategoryCard
            key={meta._id}
            isNextImageAllowed={isNextImageAllowed}
            metaUrl={metaUrl}
            meta={meta}
            isSidebar={isSidebar}
            locale={locale}
            dictionary={dictionary}
            index={index}
          />
        );
      })}
    </div>
  );
};
export default CategoriesCardsRenderer;
