import React, {useEffect, useState, useContext, useRef} from 'react';
import styled from "styled-components";
import Link from "next/link";

const CardTitleStyledDiv = styled.div`
  //position: relative;
  color: var(--post-element-text-color, #ccc);
  width: calc(50vw - 5.6px);
  display: flex;
  align-items: center;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;

  .card-actors, .card-tags, .card-categories {
    margin: 0 3px;
    

    .card-actor, .card-tag, .card-category {
      font-size: 12px;
      margin-right: 5px;
      color: var(--main-active-color, #ccc);

      &:hover {
        filter: invert(70%);
      }
    }

    .card-actor {
      &:hover {
        filter: invert(70%);
      }
    }
  }
  .video-card-title-link{
    color: var(--post-element-text-color, #ccc);
    h3 {
      font-weight: initial;
      font-size: 12px;
      margin: 0;


      &:hover {
        filter: invert(70%);
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
    width: ${(props:{cardWidth:number}) => `${props?.cardWidth}px`};
  }
`

interface VideoCardTitlePropTypes {
    title: string,
    postUrl: string,
    onActivateLoadingHandler: any,
    cardWidth: number,
    actors: {
        type: string,
        name: string,
        _id: string,
    }[],
    tags: {
        type: string,
        name: string,
        _id: string,
    }[],
    categories: {
        type: string,
        name: string,
        _id: string,
    }[],
}


const VideoCardTitle = ({title, actors, tags, categories,cardWidth,onActivateLoadingHandler,postUrl}: VideoCardTitlePropTypes) => {

    return (
        <CardTitleStyledDiv cardWidth={cardWidth}>
            {actors ?
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
                <a rel='next' className='video-card-title-link' title={title} onClick={onActivateLoadingHandler}>
            <h3>
                {title}
            </h3>
                </a>
            </Link>

            {tags ?
                <div className={'card-tags'}>
                    {tags.map(tag => {
                        const typePath = tag.type === 'tags' ? 'tag' :
                            tag.type === 'categories' ? 'category' :
                                tag.type === 'actors' ? 'actor' : 'category'
                        return (
                            <Link href={`/${typePath}/${tag._id}`} key={tag._id}>
                                <a className={'card-tag'} title={tag.name}>
                                    # {tag.name}
                                </a>
                            </Link>
                        )
                    })
                    }
                </div> : null
            }
            {categories ?
                <div className={'card-categories'}>
                    {categories.map(category => {
                        const typePath = category.type === 'tags' ? 'tag' :
                            category.type === 'categories' ? 'category' :
                                category.type === 'actors' ? 'actor' : 'category'
                        return (
                            <Link href={`/${typePath}/${category._id}`} key={category._id}>
                                <a className={'card-category'} title={category.name}>
                                    # {category.name}
                                </a>
                            </Link>
                        )
                    })
                    }
                </div> : null
            }

        </CardTitleStyledDiv>
    );
};
export default VideoCardTitle;
