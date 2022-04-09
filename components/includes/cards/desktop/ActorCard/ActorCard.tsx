import {FC} from "react";
import Link from "next/link";
import ActorCardMedia from "./ActorCardMedia";
import {useTranslation} from 'next-i18next';
import capitalizeFirstLetter from "../../../../../_variables/util/capitalizeFirstLetter";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";


const ActorCardStyledDiv = styled.div`
  background-color: var(--post-element-background-color, #131314);
  //width: 100%;
  width: 140px;
  font-size: 14px;
  margin: auto;
  .actor-card-link {
    position: relative;
    display: block;
    cursor: pointer;
    
    .actor-card-image{
      margin: auto;
      display: flex;
      justify-content: center;
      width: 140px;
      height: 140px;
      position: relative;
      img{
        object-fit: cover;
        width: 140px !important;
        height: 140px !important;
      }
      div{
        span{
          img{
            object-fit: cover !important;
            width: 140px !important;
            height: 140px !important;
          }
        }
      }

    }
    
    header{
      width: 100%;
      .card-header{
        width: min-content;
        color: var(--main-active-color);
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        
        &:hover {
          color: var(--post-element-text-color, #fff);
        }
      }
    }
    
    .actor-card-count {
      width: min-content;
      //margin: 0 2px;
      color: var(--main-text-color);
    }
  }
  //@media only screen and (min-width: 768px) {
  //  margin: 5px;
  //  font-size: 14px;
  //  .actor-card-title {
  //    font-size: 14px;
  //  }
  //}
`
interface ActorCardPropTypes{
    actor:Meta,
    onActivateLoadingHandler:any,
    index?:number,
    isAppleMobileDevice?:boolean
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
                        <ActorCardMedia imageUrl={actor.imageUrl}
                                        mediaAlt={actor.name}
                                        index={index}
                        />
                    </div>
                    <header>
                        <span className={'card-header'}> {actorName}</span>
                    </header>

                    {actor?.count ? <span className={'actor-card-count'}>{actor?.count} {t('Videos')}</span> : null}
                </a>
            </Link>
        </ActorCardStyledDiv>
    );
};

export default ActorCard;

