import React, {FC} from 'react';
import ActorCard from '@components/cards/cardsComponents/ActorCard/ActorCard';
import { Meta} from "typescript-types";
import './ActorsCardsRenderer.styles.scss'

interface MetasCardsRendererPropTypes {
    metas?: Meta[],
    isSidebar?:boolean
}

const ActorsCardsRenderer: FC<MetasCardsRendererPropTypes> = ({metas,isSidebar}) => {

    return (
        <div className={`actorsCardsWrapper${isSidebar ? ' Sidebar' : ''}`}>
            {metas?.map((meta, index) => {
                return (
                    <ActorCard key={meta._id}
                               index={index}
                               isSidebar={isSidebar}
                               meta={meta}/>
                )
            })}
        </div>
    );
};
export default ActorsCardsRenderer;
