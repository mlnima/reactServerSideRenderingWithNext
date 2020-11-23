import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from "../../components/layouts/AdminLayout";
import Analytics from '../../components/adminIncludes/Analytics/Analytics'

const Index = () => {

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