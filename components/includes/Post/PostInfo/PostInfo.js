import {useEffect, useState} from 'react';
import TagsAndCategoriesActors from "../TagsAndCategoriesActors/TagsAndCategoriesActors";
import {likeValueCalculator} from "../../../../_variables/_variables";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";
import DownloadLink from "../DownloadLink/DownloadLink";
import withRouter from 'next/dist/client/with-router'
import EditLinkForAdmin from "./EditLinkForAdmin/EditLinkForAdmin";
import RatingButtons from "./RatingButtons/RatingButtons";
import Price from "./Price/Price";
import PostTitle from "./PostTitle/PostTitle";
import PostDescription from "./PostDescription/PostDescription";
import AddToBasket from "./AddToBasket/AddToBasket";

const PostInfo = ({title,likes,disLikes,downloadLink,postType,price,actors,tags,categories,description,_id,translations,currency,rating}) => {
    const [state, setState] = useState({
        likeValue: 0,
        postAbsolutePath: '',
        mode: 'view',
        isLiked: false,
        isDisliked: false,
        svgDefaultStyle: {
            maxWidth: '25px',
            maxHeight: '25px'
        }
    });

    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setState({
                ...state,
                likeValue: likeValueCalculator(likes, disLikes),
                postAbsolutePath: window.location.href
            });
        }
        likeDislikeView(_id, 'views').then(res => {
            if (res.data.updatedData) {
                setRatingAndViewData(res.data.updatedData)
            }
        })
    }, [likes, disLikes]);


    return (
        <div className='post-info'>
            <EditLinkForAdmin _id={_id}/>
            <div className='post-info-head'>
                <PostTitle title={title} translations={translations}/>
                <div className='under-title'>
                    <RatingButtons _id={_id} svgDefaultStyle={state.svgDefaultStyle} ratingAndViewData={ratingAndViewData} setRatingAndViewData={setRatingAndViewData}/>
                    {
                        postType === 'product'?
                            <Price price={price} currency={currency}  svgDefaultStyle={state.svgDefaultStyle}/>:
                            null
                    }

                    <DownloadLink downloadLink={downloadLink} render={downloadLink} svgDefaultStyle={state.svgDefaultStyle}/>
                </div>
                <AddToBasket productId={_id} render={postType === 'product'} svgDefaultStyle={state.svgDefaultStyle}/>
            </div>

            <div className='post-info-body'>
                <div className="meta-description">
                    <PostDescription  description={description} translations={translations}/>
                    <TagsAndCategoriesActors svgDefaultStyle={state.svgDefaultStyle} type='actors' data={actors || []}/>
                    <TagsAndCategoriesActors svgDefaultStyle={state.svgDefaultStyle} type='tags' data={tags || []}/>
                    <TagsAndCategoriesActors svgDefaultStyle={state.svgDefaultStyle} type='categories' data={categories || []}/>
                </div>
            </div>
        </div>
    );
};
export default withRouter(PostInfo);
