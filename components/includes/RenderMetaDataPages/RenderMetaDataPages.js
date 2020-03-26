import React, { useEffect, useState, useContext, useRef } from 'react';

const RenderMetaDataPages = props => {
    const [ state, setState ] = useState({
        pageType: ''
    });
    useEffect(() => {
        console.log(props)
    }, []);

    useEffect(() => {

    }, [ props ]);
    return (
        <div className='RenderMetaDataPages'>

        </div>
    );
};
export default RenderMetaDataPages;
