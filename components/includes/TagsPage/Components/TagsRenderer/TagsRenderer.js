import React, { useContext} from 'react';
import _ from "lodash";
import TagCard from "../TagCard/TagCard";
import {AppContext} from "../../../../../context/AppContext";

const TagsRenderer = ({postElementSize,metaData, tags}) => {
    const contextData = useContext(AppContext);
    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255

    const onActivateLoadingHandler = ()=>{
        contextData.dispatchState(prevState => ({
            ...prevState,
            loading:true
        }))
    }
    return (
        <div className='tags-content'>
            <style jsx>{`
              .tags-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
              }
            `}</style>
            {
                (tags || metaData || []).map(tag => {
                    return <TagCard onActivateLoadingHandler={onActivateLoadingHandler} key={_.uniqueId('tag_')} cardWidth={cardWidth} tag={tag} postElementSize={postElementSize}/>
                })
            }
        </div>
    );
};
export default TagsRenderer;
