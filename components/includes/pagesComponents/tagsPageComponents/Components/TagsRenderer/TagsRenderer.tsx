import React, {FC, useMemo} from 'react';
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
  padding: 20px 0;
  display: grid;
  width: 100%;
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

const TagsRenderer: FC<TagsRendererPropTypes> = ({ uniqueData}) => {
    const dispatch = useDispatch()

    const {tagsMetas,postsPerRawForMobile,isMobileDevice,cardWidth,isAppleMobile} = useSelector(({settings,posts}: StoreTypes)=>{
        return{
            tagsMetas: uniqueData?.metaData ? uniqueData?.metaData : posts?.tagsMetas,
            postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
            isMobileDevice: settings?.isMobile,
            cardWidth: settings?.design?.cardWidthDesktop || 255,
            isAppleMobile:settings?.isAppleMobileDevice
        }
    })

    const isMobile = useMemo(() => isMobileDevice, [])
    const isAppleMobileDevice = useMemo(() => isAppleMobile, [])

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
                                    cardWidth={cardWidth}
                    />
                }
            })
            }

        </TagsRendererStyledDiv>
    );
};
export default TagsRenderer;
