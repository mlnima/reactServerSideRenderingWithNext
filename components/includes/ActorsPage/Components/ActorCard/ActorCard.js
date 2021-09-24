import Link from "next/link";
import {useRouter} from "next/router";
import ActorCardMedia from "./ActorCardMedia";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const ActorCardStyledLink = styled.a`
  width: 48vw;
  margin: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  .actor-card-title {
    width: 100%;
    color: var(--main-text-color);
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-weight: initial;
    font-size: 12px;
    padding: 5px 0;

    &:hover {
      filter: invert(70%);
    }
  }

  @media only screen and (min-width: 768px) {
    width: ${props => props.cardWidth}px;
    margin: 5px;

    .actor-card-title {
      font-size: 14px;
    }
  }
`
const ActorCard = ({t, cardWidth, actor, onActivateLoadingHandler}) => {

    const router = useRouter()

    return (
        <Link href={`/actor/${actor._id}`}>
            <ActorCardStyledLink className='actor-card-link' onClick={onActivateLoadingHandler} cardWidth={cardWidth} rel="noopener">

                <ActorCardMedia cardWidth={cardWidth} imageUrl={actor.imageUrl} mediaAlt={actor?.translations?.[router.locale]?.name || actor.name} actorId={actor?._id}/>
                <h3 className='actor-card-title'> {actor?.translations?.[router.locale]?.name || t([t(`customTranslation:${actor?.name}`)])}</h3>
            </ActorCardStyledLink>
        </Link>
    );
};

export default withTranslation(['customTranslation'])(ActorCard);

