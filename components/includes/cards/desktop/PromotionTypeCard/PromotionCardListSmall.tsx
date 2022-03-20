import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import {PostTypes} from "../../../../../_variables/TypeScriptTypes/PostTypes";

interface PromotionCardListSmallPropTypes {
    dir: string;
    views: number;
    rating: string;
    noImageUrl: string;
    postElementSize: string;
    widgetId: string;
    title: string;
    cardWidth: string;
    post: PostTypes;
    onActivateLoadingHandler:any;

}

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


const PromotionCardListSmall = (props: PromotionCardListSmallPropTypes) => {
    return (
        <PromotionCardListSmallStyledDiv>
            <a target='_blank'
               href={props?.post?.redirectLink}
               rel="nofollow noopener"
               className='promotion-card-link-external'
            >
                <span>{props.title.charAt(0).toUpperCase()}</span>
               <h3>{props.title}</h3>
            </a>
            <Link href={`/post/${props.post?.postType}/${props.post._id}`} >
                <a className='promotion-card-link-internal' onClick={props.onActivateLoadingHandler}>
                    <img src='/public/asset/images/icons/search.svg' alt={props.title}/>
                </a>
            </Link>
        </PromotionCardListSmallStyledDiv>
    );
};


// @ts-ignore
export default PromotionCardListSmall;
