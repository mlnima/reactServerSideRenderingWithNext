import React, { useState, useContext, useRef, useEffect } from 'react';

import withRouter from "next/dist/client/with-router";
import Link from "next/link";
// import {Link} from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
// import {withRouter} from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import FA from 'react-fontawesome'
import { likeValueCalculator } from '../../../_variables/_variables'
// import {deletedVideoAutoRemover} from "../../../variables/ajaxRequestVariables";

const PostElement = props => {
    let qualityLabel = useRef(null);
    let bottomLeft = useRef(null);
    let bottomRight = useRef(null);
    let element = useRef(null)
    let videoElement = useRef(null)

    let [ state, setState ] = useState({
        isHover: false,
        isWatched: false,
        extraClassName: ''
    });

    useEffect(() => {
        console.log(props)
    }, [ props ]);

    useEffect(() => {
        if (props.viewType) {
            setState({
                ...state,
                extraClassName: props.viewType
            })
        }
    }, [ props ]);

    let isHoverHandler = () => {
        if (props.state.videoTrailerUrl) {
            state.isHover ? setState({ ...state, isHover: false }) : setState({ ...state, isHover: true })
        }
    };
    const ImageContent = () => {
        let dataToRender = () => {
            if (state.isHover && props.state.videoTrailerUrl) {
                return (
                    <video ref={ videoElement } src={ props.state.videoTrailerUrl } autoPlay={ true } loop={ true }
                           onMouseOut={ e => {
                               isHoverHandler()
                           } }
                    />)

            } else if (!state.isHover) {
                return (<img src={ props.state.mainThumbnail } alt={ props.state.title } onError={ err => {
                    if (!props.state.mainThumbnail) {
                        // deletedVideoAutoRemover(props.state)
                        console.log('something wrong with image on ', props.state.title)
                    }
                } } onMouseEnter={ () =>
                    isHoverHandler()
                }/>)
            } else {
                return (
                    <span>{ props.state.title }</span>
                )
            }
        };
        return dataToRender()
    };

    const BottomRight = () => {
        switch ( props.state.postType ) {
            case 'video':
                return (
                    <span ref={ bottomRight } className='bottom-right'><FA className='fontawesomeSmall' name="eye"/>{ props.state.views }</span>
                )
            case 'product':
                return (
                    <span ref={ bottomRight } className='bottom-right'><FA className='fontawesomeSmall' name="eye"/>{ props.state.views }</span>
                )
            default :
                break
        }
    }


    const RenderProgressBar = ()=>{
        if (props.state.rating !== 'disable'){
            return (
                <ProgressBar value={ likeValueCalculator(props.state.likes, props.state.disLikes) } percent={ true }/>
            )
        }else return null
    }

    const BottomLeft = ()=>{
        switch ( props.state.postType ) {
            case 'video':
                return (
                    <span ref={ bottomLeft } className='bottom-left'>{ props.state.duration }</span>
                )
            case 'product':
                return (
                    <span ref={ bottomRight } className='bottom-left'><FA className='fontawesomeSmall' name="eye"/>{ props.state.price + ' ' + (props.state.currency || 'Euro') }</span>
                )
            default :
                break
        }
    }


    const TopRight = ()=>{
        switch ( props.state.postType ) {
            case 'video':
                return (
                    <span ref={ qualityLabel } className='top-right'>{ props.state.quality }</span>
                )
            case 'product':
                return null
            default :
                break
        }
    }



    const RenderDataOnImage = () => {
        if (state.isHover) {
            return null
        } else {
            return (
                <>
                    <TopRight/>
                    <BottomRight/>
                    <BottomLeft/>
                    {/*<span ref={ bottomRight } className='bottom-right'><FA className='fontawesomeSmall' name="eye"/>{ props.state.views }</span>*/ }
                    {/*<span ref={ bottomLeft } className='bottom-left'>{ props.state.duration }</span>*/}
                </>
            )
        }
    }

    return (
        < div ref={ element } className={ 'post-element-div ' + (props.viewType ? props.viewType : 'standard') }>
            <Link as={ `/${ props.state.title }` } href={ {
                pathname: '/post',
                query: {
                    postTitle: props.state.title
                }
            } }>
                <a>
                    <div className='post-element' key={ props.state.title }>
                        <div className="image">
                            <ImageContent/>
                            <RenderDataOnImage/>
                        </div>
                      <RenderProgressBar/>
                        <h3>{ props.state.title }</h3>
                    </div>
                </a>
            </Link>


        </div>
    );
};

export default withRouter(PostElement);