'use client';
import React, {FC, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Csr from "@components/global/Csr";
import {faPersonHalfDress} from "@fortawesome/free-solid-svg-icons";

interface ComponentPropTypes {
    imageUrl?: string | undefined,
    name: string
}

const ActorMetaImageRenderer: FC<ComponentPropTypes> = ({imageUrl, name}) => {
    const [gotError, setGotError] = useState(false)

    return (
        <Csr>
            {!!imageUrl && !gotError ?
                <img src={imageUrl}
                     alt={name}
                     loading={'lazy'}
                     onError={() => setGotError(true)}
                     className={'item-image'}/> :
                <FontAwesomeIcon icon={faPersonHalfDress}/>

            }
        </Csr>
    )
};
export default ActorMetaImageRenderer
