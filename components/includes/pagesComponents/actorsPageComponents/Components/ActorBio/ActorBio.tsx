import React, {useEffect, useState, useContext, useRef} from 'react';
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../../../../_variables/TypeScriptTypes/GlobalTypes";

import styled from "styled-components";
import ActorDetails from "./ActorDetails";
const ActorBioStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  margin: 10px auto;

  .actor-images{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    .cover-image{
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }

    .actor-image{
      border-radius: 75%;
      width: 35vw;
      height: 35vw;
      object-fit: cover;
      bottom: 0;
      left: 0;
    }
  }
  
  .actor-data{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .actor-data-name{
      
    }
    .actor-data-description-details{
       background-color: var(--navigation-background-color);
      width: 100%;
      .actor-data-description{
        display: flex;
        flex-direction: column;
        padding: 1%;
        width: 95%;
        margin: 10px auto;
      }
      .actor-data-details{
        
      }
    }
  }
  @media only screen and (min-width: 768px){
    .actor-images{
      .actor-image{
        border-radius: 0;
        width: 200px;
        height: 200px;
      }
    }
     .actor-data{
      .actor-data-description-details{
        display: flex;
      }
    }
  }
`

const ActorBio = () => {
    const actor = useSelector((store:StoreTypes) => store?.posts?.actorData)

    return (
        <ActorBioStyledDiv className={'actor-information'} >

            <div className={'actor-images'}>
                {actor?.coverImageUrl?
                    <img className={'cover-image'} src={actor.coverImageUrl} alt={actor.name + 'cover image'}/>
                    :null
                }
                {actor.imageUrl ?
                 <img className={'actor-image'} src={actor.imageUrl} alt={actor.name}/>
                    :null
                }
            </div>
            <div className={'actor-data'}>
                <h1 className={'actor-data-name'}>{actor.name}</h1>
                <div className={'actor-data-description-details'}>

                    {actor.description?
                        <p className={'actor-data-description'}>
                            <h2>
                                About {actor.name}
                            </h2>
                            {actor.description}
                        </p>
                        :null
                    }
                    {
                        // @ts-ignore
                        actor?.additionalInfo?.length ?
                            // @ts-ignore
                             <ActorDetails additionalInfo={actor.additionalInfo } />
                        :null
                    }
                </div>

            </div>


        </ActorBioStyledDiv>
    );
};
export default ActorBio;
