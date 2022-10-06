import React, {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_typeScriptTypes/Meta";
import Link from "next/link";
import {useRouter} from "next/router";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import dynamic from "next/dynamic";
import CardTitle from "@components/includes/cards/asset/CardTitle/CardTitle";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
// import AdminThumbnailToRandomImageFromPostsButton
//     from "@components/includes/cards/asset/adminThumbnailToRandomImageFromPostsButton/AdminThumbnailToRandomImageFromPostsButton";
const TextToCanvasImage = dynamic(() => import('@components/includes/cards/asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('@components/includes/cards/CardImageRenderer'))

const CategoryCardStyle = styled.article`
  
  width: 100%;
  margin: 0 ;
  position: relative;
  .category-card-link {
    background-color: var(--post-element-background-color, #131314);
    margin: 0 ;
    padding: 0;
    position: relative;
    width: 100%;
    height: auto;
    display: inline-block;
    color: var(--post-element-text-color, #ccc);
    .category-logo{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      .entry-header{
        box-sizing: border-box;
        text-shadow: 2px 2px 5px #000 ,-2px -2px 5px #000 ;
        .card-header{
          font-weight: bolder;
          font-size: large;
        }
      }
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
                        <span className={'category-logo'}>
                                 <SvgRenderer svgUrl={'/public/asset/images/icons/css3-alt-.svg'}
                                              size={25}
                                              color={'var(--serachbar-widget-text-color, #fff)'}/>
                                 <CardTitle title={title}/>
                        </span>




                    </a>

                </Link>
                {/*<AdminThumbnailToRandomImageFromPostsButton/>*/}
            </CategoryCardStyle>
        )
    };
export default CategoryCard

//
//     .category-card-link {
//     position: relative;
//     color: var(--post-element-text-color, #ccc);
// .entry-header{
//         z-index: 2;
//         position: absolute;
//         top:35%;
//         width: 100%;
//         margin: 5px 0;
//         text-align: center;
//         text-shadow: 2px 2px 5px #000 ,-2px -2px 5px #000 ;
//         font-weight: bold;
//         font-size: 22px;
//     }
// }