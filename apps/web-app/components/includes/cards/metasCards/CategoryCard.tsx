import React, {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "typescript-types";
import Link from "next/link";
import {useRouter} from "next/router";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import CardTitle from "../asset/CardTitle/CardTitle";

const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const ResetMetaImageButton = dynamic(() => import('../asset/ResetMetaImageButton/ResetMetaImageButton'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer'))

const CategoryCardStyle = styled.article`

  width: 100%;
  position: relative;

  .category-card-link {
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    height: auto;
    display: inline-block;
    color: var(--secondary-text-color, #ccc);

    .entry-header {
      width: 100%;
      padding: 5px 0;
      box-sizing: border-box;

      .card-header {
        overflow-wrap: break-word;
        -webkit-line-clamp: 1;
        font-weight: bold;
        font-size: small;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
    .category-card-link {
      .category-logo {
        .entry-header {
          .card-header {
            font-weight: bolder;
            font-size: large;
          }
        }
      }
    }
  }
`

interface CategoryCardPropTypes {
    meta: Meta,
    index: number,
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
    role: string,
    adminMode: boolean,
}

const CategoryCard: FC<CategoryCardPropTypes> =
    ({
         meta,
         index,
         numberOfCardsPerRowInMobile,
         cardWidth,
         adminMode,
         role
     }) => {

        const {locale} = useRouter();

        const title = useMemo(() => {
            const checkedTitle = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                meta?.name :
                //@ts-ignore
                meta?.translations?.[locale]?.name || meta?.name
            return capitalizeFirstLetter(checkedTitle)
        }, [meta?.name]);

        return (
            <CategoryCardStyle cardWidth={cardWidth} className={'category-card'}>
                <Link href={`/category/${meta?._id}`} className='category-card-link' title={title as string}>
                    {!!meta.imageUrl ?
                        <CardImageRenderer imageUrl={meta.imageUrl}
                                           mediaAlt={title}
                                           index={index}
                                           numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                           cardWidth={cardWidth}/> :
                        <TextToCanvasImage title={title}
                                           numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                           cardWidth={cardWidth}/>
                    }
                </Link>
                <CardTitle title={title} url={`/category/${meta?._id}`}/>

                {(role === 'administrator' && adminMode) && <ResetMetaImageButton _id={meta._id}/>}
            </CategoryCardStyle>
        )
    };
export default CategoryCard
