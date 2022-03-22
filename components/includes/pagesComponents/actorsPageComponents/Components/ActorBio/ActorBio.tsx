import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";

const ActorBioMobile = dynamic(() =>
    import('@components/includes/pagesComponents/actorsPageComponents/Components/ActorBio/ActorBioMobile'));
const ActorBioDesktop = dynamic(() =>
    import('@components/includes/pagesComponents/actorsPageComponents/Components/ActorBio/ActorBioDesktop'));

const ActorBio: FC = () => {

    const isMobile = useSelector((store: StoreTypes) => store.settings?.isMobile);

    if (isMobile) {
        return <ActorBioMobile/>
    } else {
        return <ActorBioDesktop/>
    }
};

export default ActorBio;
