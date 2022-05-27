import React from 'react';
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";

const importer = () => {

    return (
        <div>

        </div>
    );
};


importer.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default importer;
