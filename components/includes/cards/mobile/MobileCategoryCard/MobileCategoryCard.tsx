import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import MobileCategoryCardMedia from "@components/includes/cards/mobile/MobileCategoryCard/MobileCategoryCardMedia";

const MobileCategoryCardStyledArticle = styled.article`
  margin: 1vw;
  background-color: var(--post-element-background-color, #131314);
  width: ${({postsPerRawForMobile}: { postsPerRawForMobile: number }) => `calc(96vw / ${postsPerRawForMobile || 2})`};
  max-width: 320px;
  .category-card-link{
    width: 100%;
    color: var(--post-element-text-color, #ccc);
    .category-card-info{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95%;
      margin: auto;
      
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
    postsPerRawForMobile: number,
    category: Meta,
    onActivateLoadingHandler: any,
}

const MobileCategoryCard: FC<MobileCategoryCardPropTypes> =
    ({
         category,
         onActivateLoadingHandler,
         postsPerRawForMobile
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
            <MobileCategoryCardStyledArticle postsPerRawForMobile={postsPerRawForMobile} >
                <Link href={`/category/${category?._id}`}>
                    <a className='category-card-link'
                       onClick={onActivateLoadingHandler}
                       title={cardTitle as string}
                    >
                        <div className={'mobile-category-card-image'}>
                            <MobileCategoryCardMedia imageUrl={category.imageUrl}
                                                     mediaAlt={cardTitle as string}
                                                     postsPerRawForMobile={postsPerRawForMobile}
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
