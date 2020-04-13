import React, { useEffect, useState, useContext, useRef } from 'react';
import './UploadedPopView.scss'

const UploadedPopView = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onCloseHandler = () => {

    }

    if (props.clickedItem) {
        return (
            <div className='uploaded-pop-view'>
                <button className='closeBtn' onClick={()=>props.setStateHandler('clickedItem','')}>X</button>
                <div className='gallery-pop-view-content'>
                    clickedItem
                </div>
            </div>
        );
    } else return null

};
export default UploadedPopView;
