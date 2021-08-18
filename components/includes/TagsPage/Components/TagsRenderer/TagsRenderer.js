import React, {useEffect, useState, useContext, useRef} from 'react';
import CategoryCard from "../../../CategoriesPage/Components/CategoryCard/CategoryCard";
import _ from "lodash";
import TagCard from "../TagCard/TagCard";

const TagsRenderer = ({postElementSize,metaData, tags}) => {
    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255
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
                    return <TagCard key={_.uniqueId('tag_')} cardWidth={cardWidth} tag={tag} postElementSize={postElementSize}/>
                })
            }
        </div>
    );
};
export default TagsRenderer;
