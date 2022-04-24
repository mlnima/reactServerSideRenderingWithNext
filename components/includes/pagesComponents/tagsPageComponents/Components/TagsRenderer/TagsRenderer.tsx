import React, {FC} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import TagCard from "@components/includes/cards/TagCard";

interface TagsRenderContentStyledDivPropTypes {
    postsPerRawForMobile: number,
    cardWidth: number,
    cardsCustomStyle: string
}

let TagsRendererStyledDiv = styled.div`
  padding: 20px 0;
  display: grid;
  width: 100%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({postsPerRawForMobile}: TagsRenderContentStyledDivPropTypes) => `${96 / postsPerRawForMobile}`}vw, 2fr));


  @media only screen and (min-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: TagsRenderContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
  }
  ${({cardsCustomStyle}:TagsRenderContentStyledDivPropTypes)=>cardsCustomStyle||''}
`

interface TagsRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],
    },
    cardWidthDesktop: number,
}

const TagsRenderer: FC<TagsRendererPropTypes> = ({uniqueData}) => {

    const {tagsMetas, postsPerRawForMobile, cardWidth,cardsCustomStyle} = useSelector(({settings, posts}: StoreTypes) => {
        return {
            tagsMetas: uniqueData?.metaData ? uniqueData?.metaData : posts?.tagsMetas,
            postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
            cardsCustomStyle:settings.design.cardsCustomStyle|| '',
            cardWidth: settings?.design?.cardWidthDesktop || 255,
        }
    })

    return (
        <TagsRendererStyledDiv className='tags-block'
                               cardWidth={cardWidth}
                               cardsCustomStyle={cardsCustomStyle}
                               postsPerRawForMobile={postsPerRawForMobile}>

            {tagsMetas.map((tag, index) => {
                return (
                    <TagCard key={tag._id}
                             tag={tag}
                             cardWidth={cardWidth}
                             postsPerRawForMobile={postsPerRawForMobile}
                             index={index}/>
                )
            })}

        </TagsRendererStyledDiv>
    );
};
export default TagsRenderer;
