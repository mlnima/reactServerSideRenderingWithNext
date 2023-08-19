import React, {FC} from "react";
import styled from "styled-components";
import {Post} from "typescript-types";
import CardTitle from "../../asset/CardTitle/CardTitle";
import Link from "next/link";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
        <Style className={'posts-list-item'}>
            <div className={'external-link-index'}>
                <span className={'post-index'}>{index}.</span>
                <CardTitle title={post.title} targetLink={'_blank'} url={post.redirectLink}/>
            </div>

            <Link href={`/post/${post?.postType}/${post._id}`} className={'internal-link'} prefetch={false}>
                <FontAwesomeIcon className={'searchbar-submit-btn-icon'}
                                 icon={faMagnifyingGlass}
                                 style={{width:15,height:15}}/>
            </Link>
        </Style>
    )
};
export default PromotionPostListCard;