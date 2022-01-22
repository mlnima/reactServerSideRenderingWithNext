import Link from "next/link";
import ActorCardMedia from "./ActorCardMedia";
import {withTranslation} from "next-i18next";
import capitalizeFirstLetter from "../../../../_variables/util/capitalizeFirstLetter";
import styled from "styled-components";

const ActorCardStyledDiv = styled.div`
  margin: 5px;
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

`

const ActorCard = ({t, cardWidth, actor, onActivateLoadingHandler}) => {
    return (
        <ActorCardStyledDiv className={'actor-card'}>
                <Link href={`/actor/${actor._id}`}>
                    <a className='actor-card-link'
                       onClick={onActivateLoadingHandler}
                       title={actor?.name}
                    >
                        <div className={'actor-card-image'}>
                            <ActorCardMedia cardWidth={cardWidth} imageUrl={actor.imageUrl} mediaAlt={actor.name} actorId={actor?._id}/>
                        </div>
                        <h3 className='actor-card-title'> {capitalizeFirstLetter(actor?.name)}</h3>
                        {actor?.count ? <span className={'actor-card-count'}>{actor?.count} {t([t(`common:Videos`)])}</span> : null}
                    </a>
                </Link>
        </ActorCardStyledDiv>

    );
};

export default withTranslation(['common'])(ActorCard);

