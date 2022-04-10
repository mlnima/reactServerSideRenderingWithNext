import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import MobileCategoryCardMedia from "@components/includes/cards/mobile/MobileCategoryCard/MobileCategoryCardMedia";

const MobileCategoryCardStyledArticle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  max-width: ${({cardWidth}: { cardWidth: number }) => `${cardWidth}px`};

  .category-card-link{
    width: 100%;
    color: var(--post-element-text-color, #ccc);
    .category-card-info{
      display: flex;
      align-items: center;
      justify-content: center;
      
      .category-card-title, .category-card-count {
        color: var(--post-element-text-color, #ccc);
      }
      
      .category-card-title {
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

      .category-card-count {
        margin: 0 2px;
      }
    }
  }
`

interface MobileCategoryCardPropTypes {
    category: Meta,
    onActivateLoadingHandler: any,
    cardWidth: number,
    index?:number,
    isAppleMobileDevice:boolean
}

const MobileCategoryCard: FC<MobileCategoryCardPropTypes> =
    ({
         category,
         onActivateLoadingHandler,
         index,
         isAppleMobileDevice,
         cardWidth
     }) => {

        const {t} = useTranslation('customTranslation');
        const {locale} = useRouter();

        const cardTitle = useMemo(() => {
            const checkedTitle = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                category?.name :
                category?.translations?.[locale]?.name || t(category?.name, {ns: 'customTranslation'})
            return capitalizeFirstLetter(checkedTitle)
        }, [category?.name]);

        return (
            <MobileCategoryCardStyledArticle cardWidth={cardWidth}>
                <Link href={`/category/${category?._id}`}>
                    <a className='category-card-link'
                       onClick={onActivateLoadingHandler}
                       title={cardTitle as string}
                    >
                        <div className={'mobile-category-card-image'}>
                            <MobileCategoryCardMedia imageUrl={category.imageUrl}
                                                     mediaAlt={cardTitle as string}
                                                     index={index}
                                                     isAppleMobileDevice={isAppleMobileDevice}
                            />
                        </div>
                        <div className={'category-card-info'}>
                            <h3 className={'category-card-title'}>
                                {cardTitle}
                            </h3>
                            {category?.count ? <span className={'category-card-count'}>
                                           (<var>{category?.count}</var>)
                                           </span>
                                : null
                            }

                        </div>
                    </a>
                </Link>

            </MobileCategoryCardStyledArticle>
        )
    };
export default MobileCategoryCard
