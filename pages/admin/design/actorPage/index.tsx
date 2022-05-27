import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import React from "react";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const actorPage = () => {
    return (
        <StyleSection name='actorPageStyle' title='Actor Page Page Design :' />
    );
};

actorPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}


export default actorPage;
