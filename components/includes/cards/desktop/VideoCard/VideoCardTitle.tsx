import React, {FC} from 'react';
import styled from "styled-components";
import CardMetaRenderer from "../../asset/CardMetaData/CardMetaRenderer";
import {Meta} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";

const CardTitleStyledDiv = styled.div`
  width: ${(props: { cardWidth: number }) => `calc(${props?.cardWidth} - 4)px`};
  font-size: 14px;
  color: var(--post-element-text-color, #ccc);
  margin: 2px 0;
  max-width: 98%;
  display: flex;
  align-items: center;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  .video-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
    height: initial;
    margin: initial;

    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: normal;
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
    actors: Meta[],
    tags: Meta[],
    categories: Meta[],
    postUrl: string,
    onActivateLoadingHandler: any
}


const VideoCardTitle: FC<VideoCardTitlePropTypes> =
    ({
         title,
         postUrl,
         actors,
         tags,
         categories,
         cardWidth,
         onActivateLoadingHandler
     }) => {

        return (
            <CardTitleStyledDiv className={'video-card-title'} cardWidth={cardWidth}>
                <Link href={postUrl}>
                    <a rel={'next'}
                       className={'video-card-title-link'}
                       title={title}
                       onClick={onActivateLoadingHandler}
                    >
                        <h3>{title}</h3>
                    </a>
                </Link>
                <CardMetaRenderer metas={[...actors || [], ...tags || [], ...categories || []]}/>
            </CardTitleStyledDiv>

        );
    };
export default VideoCardTitle;

