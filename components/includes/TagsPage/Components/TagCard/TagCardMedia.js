import React, {useEffect, useRef, useState} from 'react';
import {checkRemovedContent} from "../../../../../_variables/ajaxPostsVariables";
import _fixMetaImage from "../../../../../_variables/clientAjaxVariables/_fixMetaImage";

const TagCardMedia = props => {
    const imageRef = useRef(null)
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)

    useEffect(() => {
        if (!props.imageUrl){
            _fixMetaImage(props.tagId).then(res=>{
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
                checkRemovedContent(data).then(res => {
                    if (imageRef.current && res?.data?.newImageUrl ){
                        imageRef.current.src = res?.data?.newImageUrl
                    }
                })
        }
    }
    return (
        <React.Fragment>
            <style jsx>{`
              .tag-card-image {
                width: 100%;
                height: calc(48vw / 1.777);
              }

              @media only screen and (min-width: 768px) {
                .tag-card-image {
                  width: 100%;
                  height: calc(${props.cardWidth}px / 1.777);
                }
              }

            `}</style>
            <img className='tag-card-image' src={props.imageUrl}  onError={onErrorHandler} alt={props.mediaAlt}/>
        </React.Fragment>
    );
};
export default TagCardMedia;
