import {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";

const ArticleTypeCardTitleStyledDiv = styled.div`
  color: var(--post-element-text-color, #ccc);
  width: calc(48vw - 6px);
  margin: 2px 0;
  max-width: 98%;
  display: flex;
  align-items: center;
  -webkit-box-orient: vertical;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  //text-align: center;


  .article-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
    
    &:hover {
      color: var(--main-active-color, #fff);
    }
  }

  &:hover {
    flex-wrap: wrap;
    white-space: normal;
    
  }

  @media only screen and (min-width: 768px) {
 
    width: ${(props: { cardWidth: number }) => `${props?.cardWidth - 2}px`};
    font-size: 14px;

    .article-card-title-link {
      height: initial;
      margin: initial;
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


const ArticleTypeCardTitle: FC<ArticleTypeCardTitlePropTypes> = ({title, tags, categories, cardWidth, onActivateLoadingHandler, postUrl}) => {

    return (
        <ArticleTypeCardTitleStyledDiv className={'article-card-title'}
                                       cardWidth={cardWidth}
        >
            <Link href={postUrl} scroll={false}>
                <a rel='next'
                   className='article-card-title-link'
                   title={title}
                   onClick={onActivateLoadingHandler}
                >
                    {title}
                </a>
            </Link>

            <CardMetaRenderer metas={[...tags || [], ...categories || []]}/>
        </ArticleTypeCardTitleStyledDiv>
    )
}

export default ArticleTypeCardTitle;
