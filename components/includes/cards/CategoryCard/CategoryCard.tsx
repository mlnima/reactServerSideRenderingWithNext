import Link from "next/link";
import {useRouter} from "next/router";
import CategoryCardMedia from "./CategoryCardMedia";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import {FC, useMemo} from "react";
import capitalizeFirstLetter from "../../../../_variables/util/capitalizeFirstLetter";
import {Meta} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

const CategoryCardStyledDiv = styled.div`
  margin: 5px;

  .category-card-info-link {

    .category-card-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 95%;
      margin: auto;

      .category-card-title {
        color: var(--main-active-color);
        width: fit-content;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 12px;
        padding: 3px 0;
        margin: 3px 0;

        &:hover {
          color: var(--post-element-text-color, #ccc);
        }

      }

      .category-card-count {
        margin: 0 2px;
        color: var(--main-text-color);
      }

    }
  }
`

interface CategoryCardPropTypes {
    cardWidth: number,
    category: Meta,
    onActivateLoadingHandler: any
}

const CategoryCard: FC<CategoryCardPropTypes> = ({cardWidth, category, onActivateLoadingHandler}) => {
    const {t} = useTranslation('customTranslation');
    const {locale} = useRouter();

    const cardTitle = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            category?.name :
            category?.translations?.[locale]?.name || t(category?.name, {ns: 'customTranslation'})
    }, [])

    return (
        <CategoryCardStyledDiv className={'category-card'}>
            <Link href={`/category/${category?._id}`}>
                <a className='category-card-info-link'
                   onClick={onActivateLoadingHandler}
                   title={cardTitle}
                >
                    <div className={'category-card-image'}>
                        <CategoryCardMedia cardWidth={cardWidth}
                                           imageUrl={category?.imageUrl}
                                           mediaAlt={category?.translations?.[locale]?.name || category?.name}
                        />
                    </div>
                    <div className={'category-card-info'}>
                        <h3 className='category-card-title'>
                            {capitalizeFirstLetter(cardTitle)}
                        </h3>
                        {category?.count ?
                            <span className={'category-card-count'}>
                               (<var>{category?.count}</var>)
                            </span>
                            : null
                        }
                    </div>
                </a>
            </Link>
        </CategoryCardStyledDiv>
    );
};

export default CategoryCard;
