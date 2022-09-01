import React, {FC, useMemo} from 'react';
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const ActorBioMobile = dynamic(() =>
    import('@components/includes/cards/CardsRenderer/ActorBio/ActorBioMobile'));
const ActorBioDesktop = dynamic(() =>
    import('@components/includes/cards/CardsRenderer/ActorBio/ActorBioDesktop'));

const ActorBio: FC = () => {

    const isMobileDevice = useSelector((store: Store) => store.settings?.isMobile)
    const isMobile = useMemo(()=>isMobileDevice,[])

    if (isMobile) {
        return <ActorBioMobile/>
    } else {
        return <ActorBioDesktop/>
    }
};

export default ActorBio;
