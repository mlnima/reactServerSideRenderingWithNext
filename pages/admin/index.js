import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from "../../components/layouts/AdminLayout";
import AppLayout from "../../components/layouts/AppLayout";
import Analytics from '../../components/adminIncludes/Analytics/Analytics'

const Index = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <>
            <AdminLayout>
                <div>
                    welcome to admin panel
                    <Analytics/>
                </div>
            </AdminLayout>
        </>
    );
};
export default Index;