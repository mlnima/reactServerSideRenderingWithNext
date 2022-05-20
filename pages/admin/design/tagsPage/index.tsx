import {wrapper} from "@store_toolkit/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import React from "react";
const StyleSection = dynamic(() => import('@components/adminIncludes/design/StyleSection/StyleSection'),{ssr:false});

const tagsPage = () => {
    return (
        <StyleSection name='tagsPageStyle' title='Tags Page Page Design :' />
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

tagsPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default tagsPage;
