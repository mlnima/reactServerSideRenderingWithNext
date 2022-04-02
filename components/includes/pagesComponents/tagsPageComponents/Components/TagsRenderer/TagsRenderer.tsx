import React, {FC} from 'react';
import styled from "styled-components";
import {setLoading} from "@store/clientActions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import cardSizeCalculator from "@_variables/util/cardSizeCalculator";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
const TagCard = dynamic(() => import('@components/includes/cards/desktop/TagCard/TagCard'));
const MobileTagCard = dynamic(() => import('@components/includes/cards/mobile/MobileTagCard/MobileTagCard'));

let TagsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface TagsRendererPropTypes {
    uniqueData?:{
        metaData?:Meta[],
    },
    postElementSize: string,
}

const TagsRenderer: FC<TagsRendererPropTypes> = ({ postElementSize,uniqueData}) => {
    const dispatch = useDispatch()

    const tagRendererData = useSelector(({settings,posts}: StoreTypes)=>{
        const elementSize = postElementSize ? postElementSize : settings?.design?.postElementSize;
        return{
            tagsMetas: uniqueData?.metaData ? uniqueData?.metaData : posts?.tagsMetas,
            postsPerRawForMobile: settings?.identity?.postsPerRawForMobile || 2,
            isMobile: settings?.isMobile,
            cardWidth: cardSizeCalculator(elementSize)
        }
    })

    return (
        <TagsRendererStyledDiv className='tags-block'>
            {tagRendererData.tagsMetas.map((tag, index) => {

                if (tagRendererData.isMobile){
                    return <MobileTagCard postsPerRawForMobile={tagRendererData.postsPerRawForMobile}
                                          tag={tag}
                                          key={tag._id}
                                          onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                          index={index}
                    />

                }else{
                    return <TagCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                    key={tag._id}
                                    cardWidth={tagRendererData.cardWidth}
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
