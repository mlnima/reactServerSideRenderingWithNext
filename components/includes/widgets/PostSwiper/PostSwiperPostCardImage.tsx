import React from 'react';
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";

const PostSwiperPostCardImage = ({post,removePostOnImageError}:{post:PostTypes,removePostOnImageError:any}) => {
    const noImageUrl = '/static/images/noImage/no-image-available.png';
    return (
        <img src={post.mainThumbnail||noImageUrl} alt={post.title} onError={()=>removePostOnImageError(post._id) }/>
    );
};

export default PostSwiperPostCardImage;
