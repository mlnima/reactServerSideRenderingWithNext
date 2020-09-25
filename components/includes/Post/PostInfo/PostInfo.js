import React, {useEffect, useState, useContext, useRef} from 'react';
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
import {faBars, faDollarSign, faEuroSign, faSmileBeam} from "@fortawesome/free-solid-svg-icons";
import {faMeh, faThumbsDown, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import EditLinksForAuthor from "./EditLinksForAuthor/EditLinksForAuthor";
import EditLinkForAdmin from "./EditLinkForAdmin/EditLinkForAdmin";
import RatingButtons from "./RatingButtons/RatingButtons";
import Price from "./Price/Price";
import RatingData from "./RatingData/RatingData";
import PostTitle from "./PostTitle/PostTitle";
import PostDescription from "./PostDescription/PostDescription";
import AddToBasket from "./AddToBasket/AddToBasket";

const PostInfo = props => {
    const [state, setState] = useState({
        likeValue: 0,
        postAbsolutePath: '',
        mode: 'view',
        isLiked: false,
        isDisliked: false
    });

    useEffect(() => {
        setState({
            ...state,
            likeValue: likeValueCalculator(props.likes, props.disLikes),
            postAbsolutePath: window.location.href
        });
        likeDislikeView(props.id, 'views')
    }, [props.likes, props.disLikes]);

    return (
        <div className='post-info'>
            <EditLinkForAdmin {...props}/>
            <EditLinksForAuthor {...props}/>

            <div className='post-info-head' >
                <PostTitle {...props}/>
                <div className='under-title'>
                    <RatingButtons {...props}/>
                    <Price {...props}/>
                </div>
                <AddToBasket productId={props._id} render={props.postType==='product'}/>
            </div>

            <div className='post-info-body'>
                <div className="views">
                    <DownloadLink downloadLink={props.downloadLink} render={props.downloadLink} />

                    <span>{props.views} views</span>
                    <RatingData {...props}/>
                </div>
                <div className="meta-description">
                    <PostDescription  {...props}/>
                    <TagsAndCategoriesActors type='actors' data={props.actors || []}/>
                    <TagsAndCategoriesActors type='tags' data={props.tags || []}/>
                    <TagsAndCategoriesActors type='categories' data={props.categories || []}/>
                </div>

            </div>
        </div>
    );
};
export default withRouter(PostInfo);
