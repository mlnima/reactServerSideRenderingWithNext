import React, {useState, useContext, useRef, useEffect} from 'react';

import withRouter from "next/dist/client/with-router";
import Link from "next/link";
// import {Link} from "react-router-dom";
import {AppContext} from "../../../context/AppContext";
// import {withRouter} from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import FA  from 'react-fontawesome'
import {likeValueCalculator} from '../../../_variables/_variables'
// import {deletedVideoAutoRemover} from "../../../variables/ajaxRequestVariables";

const VideoElement = props => {
    let qualityLabel = useRef(null);
    let durationLabel = useRef(null);
    let viewLabel = useRef(null);
    let element = useRef(null)
    let videoElement = useRef(null)
    let contextData = useContext(AppContext);
    let path = '/post/' + props.state._id + '/' + props.state.title;

    let [state, setState] = useState({
            isHover: false,
            isWatched: false
        });


    // useEffect(()=>{
    //     console.log( props.state)
    // },[ ]);
    useEffect(() => {
        hoverCleaner()
    }, [state.isHover]);
    useEffect(() => {
        if (contextData.state.videoPreviewID !== props.state._id) {
            setState({
                ...state,
                isHover: false
            })
        }
    }, [contextData.state.videoPreviewID]);

    let isHoverHandler = () => {
        if (props.state.videoTrailerUrl){
            contextData.dispatchState({
                ...contextData.state,
                videoPreviewID: props.state._id
            });
            state.isHover ? setState({...state, isHover: false}) : setState({...state, isHover: true})
        }

    };
    const hoverCleaner = () => {
        if (props.state.videoTrailerUrl){
            if (state.isHover) {
                qualityLabel.current.style.visibility = 'hidden';
                durationLabel.current.style.visibility = 'hidden';
                viewLabel.current.style.visibility = 'hidden';
            } else {
                qualityLabel.current.style.visibility = 'visible';
                durationLabel.current.style.visibility = 'visible';
                viewLabel.current.style.visibility = 'visible';
            }
        }
    };
    const imageContent = () => {
        let dataToRender = () => {
            if (state.isHover && props.state._id === contextData.state.videoPreviewID && props.state.videoTrailerUrl) {
                return (
                    <video ref={videoElement} src={props.state.videoTrailerUrl} autoPlay={true} loop={true}
                           onMouseOut={e => {

                               isHoverHandler()

                           }}
                    />)

            } else if (!state.isHover) {
                return (<img src={props.state.mainThumbnail} alt={props.state.title} onError={err=>{
                    // deletedVideoAutoRemover(props.state)
                    console.log( props.state)
                }} onMouseEnter={() =>

                    isHoverHandler()

                }/>)
            }
        };
        return dataToRender()
    };
    const VideoPreviewMobileBtnLogo = () => {
        let element = <i className="fas fa-fast-forward"/>
        if (state.isHover) {
            element = <i className="fas fa-stop"/>
        } else {
            element = <i className="fas fa-fast-forward"/>
        }
        return element
    };
    const MobilePreviewBtn = ()=>{
        if (props.state.videoTrailerUrl){
            return (
                <button className='videoPreviewMobile' onClick={() => {
                    contextData.dispatchState({
                        ...contextData.state,
                        videoPreviewID: props.state._id
                    });
                    state.isHover ? setState({...state, isHover: false}) : setState({...state, isHover: true})
                }}>   <VideoPreviewMobileBtnLogo/>  </button>
            )
        }else return null

    }
    return (
        < div ref={element} className='videoElementDiv'>
            <Link as={`/${props.state.title}`} href={{
                pathname:'/post',
                query:{
                    postTitle:props.state.title
                }
            }}>
                <a>
                <div className='VideoElement' key={props.state.title}>
                    <div className="image">
                        <span ref={qualityLabel} className='quality'>{props.state.quality}</span>
                        {imageContent()}
                        <span ref={viewLabel} className='views'><FA className='fontawesomeSmall' name="eye" />{props.state.views}</span>
                        <span ref={durationLabel} className='duration'>{props.state.duration}</span>
                    </div>
                    <ProgressBar value={likeValueCalculator(props.state.likes, props.state.disLikes)} percent={true}/>
                    <h3>{props.state.title}</h3>
                </div>
                </a>
            </Link>



        </div>
    );
};

export default withRouter(VideoElement);