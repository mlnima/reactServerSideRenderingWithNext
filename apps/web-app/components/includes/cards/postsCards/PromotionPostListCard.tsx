import React, {FC, useMemo} from "react";
import styled from "styled-components";
import {Post} from "typescript-types";
import CardTitle from "@components/includes/cards/asset/CardTitle/CardTitle";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import Link from "next/link";

const Style = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
  .external-link-index{
    display: flex;
    align-items: center;
    width: 100%;
    .post-index{
      padding: 10px;
      box-sizing: border-box;
    }
    .title{
    
      a{
        
      }
    }
  }

  
  .internal-link{
    justify-self: flex-end;
    display: flex;
    justify-content: center;
  
  }
`;

interface PropTypes {
    post:Post,
    index:number
}

const PromotionPostListCard: FC<PropTypes> = ({post,index}) => {

    return (
        <Style className={'posts-list'}>
            <div className={'external-link-index'}>
                <span className={'post-index'}>{index}.</span>
                <CardTitle title={post.title} targetLink={'_blank'} url={post.redirectLink}/>
            </div>

            <Link href={`/post/${post?.postType}/${post._id}`} className={'internal-link'}>
                    <SvgRenderer svgUrl={'/asset/images/icons/magnifying-glass-solid.svg'}
                                 size={15}
                                 customClassName={'searchbar-submit-btn-icon'}
                                 color={'var(--main-text-color, #fff)'}/>
            </Link>
        </Style>
    )
};
export default PromotionPostListCard;