import React, { useEffect, useState, useContext, useRef } from 'react';

const Text = props => {
    const spanElement = useRef(null)
    const [ state, setState ] = useState({
        textAlign: props.textAlign || 'center',
        style: {
            textAlign: props.textAlign || 'center'
        }
    });
    useEffect(() => {
        if (spanElement) {
            spanElement.current.innerHTML = props.text
        }
    }, []);
    return (
        <span className='widgetText' ref={ spanElement } style={ state.style }>
            { props.text }
        </span>
    );
};
export default Text;
