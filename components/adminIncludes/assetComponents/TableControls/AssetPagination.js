import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link'
import withRouter from 'next/dist/client/with-router'
import NextSVG from '../../../../static/images/fontawesome/caret-right-solid.svg'
import PreviousSVG from '../../../../static/images/fontawesome/caret-left-solid.svg'
import FirstSVG from '../../../../static/images/fontawesome/backward-solid.svg'
import LastSVG from '../../../../static/images/fontawesome/forward-solid.svg'

const AssetPagination = props => {
    const manualPage = useRef(null)
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    return (
        <div className='asset-page-pagination'>
            <label>{props.finalPageData.totalCount}</label>
            <Link  href={ {
                pathname: props.pathname || props.router.pathname, query: { ...props.router.query, page: 1 }
            } }><a className='asset-page-pagination-item'>{'<<'} </a></Link>
            <Link  href={ {
                pathname: props.pathname || props.router.pathname, query: { ...props.router.query, page: props.router.query.page ? parseInt(props.router.query.page) -1: 1 }
            } }><a className='asset-page-pagination-item'>{'<'}  </a></Link>
            <input ref={manualPage} placeholder={props.router.query.page?props.router.query.page:1} type='number' className='asset-page-pagination-item-input'/>
            <button className='asset-page-pagination-item-btn' onClick={()=>{props.router.push({pathname:props.router.pathname,query:{...props.router.query,page:manualPage.current.value}})}}>Go</button>
            <Link  href={ {
                pathname: props.pathname || props.router.pathname, query: { ...props.router.query, page: props.router.query.page ? parseInt(props.router.query.page) +1: 2 }
            } }><a className='asset-page-pagination-item'>{'>'} </a></Link>
            <Link  href={ {
                pathname: props.pathname || props.router.pathname,
                query: {
                    ...props.router.query, page:Math.ceil(parseInt(props.finalPageData.totalCount) /
                        (props.router.query.size?parseInt(props.router.query.size):30))

                }
            } }><a className='asset-page-pagination-item'>{'>>'}  </a></Link>
        </div>
    );
};
export default withRouter(AssetPagination);
