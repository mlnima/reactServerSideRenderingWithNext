import dynamic from "next/dynamic";
import React from "react";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const actorsPage = () => {
    return (
        <StyleSection name='actorsPageStyle' title='Actors Page Page Design :' />
    );
};

export default actorsPage;
