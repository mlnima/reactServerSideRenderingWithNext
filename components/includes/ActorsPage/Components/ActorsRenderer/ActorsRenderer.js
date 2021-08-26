import _ from "lodash";
import ActorCard from "../ActorCard/ActorCard";
import {useContext} from "react";
import {AppContext} from "../../../../../context/AppContext";

const ActorsRenderer = ({postElementSize, metaData, actors}) => {
    const contextData = useContext(AppContext);
    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255

    const onActivateLoadingHandler = ()=>{
        contextData.dispatchState(prevState => ({
            ...prevState,
            loading:true
        }))
    }

    return (
        <div className='actors-content'>
            <style jsx>{`
              .actors-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
              }
            `}</style>
            {
                (actors || metaData || []).map(actor => {
                    return <ActorCard onActivateLoadingHandler={onActivateLoadingHandler} key={_.uniqueId('actors_')} cardWidth={cardWidth} actor={actor} postElementSize={postElementSize}/>
                })
            }
        </div>
    );
};
export default ActorsRenderer;
