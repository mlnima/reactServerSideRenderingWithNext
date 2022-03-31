import {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import CardMetaRenderer from "../../asset/CardMetaData/CardMetaRenderer";

const ArticleTypeCardTitleStyledDiv = styled.div`
  color: var(--post-element-text-color, #ccc);
  width: ${(props: { cardWidth: number }) => `${props?.cardWidth - 2}px`};
  //width: calc(48vw - 6px);
  margin: 2px 0;
  max-width: 98%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  //-webkit-box-orient: vertical;
  //white-space: nowrap;
  //text-overflow: ellipsis;
  //overflow: hidden;
  
  .article-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
    text-align: center;
    width: 100%;
    height: initial;
    margin: initial;
    h3{
      text-align: center;
      //justify-self: flex-start;
      font-weight: lighter;
      margin: 2px 0;
  
    }
    
    &:hover {
      color: var(--main-active-color, #fff);
    }
  }

  &:hover {
    flex-wrap: wrap;
    white-space: normal;
    
  }
  
`

interface ArticleTypeCardTitlePropTypes {
    title: string,
    postUrl: string,
    onActivateLoadingHandler: any,
    cardWidth: number,

}


const ArticleTypeCardTitle: FC<ArticleTypeCardTitlePropTypes> = ({title,  cardWidth, onActivateLoadingHandler, postUrl}) => {

    return (
        <ArticleTypeCardTitleStyledDiv className={'article-card-title'}
                                       cardWidth={cardWidth}
        >
            <Link href={postUrl} >
                <a rel='next'
                   className='article-card-title-link'
                   title={title}
                   onClick={onActivateLoadingHandler}
                >
                    <h3>{title}</h3>
                </a>
            </Link>

            {/*<CardMetaRenderer metas={[...tags || [], ...categories || []]}/>*/}
        </ArticleTypeCardTitleStyledDiv>
    )
}

export default ArticleTypeCardTitle;
