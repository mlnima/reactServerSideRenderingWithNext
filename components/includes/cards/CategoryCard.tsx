import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import {useRouter} from "next/router";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import CardImageRenderer from "@components/includes/cards/CardImageRenderer";

const CategoryCardStyle = styled.article`
  background: var(--post-element-background, #131314);
  width: 100%;
  margin: 0 auto;

  .category-card-link {
    width: 100%;
    color: var(--post-element-text-color, #ccc);

    .category-card-info {
      display: flex;
      align-items: center;
      justify-content: center;

      .category-card-title, .category-card-count {
        color: var(--post-element-text-color, #ccc);
      }

      .category-card-title {
        width: fit-content;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 15px;
        font-weight: normal;
        padding: 3px 0;
        margin: 3px 0;
      }

      .category-card-count {
        margin: 0 2px;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
  }
`

interface CategoryCardPropTypes {
    category: Meta,
    index?: number,
    postsPerRawForMobile: number,
    cardWidth: number,
}

const CategoryCard: FC<CategoryCardPropTypes> =
    ({
         category,
         index,
         postsPerRawForMobile,
         cardWidth
     }) => {

        const {locale} = useRouter();

        const cardTitle = useMemo(() => {
            const checkedTitle = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                category?.name :
                category?.translations?.[locale]?.name || category?.name
            return capitalizeFirstLetter(checkedTitle)
        }, [category?.name]);

        return (
            <CategoryCardStyle cardWidth={cardWidth} className={'category-card'}>
                <Link href={`/category/${category?._id}`}>
                    <a className='category-card-link' title={cardTitle as string}>
                        <CardImageRenderer imageUrl={category.imageUrl}
                                           mediaAlt={cardTitle}
                                           index={index}
                                           postsPerRawForMobile={postsPerRawForMobile}
                                           cardWidth={cardWidth}/>

                        <div className={'category-card-info'}>
                            <h3 className={'category-card-title'}>
                                {cardTitle}
                            </h3>
                            {!!category?.count &&
                                 <span className={'category-card-count'}>(<var>{category?.count}</var>)</span>
                            }
                        </div>

                    </a>
                </Link>
            </CategoryCardStyle>
        )
    };
export default CategoryCard
