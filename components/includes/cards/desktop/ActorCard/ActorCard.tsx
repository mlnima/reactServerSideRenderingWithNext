import {FC} from "react";
import Link from "next/link";
import ActorCardMedia from "./ActorCardMedia";
import {useTranslation} from 'next-i18next';
import capitalizeFirstLetter from "../../../../../_variables/util/capitalizeFirstLetter";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";


const ActorCardStyledDiv = styled.div`
  margin: 5px;
  background-color: var(--post-element-background-color, #131314);
  .actor-card-link {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 140px;
    margin: auto;
    font-size: 14px;

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
  @media only screen and (min-width: 768px) {
    margin: 5px;
    font-size: 14px;
    .actor-card-title {
      font-size: 14px;
    }
  }
`
interface ActorCardPropTypes{
    actor:Meta,
    onActivateLoadingHandler:any,
    index?:number
}

const ActorCard : FC<ActorCardPropTypes> = ({ actor,onActivateLoadingHandler,index}) => {

    const {t} = useTranslation('common');
    const actorName = capitalizeFirstLetter(actor?.name)

    return (
        <ActorCardStyledDiv className={'actor-card'}>
            <Link href={`/actor/${actor._id}`}>
                <a className={'actor-card-link'}
                   onClick={onActivateLoadingHandler}
                   title={actor?.name}
                >
                    <div className={'actor-card-image'}>
                        <ActorCardMedia imageUrl={actor.imageUrl} mediaAlt={actor.name}   index={index}/>
                    </div>
                    <h3 className={'actor-card-title'}> {actorName}</h3>
                    {actor?.count ? <span className={'actor-card-count'}>{actor?.count} {t('Videos')}</span> : null}
                </a>
            </Link>
        </ActorCardStyledDiv>
    );
};

export default ActorCard;

