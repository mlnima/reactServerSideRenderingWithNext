import {FC, useMemo} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import {useRouter} from "next/router";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import CardImageRenderer from "@components/includes/cards/CardImageRenderer";

const TagCardStyle = styled.article`
  background-color: var(--post-element-background, #131314);
  width: 100%;
  margin: 0 auto;

  .tag-card-link {
  
    color: var(--post-element-text-color, #ccc);

    .entry-header{
      width: 100%;
      margin: 3px 0;
      text-align: center;
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

                        <header className={'entry-header'}>
                            <span className={'cat-title'}>
                                {cardTitle}
                            </span>
                        </header>

                    </a>
                </Link>
            </TagCardStyle>
        )
    };
export default TagCard
