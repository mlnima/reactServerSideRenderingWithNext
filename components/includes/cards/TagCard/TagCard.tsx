import Link from "next/link";
import {useRouter} from "next/router";
import TagCardMedia from "./TagCardMedia";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import {Meta} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import {FC, useMemo} from "react";
import capitalizeFirstLetter from "../../../../_variables/util/capitalizeFirstLetter";

const TagCardStyledDiv = styled.div`
  margin: 5px;

  .tag-card-link {
    .tag-card-info {
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
      margin: 0 4px;
      color: var(--main-text-color);
    }
  }
`
interface TagCardPropTypes{
    cardWidth:number,
    tag:Meta,
    onActivateLoadingHandler:any
}

const TagCard : FC<TagCardPropTypes> = ({cardWidth, tag, onActivateLoadingHandler}) => {
    const {t} = useTranslation('customTranslation');
    const {locale} = useRouter();

    const cardTitle = useMemo(()=>{
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            tag?.name :
            tag?.translations?.[locale]?.name || t(tag?.name, {ns: 'customTranslation'})
    },[tag?.name])

    return (
        <TagCardStyledDiv className={'tag-card'}>
            <Link href={`/tag/${tag._id}`}>
                <a className={'tag-card-link'}
                   onClick={onActivateLoadingHandler}
                   title={cardTitle}
                >
                    <div className={'tag-card-image'}>
                        <TagCardMedia cardWidth={cardWidth}
                                      imageUrl={tag.imageUrl}
                                      mediaAlt={cardTitle}
                        />
                    </div>
                    <div className={'tag-card-info'}>
                        <h3 className={'tag-card-title'}>
                            {capitalizeFirstLetter(cardTitle)}
                        </h3>
                        {tag?.count ? <span className={'tag-card-count'}>
                            (<var>{tag?.count}</var>)
                        </span> : null}
                    </div>
                </a>
            </Link>
        </TagCardStyledDiv>

    );
};

export default TagCard;

