import React from 'react';
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements'

const ActorElement = props => {

    return (
        <div className='actor-item'>
            <RenderImageForMetaElements {...props}/>
            <div className='actor-item-data'>
                <p>{ props.name }</p>
                <p>{ props.count } Video</p>
            </div>
        </div>
    );
};
export default ActorElement;
