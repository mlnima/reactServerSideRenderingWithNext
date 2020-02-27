import React, { useEffect, useState, useContext } from 'react';
import TagsAndCategoriesActors from "../TagsAndCategoriesActors/TagsAndCategoriesActors";
import FA from 'react-fontawesome'
import ProgressBar from "../../ProgressBar/ProgressBar";
import { likeValueCalculator } from "../../../../_variables/_variables";
import { likeDislikeView } from "../../../../_variables/ajaxPostsVariables";
import DownloadLink from "../DownloadLink/DownloadLink";
import * as socialShare from "react-share"

const PostInfo = props => {
    const [ state, setState ] = useState({
        likeValue: 0,
        postAbsolutePath : ''
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
        console.log(state)
    }, [ state ]);
    return (
        <div className='post-info'>
            <div className="share">
                <socialShare.FacebookShareButton
                    url={state.postAbsolutePath}
                    quote={props.title}
                    hashtag={'#'+props.title}
                >
                    <socialShare.FacebookIcon size={40}  />
                </socialShare.FacebookShareButton>
                <socialShare.TwitterShareButton url={state.postAbsolutePath}>
                    <socialShare.TwitterIcon size={40}  />
                </socialShare.TwitterShareButton>
                <socialShare.TelegramShareButton url={state.postAbsolutePath}>
                    <socialShare.TelegramIcon size={40}  />
                </socialShare.TelegramShareButton>
                <socialShare.RedditShareButton url={state.postAbsolutePath}>
                    <socialShare.RedditIcon size={40}  />
                </socialShare.RedditShareButton>
                <socialShare.VKShareButton url={state.postAbsolutePath}>
                    <socialShare.VKIcon size={40}  />
                </socialShare.VKShareButton>
                <socialShare.ViberShareButton url={state.postAbsolutePath}>
                    <socialShare.ViberIcon size={40}   />
                </socialShare.ViberShareButton>
                <socialShare.WhatsappShareButton url={state.postAbsolutePath}>
                    <socialShare.WhatsappIcon size={40}  />
                </socialShare.WhatsappShareButton>
                <socialShare.LinkedinShareButton url={state.postAbsolutePath}>
                    <socialShare.LinkedinIcon size={40}  />
                </socialShare.LinkedinShareButton>
                <socialShare.TumblrShareButton url={state.postAbsolutePath}>
                    <socialShare.TumblrIcon size={40}  />
                </socialShare.TumblrShareButton>
                <socialShare.EmailShareButton url={state.postAbsolutePath}>
                    <socialShare.EmailIcon size={40}  />
                </socialShare.EmailShareButton>
                <socialShare.InstapaperShareButton url={state.postAbsolutePath}>
                    <socialShare.InstapaperIcon size={40}  />
                </socialShare.InstapaperShareButton>
                <socialShare.LineShareButton url={state.postAbsolutePath}>
                    <socialShare.LineIcon size={40}  />
                </socialShare.LineShareButton>
                <socialShare.LivejournalShareButton url={state.postAbsolutePath}>
                    <socialShare.LivejournalIcon size={40}  />
                </socialShare.LivejournalShareButton>
                <socialShare.MailruShareButton url={state.postAbsolutePath}>
                    <socialShare.MailruIcon size={40}  />
                </socialShare.MailruShareButton>
                <socialShare.OKShareButton url={state.postAbsolutePath}>
                    <socialShare.OKIcon size={40}  />
                </socialShare.OKShareButton>
                <socialShare.OKShareButton url={state.postAbsolutePath}>
                    <socialShare.OKIcon size={40}  />
                </socialShare.OKShareButton>
                <socialShare.PinterestShareButton url={state.postAbsolutePath}>
                    <socialShare.PinterestIcon size={40}  />
                </socialShare.PinterestShareButton>
                <socialShare.PocketShareButton url={state.postAbsolutePath}>
                    <socialShare.PocketIcon size={40}  />
                </socialShare.PocketShareButton>
                <socialShare.WorkplaceShareButton url={state.postAbsolutePath}>
                    <socialShare.WorkplaceIcon size={40}  />
                </socialShare.WorkplaceShareButton>
            </div>

            <div className='post-info-head'>
                <h1>{ props.title }</h1>
                <div className="like">
                    <button  onClick={ e => {
                        likeDislikeView(props.id, 'likes')
                    } }><FA className='fontawesomeMedium' name="thumbs-up"/></button>
                    <button  onClick={ e => {
                        likeDislikeView(props.id, 'disLikes')
                    } }><FA className='fontawesomeMedium' name="thumbs-down"/></button>
                </div>
            </div>
            <div className='post-info-body'>
                <div className="views">
                    <DownloadLink downloadLink={ props.videoEmbedCode }/>
                    <span>{ props.views } views</span>
                    <ProgressBar value={ state.likeValue } percent={false}/>
                    <div className='post-rate'>
                        <div>
                            { state.likeValue } %
                        </div>
                        <div className='like-disLike-count'>
                        <span className='like-disLike-count-items'>
                            <FA className='fontawesomeMedium' name="thumbs-up"/>
                            { props.likes }
                        </span>
                            <span  className='like-disLike-count-items'>
                            <FA className='fontawesomeMedium' name="thumbs-down"/>
                                { props.disLikes }
                        </span>
                        </div>
                    </div>
                </div>
                <div className="meta-description">
                    <div className="description">{ props.description }</div>
                    <TagsAndCategoriesActors type='actors' data={ props.actors }/>
                    <TagsAndCategoriesActors type='tags' data={ props.tags }/>
                    <TagsAndCategoriesActors type='categories' data={ props.categories }/>
                </div>

            </div>
        </div>
    );
};
export default PostInfo;