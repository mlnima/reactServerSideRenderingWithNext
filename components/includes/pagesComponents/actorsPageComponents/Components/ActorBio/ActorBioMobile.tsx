import React, {FC, useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import capitalizeFirstLetter from "@_variables/util/capitalizeFirstLetter";
import ActorDetails from "@components/includes/pagesComponents/actorsPageComponents/Components/ActorBio/ActorDetails";

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
    margin: 5px;
  }
`


const ActorBioMobile: FC = () => {

    const actorData = useSelector(({posts}: StoreTypes) => posts.actorData);
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
                    <p className={'actor-data-description'}>
                        <h2>
                            About {actorData.name}
                        </h2>
                        {actorData.description}
                    </p>
                    : null
                }
            </div>
            <button onClick={onShowDetailsHandler}
                    className={'btn btn-primary show-more-detail-btn'}
            >
                {showMore ? '-' : '+'}
            </button>
        </ActorBioMobileStyledSection>
    )
};
export default ActorBioMobile
