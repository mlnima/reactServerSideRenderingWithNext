import React, { useEffect, useState, useContext } from 'react';
import Switch from "react-switch";
import './IsInSlideShow.scss';
import { AppContext } from "../../../../../context/AppContext";

const IsInSlideShow = props => {
    return (
        <div className='IsInSlideShow VideoInformationSection'>
            <div className="title">
                <p>Slide Show</p>
            </div>
            <div className="editor ">
                <Switch onChange={ e => props.onChangeHandler(e) } checked={ props.isChecked }/>
            </div>
        </div>
    );
};
export default IsInSlideShow;