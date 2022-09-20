import {FC} from 'react';
import dynamic from "next/dynamic";

const ActorBioMobile = dynamic(() =>
    import('@components/includes/cards/CardsRenderer/ActorBio/ActorBioMobile'));

const ActorBio: FC = () => {
        return <ActorBioMobile/>
};

export default ActorBio;
