import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";

import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
let StyledDiv = styled.div`${props => props.stylesData}`;

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
    }, [state.description]);


    if (props.editMode) {
        return (
            <StyledDiv  className='edit-mode'>
                <p className='editModeText'>Description :</p>
                <textarea value={props.description}/>
            </StyledDiv>
        )
    } else {
        return (
            <StyledDiv ref={descriptionElement} className="description"/>
        )
    }
};
export default PostDescription;
