import React from 'react';
import Link from "next/link";
import AdminLayout from "../../../components/layouts/AdminLayout";

const settings = props => {
    return (

            <div id='settings'>
                <Link href='/admin/settings/general'><a className='settings-page-item'>General Setting</a></Link>
            </div>

    );
};
export default settings;