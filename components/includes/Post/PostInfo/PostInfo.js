import React, {useEffect, useState} from 'react';
import TagsAndCategoriesActors from "../TagsAndCategoriesActors/TagsAndCategoriesActors";
import {likeValueCalculator} from "../../../../_variables/_variables";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";
import DownloadLink from "../DownloadLink/DownloadLink";
import withRouter from 'next/dist/client/with-router'
import EditLinksForAuthor from "./EditLinksForAuthor/EditLinksForAuthor";
import EditLinkForAdmin from "./EditLinkForAdmin/EditLinkForAdmin";
import RatingButtons from "./RatingButtons/RatingButtons";
import Price from "./Price/Price";
import RatingData from "./RatingData/RatingData";
import PostTitle from "./PostTitle/PostTitle";
import PostDescription from "./PostDescription/PostDescription";
import AddToBasket from "./AddToBasket/AddToBasket";

import styled from "styled-components";
let StyledDiv = styled.div`${props => props.stylesData}`;

const PostInfo = props => {
    const [state, setState] = useState({
        likeValue: 0,
        postAbsolutePath: '',
        mode: 'view',
        isLiked: false,
        isDisliked: false
    });

    useEffect(() => {
        if (typeof window !=='undefined'){
            setState({
                ...state,
                likeValue: likeValueCalculator(props.likes, props.disLikes),
                postAbsolutePath: window.location.href
            });
        }
        likeDislikeView(props.id, 'views')
    }, [props.likes, props.disLikes]);

    return (
        <StyledDiv  className='post-info'>
            <EditLinkForAdmin {...props}/>
            <div className='post-info-head' >
                <PostTitle {...props}/>
                <div className='under-title'>
                    <RatingButtons {...props}/>
                    <Price {...props}/>
                    <DownloadLink downloadLink={props.downloadLink} render={props.downloadLink} />
                </div>
                <AddToBasket productId={props._id} render={props.postType==='product'}/>
            </div>

            <div className='post-info-body'>
                <div className="views">
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
        </StyledDiv>
    );
};
export default withRouter(PostInfo);
