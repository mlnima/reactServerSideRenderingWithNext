'use client';
import React, {FC, useState} from "react";
import {capitalizeFirstLetter} from "shared-util";
import ActorDetails from "../ActorDetails/ActorDetails";
import './ActorBio.styles.scss'
import {Meta} from "typescript-types";

interface IProps{
    actorData:Meta
}

const ActorBio: FC<IProps> = ({actorData}) => {

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
        <div className={'actorBio'}>
            <div className={'actorImages'}>
                {actorData?.imageUrl ?
                    <img className={'actorImage'} src={actorData.imageUrl} alt={actorData?.name || 'actor image'}/>
                    : null
                }
            </div>
            <h1 className={'actorName'}>{capitalizeFirstLetter(actorData.name)}</h1>
            <div className={`actorDescriptionDetails${showMore ? 'Open':'Closed'}`}>
                {
                    // @ts-ignore
                    actorData?.additionalInfo?.length ?

                        <ActorDetails additionalInfo={actorData.additionalInfo}/>
                        : null
                }
                {actorData?.description &&
                    <section className={'actorDescription'}>
                        <h1>
                            About {actorData.name}
                        </h1>
                        {actorData.description}
                    </section>
                }
            </div>
            {
             //@ts-ignore
                actorData?.additionalInfo?.length || actorData?.description ?
                    <button onClick={onShowDetailsHandler}
                            className={'btn btn-info showMoreDetailBtn'}
                            aria-label={'More Info'}>
                        {showMore ? '-' : '+'} More Info
                    </button>
                    :null
            }

        </div>
    )
};
export default ActorBio
