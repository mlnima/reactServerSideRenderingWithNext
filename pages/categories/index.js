import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from "../../components/layouts/AppLayout";

const Categories = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AppLayout>
            <div className='Categories'>
                Categories
            </div>
        </AppLayout>
    );
};
export default Categories;
