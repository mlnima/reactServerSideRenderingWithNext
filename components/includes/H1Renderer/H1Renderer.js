import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext'

const H1Renderer = props => {
    const contextData = useContext(AppContext);

    const [ state, setState ] = useState({
        style:{}
    });


    useEffect(() => {
        if (contextData.siteDesign.homePageH1){
            setState({
                ...state,
                style:{
                    color:contextData.siteDesign.homePageH1
                }
            })
        }
    }, [contextData.siteDesign]);

    if (props.text){
        return (
            <h1 style={state.style}>{props.text}</h1>
        );
    }else return null

};
export default H1Renderer;


//createObjectURL