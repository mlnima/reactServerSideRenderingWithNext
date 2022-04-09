import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

let LearnTypeCardMediaStyledDiv = styled.div`
  position: relative;
`

interface LearnTypeCardMediaPropTypes {
    post: PostTypes,
    categoriesImages?: string[],
    mediaAlt: string,
    index?: number
}

const LearnTypeCardMedia: FC<LearnTypeCardMediaPropTypes> =
    ({
         mediaAlt,
         index,
         post,
         categoriesImages

     }) => {
        const dynamicImage = true
        const [imageUrlToRender, setImageUrlToRender] = useState(() => {
            if (post?.mainThumbnail) {
                return post?.mainThumbnail
            } else if (categoriesImages?.length) {
                return categoriesImages[Math.floor(Math.random() * categoriesImages?.length)]
            }
        })

        useEffect(() => {
            if (dynamicImage && !post?.mainThumbnail && categoriesImages?.length) {
                setInterval(() => {
                    setImageUrlToRender(categoriesImages[Math.floor(Math.random() * categoriesImages?.length)])
                }, 7000)
            }
        }, []);

        return (

            <LearnTypeCardMediaStyledDiv className='learn-post-card-media'>
                <CardImageRenderer imageUrl={imageUrlToRender}
                                   mediaAlt={mediaAlt}
                                   index={index}

                />
            </LearnTypeCardMediaStyledDiv>
        );
    };
export default LearnTypeCardMedia;
