import React, { useEffect, useState, useContext, useRef } from 'react';

const WidgetPagination = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log( props)
    }, []);
    if (props.pagination){
        return (
            <div className='widget-pagination'>
                1
            </div>
        );
    }else return null

};
export default WidgetPagination;
