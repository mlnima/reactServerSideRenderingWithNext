import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_typeScriptTypes/Meta";
import Link from "next/link";
import {useRouter} from "next/router";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import dynamic from "next/dynamic";
import CardTitle from "@components/includes/cards/asset/CardTitle/CardTitle";
const TextToCanvasImage = dynamic(() => import('@components/includes/cards/asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('@components/includes/cards/CardImageRenderer'))

const CategoryCardStyle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  margin: 0 auto;

  .category-card-link {
    color: var(--post-element-text-color, #ccc);
    .entry-header{
      width: 100%;
      margin: 5px 0;
      text-align: center;
    }
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
  }
`

interface CategoryCardPropTypes {
    meta: Meta,
    index?: number,
    postsPerRawForMobile: number,
    cardWidth: number,
}

const CategoryCard: FC<CategoryCardPropTypes> =
    ({
         meta,
         index,
         postsPerRawForMobile,
         cardWidth
     }) => {

        const {locale} = useRouter();

        const title = useMemo(() => {
            const checkedTitle = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                meta?.name :
                meta?.translations?.[locale]?.name || meta?.name
            return capitalizeFirstLetter(checkedTitle)
        }, [meta?.name]);

        return (
            <CategoryCardStyle cardWidth={cardWidth} className={'category-card'}>
                <Link href={`/category/${meta?._id}`}>
                    <a className='category-card-link' title={title as string}>
                        {!!meta.imageUrl ?
                            <CardImageRenderer imageUrl={meta.imageUrl}
                                               mediaAlt={title}
                                               index={index}
                                               postsPerRawForMobile={postsPerRawForMobile}
                                               cardWidth={cardWidth}/> :
                            <TextToCanvasImage title={title}
                                               postsPerRawForMobile={postsPerRawForMobile}
                                               cardWidth={cardWidth}/>
                        }
                        <CardTitle title={title}/>
                    </a>
                </Link>
            </CategoryCardStyle>
        )
    };
export default CategoryCard
