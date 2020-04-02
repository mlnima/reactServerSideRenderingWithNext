import React, { useEffect, useState, useContext, useRef } from 'react';
import Link from 'next/link';
import './AdminCommentsControl.scss';

const AdminCommentsControl = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='AdminCommentsControl'>
            <div className="status">
                <Link href={{
                    pathname:props.pathnameData,query:{...props.queryData,status:'all'}
                }}><a>All</a></Link>
                <Link href={{
                    pathname:props.pathnameData,query:{...props.queryData,status:'approved'}
                }}><a>Approved</a></Link>
                <Link href={{
                    pathname:props.pathnameData,query:{...props.queryData,status:'trash'}
                }}><a>Trash</a></Link>
                <Link href={{
                    pathname:props.pathnameData,query:{...props.queryData,status:'pending'}
                }}><a>Pending</a></Link>
            </div>

        </div>
    );
};
export default AdminCommentsControl;
