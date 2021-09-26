import Link from "next/link";
import {useRouter} from "next/router";
import ActorCardMedia from "./ActorCardMedia";
import {withTranslation} from "next-i18next";

const ActorCard = ({t, cardWidth, actor, onActivateLoadingHandler}) => {
    const router = useRouter()
    return (
        <Link href={`/actor/${actor._id}`}>
            <a className='actor-card-link' onClick={onActivateLoadingHandler}  >
                <ActorCardMedia cardWidth={cardWidth} imageUrl={actor.imageUrl} mediaAlt={actor?.translations?.[router.locale]?.name || actor.name} actorId={actor?._id}/>
                <h3 className='actor-card-title'> {actor?.translations?.[router.locale]?.name || t([t(`customTranslation:${actor?.name}`)])}</h3>
            </a>
        </Link>
    );
};

export default withTranslation(['customTranslation'])(ActorCard);

