import React from 'react';
import Link from 'next/link'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faFolder, faTag} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import _ from "lodash";

const MetaWidget = props => {
    const renderMeta = (props.metaData || []).map(meta => {
        const path = `/posts?metaId=${meta._id}&metaName=${meta.name}&metaType=${meta.type}`;
        const asPath = `/${meta.type}/${meta.name}?metaId=${meta._id}`
        const icon = meta.type === 'categories' ? faFolder
            : meta.type === 'tags' ? faTag
                : meta.type === 'actors' ? faStar
                    : faTag

        return (
            <div key={_.uniqueId('id_')} className='meta-child-element' >
                <Link href={path} key={meta.name} as={asPath}>

                    <a className='meta-widget-item' >
                        <FontAwesomeIcon icon={icon} className='meta-data-logo'/>
                        <span className='meta-name'>{meta.name}</span>

                    </a>
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
