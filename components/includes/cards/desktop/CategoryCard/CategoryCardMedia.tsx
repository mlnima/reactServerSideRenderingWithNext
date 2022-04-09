import {FC} from 'react';
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";
import styled from "styled-components";

const CategoryCardMediaStyledDiv = styled.div`
  position: relative;
`

interface CategoryCardMediaPropTypes {
    imageUrl: string,
    mediaAlt: string,
    index?: number
}

const CategoryCardMedia: FC<CategoryCardMediaPropTypes> = ({imageUrl, mediaAlt, index}) => {

    return (
        <CategoryCardMediaStyledDiv>
            <CardImageRenderer imageUrl={imageUrl}
                               mediaAlt={mediaAlt}
                               index={index}
            />
        </CategoryCardMediaStyledDiv>

    );

};

export default CategoryCardMedia;

