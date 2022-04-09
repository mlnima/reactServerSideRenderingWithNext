import {FC} from 'react';
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";
import styled from "styled-components";

const TagCardMediaStyledDiv = styled.div`
  position: relative;
`

interface TagCardMediaPropTypes {
    imageUrl: string,
    mediaAlt: string,
    index?: number
}

const TagCardMedia: FC<TagCardMediaPropTypes> = ({imageUrl, mediaAlt, index}) => {

    return (
        <TagCardMediaStyledDiv>
            <CardImageRenderer imageUrl={imageUrl}
                               mediaAlt={mediaAlt}
                               index={index}
            />
        </TagCardMediaStyledDiv>
    );

};

export default TagCardMedia;
