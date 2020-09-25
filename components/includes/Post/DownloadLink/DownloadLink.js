import React from 'react';
import {AppContext} from "../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import './DownloadLink.scss'
const DownloadLink = props => {

    if (props.render) {
        return (
            <div className='download-url action-wide-button'>
                <a  href={ props.downloadLink } target='_blank' className='download-link'><FontAwesomeIcon icon={faDownload} className='svg-logo-medium'/></a>
            </div>

        );
    } else return null

};
export default DownloadLink;