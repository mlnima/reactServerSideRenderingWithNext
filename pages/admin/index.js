import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from "../../components/layouts/AdminLayout";

const Index = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <>
            <AdminLayout>
                <div>
                    welcome to admin nima
                </div>
            </AdminLayout>
        </>
    );
};
export default Index;