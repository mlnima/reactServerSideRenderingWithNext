import React from 'react';
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements'
import Link from 'next/link'

const ActorElement = props => {

    return (

            <Link key={props.name} href={`/posts?actor=${props.name}`}>
                <a className='actor-item'>
                    <RenderImageForMetaElements {...props}/>
                    <div className='actor-item-data'>
                        <p>{ props.name }</p>
                        <p>{ props.count } Video</p>
                    </div>
                </a>
            </Link>

    );
};
export default ActorElement;
