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
    isSidebar?:boolean
}

const CategoryCard: FC<CategoryCardPropTypes> =
    ({
         meta,
         index,
         locale,
         isSidebar
     }) => {

        const title = capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name  )

        return (
            <article className={`category-card metaCard ${isSidebar && 'metaCardSidebar'}`}>
                <div className={'card-media'}>
                    <Link href={`/category/${meta?._id}`} className='category-card-link' title={title}>
                        {!!meta.imageUrl ?
                            <CardImageRendererUseClient imageUrl={meta.imageUrl}
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
