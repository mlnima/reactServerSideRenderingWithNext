import {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "custom-util";
import CardTitle from "@components/cards/asset/CardTitle/CardTitle";
import './ActorCard.styles.scss'
import CardImageRendererUseClient from '@components/cards/asset/CardImageRenderer/CardImageRendererUseClient'


interface ActorCardPropTypes {
    meta: Meta,
    index: number,
    isSidebar?: boolean,
    actorUrl: string,
    isNextIImageAllowed: boolean
}

const ActorCard: FC<ActorCardPropTypes> =
    ({
         meta,
         index,
         isSidebar,
         actorUrl,
         isNextIImageAllowed=false
     }) => {

        const actorName = capitalizeFirstLetter(meta?.name)

        return (
            <article className={`actor-card metaCard ${isSidebar && 'actorCardSidebar'}`}>
                <div className={`card-info`}>
                    <CardTitle title={actorName} url={`/actor/${meta?._id}`}/>
                </div>
                <Link href={actorUrl} className='actor-card-link' title={actorName as string}>
                    <CardImageRendererUseClient imageUrl={meta.imageUrl}
                                                mediaAlt={actorName}
                                                isNextIImageAllowed={isNextIImageAllowed}
                                                index={index}
                                                objectFit={'cover'}
                                                aspectRatio={'3/4'}/>
                </Link>
            </article>
        )
    };
export default ActorCard
