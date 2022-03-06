import {FC} from 'react';
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

interface TagCardMediaPropTypes{
    cardWidth:number;
    imageUrl:string;
    mediaAlt:string;
}

const TagCardMedia:FC<TagCardMediaPropTypes> = ({cardWidth,imageUrl,mediaAlt}) => {
console.log(imageUrl)
    return (
        <CardImageRenderer imageUrl={imageUrl}
                           mediaAlt={mediaAlt}
                           cardWidth={cardWidth}
                           cardHeight={cardWidth / 1.777}
        />
    );

};
export default TagCardMedia;
