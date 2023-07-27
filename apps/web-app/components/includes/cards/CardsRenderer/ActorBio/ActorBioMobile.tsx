import React, {FC, useState} from "react";
import styled from "styled-components";
import {capitalizeFirstLetter} from "custom-util";
import ActorDetails from "./ActorDetails";
import {useAppSelector} from "@store_toolkit/hooks";

const ActorBioMobileStyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .actor-images {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .actor-image {
      border-radius: 50%;
      width: 140px;
      height: 140px;
      object-fit: cover;
    }

    .actor-data-name {
      margin: auto;
    }

  }

  .actor-data-description-details {
    display: ${({showMore}:{showMore:boolean})=> showMore ? 'initial' :'none'};
    width: 95%;

    .actor-data-description {

    }
  }
  
  .show-more-detail-btn{
    align-self: flex-end;
    margin: auto;
  }
`


const ActorBioMobile: FC = () => {

    const actorData = useAppSelector(({posts}) => posts?.actorData);
    const [showMore,setShowMore] = useState(false);


    const onShowDetailsHandler = ()=>{
        if (showMore){
            setShowMore(false)
        }else {
            setShowMore(true)
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    return (
        <ActorBioMobileStyledSection showMore={showMore}>
            <div className={'actor-images'}>
                {actorData?.imageUrl ?
                    <img className={'actor-image'} src={actorData.imageUrl} alt={actorData?.name || 'actor image'}/>
                    : null
                }
            </div>
            <h1 className={'actor-data-name'}>{capitalizeFirstLetter(actorData.name)}</h1>
            <div className={'actor-data-description-details'}>
                {
                    // @ts-ignore
                    actorData?.additionalInfo?.length ?
                        // @ts-ignore
                        <ActorDetails additionalInfo={actorData.additionalInfo}/>
                        : null
                }
                {actorData?.description ?
                    <section className={'actor-data-description'}>
                        <h1>
                            About {actorData.name}
                        </h1>
                        {actorData.description}
                    </section>
                    : null
                }
            </div>
            {
                // @ts-ignore
                actorData?.additionalInfo?.length || actorData?.description ?
                <button onClick={onShowDetailsHandler}
                        className={'btn btn-info show-more-detail-btn'}
                        aria-label={'More Info'}>
                    {showMore ? '-' : '+'} More Info
                </button>
                :null
            }

        </ActorBioMobileStyledSection>
    )
};
export default ActorBioMobile
