import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

interface ComponentPropTypes {
    imageUrl?: string | undefined,
    name: string
}

const ActorMetaImageRenderer: FC<ComponentPropTypes> = ({imageUrl, name}) => {

    if (!!imageUrl) {
        return (
            <img src={imageUrl}
                 alt={name}
                 loading={'lazy'}
                 className={'item-image'}/>
        )
    } else  {
        return (
            <FontAwesomeIcon icon={faUser} />
        )
    }
};
export default ActorMetaImageRenderer
