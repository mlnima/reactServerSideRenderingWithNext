import React, { useEffect, useState, useContext, useRef } from 'react';

const H1Renderer = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    if (props.text){
        return (
            <h1>{props.text}</h1>
        );
    }else return null

};
export default H1Renderer;
