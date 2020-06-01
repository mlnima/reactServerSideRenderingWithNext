import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link'
import TagsAndCategoriesActors from "../TagsAndCategoriesActors/TagsAndCategoriesActors";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { likeValueCalculator } from "../../../../_variables/_variables";
import { likeDislikeView } from "../../../../_variables/ajaxPostsVariables";
import DownloadLink from "../DownloadLink/DownloadLink";
import FA from 'react-fontawesome';
import LikeBtnSvg from '../../../../static/images/fontawesome/thumbs-up-solid.svg'
import DisLikeBtnSvg from '../../../../static/images/fontawesome/thumbs-down-solid.svg'
import './PostInfo.scss'
import { AppContext } from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
// import * as socialShare from "react-share"

const PostInfo = props => {
    const contextData = useContext(AppContext);

    const [ state, setState ] = useState({
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


    useEffect(() => {
        console.log(props)
    }, [ props ]);

    const EditLinkForAdmin = () => {
        if (contextData.userData.role === 'administrator') {
            return (
                <Link href={ `/admin/post?id=${ props.id }` }><a className='edit-btn-admin'>Edit as Admin</a></Link>
            )
        } else return null
    }

    const EditLinksForAuthor = () => {
            if (props.editMode) {
                return (
                    <>
                        <Link href={ props.router ? { pathname: props.router.pathname, query: { ...props.router.query, mode: 'view' } } : '/' }><a className='edit-btn-admin'>View Mode</a></Link>
                        <Link href={ props.router ? { pathname: props.router.pathname, query: { ...props.router.query, mode: 'view' } } : '/' }><a className='edit-btn-admin'>Delete</a></Link>
                    </>
                )
            } else {
                return (
                    <>
                        <Link href={ props.router ? { pathname: props.router.pathname, query: { ...props.router.query, mode: 'edit' } } : '/' }><a className='edit-btn-admin'>Edit Mode</a></Link>
                    </>
                )
            }
    }

    const RenderRatingButtons = () => {
        if (props.rating !== 'disable') {
            return (
                <div className="like">
                    <button onClick={ e => {
                        likeDislikeView(props.id, 'likes')
                        e.target.style.filter = 'invert(1) blur(2px)'
                    } }>
                        <img className='fontawesomeSvgMedium' src={ LikeBtnSvg } alt=""/>
                    </button>
                    <button onClick={ e => {
                        likeDislikeView(props.id, 'disLikes')
                        e.target.style.filter = 'invert(1) blur(2px)'
                    } }>
                        <img className='fontawesomeSvgMedium' src={ DisLikeBtnSvg } alt=""/>
                    </button>
                </div>
            )
        } else return null
    }

    const RenderRatingData = () => {
        if (props.rating !== 'disable') {
            return (
                <>
                    <ProgressBar value={ state.likeValue } percent={ false }/>
                    <div className='post-rate'>
                        <div>
                            { state.likeValue } %
                        </div>
                        <div className='like-disLike-count'>
                        <span className='like-disLike-count-items'>
                            <img className='fontawesomeSvgSmall' src={ LikeBtnSvg } alt=""/>
                            <p>  { props.likes }</p>

                        </span>
                            <span className='like-disLike-count-items'>
                         <img className='fontawesomeSvgSmall' src={ DisLikeBtnSvg } alt=""/>

                                <p>  { props.disLikes }</p>
                        </span>
                        </div>
                    </div>
                </>
            )

        } else return null
    }

    const RenderTitle = () => {
        if (props.editMode){
            return(
                <div className='edit-mode'>
                    <p className='editModeText'>Title :</p>
                    <input type="text" value={props.title}/>
                </div>
            )
        }else{
            return(
                <h1 className='post-title'>{ props.title }</h1>
            )
        }
    }

    const RenderDescription = ()=>{
        if (props.editMode){
            return(
                <div className='edit-mode'>
                    <p className='editModeText'>Description :</p>
                    <textarea  value={props.description}/>
                </div>
            )
        }else{
            return(
                <div className="description">{ props.description }</div>
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
                    <DownloadLink downloadLink={ props.videoEmbedCode }/>
                    <span>{ props.views } views</span>
                    <RenderRatingData/>
                </div>
                <div className="meta-description">
                    <RenderDescription/>
                    <TagsAndCategoriesActors type='actors' data={ props.actors || [] }/>
                    <TagsAndCategoriesActors type='tags' data={ props.tags || [] }/>
                    <TagsAndCategoriesActors type='categories' data={ props.categories || [] }/>
                </div>

            </div>
        </div>
    );
};
export default withRouter(PostInfo);

// {/*<div className="share">*/}
// {/*    <socialShare.FacebookShareButton*/}
// {/*        url={state.postAbsolutePath}*/}
// {/*        quote={props.title}*/}
// {/*        hashtag={'#'+props.title}*/}
// {/*    >*/}
// {/*        <socialShare.FacebookIcon size={40}  />*/}
// {/*    </socialShare.FacebookShareButton>*/}
// {/*    <socialShare.TwitterShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.TwitterIcon size={40}  />*/}
// {/*    </socialShare.TwitterShareButton>*/}
// {/*    <socialShare.TelegramShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.TelegramIcon size={40}  />*/}
// {/*    </socialShare.TelegramShareButton>*/}
// {/*    <socialShare.RedditShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.RedditIcon size={40}  />*/}
// {/*    </socialShare.RedditShareButton>*/}
// {/*    <socialShare.VKShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.VKIcon size={40}  />*/}
// {/*    </socialShare.VKShareButton>*/}
// {/*    <socialShare.ViberShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.ViberIcon size={40}   />*/}
// {/*    </socialShare.ViberShareButton>*/}
// {/*    <socialShare.WhatsappShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.WhatsappIcon size={40}  />*/}
// {/*    </socialShare.WhatsappShareButton>*/}
// {/*    <socialShare.LinkedinShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.LinkedinIcon size={40}  />*/}
// {/*    </socialShare.LinkedinShareButton>*/}
// {/*    <socialShare.TumblrShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.TumblrIcon size={40}  />*/}
// {/*    </socialShare.TumblrShareButton>*/}
// {/*    <socialShare.EmailShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.EmailIcon size={40}  />*/}
// {/*    </socialShare.EmailShareButton>*/}
// {/*    <socialShare.InstapaperShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.InstapaperIcon size={40}  />*/}
// {/*    </socialShare.InstapaperShareButton>*/}
// {/*    <socialShare.LineShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.LineIcon size={40}  />*/}
// {/*    </socialShare.LineShareButton>*/}
// {/*    <socialShare.LivejournalShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.LivejournalIcon size={40}  />*/}
// {/*    </socialShare.LivejournalShareButton>*/}
// {/*    <socialShare.MailruShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.MailruIcon size={40}  />*/}
// {/*    </socialShare.MailruShareButton>*/}
// {/*    <socialShare.OKShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.OKIcon size={40}  />*/}
// {/*    </socialShare.OKShareButton>*/}
// {/*    <socialShare.OKShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.OKIcon size={40}  />*/}
// {/*    </socialShare.OKShareButton>*/}
// {/*    <socialShare.PinterestShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.PinterestIcon size={40}  />*/}
// {/*    </socialShare.PinterestShareButton>*/}
// {/*    <socialShare.PocketShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.PocketIcon size={40}  />*/}
// {/*    </socialShare.PocketShareButton>*/}
// {/*    <socialShare.WorkplaceShareButton url={state.postAbsolutePath}>*/}
// {/*        <socialShare.WorkplaceIcon size={40}  />*/}
// {/*    </socialShare.WorkplaceShareButton>*/}
//
// {/*</div>*/}
