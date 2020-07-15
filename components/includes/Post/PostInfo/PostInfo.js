import React, {useEffect, useState, useContext} from 'react';
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

const PostInfo = props => {

    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        likeValue: 0,
        postAbsolutePath: '',
        mode: 'view'
    });

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

    const RenderRatingButtons = () => {
        if (props.rating !== 'disable') {
            return (
                <div className="like">
                    <button onClick={e => {
                        likeDislikeView(props.id, 'likes')
                        e.target.style.filter = 'invert(1) blur(2px)'
                    }}>
                        <img className='fontawesomeSvgMedium' src={LikeBtnSvg} alt=""/>
                    </button>
                    <button onClick={e => {
                        likeDislikeView(props.id, 'disLikes')
                        e.target.style.filter = 'invert(1) blur(2px)'
                    }}>
                        <img className='fontawesomeSvgMedium' src={DisLikeBtnSvg} alt=""/>
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
                            <img className='fontawesomeSvgSmall' src={LikeBtnSvg} alt=""/>
                            <p>  {props.likes}</p>

                        </span>
                            <span className='like-disLike-count-items'>
                         <img className='fontawesomeSvgSmall' src={DisLikeBtnSvg} alt=""/>

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
                <h1 className='post-title'>{props.title}</h1>
            )
        }
    }

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
                <div className="description">{props.description}</div>
            )
        }
    }

    return (
        <div className='post-info'>
            <EditLinkForAdmin/>
            <EditLinksForAuthor/>

            <div className='post-info-head'>

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
