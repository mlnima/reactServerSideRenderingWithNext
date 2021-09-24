import _ from "lodash";
import ActorCard from "../ActorCard/ActorCard";
import {useContext} from "react";
import {AppContext} from "../../../../../context/AppContext";
import styled from "styled-components";

let ActorsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`


const ActorsRenderer = ({postElementSize, metaData, actors}) => {
    const contextData = useContext(AppContext);
    const cardWidth = postElementSize === 'list' ? 116.6 :
        postElementSize === 'smaller' ? 209.8 :
            postElementSize === 'small' ? 255 :
                postElementSize === 'medium' ? 320 : 255



    return (
        <ActorsRendererStyledDiv className='actors-content'>
            {
                (actors || metaData || []).map(actor => {
                    return <ActorCard onActivateLoadingHandler={contextData?.functions?.loadingHandler} key={_.uniqueId('actors_')} cardWidth={cardWidth} actor={actor} postElementSize={postElementSize}/>
                })
            }
        </ActorsRendererStyledDiv>
    );
};
export default ActorsRenderer;
