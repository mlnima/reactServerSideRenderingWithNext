import React from 'react';
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements';
import Link from 'next/link'

const CategoryElement = props => {

    return (

            <Link key={props.name} href={`/posts?category=${props.name}`}>
                <a className='category-item'>
                    <RenderImageForMetaElements { ...props }/>
                    <div className='category-item-data'>
                        <p>{ props.name }</p>
                        <p>{ props.count } item</p>
                    </div>
                </a>
            </Link>
    );
};
export default CategoryElement;
