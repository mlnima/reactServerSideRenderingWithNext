import React, {FC, useMemo} from 'react';
import TagCard from "../../../../cards/desktop/TagCard/TagCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import cardSizeCalculator from "../../../../../../_variables/util/cardSizeCalculator";
import {Meta, StoreTypes} from "../../../../../../_variables/TypeScriptTypes/GlobalTypes";

let TagsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface TagsRendererPropTypes {
    metaData: Meta[],
    postElementSize: string,
}

const TagsRenderer: FC<TagsRendererPropTypes> = ({metaData, postElementSize}) => {
    const dispatch = useDispatch()
    const tagsMetas = metaData ? metaData : useSelector((store: StoreTypes) => store?.posts.tagsMetas)
    const elementSize = postElementSize ? postElementSize : useSelector((store: StoreTypes) => store?.settings?.design?.postElementSize);
    const cardWidth = useMemo(() => cardSizeCalculator(elementSize), [])

    return (
        <TagsRendererStyledDiv className='tags-block'>
            {tagsMetas.map((tag, index) => {
                return <TagCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                key={tag._id}
                                cardWidth={cardWidth}
                                tag={tag}
                />
            })
            }
        </TagsRendererStyledDiv>
    );
};
export default TagsRenderer;
