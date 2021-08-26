import React, {useState, useEffect,useRef} from 'react';
import {checkRemovedContent} from "../../../../../_variables/ajaxPostsVariables";
import _fixMetaImage from "../../../../../_variables/clientAjaxVariables/_fixMetaImage";

const ActorCardMedia = props => {
    const imageRef = useRef(null)
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)




    useEffect(() => {
        if (!props.imageUrl){
            _fixMetaImage(props.actorId).then(res=>{
                if (imageRef.current && res?.data?.newImageUrl ){
                    imageRef.current.src = res?.data?.newImageUrl
                }
            })

        }

    }, [props]);


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
            <img ref={imageRef} className='actor-card-image' src={props.imageUrl } onError={onErrorHandler} alt={props.mediaAlt}/>
        </React.Fragment>
    );
};
export default ActorCardMedia;






