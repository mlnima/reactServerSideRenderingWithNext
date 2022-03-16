import React from 'react';
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import ActorDetails from "./ActorDetails";
import capitalizeFirstLetter from "../../../../../../_variables/util/capitalizeFirstLetter";

const ActorBioStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  margin: 10px auto;

  .actor-images {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;

    .cover-image {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }

    .actor-image {
      border-radius: 75%;
      width: 35vw;
      height: 35vw;
      object-fit: cover;
      bottom: 0;
      left: 0;
    }
  }

  .actor-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .actor-data-name {

    }

    .actor-data-description-details {
      background-color: var(--navigation-background-color);
      width: 100%;

      .actor-data-description {
        display: flex;
        flex-direction: column;
        padding: 1%;
        width: 95%;
        margin: 10px auto;
      }

      .actor-data-details {

      }
    }
  }

  @media only screen and (min-width: 768px) {
    .actor-images {
      .actor-image {
        border-radius: 0;
        width: 200px;
        height: 200px;
      }
    }

    .actor-data {
      .actor-data-description-details {
        display: flex;
      }
    }
  }
`

const ActorBio = () => {

    const {actorData} = useSelector(({posts}: StoreTypes) => posts)
    const posts = useSelector(({posts}: StoreTypes) => posts)
    console.log(posts)

    return (
        <ActorBioStyledDiv className={'actor-information'}>

            <div className={'actor-images'}>
                {actorData?.coverImageUrl ?
                    <img className={'cover-image'} src={actorData.coverImageUrl} alt={actorData.name + 'cover image'}/>
                    : null
                }
                {actorData.imageUrl ?
                    <img className={'actor-image'} src={actorData.imageUrl} alt={actorData.name}/>
                    : null
                }
            </div>

            <div className={'actor-data'}>
                <h1 className={'actor-data-name'}>{capitalizeFirstLetter(actorData.name)}</h1>
                <div className={'actor-data-description-details'}>

                    {actorData.description ?
                        <p className={'actor-data-description'}>
                            <h2>
                                About {actorData.name}
                            </h2>
                            {actorData.description}
                        </p>
                        : null
                    }
                    {
                        // @ts-ignore
                        actorData?.additionalInfo?.length ?
                            // @ts-ignore
                            <ActorDetails additionalInfo={actorData.additionalInfo}/>
                            : null
                    }
                </div>

            </div>


        </ActorBioStyledDiv>
    );
};
export default ActorBio;
