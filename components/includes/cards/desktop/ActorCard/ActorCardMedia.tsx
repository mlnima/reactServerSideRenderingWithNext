import {FC, useMemo} from 'react';
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

interface ActorCardMediaPropTypes {
    imageUrl: string,
    mediaAlt: string,
    index?:number
}

const ActorCardMedia:FC<ActorCardMediaPropTypes> = ({mediaAlt, imageUrl,index} ) => {

    return (
        <CardImageRenderer mediaAlt={mediaAlt}
                           cardWidth={140}
                           cardHeight={140}
                           objectFitValue={'cover'}
                           strictImageSize={true}
                           imageUrl={imageUrl}
                           index={index}
        />
    );

};

export default ActorCardMedia;

