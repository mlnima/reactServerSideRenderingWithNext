import React from 'react';
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements'

const MyComponent = props => {

    return (
        <div className='tag-item'>
            <RenderImageForMetaElements {...props}/>
            <div className='tag-item-data'>
                <p>{ props.name }</p>
                <p>{ props.count } item</p>
            </div>
        </div>
    );
};
export default MyComponent;
