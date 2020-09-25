import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";

const PostDescription = props => {
    const contextData = useContext(AppContext);

    if (props.editMode) {
        return (
            <div className='edit-mode'>
                <p className='editModeText'>Description :</p>
                <textarea value={props.description}/>
            </div>
        )
    } else {
        return (
            <p style={{color: contextData.siteDesign.postDescriptionTextColorColor || 'white'}}
               className="description">{props.post.translations ? props.post.translations[contextData.state.activeLanguage] ? props.post.translations[contextData.state.activeLanguage].description || props.post.description : props.post.description : props.post.description}</p>
        )
    }
};
export default PostDescription;
