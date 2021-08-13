import _ from "lodash";
import ActorCard from "../ActorCard/ActorCard";

const ActorsRenderer = ({postElementSize, metaData, actors}) => {
    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255

    return (
        <div className='actors-content'>
            <style jsx>{`
              .actors-content {
                margin: 0 auto;
                display: flex;
                flex-flow: row wrap;
              }
            `}</style>
            {
                (actors || metaData || []).map(actor => {
                    return <ActorCard key={_.uniqueId('actors_')} cardWidth={cardWidth} actor={actor} postElementSize={postElementSize}/>
                })
            }
        </div>
    );
};
export default ActorsRenderer;
