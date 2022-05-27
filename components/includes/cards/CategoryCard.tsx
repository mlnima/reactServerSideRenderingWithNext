import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import {useRouter} from "next/router";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import CardImageRenderer from "@components/includes/cards/CardImageRenderer";

const CategoryCardStyle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  margin: 0 auto;

  .category-card-link {
    color: var(--post-element-text-color, #ccc);
    .entry-header{
      width: 100%;
      margin: 3px 0;
      text-align: center;
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

                        {/*<div className={'category-card-info'}>*/}
                        {/*    <h3 className={'category-card-title'}>*/}
                        {/*        {cardTitle}*/}
                        {/*    </h3>*/}
                        {/*    {!!category?.count &&*/}
                        {/*         <span className={'category-card-count'}>(<var>{category?.count}</var>)</span>*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <header className={'entry-header'}>
                            <span className={'cat-title'}>
                                {cardTitle}
                            </span>
                        </header>

                    </a>
                </Link>
            </CategoryCardStyle>
        )
    };
export default CategoryCard
