import React from 'react';
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements'
import Link from 'next/link';

const MyComponent = props => {

    return (

        <Link key={ props.name } href={ `/posts?tag=${ props.name }` }>
            <a className='tag-item'>
                <RenderImageForMetaElements { ...props }/>
                <div className='tag-item-data'>
                    <p>{ props.name }</p>
                    <p>{ props.count } item</p>
                </div>
            </a>
        </Link>
    );
};
export default MyComponent;
