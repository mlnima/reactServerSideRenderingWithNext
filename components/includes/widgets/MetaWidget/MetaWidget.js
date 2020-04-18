import React from 'react';
import './MetaWidget.scss'
import Link from 'next/link'

const MetaWidget = props => {

    const renderMeta = (props.metaData || []).map(meta => {
        return (
            <Link key={ meta.name } href={ `posts?${ meta.type }=${ meta.name }` }><a className='meta-widget-item'>{ meta.name }</a></Link>
        )
    })

    return (
        <div className='meta-widget'>
            { renderMeta }
        </div>
    );
};
export default MetaWidget;
