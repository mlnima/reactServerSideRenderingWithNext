import React, {FC} from 'react';
import styled from "styled-components";
import Link from "next/link";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";

const PromotionCardListSmallStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: auto;
  .promotion-card-link-external,.promotion-card-link-internal{
    margin: 1px;
    color: var(--post-element-text-color,#ccc);
    display: flex;
    align-items: center;
  
    &:hover{
      color: var(--main-active-color,#f90);
    }
    span{
      width: 20px;
      height: 20px;
      background-color: var(--main-active-color,#f90);
      border-radius: 50%;
      text-align: center;
    }
    h3{
      font-weight: initial;
      margin: 0 0 0 2px;
      
    }
    svg{
      
    }
  }
`


interface PromotionCardListSmallPropTypes {
    title: string,
    post: PostTypes,
    onActivateLoadingHandler:any,
    index?:number
}

const PromotionCardListSmall:FC<PromotionCardListSmallPropTypes> = 
    ({
         title,
         post,
         onActivateLoadingHandler,
         index
     }) => {
    return (
        <PromotionCardListSmallStyledDiv>
            <a target='_blank'
               href={post?.redirectLink}
               rel="nofollow noopener"
               className='promotion-card-link-external'
            >
                <span>{title.charAt(0).toUpperCase()}</span>
               <h3>{title}</h3>
            </a>
            <Link href={`/post/${post?.postType}/${post._id}`} >
                <a className='promotion-card-link-internal' onClick={onActivateLoadingHandler}>
                    <img src='/public/asset/images/icons/search.svg' alt={title}/>
                </a>
            </Link>
        </PromotionCardListSmallStyledDiv>
    );
};


// @ts-ignore
export default PromotionCardListSmall;
