import React, {FC} from "react";
import SvgRenderer from "../../../../../global/commonComponents/SvgRenderer/SvgRenderer";

interface ComponentPropTypes {
    imageUrl: string,
    name: string
}

const ActorMetaImageRenderer: FC<ComponentPropTypes> = ({imageUrl, name}) => {

    if (!!imageUrl) {
        return (
            <img src={imageUrl}
                 alt={name}
                 className={'item-image'}/>
        )
    } else {
        return (
            <SvgRenderer svgUrl={'/asset/images/icons/user-solid.svg'}
                         size={20}
                         customClassName={'actor-meta-svg'}
                         color={'var(--secondary-text-color, #ccc)'}
            />
        )
    }

};
export default ActorMetaImageRenderer
