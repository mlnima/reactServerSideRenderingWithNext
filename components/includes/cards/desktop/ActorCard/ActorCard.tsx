import Link from "next/link";
import ActorCardMedia from "./ActorCardMedia";
import {useTranslation} from 'next-i18next';
import capitalizeFirstLetter from "../../../../../_variables/util/capitalizeFirstLetter";
import styled from "styled-components";
import {Meta} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";
import {FC, useMemo} from "react";

const ActorCardStyledDiv = styled.div`
  margin: 5px;
  .actor-card-link {
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
        color: var(--post-element-text-color, #fff);
      }
    }

    .actor-card-count {
      margin: 0 2px;
      color: var(--main-text-color);
    }
  }
`
interface ActorCardPropTypes{
    actor:Meta,
    onActivateLoadingHandler:any
}

const ActorCard : FC<ActorCardPropTypes> = ({ actor, onActivateLoadingHandler}) => {
    const {t} = useTranslation('common');

    const actorName = useMemo(()=>capitalizeFirstLetter(actor?.name),[actor.name])
    return (
        <ActorCardStyledDiv className={'actor-card'}>
            <Link href={`/actor/${actor._id}`}>
                <a className='actor-card-link'
                   onClick={onActivateLoadingHandler}
                   title={actor?.name}
                >
                    <div className={'actor-card-image'}>
                        <ActorCardMedia imageUrl={actor.imageUrl} mediaAlt={actor.name}/>
                    </div>
                    <h3 className='actor-card-title'> {actorName}</h3>
                    {actor?.count ? <span className={'actor-card-count'}>{actor?.count} {t('Videos')}</span> : null}
                </a>
            </Link>
        </ActorCardStyledDiv>
    );
};

export default ActorCard;

