import dynamic from "next/dynamic";
import React from "react";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const actorPage = () => {
    return (
        <StyleSection name='actorPageStyle' title='Actor Page Page Design :' />
    );
};

export default actorPage;
