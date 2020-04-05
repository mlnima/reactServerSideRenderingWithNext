import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../../../../context/AppContext";
import Link from 'next/link'

const FilterStatusBtn = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        buttons: [ 'all', 'published', 'draft', 'trash','pending' ]
    });
    useEffect(() => {
    }, []);

    const onClickHandler = e => {
        let status = e.target.name;
        contextData.dispatchAdminPostsData(adminPostsData => ({
                ...adminPostsData,
                status,
                pageNo: 1,
                author: 'all'
            }))
    };

    let clickOnMineHandler = () => {
        // contextData.setPostsData({
        //     ...contextData.postsData,
        //     author:contextData.adminData._id
        // })
    };

    return (
        <div className='FilterStatusBtn'>
            {/*<button key='all' className='all' name='all' onClick={ e => onClickHandler(e) }>All</button>*/}
            {/*<button key='published' className='published' name='published' onClick={ e => onClickHandler(e) }>Published</button>*/}
            {/*<button key='draft' className='draft' name='draft' onClick={ e => onClickHandler(e) }>Draft</button>*/}
            {/*<button key='trash' className='trash' name='trash' onClick={ e => onClickHandler(e) }>Trash</button>*/}
            <Link href={ {
                pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'all' }
            } }><a className='adminPaginationActionLink'>All</a></Link>
            <Link href={ {
                pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'draft' }
            } }><a className='adminPaginationActionLink'>Draft</a></Link>
            <Link href={ {
                pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'published' }
            } }><a className='adminPaginationActionLink'>Published</a></Link>
            <Link href={ {
                pathname: props.pathname || props.router.pathname, query: { ...props.query, status: 'trash' }
            } }><a className='adminPaginationActionLink'>Trash</a></Link>
        </div>
    );
};
export default FilterStatusBtn;