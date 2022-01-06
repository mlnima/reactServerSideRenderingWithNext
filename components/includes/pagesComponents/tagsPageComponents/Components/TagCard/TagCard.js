import Link from "next/link";
import {useRouter} from "next/router";
import TagCardMedia from "./TagCardMedia";
import {withTranslation} from "next-i18next";
import styled from "styled-components";
const TagCardStyledDiv = styled.div`
  .tag-card-info{

    .tag-card-link{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 95%;
      margin: auto;
      color: var(--main-text-color);
      .tag-card-title {
        width: fit-content;
        color: var(--main-active-color);
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 12px;
        padding: 3px 0;
        margin: 3px 0;
        &:hover {
          color: var(--post-element-text-color, #ccc);
        }
      }
      .tag-card-count{
        margin: 0 2px;
        color: var(--main-text-color);
      }
    }


  }
`
const TagCard = ({t, cardWidth, tag, onActivateLoadingHandler}) => {
    const router = useRouter()

    return (
        <TagCardStyledDiv className={'tag-card'}>
            <div className={'tag-card-image'}>
                <Link href={`/tag/${tag._id}`}>
                    <a className={'tag-card-link'} onClick={onActivateLoadingHandler}>
                        <TagCardMedia cardWidth={cardWidth} imageUrl={tag.imageUrl} mediaAlt={tag?.translations?.[router.locale]?.name || tag.name} tagId={tag._id}/>
                    </a>
                </Link>
            </div>
            <div className={'tag-card-info'}>
                <Link href={`/tag/${tag._id}`}>
                    <a className={'tag-card-link'} onClick={onActivateLoadingHandler}>
                        <h3 className={'tag-card-title'}> {tag?.translations?.[router.locale]?.name || t([t(`customTranslation:${tag?.name}`)])}</h3>
                        {tag?.count ? <span className={'tag-card-count'}>({tag?.count})</span> : null}
                    </a>
                </Link>
            </div>
        </TagCardStyledDiv>

    );
};

export default withTranslation(['customTranslation'])(TagCard);

