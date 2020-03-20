import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from "../../../components/layouts/AppLayout";

const categories = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log( props)
    }, []);
    return (
        <AppLayout>
            <div className='categories'>
                metaPage
            </div>
        </AppLayout>
    );
};

categories.getInitialProps = async ({ pathname, query, req, res, err }) =>{

    return {query}
}
export default categories;
