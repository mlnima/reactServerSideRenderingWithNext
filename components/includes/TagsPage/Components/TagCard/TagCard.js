import Link from "next/link";
import {useRouter} from "next/router";
import TagCardMedia from "./TagCardMedia";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const TagCardStyledLink = styled.a`
  width: 48vw;
  margin: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  .tag-card-title {
    width: 100%;
    color: var(--main-text-color);
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-weight: initial;
    font-size: 12px;

    &:hover {
      filter: invert(70%);
    }
  }

  @media only screen and (min-width: 768px) {
      width: ${props=>props.cardWidth}px;
      margin: 5px;

      .tag-card-title {
        font-size: 14px;
      }
  }
`

const TagCard = ({t,cardWidth, tag,onActivateLoadingHandler}) => {
    const router = useRouter()
    return (
        <Link href={`/tag/${tag._id}`}>
            <TagCardStyledLink className='tag-card-link' onClick={onActivateLoadingHandler} cardWidth={cardWidth}>

                <TagCardMedia cardWidth={cardWidth} imageUrl={tag.imageUrl} mediaAlt={tag?.translations?.[router.locale]?.name || tag.name} tagId={tag._id}/>
                <h3 className='tag-card-title'> { tag?.translations?.[router.locale]?.name || t([t(`customTranslation:${tag?.name}`)])}</h3>
            </TagCardStyledLink>
        </Link>);
};

export default withTranslation(['customTranslation'])(TagCard);

