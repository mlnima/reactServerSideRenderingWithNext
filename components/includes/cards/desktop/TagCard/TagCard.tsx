import {FC, useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import TagCardMedia from "./TagCardMedia";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";


const TagCardStyledDiv = styled.div`
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  font-size: 14px;
  
  .tag-card-link {
    position: relative;
    display: block;
    cursor: pointer;
    .tag-card-info {
      display: flex;
      align-items: center;
      justify-content: center;
      //width: 95%;
      //margin: auto;

      .tag-card-title, .tag-card-count {
        width: fit-content;
        color: var(--post-element-text-color, #ccc);
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        font-size: 14px;
        font-weight: normal;
        padding: 3px 0;
        margin: 3px 0;

        &:hover {
          color: var(--main-active-color, #ccc);
        }
      }
    }

    .tag-card-count {
      margin: 0 4px;
      color: var(--main-text-color);
    }
  }
`

interface TagCardPropTypes {
    tag: Meta,
    onActivateLoadingHandler: any
    index?:number
}

const TagCard: FC<TagCardPropTypes> = ({ tag, onActivateLoadingHandler,index}) => {

    const {t} = useTranslation('customTranslation');
    const {locale} = useRouter();

    const cardTitle = useMemo(() => {
        const checkedTitle = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            tag?.name :
            tag?.translations?.[locale]?.name || t(tag?.name, {ns: 'customTranslation'})
        return capitalizeFirstLetter(checkedTitle)
    }, [tag?.name]);

    return (
        <TagCardStyledDiv className={'tag-card'}>
            <Link href={`/tag/${tag._id}`}>
                <a className={'tag-card-link'}
                   onClick={onActivateLoadingHandler}
                   title={cardTitle as string}
                >
                    {/*<div className={'tag-card-image'}>*/}
                        <TagCardMedia imageUrl={tag.imageUrl}
                                      mediaAlt={cardTitle as string}
                                      index={index}
                        />
                    {/*</div>*/}
                    <div className={'tag-card-info'}>
                        <h3 className={'tag-card-title'}>
                            {cardTitle}
                        </h3>
                        {tag?.count ? <span className={'tag-card-count'}>
                                      (<var>{tag?.count}</var>)
                                      </span>
                            : null
                        }
                    </div>
                </a>
            </Link>
        </TagCardStyledDiv>

    );
};

export default TagCard;

