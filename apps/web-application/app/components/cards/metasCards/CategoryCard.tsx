import React, {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import CardTitle from "../asset/CardTitle/CardTitle";

const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer/CardImageRenderer'))

interface CategoryCardPropTypes {
    meta: Meta,
    index: number,
    numberOfCardsPerRowInMobile: number,
    locale: string,
}

const CategoryCard: FC<CategoryCardPropTypes> =
    ({
         meta,
         index,
         numberOfCardsPerRowInMobile,
         locale,
     }) => {

        const title = capitalizeFirstLetter(locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            meta?.name :
            meta?.translations?.[locale]?.name || meta?.name)

        return (
            <article className={`category-card w-1/${numberOfCardsPerRowInMobile} md:w-64`}>
                <div className={'card-media relative text-secondary-text-color'}>
                    <Link href={`/category/${meta?._id}`} className='category-card-link' title={title}>
                        {!!meta.imageUrl ?
                            <CardImageRenderer imageUrl={meta.imageUrl}
                                               mediaAlt={title}
                                               index={index}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}/> :
                            <TextToCanvasImage title={title}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}/>
                        }
                    </Link>
                </div>
                <CardTitle title={title} url={`/category/${meta?._id}`}/>
            </article>
        )
    };

export default CategoryCard
