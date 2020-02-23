import React, { useEffect, useState, useContext } from 'react';
import Link from "next/link";

const DownloadLink = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    if (props.downloadLink) {
        return (
          <a href={ props.downloadLink } target='_blank' className='download-link'>Download</a>
        );
    } else return null

};
export default DownloadLink;