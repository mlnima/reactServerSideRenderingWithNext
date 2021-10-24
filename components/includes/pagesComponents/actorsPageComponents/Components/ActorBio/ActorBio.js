import React, {useEffect, useState, useContext, useRef} from 'react';
import {useSelector} from "react-redux";

import styled from "styled-components";
const ActorBioStyledDiv = styled.div`
  display: flex;
  justify-content:center;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  .actor-image{
    img{
      border-radius: 75%;
      width: 40vw;
      height: 40vw;
      object-fit: cover;
    }
  }
  @media only screen and (min-width: 768px){
    .actor-image{
      img{
        width: 200px;
        height: 200px;
      }
    }
  }
`

const ActorBio = props => {
    const actor = useSelector(state => state.posts.actorData)

    return (
        <ActorBioStyledDiv className={'actor-bio'}>
            <div className='actor-image'>
                {actor.imageUrl ?
                 <img src={actor.imageUrl} alt={actor.name}/>
                    :null
                }
            </div>
            <h1>{actor.name}</h1>
            {actor.description?
                <p>{actor.description}</p>
                :null
            }

        </ActorBioStyledDiv>
    );
};
export default ActorBio;
