import React, { useEffect, useState, useContext, useRef } from 'react';
import './MediaWidget.scss';

const MediaWidget = props => {
    const [ state, setState ] = useState({
        extraClassName :''
    });
    useEffect(() => {
        props.mediaType==='iframe'?
            setState({
                ...state,
                extraClassName: 'media-widget-video-iframe'
            })
            :
            setState({
                ...state,
                extraClassName: ''
            })
    }, []);

    useEffect(() => {
        console.log(props)
    }, [ props ]);

    const WhatToRender = () => {
        switch ( props.mediaType ) {
            case 'image':
                return (
                    <img src={ props.mediaUrl } alt={props.title||props.type}/>
                )
            case 'video':
                return (
                    <>
                        <video src={ props.mediaUrl } controls/>
                    </>
                )
            case 'iframe':
                return (
                    <>
                        <iframe src={ props.mediaUrl }/>
                    </>
                )
            case 'audio':
                return (
                    <>
                        <audio controls src={ props.mediaUrl }/>
                    </>
                )
        }

    }

    return (
        <div className={'media-widget ' + state.extraClassName }>
            <WhatToRender/>
        </div>
    );
};
export default MediaWidget;
