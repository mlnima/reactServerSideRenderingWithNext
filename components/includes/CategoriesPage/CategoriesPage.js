import React, {useEffect, useState, useContext, useRef} from 'react';
import CategoriesRenderer from "./Components/CategoriesRenderer/CategoriesRenderer";

const CategoriesPage = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='categories'>
             <CategoriesRenderer categories={props.categories} />
        </div>
    );
};
export default CategoriesPage;
