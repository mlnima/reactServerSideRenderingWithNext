import React, {FC} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import ActorDetails from "@components/includes/cards/CardsRenderer/ActorBio/ActorDetails";
import dynamic from "next/dynamic";

const Soft404 = dynamic(() => import('@components/includes/Soft404/Soft404'));

const ActorBioDesktopStyledSection = styled.section`
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
    position: relative;
    min-height: 200px;

    .cover-image {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
    }

    .actor-image {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      object-fit: cover;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 0;
      width: 200px;
      height: 200px;
      filter: drop-shadow(0 0 0.75rem crimson);
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
      display: flex;


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
`

const ActorBioDesktop: FC = () => {

    const actorData = useSelector(({posts}: StoreTypes) => posts.actorData);


    if (actorData.name) {
        return (
            <ActorBioDesktopStyledSection className={'actor-information'}>
                <div className={'actor-images'}>
                    {actorData?.coverImageUrl ?
                        <img className={'cover-image'} src={actorData.coverImageUrl}
                             alt={actorData.name + 'cover image'}/>
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
                            <section className={'actor-data-description'}>
                                <h1>
                                    About {actorData.name}
                                </h1>
                                {actorData.description}
                            </section>
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


            </ActorBioDesktopStyledSection>
        )
    } else return <Soft404/>

};
export default ActorBioDesktop
