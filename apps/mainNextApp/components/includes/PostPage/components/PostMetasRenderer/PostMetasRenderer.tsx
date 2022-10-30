import Link from "next/link";
import styled from "styled-components";
import React, {FC, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import PostMeta from "./PostMeta";
import PostActor from "./PostActor";
import capitalizeFirstLetters from "@_variables/util/capitalizeFirstLetters";


const PostMetaStyledDiv = styled.div`
  display: block;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .title{
    font-weight: initial;
    font-size: initial;
  }
  
  .post-meta-toggle{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  
  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap:wrap ;
    
    .post-meta-item{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-right: 8px;
      margin-bottom:8px;
      color: var(--meta-text-color, #000);
      text-decoration: none;

      p {
        word-break: keep-all;
      }

      .categories-logo, .tags-logo {
        margin-right: 5px;
        width: 14px;
        height: 14px;
        background-color: var(--meta-text-color, #000);
      }
    }
    
    .actors {

      //font-weight: bold;
      //font-size: large;
      .item-image {
        padding: 0;
        margin-right:4px;
      
        width: 33px;
        height: 33px;
        border-radius: 50%;
        object-fit: cover;
      }

      .actor-meta-svg {
        padding: 0 5px;
      }
      
      
    }
  }
`

interface PostMetaPropType {
    type: string,
    pageContentRef?: any
}

const PostMetasRenderer: FC<PostMetaPropType> = ({type}) => {

    const containerRef = useRef<HTMLInputElement>()
    const post = useSelector(({posts}: Store) => posts.post)
    const metas = type == 'all' ? [...post?.actors, ...post?.categories, ...post?.tags] : post?.[type]
    const filterMeta = metas?.length ? metas.filter(m => m.name?.length > 1) : []

    const renderData = filterMeta.map(item =>item.type === 'actors' ?
        <PostActor key={item._id} item={item}/>:
        <PostMeta key={item._id} item={item}/>
    );

    if (filterMeta?.length) {
        return (
            <PostMetaStyledDiv className={`${type}-container post-meta`} ref={containerRef} >
                {(type !== 'all' && !!type) && <h2 className={'title'}>{capitalizeFirstLetters(type)}</h2>}
                <div className="content">
                    {renderData}

                </div>
            </PostMetaStyledDiv>
        );
    } else return null

};

export default PostMetasRenderer;