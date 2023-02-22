import React, {FC, useEffect, useState} from "react";
import SvgRenderer from "../../../../../global/commonComponents/SvgRenderer/SvgRenderer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

interface ComponentPropTypes {
    imageUrl: string,
    name: string
}

const ActorMetaImageRenderer: FC<ComponentPropTypes> = ({imageUrl, name}) => {
    const [gotError, setGotError] = useState(null)

    useEffect(() => {
        console.log(gotError)
    }, [gotError]);


    if (!!imageUrl && !gotError) {
        return (
            <img src={imageUrl}
                 alt={name}
                 loading={'lazy'}
                 onError={()=>setGotError(true)}
                 className={'item-image'}/>
        )
    } else if (gotError) {
        return (

            <FontAwesomeIcon icon={faUser} style={{width: 20, height: 20}}/>
        )
    } else return null

};
export default ActorMetaImageRenderer
// <SvgRenderer svgUrl={'/asset/images/icons/user-solid.svg'}
// size={20}
// customClassName={'actor-meta-svg'}
// color={'var(--secondary-text-color, #ccc)'}
// />