import {useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import ActorCardMedia from "./ActorCardMedia";
import {withTranslation} from "next-i18next";
import capitalizeFirstLetter from "../../../../_variables/util/capitalizeFirstLetter";
import styled from "styled-components";
const ActorCardStyledDiv = styled.div`
  .actor-card-info{
    .actor-card-link{
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      width: 140px;
      margin: auto;
      font-size: 12px;
      .actor-card-title {
        width: fit-content;
        color: var(--main-active-color);
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        
        padding: 3px 0;
        margin: 3px 0;

        &:hover {
          color: var(--post-element-text-color,#fff);
        }
      }
      .actor-card-count{
        margin: 0 2px;
        color: var(--main-text-color);
      }
    }
  }
`

const ActorCard = ({t, cardWidth, actor, onActivateLoadingHandler}) => {
    const router = useRouter()
    const title = useMemo(()=> actor?.translations?.[router.locale]?.name || t([t(`customTranslation:${actor?.name}`)]))
    return (
        <ActorCardStyledDiv className={'actor-card'}>
            <div className={'actor-card-image'}>
                <Link href={`/actor/${actor._id}`}>
                    <a className='actor-card-link' onClick={onActivateLoadingHandler}  >
                        <ActorCardMedia cardWidth={cardWidth} imageUrl={actor.imageUrl} mediaAlt={actor?.translations?.[router.locale]?.name || actor.name} actorId={actor?._id}/>
                    </a>
                </Link>
            </div>
            <div className={'actor-card-info'}>
                <Link href={`/actor/${actor._id}`}>
                    <a className='actor-card-link'
                       onClick={onActivateLoadingHandler}
                       title={title}
                    >
                        {/*<h3 className='actor-card-title'> {actor?.translations?.[router.locale]?.name || t([t(`customTranslation:${actor?.name}`)])}</h3>*/}
                        <h3 className='actor-card-title'> {capitalizeFirstLetter(title)}</h3>
                        {actor?.count ? <span className={'actor-card-count'}>{actor?.count} {t([t(`customTranslation:Videos`)])}</span> : null}
                    </a>
                </Link>
            </div>
        </ActorCardStyledDiv>

    );
};

export default withTranslation(['customTranslation','common'])(ActorCard);

