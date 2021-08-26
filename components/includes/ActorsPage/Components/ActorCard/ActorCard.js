import Link from "next/link";
import {useRouter} from "next/router";
import ActorCardMedia from "./ActorCardMedia";
import {withTranslation} from "next-i18next";

const ActorCard = ({t,cardWidth, actor,onActivateLoadingHandler}) => {

    const router = useRouter()

    return (
        <Link href={`/actor/${actor._id}`}>
            <a className='actor-card-link' onClick={onActivateLoadingHandler}>
                <style jsx>{`
                  .actor-card-link {
                    width: 48vw;
                    margin: 1vw;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;

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
                                &:hover {
                        filter: invert(70%);
                      }
                    }
                  }

                  @media only screen and (min-width: 768px) {
                    .actor-card-link {
                      width: ${cardWidth}px;
                      margin: 5px;

                      .actor-card-title {
                        font-size: 14px;
                      }
                    }

                  }


                `}</style>
                <ActorCardMedia cardWidth={cardWidth} imageUrl={actor.imageUrl} mediaAlt={actor?.translations?.[router.locale]?.name || actor.name} actorId={actor?._id}/>
                <h3 className='actor-card-title'> { actor?.translations?.[router.locale]?.name || t([t(`customTranslation:${actor?.name}`)])}</h3>
            </a>
        </Link>
    );
};

export default withTranslation(['customTranslation'])(ActorCard);