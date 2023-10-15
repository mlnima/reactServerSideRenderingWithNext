import {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import CardTitle from "@components/cards/asset/CardTitle/CardTitle";
import '../metaCard.scss'

const TextToCanvasImage = dynamic(() => import('@components/cards/asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'))

interface TagCardPropTypes {
    meta: Meta,
    index: number,
    locale: string,
    metaUrl: string,
    isSidebar?: boolean,
    isNextIImageAllowed?: boolean,
}

const TagCard: FC<TagCardPropTypes> =
    ({
         meta,
         index,
         locale,
         isSidebar,
         metaUrl,
         isNextIImageAllowed = false
     }) => {

        const title = capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)

        return (
            <article className={`metaCard metaCardTag ${isSidebar && 'metaCardSidebar'}`}>
                <div className={'cardMedia'}>
                    <Link href={metaUrl} className='tagCardLink' title={title as string}>
                        {!!meta?.imageUrl ?
                            <CardImageRendererUseClient imageUrl={meta?.imageUrl}
                                                        isNextIImageAllowed={isNextIImageAllowed}
                                                        mediaAlt={title}
                                                        index={index}/> :
                            <TextToCanvasImage title={title}
                                               numberOfCardsPerRowInMobile={1}/>
                        }
                    </Link>
                </div>
                <div className={`cardInfo`}>
                    <CardTitle title={title} url={`/tag/${meta?._id}`}/>
                </div>
            </article>
        )
    };
export default TagCard
