import React from 'react';
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements';

const CategoryElement = props => {

    return (
        <div className='category-item'>
            <RenderImageForMetaElements {...props}/>
            <div className='category-item-data'>
                <p>{ props.name }</p>
                <p>{ props.count } item</p>
            </div>
        </div>
    );
};
export default CategoryElement;
