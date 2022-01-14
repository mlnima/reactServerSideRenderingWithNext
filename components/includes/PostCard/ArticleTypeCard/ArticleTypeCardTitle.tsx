import styled from "styled-components";
import Link from "next/link";
import CardMetaRenderer from "../asset/CardMetaData/CardMetaRenderer";

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
  font-size: 12px;
  margin: 2px 0;
  
  .article-card-title-link {
    color: var(--post-element-text-color, #ccc);
    text-decoration: none;
    max-width: 100%;
    h3 {
      font-weight: initial;
      margin: 0;
      &:hover {
        color: var(--main-active-color,#fff);
      }
    }
  }

  &:hover {
    flex-wrap: wrap;
    white-space: normal;
  }

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth: number }) => `${props?.cardWidth - 2}px`};
    font-size: 14px;
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
            {/*// @ts-ignore*/}
            <CardMetaRenderer metas={[...tags || [],...categories || []]}/>
        </ArticleTypeCardTitleStyledDiv>
    )
}

export default ArticleTypeCardTitle;
