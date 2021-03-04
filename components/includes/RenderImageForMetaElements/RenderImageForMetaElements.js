import React from 'react';

const RenderImageForMetaElements = props => {

    return (
        <div className='meta-page-item-image-parent'>
            <img className='meta-page-item-image' src={props.imageUrl||props.noImageUrl||'/static/images/noImage/no-image-available.png'}/>
        </div>
    )
};
export default RenderImageForMetaElements;
