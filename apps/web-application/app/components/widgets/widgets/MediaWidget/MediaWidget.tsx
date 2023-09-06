import {FC} from 'react';
import './MediaWidget.styles.scss';

interface MediaWidgetPropTypes {
    mediaUrl: string,
    type: string,
    title: string,
    mediaType: string,
}

const MediaWidget: FC<MediaWidgetPropTypes> = ({mediaUrl, type, title, mediaType}) => {

    return (
        <div className={`mediaWidget ${mediaType === 'iframe' ? 'mediaWidgetVideoIframe' : ''}`}>
            {
                mediaType === 'image' ?
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
            }

        </div>
    );
};

export default MediaWidget;
