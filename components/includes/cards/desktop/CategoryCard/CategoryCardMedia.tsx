import {FC} from 'react';
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

interface CategoryCardMediaPropTypes {
    cardWidth: number,
    imageUrl: string,
    mediaAlt: string,
}

const CategoryCardMedia: FC<CategoryCardMediaPropTypes> = ({cardWidth, imageUrl, mediaAlt,}) => {
        return (
            <CardImageRenderer imageUrl={imageUrl}
                               mediaAlt={mediaAlt}
                               cardWidth={cardWidth}
                               cardHeight={cardWidth / 1.777}
            />
        );
    };
export default CategoryCardMedia;

