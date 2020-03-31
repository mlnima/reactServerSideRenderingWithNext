import React, { useEffect, useState, useContext, useRef } from 'react';

const CategoriesSidebar = props => {
    const [ state, setState ] = useState({
        style:{
            gridArea:'sidebar'
        }
    });
    useEffect(() => {
        console.log(props )

    }, []);

    if (props.isActive) {
        return (
            <div style={state.style} className='categories-sidebar'>
                I am categories sidebar
            </div>
        );
    } else return null;
};
export default CategoriesSidebar;
