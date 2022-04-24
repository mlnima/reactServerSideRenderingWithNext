import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import {useRouter} from "next/router";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import CardImageRenderer from "@components/includes/cards/CardImageRenderer";

const TagCardStyle = styled.article`
  background: var(--post-element-background, #131314);
  width: 100%;
  margin: 0 auto;

  .tag-card-link {
    width: 100%;
    color: var(--post-element-text-color, #ccc);

    .tag-card-info {
      display: flex;
      align-items: center;
      justify-content: center;

      .tag-card-title, .tag-card-count {
        color: var(--post-element-text-color, #ccc);
      }

      .tag-card-title {
        width: fit-content;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        font-size: 15px;
        font-weight: normal;
        padding: 3px 0;
        margin: 3px 0;
      }

      .tag-card-count {
        margin: 0 2px;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    max-width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
  }
`

interface TagCardPropTypes {
    tag: Meta,
    index?: number,
    postsPerRawForMobile: number,
    cardWidth: number,
}

const TagCard: FC<TagCardPropTypes> =
    ({
         tag,
         index,
         postsPerRawForMobile,
         cardWidth
     }) => {

        const {locale} = useRouter();

        const cardTitle = useMemo(() => {
            const checkedTitle = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
                tag?.name :
                tag?.translations?.[locale]?.name || tag?.name
            return capitalizeFirstLetter(checkedTitle)
        }, [tag?.name]);

        return (
            <TagCardStyle cardWidth={cardWidth} className={'tag-card'}>
                <Link href={`/tag/${tag?._id}`}>
                    <a className='tag-card-link' title={cardTitle as string}>
                        <CardImageRenderer imageUrl={tag.imageUrl}
                                           mediaAlt={cardTitle}
                                           index={index}
                                           postsPerRawForMobile={postsPerRawForMobile}
                                           cardWidth={cardWidth}/>

                        <div className={'tag-card-info'}>
                            <h3 className={'tag-card-title'}>
                                {cardTitle}
                            </h3>
                            {!!tag?.count &&
                                    <span className={'category-card-count'}>(<var>{tag?.count}</var>)</span>
                            }
                        </div>

                    </a>
                </Link>
            </TagCardStyle>
        )
    };
export default TagCard
