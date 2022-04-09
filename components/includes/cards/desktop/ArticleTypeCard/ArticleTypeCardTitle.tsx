import {FC} from "react";
import styled from "styled-components";
import Link from "next/link";

const ArticleTypeCardTitleStyledHeader = styled.header`
  color: var(--post-element-text-color, #ccc);
  width: 100%;
  font-size: 14px;
  margin: 2px 0;
  max-width: 98%;
  display: flex;
  align-items: center;
  
  .article-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
    text-align: center;
    width: 100%;
    height: initial;
    margin: initial;
    
    .card-header {
      margin: 0;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
    }
    
    &:hover {
      color: var(--main-active-color, #f90);
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
}

const ArticleTypeCardTitle: FC<ArticleTypeCardTitlePropTypes> = ({title,   onActivateLoadingHandler, postUrl}) => {

    return (
        <ArticleTypeCardTitleStyledHeader className={'article-card-title'}>
            <Link href={postUrl} >
                <a rel='next'
                   className='article-card-title-link'
                   title={title}
                   onClick={onActivateLoadingHandler}
                >
                    <span>{title}</span>
                </a>
            </Link>

        </ArticleTypeCardTitleStyledHeader>
    )
}

export default ArticleTypeCardTitle;
