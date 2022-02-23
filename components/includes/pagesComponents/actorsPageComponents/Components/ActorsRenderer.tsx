import React, {FC} from 'react';
import ActorCard from "../../../cards/desktop/ActorCard/ActorCard";
import styled from "styled-components";
import {setLoading} from "../../../../../store/clientActions/globalStateActions";
import {useDispatch, useSelector} from "react-redux";
import {Meta, StoreTypes} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";

let ActorsRendererStyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

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
        .actor-card-title {
          //font-size: 14px;
        }
      }
    }
  }
`

interface ActorsRendererPropTypes {
    uniqueData?: {
        metaData?: Meta[],
    },
}

const ActorsRenderer: FC<ActorsRendererPropTypes> = ({uniqueData}) => {
    const dispatch = useDispatch()

    const actorsMetas = uniqueData?.metaData ? uniqueData?.metaData :
        useSelector((store: StoreTypes) => store?.posts?.actorsMetas)
    return (
        <ActorsRendererStyledDiv className='actors-content'>
            {actorsMetas instanceof Array ?
                actorsMetas?.map((actor: Meta) => {
                    return <ActorCard onActivateLoadingHandler={() => dispatch(setLoading(true))}
                                      key={actor._id}
                                      actor={actor}
                    />
                })
                : null
            }
        </ActorsRendererStyledDiv>
    );
};
export default ActorsRenderer;
