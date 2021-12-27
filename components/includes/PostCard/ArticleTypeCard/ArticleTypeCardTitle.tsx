import React, {useEffect, useState, useContext, useRef} from 'react';
import styled from "styled-components";
import Link from "next/link";
import VideoCardTitle from "../VideoCardType/VideoCardTitle";


const ArticleTypeCardTitleStyledDiv = styled.div`
  
  color: var(--post-element-text-color, #ccc);
  width: calc(50vw - 5.6px);
  max-width: 98%;
  display: flex;
  align-items: center;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  
  *{
    font-size: 12px;
  }

  .card-actors, .card-tags, .card-categories {
    margin: 0 3px;
    .card-actor, .card-tag, .card-category {
      margin-right: 5px;
      color: var(--main-active-color, #ccc);
      &:hover {
        filter: invert(70%);
      }
    }
  }

  .article-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
    max-width: 100%;
    h3 {
      font-weight: initial;
      margin: 0;
      &:hover {
        filter: invert(70%);
      }
    }
  }

  &:hover {
    display: inline-block;
    white-space: normal;
  }

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth: number }) => `${props?.cardWidth}px`};
    *{
      font-size: 14px;
    }
  }
`

interface ArticleTypeCardTitlePropTypes {
    title: string,
    postUrl: string,
    onActivateLoadingHandler: any,
    cardWidth: number,
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


const ArticleTypeCardTitle = ({title, tags, categories, cardWidth, onActivateLoadingHandler, postUrl}: ArticleTypeCardTitlePropTypes) => {

    return(
        <ArticleTypeCardTitleStyledDiv className={'article-card-title'} cardWidth={cardWidth}>
            <Link href={postUrl} scroll={false}>
                <a rel='next' className='article-card-title-link' title={title} onClick={onActivateLoadingHandler}>
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

        </ArticleTypeCardTitleStyledDiv>
    )

}

export default ArticleTypeCardTitle;