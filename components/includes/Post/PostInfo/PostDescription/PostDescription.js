import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import 'react-quill/dist/quill.snow.css';
import styled from "styled-components";
let StyledDiv = styled.div`${props => props.stylesData}`;

const PostDescription = ({description,translations}) => {
    const contextData = useContext(AppContext);
    const descriptionElement = useRef(null);

    const [state, setState] = useState({
        description: ''
    })

    useEffect(() => {
        if (description){
            setState({
                ...state,
                description: translations ? translations[contextData.state.activeLanguage] ? translations[contextData.state.activeLanguage].description || description : description : description
            })
        }
    }, [description]);

    useEffect(() => {
        if (descriptionElement){
            if (state.description.includes('</')){
                descriptionElement.current.innerHTML = state.description
            }else {
                descriptionElement.current.innerHTML = `<p>${state.description}</p>`
            }
        }
    }, [state.description]);

    return (
        <StyledDiv ref={descriptionElement} className="description"/>
    )
};
export default PostDescription;
