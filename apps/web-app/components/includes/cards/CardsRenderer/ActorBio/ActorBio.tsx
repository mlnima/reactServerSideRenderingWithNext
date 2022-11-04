import {FC} from 'react';
import dynamic from "next/dynamic";

const ActorBioMobile = dynamic(() =>
    import('./ActorBioMobile'));

const ActorBio: FC = () => {
        return <ActorBioMobile/>
};

export default ActorBio;
