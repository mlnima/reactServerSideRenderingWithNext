import {FC} from 'react';
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

interface ActorCardMediaPropTypes {
    imageUrl: string;
    mediaAlt: string;
}

const ActorCardMedia:FC<ActorCardMediaPropTypes> = ({mediaAlt, imageUrl} ) => {

    return (
        <CardImageRenderer mediaAlt={mediaAlt}
                           cardWidth={140}
                           cardHeight={140}
                           objectFitValue={'cover'}
                           strictImageSize={true}
                           imageUrl={imageUrl.includes('http') ?
                               imageUrl :
                               process.env.NEXT_PUBLIC_PRODUCTION_URL + imageUrl
                           }
        />
    );

};

export default ActorCardMedia;

