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

    });
    useEffect(() => {
        setState({
            ...state,
            likeValue: likeValueCalculator(props.likes, props.disLikes)
        });

        likeDislikeView(props.id, 'views')
    }, []);

    useEffect(() => {
        console.log(props.likes, props.disLikes)
        console.log(likeValueCalculator(1, 1))
    }, [ state ]);
    return (
        <div className='post-info'>
            <div className="share">
                <socialShare.FacebookShareButton
                    url={window.location.href}
                    // quote={props.joke.setup + props.joke.punchline}
                    // hashtag="#programing joke"
                >
                    <socialShare.FacebookIcon size={40} logoFillColor="white" />
                </socialShare.FacebookShareButton>
                <socialShare.TwitterShareButton url={window.location.href}>
                    <socialShare.TwitterIcon size={40} logoFillColor="white" />
                </socialShare.TwitterShareButton>
                <socialShare.TelegramShareButton url={window.location.href}>
                    <socialShare.TelegramIcon size={40} logoFillColor="white" />
                </socialShare.TelegramShareButton>
                <socialShare.RedditShareButton url={window.location.href}>
                    <socialShare.RedditIcon size={40} logoFillColor="white" />
                </socialShare.RedditShareButton>
                <socialShare.VKShareButton url={window.location.href}>
                    <socialShare.VKIcon size={40} logoFillColor="white" />
                </socialShare.VKShareButton>
                <socialShare.ViberShareButton url={window.location.href}>
                    <socialShare.ViberIcon size={40}  logoFillColor="white" />
                </socialShare.ViberShareButton>
                <socialShare.WhatsappShareButton url={window.location.href}>
                    <socialShare.WhatsappIcon size={40} logoFillColor="white" />
                </socialShare.WhatsappShareButton>
                <socialShare.LinkedinShareButton url={window.location.href}>
                    <socialShare.LinkedinIcon size={40} logoFillColor="white" />
                </socialShare.LinkedinShareButton>
                <socialShare.TumblrShareButton url={window.location.href}>
                    <socialShare.TumblrIcon size={40} logoFillColor="white" />
                </socialShare.TumblrShareButton>
                <socialShare.EmailShareButton url={window.location.href}>
                    <socialShare.EmailIcon size={40} logoFillColor="white" />
                </socialShare.EmailShareButton>
                <socialShare.InstapaperShareButton url={window.location.href}>
                    <socialShare.InstapaperIcon size={40} logoFillColor="white" />
                </socialShare.InstapaperShareButton>
                <socialShare.LineShareButton url={window.location.href}>
                    <socialShare.LineIcon size={40} logoFillColor="white" />
                </socialShare.LineShareButton>
                <socialShare.LivejournalShareButton url={window.location.href}>
                    <socialShare.LivejournalIcon size={40} logoFillColor="white" />
                </socialShare.LivejournalShareButton>
                <socialShare.MailruShareButton url={window.location.href}>
                    <socialShare.MailruIcon size={40} logoFillColor="white" />
                </socialShare.MailruShareButton>
                <socialShare.OKShareButton url={window.location.href}>
                    <socialShare.OKIcon size={40} logoFillColor="white" />
                </socialShare.OKShareButton>
                <socialShare.OKShareButton url={window.location.href}>
                    <socialShare.OKIcon size={40} logoFillColor="white" />
                </socialShare.OKShareButton>
                <socialShare.PinterestShareButton url={window.location.href}>
                    <socialShare.PinterestIcon size={40} logoFillColor="white" />
                </socialShare.PinterestShareButton>
                <socialShare.PocketShareButton url={window.location.href}>
                    <socialShare.PocketIcon size={40} logoFillColor="white" />
                </socialShare.PocketShareButton>
                <socialShare.WorkplaceShareButton url={window.location.href}>
                    <socialShare.WorkplaceIcon size={40} logoFillColor="white" />
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