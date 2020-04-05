import React, { useEffect, useState, useContext } from 'react';
import Switch from "react-switch";
import './IsInSlideShow.scss';


const IsInSlideShow = props => {
    return (
        <div className='IsInSlideShow VideoInformationSection'>
            <div className="title">
                <p>Slide Show</p>
            </div>
            <div className="editor ">
                <Switch name='inSlideShow' onChange={ e => props.onChangeHandler(e) } checked={ props.postData.inSlideShow }/>
            </div>
        </div>
    );
};
export default IsInSlideShow;