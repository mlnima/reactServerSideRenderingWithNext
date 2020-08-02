import React, { useEffect, useState, useContext } from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";

const DownloadLink = props => {
    const contextData = useContext(AppContext);

    if (props.downloadLink) {
        return (
            <div id='download-url'>
                <a style={{
                    color:contextData.siteDesign.postDownloadBtnTextColor||'white',
                    backgroundColor:contextData.siteDesign.postDownloadBtnBackgroundColor||'red',
                }} href={ props.downloadLink } target='_blank' className='download-link'>Download</a>
            </div>

        );
    } else return null

};
export default DownloadLink;