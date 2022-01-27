import Link from "next/link";
import {useRouter} from "next/router";
import TagCardMedia from "./TagCardMedia";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const TagCardStyledDiv = styled.div`
  margin: 5px;

  .tag-card-link {
    .tag-card-info{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 95%;
      margin: auto;
      .tag-card-title {
        width: fit-content;
        color: var(--main-active-color);
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        font-size: 12px;
        padding: 3px 0;
        margin: 3px 0;
        &:hover {
          color: var(--post-element-text-color, #ccc);
        }
      }
    }
    
    .tag-card-count {
      margin: 0 2px;
      color: var(--main-text-color);
    }
  }
`
const TagCard = ({t, cardWidth, tag, onActivateLoadingHandler}) => {
    const locale = useRouter().locale

    return (
        <TagCardStyledDiv className={'tag-card'}>
            <Link href={`/tag/${tag._id}`}>
                <a className={'tag-card-link'}
                   onClick={onActivateLoadingHandler}
                   title={tag?.translations?.[locale]?.name || t([t(`customTranslation:${tag?.name}`)])}
                >
                    <div className={'tag-card-image'}>
                        <TagCardMedia cardWidth={cardWidth}
                                      imageUrl={tag.imageUrl}
                                      mediaAlt={tag?.translations?.[locale]?.name || tag.name}
                        />
                    </div>
                    <div className={'tag-card-info'}>
                        <h3 className={'tag-card-title'}>
                            {tag?.translations?.[locale]?.name || t(`customTranslation:${tag?.name}`)}
                        </h3>
                        {tag?.count ? <span className={'tag-card-count'}>({tag?.count})</span> : null}
                    </div>
                </a>
            </Link>
        </TagCardStyledDiv>

    );
};

export default withTranslation(['customTranslation'])(TagCard);

