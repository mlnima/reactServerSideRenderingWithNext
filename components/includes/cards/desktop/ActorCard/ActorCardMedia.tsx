import {FC} from 'react';
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

interface ActorCardMediaPropTypes {
    imageUrl: string,
    mediaAlt: string,
    index?:number
}

const ActorCardMedia:FC<ActorCardMediaPropTypes> = ({mediaAlt, imageUrl,index} ) => {

    return (
        <CardImageRenderer mediaAlt={mediaAlt} imageUrl={imageUrl} index={index}/>
    );

};

export default ActorCardMedia;

