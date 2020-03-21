import React from 'react';

const RenderImageForMetaElements = props => {

    if (props.imageUrl){
        return (
            <img src={props.imageUrl}/>
        )
    }else if (!props.imageUrl&& props.noImageUrl){
        return (
            <img src={props.noImageUrl}/>
        )
    }else{
        return (
            <img src='/static/images/noImage/no-image-available.png'/>
        )
    }
};
export default RenderImageForMetaElements;
