import {FC, useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import CategoryCardMedia from "./CategoryCardMedia";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";

const CategoryCardStyledDiv = styled.div`
  margin: 5px;
  background-color: var(--post-element-background-color, #131314);

  .category-card-link{
    width: 100%;
    .category-card-info {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95%;
      margin: auto;

      .category-card-title, .category-card-count {
        color: var(--post-element-text-color, #ccc);

        &:hover {
          color: var(--main-active-color, #ccc);
        }
      }

      .category-card-title {
        width: fit-content;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 14px;
        font-weight: normal;
        padding: 3px 0;
        margin: 3px 0;
      }

      .category-card-count {
        margin: 0 2px;
      }
    }
  }
`

interface CategoryCardPropTypes {
    cardWidth: number,
    category: Meta,
    onActivateLoadingHandler: any,
}

const CategoryCard: FC<CategoryCardPropTypes> =
    ({
         cardWidth,
         category,
         onActivateLoadingHandler,
    }) => {

    const {t} = useTranslation('customTranslation');
    const {locale} = useRouter();

    const cardTitle = useMemo(() => {
        const checkedTitle = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
              category?.name :
              category?.translations?.[locale]?.name || t(category?.name, {ns: 'customTranslation'})
        return capitalizeFirstLetter(checkedTitle)
    }, [category?.name]);

    return (
        <CategoryCardStyledDiv className={'category-card'}>
            <Link href={`/category/${category?._id}`}>
                <a className='category-card-link'
                   onClick={onActivateLoadingHandler}
                   title={cardTitle as string}
                >
                    <div className={'category-card-image'}>
                        <CategoryCardMedia cardWidth={cardWidth}
                                           imageUrl={category?.imageUrl}
                                           mediaAlt={cardTitle as string}
                        />
                    </div>

                    <div className={'category-card-info'}>
                        <h3 className={'category-card-title'}>
                            {cardTitle}
                        </h3>
                        {category?.count ? <span className={'category-card-count'}>
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
