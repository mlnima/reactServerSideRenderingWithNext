import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";
import {MetasPropTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

const CardTitleStyledDiv = styled.div`
  color: var(--post-element-text-color, #ccc);
  width: calc(48vw - 6px);
  margin: 2px 0;
  max-width: 98%;
  display: flex;
  align-items: center;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  -webkit-transition: all .3s ease-in-out;
  
  .video-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
    margin: 0;
    transition: .3s;
    &:hover {
      color: var(--main-active-color,#fff);
    }
  }

  &:hover {
    flex-wrap: wrap;
    white-space: normal;
    
  }

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth: number }) => `${props?.cardWidth}px`};
    font-size: 14px;
    .video-card-title-link{
     
    }
  }
`

interface VideoCardTitlePropTypes {
    title: string,
    postUrl: string,
    onActivateLoadingHandler: any,
    cardWidth: number,
    actors: MetasPropTypes[],
    tags: MetasPropTypes[],
    categories: MetasPropTypes[],
}


const VideoCardTitle = ({title, actors, tags, categories, cardWidth, onActivateLoadingHandler, postUrl}: VideoCardTitlePropTypes) => {

    return (
        <CardTitleStyledDiv className={'video-card-title'} cardWidth={cardWidth}>
            <Link href={postUrl} scroll={false}>
                <a rel='next' className='video-card-title-link' title={title} onClick={onActivateLoadingHandler}>
                    {title}
                </a>
            </Link>
            {/*// @ts-ignore*/}
            <CardMetaRenderer metas={[...actors || [],...tags|| [],...categories|| []]}/>
        </CardTitleStyledDiv>

    );
};
export default VideoCardTitle;

