import React from 'react';
import styled from "styled-components";
import Link from "next/link";
const VideoCardTypeListTitleStyledDiv = styled.div`
  
  display: inline-flex;
  color: var(--post-element-text-color, #ccc);
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  
  .card-actors,.card-meta  {
    margin: 0 3px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-line-clamp: 1;
    overflow: hidden;
    
    .card-actor, .card-metadata {
      font-size: 12px;
      margin-right: 5px;
      color: var(--main-active-color, #ccc);
      &:hover {
        filter: invert(70%);
      }
    }
    
    &:hover {
      overflow: initial;
      -webkit-line-clamp: 20;
    }
  }
  .video-card-title-link{
    color: var(--post-element-text-color, #ccc);
    h3 {
      font-weight: initial;
      font-size: 12px;
      margin: 0;
      overflow-wrap: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      white-space: normal;
      -webkit-line-clamp: 2;
      overflow: hidden;


      &:hover {
        filter: invert(70%);
        -webkit-line-clamp: 20;
      }
    }
  }


  &:hover {
    display: inline-block;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media only screen and (min-width: 768px) {
  //  width: calc(320px - 168px );
  }
`

interface VideoCardTypeListTitlePropTypes {
    title: string,
    postUrl: string,
    onActivateLoadingHandler: any,
    actors?: {
        type: string,
        name: string,
        _id: string,
    }[] | undefined,
    tags?: {
        type: string,
        name: string,
        _id: string,
    }[] | undefined,
    categories?: {
        type: string,
        name: string,
        _id: string,
    }[] | undefined,
}


const VideoCardTypeListTitle = ({title, actors, tags, categories,postUrl,onActivateLoadingHandler}: VideoCardTypeListTitlePropTypes) => {


    const renderMetadata = [...(tags?.length?tags:[]),...(categories?.length ? categories :[])].map(meta=>{
        const typePath = meta.type === 'tags' ? 'tag' :
            meta.type === 'categories' ? 'category' :
                meta.type === 'actors' ? 'actor' : 'category'

        return (
            <Link href={`/${typePath}/${meta._id}`} key={meta._id}>
                <a className={'card-metadata'} title={meta.name}>
                    # {meta.name}
                </a>
            </Link>
        )
    })


    return (
        <VideoCardTypeListTitleStyledDiv className='video-card-list-title'>
            {actors?.length ?
                <div className={'card-actors'}>
                    {actors.map(actor => {
                        const typePath = actor.type === 'tags' ? 'tag' :
                            actor.type === 'categories' ? 'category' :
                                actor.type === 'actors' ? 'actor' : 'category'
                        return (
                            <Link href={`/${typePath}/${actor._id}`} key={actor._id}>
                                <a className={'card-actor'} title={actor.name}>
                                    {actor.name}
                                </a>
                            </Link>
                        )
                    })
                    }
                </div> : null
            }
            <Link href={postUrl} scroll={false}>
                <a rel='next' className='video-card-title-link' title={title} onClick={ onActivateLoadingHandler}>
                    <h3>
                        {title}
                    </h3>
                </a>
            </Link>
            { tags?.length || categories?.length ?
                <div className={'card-meta'}>
                    {renderMetadata}
                </div>:null

            }
        </VideoCardTypeListTitleStyledDiv>
    );
};
export default VideoCardTypeListTitle;
