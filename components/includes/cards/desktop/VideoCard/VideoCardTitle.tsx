import React, {FC} from 'react';
import styled from "styled-components";
import Link from "next/link";

const CardTitleStyledHeader = styled.header`
  width: ${(props: { cardWidth: number }) => `calc(${props?.cardWidth} - 4)px`};
  font-size: 14px;
  color: var(--post-element-text-color, #ccc);
  margin: 2px 0;
  max-width: 98%;
  display: flex;
  align-items: center;
  
  .video-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
    height: initial;
    margin: initial;
    

    .card-header {
      margin: 0;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
    }

    &:hover {
      color: var(--main-active-color, #fff);
    }
  }

  &:hover {
    flex-wrap: wrap;
    white-space: normal;
  }

`

interface VideoCardTitlePropTypes {
    title: string,
    cardWidth: number,
    postUrl: string,
    onActivateLoadingHandler: any
}


const VideoCardTitle: FC<VideoCardTitlePropTypes> =
    ({
         title,
         postUrl,
         cardWidth,
         onActivateLoadingHandler
     }) => {

        return (
            <CardTitleStyledHeader className={'video-card-title entry-header'} cardWidth={cardWidth}>
                <Link href={postUrl}>
                    <a rel={'next'}
                       className={'video-card-title-link'}
                       title={title}
                       onClick={onActivateLoadingHandler}
                    >
                        <span className={'card-header'}>{title}</span>
                    </a>
                </Link>
                {/*<CardMetaRenderer metas={[...actors || [], ...tags || [], ...categories || []]}/>*/}
            </CardTitleStyledHeader>

        );
    };
export default VideoCardTitle;

