import {FC, useMemo} from 'react';
import styled from "styled-components";

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

interface MediaWidgetPropTypes {
    mediaUrl: string,
    type: string,
    title: string,
    mediaType: string,
}


const MediaWidget: FC<MediaWidgetPropTypes> = ({mediaUrl, type, title, mediaType}) => {

    const extraClassName = useMemo(() => mediaType === 'iframe' ? 'media-widget-video-iframe' : '', [])

        const ElementToRender = () => mediaType === 'image' ?
            <img className='media-element' src={mediaUrl} alt={title || type}/> :
            mediaType === 'video' ?
                <video className='media-element'
                       src={mediaUrl}
                       controls={false}
                       loop={true}
                       muted={true}
                       autoPlay={true}/> :
                mediaType === 'iframe' ? <iframe className='media-element' src={mediaUrl}/> :
                    mediaType === 'audio' ? <audio className='media-element' controls src={mediaUrl}/> : null

        return (

            <MediaWidgetStyledDiv className={'media-widget ' + extraClassName}>

                <ElementToRender/>

            </MediaWidgetStyledDiv>

        );
    };
    export default MediaWidget;
