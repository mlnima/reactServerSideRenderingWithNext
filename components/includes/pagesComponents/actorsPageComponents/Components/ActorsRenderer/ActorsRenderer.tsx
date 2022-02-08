import React, {FC} from 'react';
import ActorCard from "../../../../cards/desktop/ActorCard/ActorCard";
import styled from "styled-components";
import {setLoading} from "../../../../../../store/actions/globalStateActions";
import {useDispatch} from "react-redux";
import {Meta} from "../../../../../../_variables/TypeScriptTypes/GlobalTypes";

let ActorsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  .actor-card-image{
    .actor-card-link {
      width: 140px;
      margin: 1vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      
      @media only screen and (min-width: 768px) {
        width: 140px;
        margin: 5px;
        .actor-card-title {
          font-size: 14px;
        }
      }
    }
  }
`

interface ActorsRendererPropTypes{
    metaData:Meta[],
}

const ActorsRenderer : FC<ActorsRendererPropTypes> = ({metaData}) => {
    const dispatch = useDispatch()

    return (
        <ActorsRendererStyledDiv className='actors-content' >
            {metaData.map((actor:Meta) => {
                    return <ActorCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                      key={actor._id}
                                      actor={actor}
                    />
                })
            }
        </ActorsRendererStyledDiv>
    );
};
export default ActorsRenderer;
