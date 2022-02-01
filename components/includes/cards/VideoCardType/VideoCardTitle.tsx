import React from 'react';
import styled from "styled-components";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";
import {Meta} from "../../../../_variables/TypeScriptTypes/GlobalTypes";

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
  
  .video-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
 
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
      height: initial;
      margin: initial;
    }
  }
`

interface VideoCardTitlePropTypes {
    title: string,
    cardWidth: number,
    actors: Meta[],
    tags: Meta[],
    categories: Meta[],
}


const VideoCardTitle = ({title, actors, tags, categories, cardWidth}: VideoCardTitlePropTypes) => {

    return (
        <CardTitleStyledDiv className={'video-card-title'} cardWidth={cardWidth}>
                    {title}
            <CardMetaRenderer metas={[...actors || [],...tags|| [],...categories|| []]}/>
        </CardTitleStyledDiv>

    );
};
export default VideoCardTitle;

