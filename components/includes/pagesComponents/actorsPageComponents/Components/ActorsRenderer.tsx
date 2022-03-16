import React, {FC} from 'react';
import ActorCard from "../../../cards/desktop/ActorCard/ActorCard";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {setLoading} from "@store/clientActions/globalStateActions";

let ActorsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .actor-card-image {
    .actor-card-link {
      width: 140px;
      margin: 1vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 3vw;

      @media only screen and (min-width: 768px) {
        margin: 5px;
        justify-content: center;
      }
    }
  }
`

interface ActorsRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],
    }
}

const ActorsRenderer: FC<ActorsRendererPropTypes> = ({uniqueData}) => {

    const dispatch = useDispatch();
    const actorsMetas = useSelector(({posts}: StoreTypes) => uniqueData?.metaData || posts?.actorsMetas || [])

    return (
        <ActorsRendererStyledDiv className='actors-content'>
            {actorsMetas.map((actor) => {
                return <ActorCard key={actor._id}
                                  actor={actor}
                                  onActivateLoadingHandler={() => dispatch(setLoading(true))}
                />
                }
            )}
        </ActorsRendererStyledDiv>
    );
};

export default ActorsRenderer;
