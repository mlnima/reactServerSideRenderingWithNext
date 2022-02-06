import React, {useMemo} from 'react';
import TagCard from "../../../../cards/desktop/TagCard/TagCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import cardSizeCalculator from "../../../../../../_variables/util/cardSizeCalculator";

let TagsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const TagsRenderer = ({metaData,postElementSize}) => {
    const dispatch = useDispatch()
    const tagsMetas = metaData ? metaData: useSelector(store => store?.posts.tagsMetas)
    const elementSize = postElementSize ? postElementSize : useSelector(store => store?.settings?.design?.postElementSize);
    const cardWidth = useMemo(()=>cardSizeCalculator(elementSize),[])

    return (
        <TagsRendererStyledDiv className='tags-block'>
            {tagsMetas.map((tag,index) => {
                    return <TagCard onActivateLoadingHandler={()=> dispatch(setLoading(true))}
                                    key={tag._id}
                                    cardWidth={cardWidth}
                                    tag={tag}
                                    postElementSize={elementSize}
                    />
                })
            }
        </TagsRendererStyledDiv>
    );
};
export default TagsRenderer;
