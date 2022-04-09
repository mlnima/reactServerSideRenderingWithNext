import React, {FC} from 'react';
import styled from "styled-components";
import Link from "next/link";

const CardTitleStyledHeader = styled.header`
  
  color: var(--post-element-text-color, #ccc);
  width: 100%;
  font-size: 14px;
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
      color: var(--main-active-color, #f90);
    }
  }

  &:hover {
    flex-wrap: wrap;
    white-space: normal;
  }
`

interface VideoCardTitlePropTypes {
    title: string,
    postUrl: string,
    onActivateLoadingHandler: any
}

const VideoCardTitle: FC<VideoCardTitlePropTypes> = ({title, postUrl, onActivateLoadingHandler}) => {

        return (
            <CardTitleStyledHeader className={'video-card-title entry-header'}>
                <Link href={postUrl}>
                    <a rel={'next'}
                       className={'video-card-title-link'}
                       title={title}
                       onClick={onActivateLoadingHandler}>
                        <span className={'card-header'}>{title}</span>
                    </a>

                </Link>
            </CardTitleStyledHeader>

        );
    };
export default VideoCardTitle;

