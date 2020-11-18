import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import './PostDescription.scss';
const PostDescription = props => {
    const contextData = useContext(AppContext);
    const descriptionElement = useRef(null);

    const [state, setState] = useState({
        description: ''
    })


    useEffect(() => {
        if (props.post.description){
            setState({
                ...state,
                description: props.post.translations ? props.post.translations[contextData.state.activeLanguage] ? props.post.translations[contextData.state.activeLanguage].description || props.post.description : props.post.description : props.post.description
            })
        }

    }, [props]);


    useEffect(() => {
        if (descriptionElement){
            if (state.description.includes('</')){
                descriptionElement.current.innerHTML = state.description
            }else {
                descriptionElement.current.innerHTML = `<p>${state.description}</p>`
            }
        }
    }, [state]);





    if (props.editMode) {
        return (
            <div className='edit-mode'>
                <p className='editModeText'>Description :</p>
                <textarea value={props.description}/>
            </div>
        )
    } else {
        return (
            <div ref={descriptionElement} className="description"/>
        )
    }
};
export default PostDescription;
