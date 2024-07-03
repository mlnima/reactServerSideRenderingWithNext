import {FC} from "react";
import {Meta} from "typescript-types";
import Link from "next/link";
import {capitalizeFirstLetter} from "@repo/shared-util";
import CardTitle from "@components/cards/asset/CardTitle/CardTitle";
import './ActorCard.scss'
import CardImageRendererUseClient from '@components/cards/asset/CardImageRenderer/CardImageRendererUseClient'

interface ActorCardPropTypes {
    meta: Meta,
    index: number,
    isSidebar?: boolean,
    actorUrl: string,
    isNextImageAllowed: boolean
}

const ActorCard: FC<ActorCardPropTypes> =
    ({
         meta,
         index,
         isSidebar,
         actorUrl,
         isNextImageAllowed=false
     }) => {

        return (
            <article className={`actor-card metaCard ${isSidebar ? 'actorCardSidebar' : ''}`}>
                <div className={`card-info`}>
                    <CardTitle title={capitalizeFirstLetter(meta?.name)} url={`/actor/${meta?._id}`}/>
                </div>
                <Link href={actorUrl} className='actor-card-link' title={meta?.name as string}>
                    <CardImageRendererUseClient imageUrl={meta.imageUrl}
                                                key={meta?._id}
                                                metaId={meta?._id}
                                                mediaAlt={meta?.name}
                                                overlayShadow
                                                isNextImageAllowed={isNextImageAllowed}
                                                index={index}
                                                objectFit={'cover'}
                                                aspectRatio={'3/4'}/>
                </Link>
            </article>
        )
    };
export default ActorCard
