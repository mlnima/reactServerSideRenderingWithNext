import React, { useEffect, useState, useContext, useRef } from 'react';

const VideoWidgetModel = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='VideoWidgetModel'>
            <input className='widgetTitle' placeholder='widgetTitle'/>
            <input className='widgetCategories' placeholder='widgetCategories'/>
            <input className='widgetTags' placeholder='widgetTags'/>
            <input className='pathToRedirect' placeholder='pathToRedirect'/>
            <input type='number' className='count' placeholder='count'/>
            <span>Pagination:</span>
            <select>
                <option value={false}>false</option>
                <option value={true}>true</option>
            </select>
        </div>
    );
};
export default VideoWidgetModel;
