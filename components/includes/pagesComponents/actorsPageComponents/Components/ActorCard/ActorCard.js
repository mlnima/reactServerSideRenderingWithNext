import Link from "next/link";
import {useRouter} from "next/router";
import ActorCardMedia from "./ActorCardMedia";
import {withTranslation} from "next-i18next";

const ActorCard = ({t, cardWidth, actor, onActivateLoadingHandler}) => {
    const router = useRouter()
    return (
        <div className={'actor-card'}>
            <div className={'actor-card-image'}>
                <Link href={`/actor/${actor._id}`}>
                    <a className='actor-card-link' onClick={onActivateLoadingHandler}  >
                        <ActorCardMedia cardWidth={cardWidth} imageUrl={actor.imageUrl} mediaAlt={actor?.translations?.[router.locale]?.name || actor.name} actorId={actor?._id}/>
                    </a>
                </Link>
            </div>
            <div className={'actor-card-info'}>
                <Link href={`/actor/${actor._id}`}>
                    <a className='actor-card-link' onClick={onActivateLoadingHandler}  >
                        <h3 className='actor-card-title'> {actor?.translations?.[router.locale]?.name || t([t(`customTranslation:${actor?.name}`)])}</h3>
                        {actor?.count ? <span>{actor?.count}</span> : null}
                    </a>
                </Link>
            </div>
        </div>

    );
};

export default withTranslation(['customTranslation'])(ActorCard);

