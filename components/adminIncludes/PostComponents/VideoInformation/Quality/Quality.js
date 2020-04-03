import React, { useEffect, useState, useContext,useRef } from 'react';
import { AppContext } from "../../../../../context/AppContext";

const Quality = props => {
    const contextData = useContext(AppContext);

    const qualityElement = useRef(null)
    const [ state, setState ] = useState({
        defaultValue: '240p'
    });
    useEffect(() => {
        if (qualityElement.current){
            qualityElement.current.value = contextData.editingPostData.quality || '720p'
        }
    }, [ contextData.editingPostData.quality ]);


    const onChangeHandler =e=>{
        contextData.dispatchEditingPostData({
            ...contextData.editingPostData,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div className='Quality VideoInformationSection'>
            <div className="title">
                <p>Quality</p>
            </div>
            <div className="editor">
                <div className="option">
                    <select ref={qualityElement}  name='quality'  onChange={ e => onChangeHandler(e) }>
                        <option value='240p'>240p</option>
                        <option value='360p'>360p</option>
                        <option value='480p'>480p</option>
                        <option value='720p'>720p</option>
                        <option value='1080p'>1080p</option>
                        <option value='1440p'>1440p</option>
                        <option value='2060p'>2060p</option>
                        <option value='4120p'>4120p</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
export default Quality;

