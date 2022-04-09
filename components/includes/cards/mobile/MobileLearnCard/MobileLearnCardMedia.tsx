import {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import MobileCardImageRenderer from "../../mobileAsset/MobileCardImageRenderer";

let MobileLearnCardMediaStyledDiv = styled.div`
  position: relative;
`

interface MobileLearnCardMediaPropTypes {
    post: PostTypes,
    categoriesImages?: string[],
    mediaAlt: string,
    index?:number,
    isAppleMobileDevice:boolean
}

const MobileLearnCardMedia: FC<MobileLearnCardMediaPropTypes> =
    ({
         post,
         mediaAlt,
         categoriesImages,
         isAppleMobileDevice
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
            <MobileLearnCardMediaStyledDiv className={'mobile-learn-card-media'}>
                <MobileCardImageRenderer imageUrl={imageUrlToRender}
                                         mediaAlt={mediaAlt}
                                         isAppleMobileDevice={isAppleMobileDevice}
                />
            </MobileLearnCardMediaStyledDiv>
        )

    };

export default MobileLearnCardMedia;

