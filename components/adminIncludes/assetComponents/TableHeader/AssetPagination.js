import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router'
const AssetPagination = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);



    return (
        <div className='asset-page-pagination'>
            <label>xxItem</label>
            <Link  href='/'><a className='asset-page-pagination-item'>first</a></Link>
            <Link  href='/'><a className='asset-page-pagination-item'>back</a></Link>
            <input className='asset-page-pagination-item-input'/>
            <button className='asset-page-pagination-item-btn'>Go</button>
            <Link  href='/'><a className='asset-page-pagination-item'>next</a></Link>
            <Link  href='/'><a className='asset-page-pagination-item'>last</a></Link>
        </div>
    );
};
export default withRouter(AssetPagination);
