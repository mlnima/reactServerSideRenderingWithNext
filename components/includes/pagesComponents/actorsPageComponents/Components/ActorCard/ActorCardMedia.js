import React, {useState, useEffect, useRef} from 'react';
import {checkRemovedContent} from "../../../../../../_variables/ajaxPostsVariables";
import _fixMetaImage from "../../../../../../_variables/clientAjaxVariables/_fixMetaImage";
import styled from "styled-components";

const ActorCardMediaStyledImage = styled.img`
  width: 100%;
  height: calc(48vw / 1.777);
  @media only screen and (min-width: 768px) {
    width: ${props => props.cardWidth}px;
    height: calc(${props => props.cardWidth}px / 1.777);
  }
`
const NoImageStyleDiv = styled.div`
  width: 100%;
  height: calc(48vw / 1.777);
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    color: var(--post-element-info-text-color,#ccc);
  }
  @media only screen and (min-width: 768px) {
    width: ${props => props.cardWidth}px;
    height: calc(${props => props.cardWidth}px / 1.777);
  }
`
const ActorCardMedia = props => {
    const imageRef = useRef(null)
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)

    useEffect(() => {
        if (!props.imageUrl) {
            _fixMetaImage(props.actorId).then(res => {
                if (imageRef.current && res?.data?.newImageUrl) {
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
                if (imageRef.current && res?.data?.newImageUrl) {
                    imageRef.current.src = res?.data?.newImageUrl
                }
            })
        }
    }
    if (gotError || !props.imageUrl){
        return (
            <NoImageStyleDiv   cardWidth={props.cardWidth} className='no-image'>
                <span>NO IMAGE</span>
            </NoImageStyleDiv>
        );
    }else {
        return (
            <ActorCardMediaStyledImage cardWidth={props.cardWidth}
                                       ref={imageRef} className='actor-card-image'
                                       src={props.imageUrl}
                                       // onError={onErrorHandler}
                                       alt={props.mediaAlt}
            />
        );
    }

};
export default ActorCardMedia;






