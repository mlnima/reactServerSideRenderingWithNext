import React, {useEffect, useState, useContext,useRef} from 'react';
import Link from 'next/link'
import TagsAndCategoriesActors from "../TagsAndCategoriesActors/TagsAndCategoriesActors";
import ProgressBar from "../../ProgressBar/ProgressBar";
import {likeValueCalculator} from "../../../../_variables/_variables";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";
import DownloadLink from "../DownloadLink/DownloadLink";
import LikeBtnSvg from '../../../../static/images/fontawesome/thumbs-up-solid.svg'
import DisLikeBtnSvg from '../../../../static/images/fontawesome/thumbs-down-solid.svg'
import './PostInfo.scss'
import {AppContext} from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSmileBeam} from "@fortawesome/free-solid-svg-icons";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";

const PostInfo = props => {
const ratingBtnArea = useRef(null)
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        likeValue: 0,
        postAbsolutePath: '',
        mode: 'view',
        isLiked:false,
        isDisliked:false
    });

    const [styles, setStyles] = useState({
        titleArea: {
            color: 'white',
            backgroundColor: 'black'
        }
    })


    useEffect(() => {
        setStyles({
            ...styles,
            titleArea: {
                ...styles.titleArea,
                color: contextData.siteDesign.postTitleTextColor || 'white',
                backgroundColor: contextData.siteDesign.postTitleBackgroundColor || 'black',
            }
        })
    }, [contextData.siteDesign]);


    useEffect(() => {
        setState({
            ...state,
            likeValue: likeValueCalculator(props.likes, props.disLikes),
            postAbsolutePath: window.location.href
        });
        likeDislikeView(props.id, 'views')
    }, []);


    const EditLinkForAdmin = () => {
        if (contextData.userData.role === 'administrator') {
            return (
                <Link href={`/admin/post?id=${props.id}`}><a className='edit-btn-admin'>Edit as Admin</a></Link>
            )
        } else return null
    }

    const EditLinksForAuthor = () => {
        if (props.editMode && (contextData.userData._id === props.author || contextData.userData.username === props.author)) {
            return (
                <>
                    <Link href={props.router ? {
                        pathname: props.router.pathname,
                        query: {...props.router.query, mode: 'view'}
                    } : '/'}><a className='edit-btn-admin'>View Mode</a></Link>
                    <Link href={props.router ? {
                        pathname: props.router.pathname,
                        query: {...props.router.query, mode: 'view'}
                    } : '/'}><a className='edit-btn-admin'>Delete</a></Link>
                </>
            )
        } else if (!props.editMode && (contextData.userData._id === props.author || contextData.userData.username === props.author)) {
            return (
                <>
                    <Link href={props.router ? {
                        pathname: props.router.pathname,
                        query: {...props.router.query, mode: 'edit'}
                    } : '/'}><a className='edit-btn-admin'>Edit Mode</a></Link>
                </>
            )
        } else return null
    }





    const isLikedOrDislikedHandler = () =>{

    }

    const onLikeOrDislikeHandler = (e,type)=>{
        likeDislikeView(props.id, type)
        // e.target.disabled = true
    }








    const RenderRatingButtons = () => {
        if (props.rating !== 'disable') {
            return (
                <div ref={ratingBtnArea}  className="like" >
                    <button onClick={e => onLikeOrDislikeHandler(e,'like')}>

                        <FontAwesomeIcon icon={faThumbsUp} className='rate-logo' style={styles.titleArea} />

                    </button>
                    <button  onClick={e => onLikeOrDislikeHandler(e,'disLikes')}>
                        <FontAwesomeIcon icon={faThumbsDown} className='rate-logo' style={styles.titleArea}  />

                    </button>
                </div>
            )
        } else return null
    }

    const RenderRatingData = () => {
        if (props.rating !== 'disable') {
            return (
                <>
                    <ProgressBar value={state.likeValue} percent={false}/>
                    <div className='post-rate'>
                        <div>
                            {state.likeValue} %
                        </div>
                        <div className='like-disLike-count'>
                        <span className='like-disLike-count-items'>
                            <FontAwesomeIcon icon={faThumbsUp} className='like-disLike-count-items-logo'  />
                            {/*<img className='fontawesomeSvgSmall' src={LikeBtnSvg} alt=""/>*/}
                            <p>  {props.likes}</p>

                        </span>
                            <span className='like-disLike-count-items'>
                                  <FontAwesomeIcon icon={faThumbsDown} className='like-disLike-count-items-logo'  />
                         {/*<img className='fontawesomeSvgSmall' src={DisLikeBtnSvg} alt=""/>*/}

                                <p>  {props.disLikes}</p>
                        </span>
                        </div>
                    </div>
                </>
            )

        } else return null
    }

    const RenderTitle = () => {
        if (props.editMode) {
            return (
                <div className='edit-mode'>
                    <p className='editModeText'>Title :</p>
                    <input type="text" value={props.title}/>
                </div>
            )
        } else {
            return (
                <h1 style={styles.titleArea}
                    className='post-title'>{props.post.translations ? props.post.translations[contextData.state.activeLanguage] ? props.post.translations[contextData.state.activeLanguage].title || props.post.title : props.post.title : props.post.title}</h1>
            )
        }
    }

    useEffect(() => {
        console.log(props)
    }, [props]);

    const RenderDescription = () => {
        if (props.editMode) {
            return (
                <div className='edit-mode'>
                    <p className='editModeText'>Description :</p>
                    <textarea value={props.description}/>
                </div>
            )
        } else {
            return (
                <p style={{color:contextData.siteDesign.postDescriptionTextColorColor || 'white'}}
                    className="description">{props.post.translations ? props.post.translations[contextData.state.activeLanguage] ? props.post.translations[contextData.state.activeLanguage].description || props.post.description : props.post.description : props.post.description}</p>
            )
        }
    }

    return (
        <div className='post-info'>
            <EditLinkForAdmin/>
            <EditLinksForAuthor/>

            <div className='post-info-head' style={styles.titleArea}>

                <RenderTitle/>
                <RenderRatingButtons/>
            </div>

            <div className='post-info-body'>
                <div className="views">
                    <DownloadLink downloadLink={props.videoEmbedCode}/>
                    <span>{props.views} views</span>
                    <RenderRatingData/>
                </div>
                <div className="meta-description">
                    <RenderDescription/>
                    <TagsAndCategoriesActors type='actors' data={props.actors || []}/>
                    <TagsAndCategoriesActors type='tags' data={props.tags || []}/>
                    <TagsAndCategoriesActors type='categories' data={props.categories || []}/>
                </div>

            </div>
        </div>
    );
};
export default withRouter(PostInfo);
