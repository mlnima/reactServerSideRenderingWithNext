import React from 'react';
import Link from 'next/link'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFolder, faTag} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";

const MetaWidget = props => {
    const renderMeta = (props.metaData || []).map(meta => {
        const path = `/posts?content=${meta._id}`;
        const icon = meta.type === 'categories' ? faFolder
            : meta.type === 'tags' ? faTag
                : meta.type === 'actors' ? faStar
                    : faTag

        return (
            <div key={meta.name} className='meta-child-element' >
                <FontAwesomeIcon icon={icon} className='meta-data-logo'/>
                <Link href={path} key={meta.name}>
                    <a className='meta-widget-item' >  {meta.name}</a>
                </Link>
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
