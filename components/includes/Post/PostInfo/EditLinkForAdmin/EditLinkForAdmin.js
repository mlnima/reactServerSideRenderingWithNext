import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";

const EditLinkForAdmin = ({_id}) => {
    const contextData = useContext(AppContext);
    if (contextData.userData.role === 'administrator') {
        return (
            <Link href={`/admin/post?id=${_id}`}><a className='edit-btn-admin'>Edit as Admin</a></Link>
        )
    } else return null
};
export default EditLinkForAdmin;
