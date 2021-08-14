import React,{useState} from 'react';
import {checkRemovedContent} from "../../../../../_variables/ajaxPostsVariables";

const ActorCardMedia = props => {
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)

    const onErrorHandler = () => {
        if (props.imageUrl) {
            setGotError(true)
            setIsReported(true)
            let data = {
                checkUrl: props.imageUrl,
            }
            setTimeout(() => {
                checkRemovedContent(data).then(() => {
                    // clientSelfWidgetUpdate(data)
                })
            }, 1000)
        }
    }

    return (
        <React.Fragment>
            <style jsx>{`
              .actor-card-image {
                width: 100%;
                height: calc(48vw / 1.777);
              }

              @media only screen and (min-width: 768px) {
                .actor-card-image {
                  width: 100%;
                  height: calc(${props.cardWidth}px / 1.777);
                }
              }

            `}</style>
            <img className='actor-card-image' src={props.imageUrl} onError={onErrorHandler} alt={props.mediaAlt}/>
        </React.Fragment>
    );
};
export default ActorCardMedia;





