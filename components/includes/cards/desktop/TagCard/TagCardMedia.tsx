import {FC} from 'react';
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

interface TagCardMediaPropTypes{
    cardWidth:number,
    imageUrl:string,
    mediaAlt:string,
    index?:number
}

const TagCardMedia:FC<TagCardMediaPropTypes> = ({cardWidth,imageUrl,mediaAlt,index}) => {

    return (
        <CardImageRenderer imageUrl={imageUrl}
                           mediaAlt={mediaAlt}
                           cardWidth={cardWidth}
                           cardHeight={cardWidth / 1.777}
                           index={index}
        />
    );

};
export default TagCardMedia;
