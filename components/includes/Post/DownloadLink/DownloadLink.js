import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const DownloadLink = props => {
    if (props.render) {
        return (
            <div  className='download-url action-wide-button'>
                <a  href={ props.downloadLink } target='_blank' className='download-link' rel="noreferrer"><FontAwesomeIcon style={props.svgDefaultStyle} icon={faDownload} className='svg-logo-medium'/></a>
            </div>

        );
    } else return null

};
export default DownloadLink;