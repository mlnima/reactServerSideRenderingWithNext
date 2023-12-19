import React, {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import './CategoryCard.scss'

const TextToCanvasImage = dynamic(() =>
    import('@components/cards/asset/TextToCanvasImage/TextToCanvasImage'))
import CardImageRendererUseClient from '@components/cards/asset/CardImageRenderer/CardImageRendererUseClient'


interface CategoryCardPropTypes {
    meta: Meta,
    index: number,
    locale: string,
    isSidebar?: boolean,
    metaUrl: string,
    isNextImageAllowed?: boolean,
}

const CategoryCard: FC<CategoryCardPropTypes> =
    ({
         meta,
         index,
         locale,
         metaUrl,
         isSidebar,
         isNextImageAllowed = false
     }) => {

        return (
            <article className={`categoryCard ${isSidebar && 'categoryCardSidebar'}`}>

                {/*<div className={'cardMedia'}>*/}
                    <Link href={metaUrl} className='categoryCardLink'
                          title={meta?.translations?.[locale]?.name ?? meta?.name}>
                        {!!meta.imageUrl ?
                            <CardImageRendererUseClient imageUrl={meta.imageUrl}
                                                        key={meta?._id}
                                                        metaId={meta?._id}
                                                        isNextImageAllowed={isNextImageAllowed}
                                                        mediaAlt={meta?.translations?.[locale]?.name ?? meta?.name}
                                                        overlayShadow
                                                        index={index}/> :
                            <TextToCanvasImage title={
                                capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)
                            }
                                               numberOfCardsPerRowInMobile={1}/>
                        }
                        <div className={`cardInfo`}>
                            <strong className={'cardTitle'}>
                                {capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)}
                            </strong>
                            {/*<CardTitle title={title} url={`/category/${meta?._id}`}/>*/}
                        </div>
                    </Link>
                {/*</div>*/}



            </article>
        )
    };

export default CategoryCard
