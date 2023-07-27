import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "typescript-types";
import Link from "next/link";
import {useRouter} from "next/router";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import CardTitle from "../asset/CardTitle/CardTitle";
const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer/CardImageRenderer'))

const TagCardStyle = styled.article`
  width: 100%;
  
  .tag-card-link {

    color: var(--secondary-text-color, #ccc);

    .entry-header {
      width: 100%;
      margin: 3px 0;
      text-align: center;
    }
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
  }
`

interface TagCardPropTypes {
    meta: Meta,
    index: number,
    numberOfCardsPerRowInMobile: number,
    cardWidth: number
}

const TagCard: FC<TagCardPropTypes> =
    ({
         meta,
         index,
         numberOfCardsPerRowInMobile,
         cardWidth
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
            <TagCardStyle cardWidth={cardWidth} className={'tag-card'}>
                <Link href={`/tag/${meta?._id}`} className='tag-card-link' title={title as string}>

                        {!!meta?.imageUrl ?
                            <CardImageRenderer imageUrl={meta?.imageUrl}
                                               mediaAlt={title}
                                               index={index}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                               cardWidth={cardWidth}/> :
                            <TextToCanvasImage title={title}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                               cardWidth={cardWidth}/>
                        }


                </Link>
                <CardTitle title={title} url={`/tag/${meta?._id}`}/>
            </TagCardStyle>
        )
    };
export default TagCard
