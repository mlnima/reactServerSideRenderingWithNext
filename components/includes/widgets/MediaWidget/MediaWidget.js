import React, {useEffect, useState, useContext, useRef} from 'react';
import loadable from '@loadable/component';
const MediaDocumentWidget = loadable(() => import('./MediaDocumentWidget/MediaDocumentWidget'))


const MediaWidget = props => {
    const [state, setState] = useState({
        extraClassName: '',

    });

    useEffect(() => {
        props.mediaType === 'iframe' ?
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

    const WhatToRender = () => {

        if (props.mediaUrl && props.mediaType) {
            switch (props.mediaType) {
                case 'image':
                    return (
                        <img className='media-element' src={props.mediaUrl} alt={props.title || props.type}/>
                    )
                case 'video':
                    return (
                        <>
                            <video className='media-element' src={props.mediaUrl} controls/>
                        </>
                    )
                case 'document':
                    return (
                            <MediaDocumentWidget {...props}/>
                    )
                // return null
                case 'iframe':
                    return (
                        <>
                            <iframe className='media-element' src={props.mediaUrl}/>
                        </>
                    )
                case 'audio':
                    return (
                        <>
                            <audio className='media-element' controls src={props.mediaUrl}/>
                        </>
                    )
                default :
                    return null

            }
        } else return null


    }

    return (
        <div className={'media-widget ' + state.extraClassName}>

            <WhatToRender/>
        </div>
    );
};
export default MediaWidget;
