import {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import dynamic from "next/dynamic";
import CardTitle from "../asset/CardTitle/CardTitle";

const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer/CardImageRenderer'))

interface ActorCardPropTypes {
    meta: Meta,
    index: number,
    numberOfCardsPerRowInMobile: number
}

interface ActorCardStylePropTypes {
    numberOfCardsPerRowInMobile: number,
    cardWidth: number
}

const ActorCard: FC<ActorCardPropTypes> =
    ({
         meta,
         index,
         numberOfCardsPerRowInMobile
     }) => {

        const actorName = capitalizeFirstLetter(meta?.name)

        return (
            <article className={'actor-card aspect-square w-1/${numberOfCardsPerRowInMobile} md:w-64'}>
                <Link href={`/actor/${meta?._id}`} className='actor-card-link' title={actorName as string}>
                        {!!meta.imageUrl ?
                            <CardImageRenderer imageUrl={meta.imageUrl}
                                               mediaAlt={actorName}
                                               index={index}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                               objectFit={'cover'}
                                               aspectRatio={'square'}/> :
                            <TextToCanvasImage title={actorName}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                               aspectRatio={'square'}/>
                        }

                </Link>
                <CardTitle title={actorName} url={`/actor/${meta?._id}`} />
            </article>
        )
    };
export default ActorCard
