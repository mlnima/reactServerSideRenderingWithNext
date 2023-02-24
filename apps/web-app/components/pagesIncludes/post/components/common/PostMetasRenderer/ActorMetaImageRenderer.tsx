import React, {FC, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

interface ComponentPropTypes {
    imageUrl: string,
    name: string
}

const ActorMetaImageRenderer: FC<ComponentPropTypes> = ({imageUrl, name}) => {
    const [gotError, setGotError] = useState(false)

    if (!!imageUrl && !gotError) {
        return (
            <img src={imageUrl}
                 alt={name}
                 loading={'lazy'}
                 onError={() => setGotError(true)}
                 className={'item-image'}/>
        )
    } else if (gotError) {
        return (

            <FontAwesomeIcon icon={faUser} style={{width: 20, height: 20}}/>
        )
    } else return null

};
export default ActorMetaImageRenderer
