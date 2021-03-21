import React from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import Link from 'next/link'



const tools = props => {

    return (
        <AdminLayout>
            <div className='adminTools'>
                <Link href='/admin/tools/terminal'><a>Terminal</a></Link>
            </div>
        </AdminLayout>
    );
};
export default tools;
