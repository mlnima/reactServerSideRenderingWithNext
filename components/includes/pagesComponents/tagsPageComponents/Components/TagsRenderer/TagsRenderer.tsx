import React, {FC} from 'react';
import styled from "styled-components";
import {setLoading} from "@store/clientActions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import TagCard from "@components/includes/cards/TagCard";

interface TagsRenderContentStyledDivPropTypes {
    postsPerRawForMobile: number,
    cardWidth: number,
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
`

interface TagsRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],
    },
    cardWidthDesktop: number,
}

const TagsRenderer: FC<TagsRendererPropTypes> = ({uniqueData}) => {
    const dispatch = useDispatch()

    const {tagsMetas, postsPerRawForMobile, cardWidth} = useSelector(({settings, posts}: StoreTypes) => {
        return {
            tagsMetas: uniqueData?.metaData ? uniqueData?.metaData : posts?.tagsMetas,
            postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
            cardWidth: settings?.design?.cardWidthDesktop || 255,
        }
    })

    return (
        <TagsRendererStyledDiv className='tags-block' cardWidth={cardWidth} postsPerRawForMobile={postsPerRawForMobile}>

            {tagsMetas.map((tag, index) => {
                return (
                    <TagCard key={tag._id}
                             tag={tag}
                             cardWidth={cardWidth}
                             onActivateLoadingHandler={() => dispatch(setLoading(true))}
                             postsPerRawForMobile={postsPerRawForMobile}
                             index={index}/>
                )
            })}

        </TagsRendererStyledDiv>
    );
};
export default TagsRenderer;


// if (isMobile){
//     return <MobileTagCard tag={tag}
//                           key={tag._id}
//                           onActivateLoadingHandler={() => dispatch(setLoading(true))}
//                           index={index}
//                           isAppleMobileDevice={isAppleMobileDevice}
//     />
//
// }else{
//     return (<TagCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
//                      key={tag._id}
//                      tag={tag}
//                      index={index}
//                      cardWidth={cardWidth}
//     />)
// }