import React, { useEffect, useState, useContext, useRef } from 'react';
import './MetaWidget.scss'
import Link from 'next/link'

const MetaWidget = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log(props.data )
    }, [props]);


    const renderMeta = props.data.map(meta=>{
        return (

                <Link href={`posts?${meta.type}=${meta.name}`}><a className='meta-widget-item'>{meta.name}</a></Link>

        )
    })
    return (
        <div className='meta-widget'>
            {renderMeta}
        </div>
    );
};
export default MetaWidget;
