import React, {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import CardTitle from "@components/cards/asset/CardTitle/CardTitle";
import '../metaCard.styles.scss'

const TextToCanvasImage = dynamic(() => import('@components/cards/asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRendererUseClient = dynamic(() => import('@components/cards/asset/CardImageRenderer/CardImageRendererUseClient'))

interface CategoryCardPropTypes {
    meta: Meta,
    index: number,
    locale: string,
    isSidebar?: boolean,
    metaUrl: string,
    isNextIImageAllowed?: boolean,
}

const CategoryCard: FC<CategoryCardPropTypes> =
    ({
         meta,
         index,
         locale,
         metaUrl,
         isSidebar,
         isNextIImageAllowed = false
     }) => {

        const title = capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)

        return (
            <article className={`category-card metaCard ${isSidebar && 'metaCardSidebar'}`}>
                <div className={'card-media'}>
                    <Link href={metaUrl} className='category-card-link' title={title}>
                        {!!meta.imageUrl ?
                            <CardImageRendererUseClient imageUrl={meta.imageUrl}
                                                        isNextIImageAllowed={isNextIImageAllowed}
                                                        mediaAlt={title}
                                                        index={index}/> :
                            <TextToCanvasImage title={title}
                                               numberOfCardsPerRowInMobile={1}/>
                        }
                    </Link>
                </div>
                <div className={`card-info`}>
                    <CardTitle title={title} url={`/category/${meta?._id}`}/>
                </div>
            </article>
        )
    };

export default CategoryCard
