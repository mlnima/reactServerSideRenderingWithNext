import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import React from "react";

const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const actorsPage = () => {
    return (
        <StyleSection name='actorsPageStyle' title='Actors Page Page Design :' />
    );
};

actorsPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default actorsPage;
