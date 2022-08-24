import React, {FC, useMemo} from 'react';
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";

const ActorBioMobile = dynamic(() =>
    import('@components/includes/cards/CardsRenderer/ActorBio/ActorBioMobile'));
const ActorBioDesktop = dynamic(() =>
    import('@components/includes/cards/CardsRenderer/ActorBio/ActorBioDesktop'));

const ActorBio: FC = () => {

    const isMobileDevice = useSelector((store: StoreTypes) => store.settings?.isMobile)
    const isMobile = useMemo(()=>isMobileDevice,[])

    if (isMobile) {
        return <ActorBioMobile/>
    } else {
        return <ActorBioDesktop/>
    }
};

export default ActorBio;
