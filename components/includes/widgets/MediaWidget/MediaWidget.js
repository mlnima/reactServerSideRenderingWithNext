import {useEffect, useState} from 'react';
import styled from "styled-components";


// const MediaDocumentWidget = loadable(() => import('./MediaDocumentWidget/MediaDocumentWidget'))

const MediaWidgetStyledDiv = styled.div`
  max-width: 100vw;

  .media-element {
    width: 100vw;
    margin: 10px 0;
  }

  .page-controller {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
    }
  }

  .widget-document-type {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media only screen and (min-width: 1024px) {
    .media-element {
      width: 100%;
    }
  }

  .media-widget-video-iframe {
    position: relative;
    overflow: hidden;
    padding-bottom: 56.30%;
    margin-bottom: 20px;
    height: 0;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      margin-bottom: 50px;
      padding: 0 !important;
      border-radius: 10px;
    }
  }
`


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

                        <video className='media-element' src={props.mediaUrl} controls={false} loop={true} muted={true} autoPlay={true}/>

                    )
                // case 'document':
                //     return (
                //             <MediaDocumentWidget {...props}/>
                //     )
                case 'document':
                    return null

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
        <MediaWidgetStyledDiv className={'media-widget ' + state.extraClassName}>

            <WhatToRender/>
        </MediaWidgetStyledDiv>
    );
};
export default MediaWidget;
