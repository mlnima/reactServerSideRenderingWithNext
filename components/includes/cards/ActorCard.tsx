import {FC} from "react";
import styled from "styled-components";
import {Meta} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import CardImageRenderer from "@components/includes/cards/CardImageRenderer";
import {useTranslation} from "next-i18next";

const ActorCardStyle = styled.article`
  background-color: var(--post-element-background-color, #131314);
  width: 100%;
  margin: 20px auto;
  font-size: 15px;

  .actor-card-link {
    width: 100%;
    color: var(--post-element-text-color, #ccc);

    .card-image {
      margin: auto;
      display: flex;
      justify-content: center;
      width: 140px !important;
      height: 140px !important;
      position: relative;

      img {
        object-fit: cover;
        width: 140px !important;
        height: 140px !important;
      }

      span {
        img {
          object-fit: cover !important;
          width: 140px !important;
          height: 140px !important;
        }
      }
    }
    
    .actor-card-info {
      display: flex;
      align-items: center;
      justify-content: center;

      .actor-card-title, .actor-card-count {
        color: var(--post-element-text-color, #ccc);
      }

      header {
        width: 100%;
        text-align: center;
        margin-top: 5px;
        .card-header {
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
    }
    
    .actor-card-count {
      margin: 0 2px;
      font-size: 14px;
    }
    
  }

  @media only screen and (min-width: 768px) {
    width: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
    height: ${({cardWidth}: { cardWidth: number }) => cardWidth}px;
  }
`

interface ActorCardPropTypes {
    actor: Meta,
    index?: number,
    postsPerRawForMobile: number,
    cardWidth: number,
}

const ActorCard: FC<ActorCardPropTypes> =
    ({
         actor,
         index,
         postsPerRawForMobile,
         cardWidth
     }) => {

        const {t} = useTranslation('common');
        const actorName = capitalizeFirstLetter(actor?.name)

        return (
            <ActorCardStyle cardWidth={cardWidth}>
                <Link href={`/actor/${actor?._id}`}>
                    <a className='actor-card-link' title={actorName as string}>
                        <CardImageRenderer imageUrl={actor.imageUrl}
                                           mediaAlt={actorName}
                                           index={index}
                                           postsPerRawForMobile={postsPerRawForMobile}
                                           cardWidth={cardWidth}/>

                        <div className={'actor-card-info'}>
                            <header>
                                <span className={'card-header'}> {actorName}</span>
                            </header>


                        </div>
                        {!!actor?.count &&
                            <span className={'actor-card-count'}>
                                 <>
                                    {actor?.count} {t<string>('Videos')}
                                 </>
                             </span>
                        }
                    </a>
                </Link>
            </ActorCardStyle>
        )
    };
export default ActorCard
