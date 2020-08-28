import React, { useEffect, useState, useContext } from 'react';
import './IsInSlideShow.scss';

const IsInSlideShow = props => {
    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Slide Show</p>
                </div>
                <div className="editor ">
                    <select name='inSlideShow' onChange={ e => props.onChangeHandler(e) } defaultValue={ props.postData.inSlideShow }>
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </select>
                </div>
            </div>
        );
    }else return null

};
export default IsInSlideShow;