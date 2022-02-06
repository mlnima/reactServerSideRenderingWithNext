import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import CardMetaRenderer from "../../asset/CardMetaData/CardMetaRenderer";
import {Meta} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";

const VideoCardTypeListTitleStyledDiv = styled.div`
  color: var(--post-element-text-color, #ccc);
  width: 100%;
  flex-direction: column;
  font-size: var(--video-card-list-font-size);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  
  .video-card-title-link {
    color: var(--post-element-text-color, #ccc);
    &:hover {
      color: var(--main-active-color,#fff);
    }
  }
  
  &:hover {
    display: inline-block;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
//width: ${(props: { cardWidth?: number }) => `${props?.cardWidth || 250}px`};
interface VideoCardTypeListTitlePropTypes {
    title?: string,
    postUrl?: string,
    onActivateLoadingHandler?: any,
    actors?: Meta[] | undefined,
    tags?: Meta[] | undefined,
    categories?: Meta[] | undefined,
}

const VideoCardTypeListTitle = ({title, actors, tags, categories, postUrl, onActivateLoadingHandler}: VideoCardTypeListTitlePropTypes) => {

    return (
        <VideoCardTypeListTitleStyledDiv className='video-card-list-title' >
            <Link href={postUrl} scroll={false}>
                <a rel='next' className='video-card-title-link' title={title} onClick={onActivateLoadingHandler}>
                        {title}
                </a>
            </Link>
            {/*// @ts-ignore*/}
            <CardMetaRenderer metas={[...actors || [], ...tags || [], ...categories || []]}/>
        </VideoCardTypeListTitleStyledDiv>
    );
};
export default VideoCardTypeListTitle;
