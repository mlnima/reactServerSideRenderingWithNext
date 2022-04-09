import React, {FC} from 'react';
import styled from "styled-components";
import {setLoading} from "@store/clientActions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
const TagCard = dynamic(() => import('@components/includes/cards/desktop/TagCard/TagCard'));
const MobileTagCard = dynamic(() => import('@components/includes/cards/mobile/MobileTagCard/MobileTagCard'));

interface TagsRenderContentStyledDivPropTypes{
    postsPerRawForMobile:number,
    cardWidth:number,
}

let TagsRendererStyledDiv = styled.div`
  display: grid;
  width: 98%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat( auto-fill, minmax(${({postsPerRawForMobile}:TagsRenderContentStyledDivPropTypes)=>`${96/postsPerRawForMobile}`}vw, 2fr) );


  @media only screen and (min-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: repeat( auto-fill, minmax(${({cardWidth}:TagsRenderContentStyledDivPropTypes)=>`${cardWidth}px`}, 1fr) );
  }
`

interface TagsRendererPropTypes {
    uniqueData?:{
        metaData?:Meta[],
    },
    cardWidthDesktop:  number,
}

const TagsRenderer: FC<TagsRendererPropTypes> = ({ cardWidthDesktop,uniqueData}) => {
    const dispatch = useDispatch()

    const {tagsMetas,postsPerRawForMobile,isMobile,cardWidth,isAppleMobileDevice} = useSelector(({settings,posts}: StoreTypes)=>{
        const elementSize = cardWidthDesktop ? cardWidthDesktop : settings?.design?.cardWidthDesktop || 255;
        return{
            tagsMetas: uniqueData?.metaData ? uniqueData?.metaData : posts?.tagsMetas,
            postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
            isMobile: settings?.isMobile,
            cardWidth: settings?.design?.cardWidthDesktop || 255,
            isAppleMobileDevice:settings?.isAppleMobileDevice
        }
    })

    return (
        <TagsRendererStyledDiv className='tags-block'
                               cardWidth={cardWidth}
                               postsPerRawForMobile={postsPerRawForMobile}>

            {tagsMetas.map((tag, index) => {

                if (isMobile){
                    return <MobileTagCard tag={tag}
                                          key={tag._id}
                                          onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                          index={index}
                                          isAppleMobileDevice={isAppleMobileDevice}
                    />

                }else{
                    return <TagCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                    key={tag._id}
                                    tag={tag}
                                    index={index}
                    />
                }
            })
            }

        </TagsRendererStyledDiv>
    );
};
export default TagsRenderer;
