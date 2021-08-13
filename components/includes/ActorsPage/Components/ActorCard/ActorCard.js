import Link from "next/link";
import {useRouter} from "next/router";
import ActorCardMedia from "./ActorCardMedia";

const ActorCard = ({cardWidth, actor}) => {
    const router = useRouter()

    return (
        <Link href={`/actor/${actor._id}`}>
            <a className='actor-card-link'>
                <style jsx>{`
                  .actor-card-link{
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
                    }
                  }

                  @media only screen and (min-width: 768px) {
                    .actor-card-link {
                      width: ${cardWidth}px;
                      margin: 5px;
                    }

                  }


                `}</style>
                <ActorCardMedia cardWidth={cardWidth} imageUrl={actor.imageUrl}/>
                <h3 className='actor-card-title'>{actor?.translations?.[router.locale]?.name || actor.name}</h3>
            </a>
        </Link>
    );
};
export default ActorCard;
