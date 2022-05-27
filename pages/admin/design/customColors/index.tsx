import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import React from "react";

const StyleSection = dynamic(() => import("@components/adminIncludes/design/StyleSection/StyleSection"), {ssr: false})

const customStyles = () => {
    return (
        <StyleSection name={'customColors'} title={'Custom Colors :'}/>
    );
};

customStyles.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export default customStyles;
