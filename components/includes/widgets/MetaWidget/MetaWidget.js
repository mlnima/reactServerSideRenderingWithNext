import React, {useEffect, useState} from 'react';
import './MetaWidget.scss'
import Link from 'next/link'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTag} from "@fortawesome/free-solid-svg-icons";
import {faFolder, faStar} from "@fortawesome/free-regular-svg-icons";

const MetaWidget = props => {
    const [state, setState] = useState({
        style: {
            color: 'white',
            backgroundColor: 'red'
        }
    });

    useEffect(() => {
        setState({
            ...state,
            style: {
                color: props.metaTextColor || 'white',
                backgroundColor: props.metaBackgroundColor || 'red'
            }

        })
    }, [props]);

    const renderMeta = (props.metaData || []).map(meta => {

        const icon = meta.type === 'categories' ? faFolder
            : meta.type === 'tags' ? faTag
                : meta.type === 'actors' ? faStar
                    : faTag


        return (
            <div key={meta.name} className='meta-child-element' style={state.style}>

                <FontAwesomeIcon icon={icon}/>
                <Link
                    // href={`posts?${meta.type}=${meta.name}`}
                    href={`${meta.type}/${meta.name}?content=${meta._id}`}
                >
                    <a className='meta-widget-item' style={state.style}>  {' ' + meta.name}</a></Link>
            </div>
        )
    })

    return (
        <div className='meta-widget'>
            {renderMeta}
        </div>
    );
};
export default MetaWidget;
