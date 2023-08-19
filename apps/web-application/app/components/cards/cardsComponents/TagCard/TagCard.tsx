import {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import CardTitle from "@components/cards/asset/CardTitle/CardTitle";
import '../metaCard.styles.scss'

const TextToCanvasImage = dynamic(() => import('@components/cards/asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('@components/cards/asset/CardImageRenderer/CardImageRenderer'))

interface TagCardPropTypes {
    meta: Meta,
    index: number,
    locale: string,
    isSidebar?: boolean
}

const TagCard: FC<TagCardPropTypes> =
    ({
         meta,
         index,
         locale,
         isSidebar
     }) => {

        const title = capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)

        return (
            <article className={`tag-card metaCard ${isSidebar && 'metaCardSidebar'}`}>
                <div className={'card-media'}>
                    <Link href={`/tag/${meta?._id}`} className='tag-card-link' title={title as string}>
                        {!!meta?.imageUrl ?
                            <CardImageRenderer imageUrl={meta?.imageUrl}
                                               mediaAlt={title}
                                               index={index}/> :
                            <TextToCanvasImage title={title}
                                               numberOfCardsPerRowInMobile={1}/>
                        }
                    </Link>
                </div>
                <div className={`card-info`}>
                    <CardTitle title={title} url={`/tag/${meta?._id}`}/>
                </div>
            </article>
        )
    };
export default TagCard
