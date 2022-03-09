import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import MobileTagCardMedia from "./MobileTagCardMedia";

const MobileTagCardStyledArticle = styled.article`
  margin: 1vw;
  background-color: var(--post-element-background-color, #131314);
  width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 2})`};
 
  .tag-card-link{
    width: 100%;
    color: var(--post-element-text-color, #ccc);
    .tag-card-info{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95%;
      margin: auto;
      
      .tag-card-title, .tag-card-count {
        color: var(--post-element-text-color, #ccc);
      }
      
      .tag-card-title {
        width: fit-content;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 14px;
        font-weight: normal;
        padding: 3px 0;
        margin: 3px 0;
      }

      .tag-card-count {
        margin: 0 2px;
      }
    }
  }
`

interface MobileTagCardPropTypes {
    postsPerRawForMobile: number,
    tag: Meta,
    onActivateLoadingHandler: any,
}

const MobileTagCard: FC<MobileTagCardPropTypes> =
    ({
         tag,
         onActivateLoadingHandler,
         postsPerRawForMobile
     }) => {

        const {t} = useTranslation('customTranslation');
        const {locale} = useRouter();

        const cardTitle = useMemo(() => {
            const checkedTitle = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                tag?.name :
                tag?.translations?.[locale]?.name || t(tag?.name, {ns: 'customTranslation'})
            return capitalizeFirstLetter(checkedTitle)
        }, [tag?.name]);

        return (
            <MobileTagCardStyledArticle postsPerRawForMobile={postsPerRawForMobile} >
                <Link href={`/tag/${tag?._id}`}>
                    <a className='tag-card-link'
                       onClick={onActivateLoadingHandler}
                       title={cardTitle as string}
                    >
                        <div className={'mobile-tag-card-image'}>
                            <MobileTagCardMedia imageUrl={tag.imageUrl}
                                                     mediaAlt={cardTitle as string}
                                                     postsPerRawForMobile={postsPerRawForMobile}
                            />
                        </div>
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

            </MobileTagCardStyledArticle>
        )
    };
export default MobileTagCard