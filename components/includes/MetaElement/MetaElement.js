import React from 'react';
import Link from 'next/link'
import RenderImageForMetaElements from '../RenderImageForMetaElements/RenderImageForMetaElements'
import './MetaElement.scss'

const MetaElement = props => {
console.log( props)
    if (props.count > 0) {
        return (
            <Link key={ props.name } href={ `/posts?${ props.metaType }=${ props.name }` }>
                <a className='meta-item'>
                    <RenderImageForMetaElements { ...props }/>
                    <div className='meta-item-data'>
                        <p>{ props.name }</p>
                        <p>{ props.count } item</p>
                    </div>
                </a>
            </Link>
        );
    } else return null

};
export default MetaElement;
