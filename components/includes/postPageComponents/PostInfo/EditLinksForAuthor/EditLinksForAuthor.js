import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";

const EditLinksForAuthor = props => {
    const contextData = useContext(AppContext);

    if (props.editMode && (contextData.userData._id === props.author || contextData.userData.username === props.author)) {
        return (
            <>
                <Link href={props.router ? {
                    pathname: props.router.pathname,
                    query: {...props.router.query, mode: 'view'}
                } : '/'}><a className='edit-btn-admin'>View Mode</a></Link>
                <Link href={props.router ? {
                    pathname: props.router.pathname,
                    query: {...props.router.query, mode: 'view'}
                } : '/'}><a className='edit-btn-admin'>Delete</a></Link>
            </>
        )
    } else if (!props.editMode && (contextData.userData._id === props.author || contextData.userData.username === props.author)) {
        return (
            <>
                <Link href={props.router ? {
                    pathname: props.router.pathname,
                    query: {...props.router.query, mode: 'edit'}
                } : '/'}><a className='edit-btn-admin'>Edit Mode (Beta)</a></Link>
            </>
        )
    } else return null
};
export default EditLinksForAuthor;
