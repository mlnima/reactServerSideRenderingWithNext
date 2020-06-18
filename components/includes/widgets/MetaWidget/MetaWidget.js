import React, { useEffect, useState } from 'react';
import './MetaWidget.scss'
import Link from 'next/link'

const MetaWidget = props => {
    const [ state, setState ] = useState({
        style: {
            color: 'white',
            backgroundColor: 'red'
        }
    });

    useEffect(() => {
        setState({
            ...state,
            style:{
                color: props.metaTextColor ||'white',
                backgroundColor: props.metaBackgroundColor ||'red'
            }

        })
    }, [ props ]);



    const renderMeta = (props.metaData || []).map(meta => {
        return (
            <Link  key={ meta.name } href={ `posts?${ meta.type }=${ meta.name }` }><a className='meta-widget-item' style={ state.style } >{ meta.name }</a></Link>
        )
    })
    useEffect(() => {
        console.log(props)
    }, [ props ]);
    return (
        <div className='meta-widget'>
            { renderMeta }
        </div>
    );
};
export default MetaWidget;
